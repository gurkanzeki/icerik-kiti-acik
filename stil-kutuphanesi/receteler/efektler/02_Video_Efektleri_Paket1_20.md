<!-- Kaynak: kodla-cizim-stil-kutuphanesi becerisi, satır 337-359 (15 Kasım 2026'da çıkarıldı) -->

## 4f. Video efektleri, 1. paket (Kasım 2026, 20 efekt, test edildi)
Kendi yazımımız (Python + cairo + numpy/cv2), 1080x1920, 30 fps; her efekt `f(ctx, u, t)` (u: efekt içi 0-1). Tanıtım videosunda çalışır halde denendi (kare kontrolü yapıldı, akış izlenmedi). Ses: her efektin olayına kare doğruluğunda bir ses (tepe noktası olaya).
- **Orbit:** kartlar elips yörüngede (rx 330, ry 150) döner; derinlik = sin(açı), boy ve saydamlık derinlikle, arkadan öne sıralı çizim.
- **Chat Takeover:** baloncuklar sol/sağ dönüşümlü, sönümlü yayla girer, hız üstel artar (n = u^1.6), ekran dolunca üstten taşar.
- **Frame Escape:** kart içinde kırpılmış ön plan büyür; yolun yarısında kırpma kalkar, özne çerçeveyi aşar.
- **Snap Zoom:** 0,06 sn'de 1→2,4, 4 alt karelik hareket bulanıklığı, kısa flaş; geri dönüş 0,08 sn.
- **Checklist Pop:** satır kartı yayla açılır, kutu taşmalı büyür, tik iki parçada çizilir.
- **Headline Storm:** 12 manşet şeridi yanlardan dönerek gelir; tohumlu konum, 3 boy, gölgeli düz renk bant.
- **Zoom Portal:** A'da bir noktaya üstel yakınlaş (1→10), o noktadaki dairede B büyür ve ekranı kaplar.
- **Growth Curve:** yalnız gerçek veri; eğri uçtan çizilir, ucu üç halkalı parlar, sayaç eğriyle aynı değeri gösterir.
- **Studio Reveal:** iki ışık konisi yanar, kart sahneye gelir, altında solan yansıma.
- **B-roll Overlay:** ana görüntü yavaş zum; ikinci çekim yuvarlak köşeli kartta sağdan kayar, gölge + beyaz kenar + etiket.
- **Paper Cutout:** düzensiz kesim maskesi + 19 px genişletilmiş beyaz lif kenarı (cv2.dilate), masaya düşer, 8 fps kıpırtı, bant.
- **Dolly Zoom:** arka plan 1,9→0,95 (ya da tersi), özne sabit boy; arka plan karartılır.
- **Magazine Cover:** dev başlık, künye, kapak yazıları, barkod; parçalar sırayla iner.
- **Liquid Glass:** cv2.remap mercek: içte k = 0,42 + 0,58·d^2,2, kenarda %60 beyaz halka, dışta ince gölge, sol üst parlama. Kare başına ~0,33 sn.
- **Zoom Through Cut:** A'da 1→15 yakınlaş, ortada 0,04 sn flaşla kes, B aynı yerden 11→1 açılır.
- **Green Screen:** alfa = 255 − (G − max(R,B) − 40)·4, 3 px yumuşatma, yeşil taşma bastırma; ham ile anahtarlı arasında kayan bölme.
- **Frame Break:** merkezden 9 çatlak, sonra 7×12×2 üçgen merkezden dışa ve yerçekimiyle savrulur.
- **Digital Zoom:** 1-2-4-8x adımlı kırpma + en yakın komşu + tarama çizgisi + nişangâh.
- **Phone Mockup:** telefon alttan gelir, hafif sallanır, ekranda dikey kaydırma akışı.
- **Checklist:** iki sütun 20 madde 0,03u arayla tiklenir, solda dev sayaç.

