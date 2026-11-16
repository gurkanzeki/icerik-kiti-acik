# Stil Reçeteleri — Kodla Çizim Kütüphanesi

Kayıtlı ayarlardan derlendi (15 Kasım 2026). Tam talimatlar hesaptaki
`kodla-cizim-stil-kutuphanesi` ve `karisik-stil-video` becerilerinde; yedekleri `02 Skill'ler` klasöründe.

## Ortak iskelet (Boğaz döngü şablonu)
- Tuval 1080x1920 dikey, 6 saniyelik kusursuz döngü, T = 0..1 döngü zamanı
- Bütün hareketler sin(2π·k·T) (k tam sayı) ya da tam periyot kaydırma
- Kamera salınımı ±55 px × derinlik; en az 3 katmanlı paralaks
- Ufuk y ≈ 985
- Galata x=290 · cami x=800 · Kız Kulesi x=610 / y=1168 · vapur x=520 / y=1545
- 15 dalga sırası (uzakta küçük ve yavaş, yakında büyük ve hızlı)
- 8 duman topu faz kaydırmalı · 6 martı kapalı yörüngede
- Görsel, video ya da harici dosya yok; her şey kodla çizilir

## 8 çekirdek stil
| Stil | Reçete |
|---|---|
| Osmanlı Minyatürü | altın gök; lapis, vermilyon, malakit; ince mürekkep kontur; Çin bulutu ve sarmal kıvrım; tezhip bordür; kâğıt dokusu; laleler |
| İznik Çinisi | beyaz sır üstü kobalt, firuze, mercan kırmızı, zümrüt; çintemani; şemse güneş; 120 px karo derzi + sır parlaması |
| Karagöz Perdesi | kandil titremeli bez perde; yarı saydam deri kukla (multiply); ışık delikleri; çubuklar; sağa-sola kayan dalga şeritleri; bordo perde |
| Vitray | kalın kurşun çizgi; mücevher renkli cam; güneş etrafında halka-dilim gök; sivri kemer; gezen ışık |
| Neon Gece | lacivert gece; içi boş neon tüp çizgi + bloom; hilal-yıldız; suda yansıma çizgileri; kırpışma |
| Kâğıt Kesme | konturlu değil, gölgeli düz kâğıt katmanları; gün batımı halkaları; ipte asılı bulutlar; beyaz paspartu |
| Retro Afiş | 6 düz renk (krem, turuncu, hardal, petrol, lacivert, kırmızı); dönen güneş ışınları; yarım ton nokta; "İSTANBUL" yazılı bant |
| Linol Baskı | siyah + kâğıt + kırmızı + petrol (4 mürekkep); oyma çizgileri; saniyede 12 kare adımlı hareket; çizgi titremesi; mürekkep boşlukları |

## Sonradan eklenen 16 stil
Ebru · Kündekari · Kilim · Hat ve Tuğra · Sedef Kakma · Keçe ve Yazma · Kum Animasyonu ·
Cam Üstü Boya · İğne Perdesi · Kil Boyama · Truchet · Reaksiyon-Difüzyon ·
Daire Paketleme ve L-sistem · Moiré ve Harmonograf · Kanaviçe ve Boncuk · Flip-dot ve Nixie

## Taranması istenen kaynaklar
Lemo-Opuscar, onetake, collage b-roll, animation base, HyperFrames (HeyGen) depolarındaki stiller.

## Efektler ve hareket desenleri
41 video efekti (1. paket 20, 2. paket 21) ve 38 hareket deseninin tarifleri bu klasördeki
`efektler/` dosyalarında: 01 hareket desenleri, 02-03 efekt paketleri, 04 tam stil kataloğu,
05 ek teknikler, 06 Claude animasyonları (50 hareket kalıbı, 20'si 3B), 00 kurallar ve kontrol listesi. Kaynak: `kodla-cizim-stil-kutuphanesi` becerisi.
Bunlar tarif (reçete); her efekt `f(ctx, u, t)` saf fonksiyon olarak bu tariften kodlanır.
