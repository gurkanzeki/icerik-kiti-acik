"""Ses kaydı → Whisper (altyazı) → Remotion (9:16 video) → Vercel (yayın)

Kullanım:
  video-yap ses.mp3 [--baslik "Başlık"] [--renk "#E2541B"] [--model small] [--dil tr] [--yayinla]
"""
import argparse
import html
import json
import shutil
import subprocess
import sys
from pathlib import Path

KIT_DIR = Path(__file__).resolve().parent
REMOTION_DIR = KIT_DIR / "remotion-video"
OUT_ROOT = KIT_DIR / "cikti"


def run(cmd, cwd=None):
    exe = shutil.which(cmd[0])  # Windows: npx -> npx.cmd
    if not exe:
        sys.exit(f"Bulunamadı: {cmd[0]} — kur.ps1 ile kurulumu tamamladın mı?")
    subprocess.run([exe, *cmd[1:]], cwd=cwd, check=True)


def main() -> None:
    p = argparse.ArgumentParser(description="Sesten altyazılı dikey video üretir.")
    p.add_argument("ses")
    p.add_argument("--baslik", default="")
    p.add_argument("--renk", default="#E2541B")
    p.add_argument("--model", default="small")
    p.add_argument("--dil", default="tr")
    p.add_argument("--yayinla", action="store_true")
    a = p.parse_args()

    ses = Path(a.ses).resolve()
    if not ses.is_file():
        sys.exit(f"Ses dosyası yok: {ses}")
    ad = ses.stem
    cikti = OUT_ROOT / ad
    cikti.mkdir(parents=True, exist_ok=True)
    wav = REMOTION_DIR / "public" / f"{ad}.wav"

    print("▶ 1/4  Ses hazırlanıyor")
    run(["ffmpeg", "-v", "error", "-y", "-i", str(ses), "-ac", "1", "-ar", "44100", str(wav)])

    print(f"▶ 2/4  Whisper ile yazıya çevriliyor (model: {a.model})")
    import whisper
    from whisper.utils import get_writer

    result = whisper.load_model(a.model).transcribe(
        str(wav), language=a.dil, word_timestamps=True, fp16=False
    )
    words = [
        {"text": w["word"].strip(), "start": round(w["start"], 3), "end": round(w["end"], 3)}
        for seg in result["segments"]
        for w in seg.get("words", [])
        if w["word"].strip()
    ]
    if not words:
        sys.exit("Whisper hiç kelime bulamadı — ses dosyasında konuşma var mı?")
    get_writer("srt", str(cikti))(result, str(wav))
    (cikti / "kelimeler.json").write_text(
        json.dumps({"text": result["text"].strip(), "words": words}, ensure_ascii=False, indent=1),
        encoding="utf-8",
    )
    print("   " + result["text"].strip())

    print("▶ 3/4  Remotion ile video üretiliyor")
    duration = words[-1]["end"]
    probe = shutil.which("ffprobe")
    if probe:
        out = subprocess.run(
            [probe, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(wav)],
            capture_output=True, text=True,
        ).stdout.strip()
        duration = float(out or duration)
    props = cikti / "props.json"
    props.write_text(
        json.dumps({"audio": wav.name, "duration": duration, "words": words,
                    "title": a.baslik, "accent": a.renk}, ensure_ascii=False),
        encoding="utf-8",
    )
    video = cikti / f"{ad}.mp4"
    run(["npx", "remotion", "render", "Shorts", str(video), f"--props={props}", "--log=error"],
        cwd=REMOTION_DIR)

    print("▶ 4/4  Yayın")
    if a.yayinla:
        site = cikti / "site"
        site.mkdir(exist_ok=True)
        shutil.copy(video, site / "video.mp4")
        shutil.copy(cikti / f"{ad}.srt", site / "altyazi.srt")
        baslik = html.escape(a.baslik or ad)
        (site / "index.html").write_text(f"""<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>{baslik}</title>
<style>body{{margin:0;min-height:100vh;display:grid;place-items:center;background:#0E0E10;color:#F5F3EE;font-family:system-ui,sans-serif}}
main{{width:min(420px,92vw);display:grid;gap:16px}}video{{width:100%;border-radius:16px}}a{{color:#F5F3EE}}</style></head>
<body><main><h1 style="font-size:20px;margin:0">{baslik}</h1>
<video src="video.mp4" controls playsinline></video>
<a href="video.mp4" download>Videoyu indir</a> · <a href="altyazi.srt" download>Altyazıyı indir</a></main></body></html>
""", encoding="utf-8")
        logged_in = subprocess.run([shutil.which("vercel") or "vercel", "whoami"],
                                   capture_output=True).returncode == 0
        if logged_in:
            run(["vercel", "deploy", str(site), "--prod", "--yes"])
        else:
            print("   Vercel girişi yok: geçici yayın (60 dk) yapılıyor; kalıcı yapmak için çıkan 'claim' linkini aç.")
            run(["vercel", "deploy", str(site), "--temporary", "--yes"])
    else:
        print("   Atlandı (yayınlamak için --yayinla ekle)")

    print(f"\n✔ Bitti:\n   Video   : {video}\n   Altyazı : {cikti / (ad + '.srt')}")


if __name__ == "__main__":
    main()
