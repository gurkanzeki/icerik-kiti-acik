<!-- Kaynak: kodla-cizim-stil-kutuphanesi becerisi, satır 360-385 (15 Kasım 2026'da çıkarıldı) -->

## 4g. Video efektleri, 2. paket (Kasım 2026, 21 efekt, test edildi)
- **Live cursor:** iki etiketli imleç (Figma gibi); biri tıklayıp (halka) kartı sürükler, öteki izler.
- **Clone row:** özne beş kez, gecikmeli yayla belirir, altında renkli diskler, fazlı sallanma.
- **Day dial:** 7 günlük kadran döner, hedef günde kısa yaylanarak durur; ortada dev tarih.
- **Predict keys:** yazılırken klavyede basan tuş yanar; sonda gri tahmin metni TAB ile kabul edilir.
- **Orbit ring:** harfler öznenin etrafında elips halkada döner; arkadaki harfler özneden önce, öndekiler sonra çizilir (örtüşme).
- **Code body:** özne alfa maskesi içinde 18×30 px hücrelerde dönen kod karakterleri; üstten aşağı tarama çizgisiyle dönüşür.
- **Post wall:** gönderi kartları duvarı çapraz kayar, seçilen kart karartılmış duvarın önüne büyür.
- **Letter dive:** dev harf (O); iç boşluğu elipsle OPERATOR_CLEAR ile delinir, kamera içinden geçer (z 1→41).
- **Comment drop:** yorumlar yerçekimiyle düşer, sekip yığılır; emoji kullanma (yazı tipinde yok).
- **Layer explode:** zemin / metin / özne katmanları eğik izometrik düzlemde ayrılır, etiketli.
- **Sketch words:** kelimeler el yazısıyla soldan açılır, kırmızı alt çizgi ve özneye ok; kelimeler öznenin dışında kalsın.
- **Blade slice:** çapraz bıçak parlaması, görüntü kesik doğrusundan iki parçaya ayrılıp kayar, alttaki sahne açılır.
- **Head stack:** özneler yukarıdan düşüp üst üste dizilir, iner inmez squash.
- **Rack focus:** önceden hazırlanmış 4 bulanıklık düzeyi (0/6/14/26) arasında karışım; odak önden arkaya geçer.
- **Banknote:** gülloş halkaları, çerçeve, değer yazısı, portre yerine özne; ışık süpürmesi.
- **Voice note:** gerçek ses dosyasının 48 çubukluk dalgası; oynatıldıkça çubuklar açılır, ses aynı anda çalar.
- **Impact frame:** vuruşta kare donar, iki tona eşiklenir, 2 karede bir tersine döner, radyal hız çizgileri, ilk 6 karede sarsıntı.
- **Press front:** gazete sayfası baskı silindirinin altından çıkar (kayan çizgili silindir).
- **Paper tear:** tohumlu yırtık çizgi; üst ve alt yarı zıt yöne dönerek kalkar, beyaz lif kenarı, alttaki sahne açılır.
- **Blow away:** 12 px karolar, sağdan sola dalga halinde başlayan gecikmeyle küçülerek savrulur (numpy ile).

**Nesneyi arka plandan ayırma:** rembg (`isnet-general-use`, 179 MB model, GitHub'dan iner) ayrı ortamda; 960 px fotoğraf ~35 sn. Kesik nesneyi alfa kutusuna göre kırp, 1080x1920 saydam katmana yerleştir; fotoğraf kenarından kesilmiş tarafı 180 px alfa geçişiyle soldür. Serbest lisanslı fotoğraf için Openverse görsel aramasında `source=stocksnap,rawpixel` (Flickr ve Wikimedia bu çalışma alanını hız sınırına takıyor).

Uygulama dersleri: cairo'da grup çizdikten sonra kaynak (source) o grupta kalır; sonraki katmandan önce `set_source_rgb` ile sıfırla. Ölçek 0 olunca matris hatası verir: en az 0,02. Her karede değişen tam ekran gren videoyu 10 kat şişirir: sabit gren kullan.

