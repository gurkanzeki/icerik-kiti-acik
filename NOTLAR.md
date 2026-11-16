# Çalışma Notları

Yeni bir Claude oturumu bu dosyayı okuyarak kaldığımız yeri bilsin diye tutulur.

## Kurulu düzen

- **Ortam:** claude.ai/code → "İçerik Stüdyosu". Açılışta `bulut-kurulum.sh` çalışır: Whisper (CPU), HyperFrames, Vercel CLI, Remotion bağımlılıkları, `skills/` → `~/.claude/skills`, `ayarlar/CLAUDE.md` → `~/.claude/CLAUDE.md`, `video-yap` komutu. Temiz oturumda test edildi, çalışıyor.
- **İzinli ağ adresleri:** openaipublic.azureedge.net (Whisper modelleri), huggingface.co + CDN'leri, remotion.media, api.vercel.com, download.pytorch.org, download-r2.pytorch.org.
- **Kural (kullanıcı isteği):** ne olursa olsun yeni skill, ayar, proje, video her şey `dotlottie`'ye kaydedilip gönderilir. Ayrıntı: `ayarlar/CLAUDE.md` → "Her şey dotlottie'de".
- **Doğrudan main:** işler PR'sız, doğrudan `main`'e gönderilir.
- **Tek depo:** her şey `dotlottie`'de. Stil tarifleri `stil-kutuphanesi/` altına taşındı (eski `still-kut-phanesi` deposu artık kullanılmıyor). Tasarımlar `tasarimlar/`, videolar `videolar/` altında.
- **Windows kurulumu:** `KURULUM.md` + `kur.ps1` (Windows'ta henüz denenmedi).
- **Yayın:** Metricool markası `gurkanzekipost` → YouTube kanalı `UCf-eb-PrvO6sm0kNf2-vEaw` (doğru kanal olduğu kullanıcıyla teyit edildi).

## Şablonlar

- `remotion-video/src/Shorts.tsx` — sesten altyazılı video (`video-yap` kullanır).
- `remotion-video/src/Kisa.tsx` — "Aslında" serisi: seslendirmesiz, yazı animasyonlu 9:16 Shorts. Sahneler `SCENES` dizisinde; `*yıldızlı*` kelimeler turuncu.
- `remotion-video/src/Cikmaz.tsx` — "Gündem" serisi: aynı yazı animasyonu, üstte GÜNDEM, altta kaynak satırı.
- Üretilen videolar: `videolar/` altında, her biri bir klasör (paket.md, kapak, metin). `02-akp-cikmaz` (Gündem #1).

## Açık sorunlar

0. **Bilgisayar eşitlemesi kurulmadı.** `bilgisayar/kur-esitleme.ps1` hazır ama Windows'ta henüz çalıştırılmadı/denenmedi. Kurulunca masaüstüne `dotlottie` kısayolu da konur. Kullanıcı kendisi çalıştırmalı ya da Claude masaüstü uygulamasını güncelleyip Remote Control ile klasörü açarsa bulut oturumu kurabilir.

1. **Vercel token'ı bozuk.** Ortamdaki "Vercel token" ağ sırrı geçersiz; vekil api.vercel.com isteklerinden kimlik başlığını kaldırıyor, bu yüzden hem kalıcı hem `--temporary` yayın "missing an authentication token" hatası veriyor. Çözüm: ortam ayarlarından sırrı silmek; kalıcı yayın için yeni token'ı güvenli formla yeniden kaydetmek.
2. **Aslında #1 YouTube'a yüklenmedi.** Video ve paket `videolar/01-mayis-sinegi/` içinde. Metricool ile yüklemek için videonun herkese açık bir linki gerekir (Drive'da "bağlantıya sahip olan herkes" ya da Vercel geçici yayın); yoksa YouTube Studio'dan elle yüklenir.
3. **IC-Light** (fotoğraf yeniden ışıklandırma) yalnızca ilk oturumda denendi, kitte yok; GPU olmadan pratik değil.

## Kullanıcı tercihleri (özet)

Türkçe, numaralı ve kısa anlatım; cevap sonunda "📚 Günün kelimesi"; belirsiz kısa mesajlarda tahmin yerine seçenek sun; giriş/ödeme/hesap kararlarını kullanıcıya bırak. Ayrıntı: `ayarlar/CLAUDE.md`.
