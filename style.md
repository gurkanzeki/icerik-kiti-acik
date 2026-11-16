# Reel stilim

Bu dosya her reel'in başlangıç noktasıdır. İstediğin zaman düzenleyebilir ya da Claude'a "style.md'de şunu değiştir" diyebilirsin.

## Renkler: mavi-turuncu paleti
Palet sistemine göre (`skills/palet-sistemi/SKILL.md`). Kodda yalnız bu değişkenler kullanılır.

| Rol | Değişken | Kod | Nerede |
|---|---|---|---|
| Zemin | --bg | #21232E | Sahnenin arka planı, tek düz renk |
| Yüzey | --surface | #1F2A47 | Kart, panel; kenarı ana rengin %40'ı |
| Ana | --main | #105BFF | Çizgiler, çubuklar, ikonlar, diyagramın gövdesi |
| Ana 2 | --main-2 | #0A3FD1 | İkinci seri, ikincil dolgu |
| Vurgu | --accent | #FE8500 | Her sahnede yalnız BİR öğe: asıl şey |
| Açık vurgu | --accent-soft | #FFC27A | Altyazıda o an söylenen kelime, vurgulu yazı |
| Vurgu üstü yazı | --on-accent | #21232E | Turuncu dolgunun üstündeki yazı |
| Ana üstü yazı | --on-main | #FFFFFF | Mavi dolgunun üstündeki yazı |
| Yazı | | #FFFFFF | Başlık beyaz, gövde %70, ikincil %50 |

Bu palette ana mavi düz yazı olarak kullanılmaz; vurgulu yazı açık vurgu ya da beyazdır.

## Yazı tipi
- **Inter**, yerel dosyadan (`public/fonts/inter-*.woff2`, `src/ortak/tema.ts`): render internete bağlı kalmaz. Kalınlık 900 başlıkta, 800 altyazıda.
- Sayılar sabit genişlikte (`font-variant-numeric: tabular-nums`) ki sayarken kaymasın.
- Türkçe harfler (ş, ğ, ı, İ, ö, ü, ç) için `latin` ve `latin-ext` dosyalarının ikisi de yüklenir.

## Ses
- **ElevenLabs, sesim: Zeki** (klon ses, `voice_id: aqcoImIPJy1tEHGRkabD`), model `eleven_multilingual_v2`, dil Türkçe.
- Ses, sohbete bağlı **ElevenLabs aracıyla** üretilir (`creative_generate_speech`); API anahtarı gerekmez. Araç iki kayıt üretir; Claude daha akıcı olanı seçer ve bir cümleyle neden seçtiğini söyler. Dosya `elevenlabsusercontent.com`'dan indirilir.
- Bu yol kelime zamanı vermez. Bu yüzden zamanlar yerel sesteki gibi Remotion'ın Whisper aracıyla çıkar: `node scripts/kelime-zamanlari.mjs <ses> <metin.txt> <kelimeler.json> tr`. Metin esastır: kelimeler ve yazımları metinden, yalnız zamanlar Whisper'dan.
- Whisper bir kez kurulur: `node scripts/whisper-kur.mjs` (çok dilli `medium` modeli, ~1.5 GB).
- İleride çalışan bir API anahtarı `.env`'e girilirse SKILL.md'deki "with timestamps" yolu kullanılabilir.

## Dil
- Reel'ler Türkçe. Altyazı satırları Türkçenin okunuşuna göre bölünür: anlam öbeklerini (isim + sıfatı, fiil + nesnesi, sayı + birimi) ayırma, satır başına 2–4 kelime; bir sayı ve birimi ("üç yüz bin kilometreyle", "sekiz dakika yirmi saniye") tek kelime sayılır ve bölünmez.

## Kontrol sayıları
- **Hiçbir şey 1 saniyeden uzun durgun kalmaz.**
- **Aynı anda en fazla 2 şey hareket eder.**

## Ortak parçalar
- Renkler, yazı tipi, hareket eğrileri: `src/ortak/tema.ts`. Altyazı: `src/ortak/Altyazi.tsx` (satırlar kelime sayısıyla verilir).
- Her reel `src/Root.tsx`'e bir Composition olarak eklenir.

## Klasörler
- Bitmiş reel'ler: `reels/<kısa-ad>/<kısa-ad>.mp4` (yanında `metin.txt`, `plan.md`, `storyboard.png`, `kelimeler.json`).
- Logo ve görseller: `brand/`.
- Remotion kodu: `src/reels/<kısa-ad>/`, ses `public/reels/<kısa-ad>/`.
