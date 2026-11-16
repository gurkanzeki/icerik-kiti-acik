# İçerik Kiti

Ses kaydından altyazılı dikey video üreten araç seti:

```
Ses kaydı → Whisper (altyazı) → Remotion (9:16 video) → Vercel (yayın)
```

## Kullanım

```bash
video-yap kayit.m4a --baslik "Videonun başlığı"
```

Seçenekler: `--renk "#1F4FD8"` (vurgu rengi), `--model medium` (daha doğru altyazı), `--dil en`, `--yayinla` (Vercel'de yayınla).
Çıktılar `cikti/<dosya adı>/` klasörüne yazılır.

## Kurulum

- **Windows:** [KURULUM.md](KURULUM.md) — `kur.ps1` her şeyi kurar.
- **Claude Code bulut oturumu:** "İçerik Stüdyosu" ortamı açılışta `bulut-kurulum.sh`'i çalıştırır.

## İçerik

| Yol | Ne |
|---|---|
| `video-yap.py` | Pipeline (Windows, Mac, Linux) |
| `remotion-video/` | Remotion projesi; Shorts şablonu `src/Shorts.tsx` |
| `ayarlar/CLAUDE.md` | Kişisel Claude tercihleri → `~/.claude/CLAUDE.md` |
| `skills/` | 15 Claude Code becerisi (5'i kendi Türkçe skill'lerim) → `~/.claude/skills/` |
| `kur.ps1` / `bulut-kurulum.sh` | Windows / bulut kurulumu |
| `bilgisayar/` | Windows'ta saatlik GitHub ↔ bilgisayar eşitlemesi |
| `stil-kutuphanesi/` | Stil, efekt ve hareket tarifleri |
| `tasarimlar/` | Tasarımlar (ör. Radyal Grid posteri) |
| `videolar/` | Üretilen videolar ve yayın paketleri |
| `NOTLAR.md` | Kaldığımız yer, açık sorunlar |
