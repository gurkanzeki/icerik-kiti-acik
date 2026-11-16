<!-- Kaynak: kodla-cizim-stil-kutuphanesi becerisi, satır 30-177 (15 Kasım 2026'da çıkarıldı) -->

## 4. Stil reçeteleri
1. **Osmanlı Minyatürü** — Altın varak gök (#dcb55a→#f3e0ad) + parıldayan zerefşan; lapis #1f3f8f, vermilyon #c8381e, malakit #3e7d5a, krem #f6ecd2; 2–3px mürekkep kontur #2a1c14; Çin bulutu (loblu + sarmal), dalgada pul kambur + sarmal köpük; pastel loblu tepeler, renkli damlı evler, selviler; önde laleler; lacivert-altın tezhip bordür, martılar çerçevenin üstünden uçar; kâğıt dokusu (multiply) + yaşlı kenar.
2. **İznik Çinisi** — Beyaz sır #fbfaf2 zemin; kobalt #1b3fa0, firuze #22a0a8, mercan #c8402a, zümrüt #2e9c62, kontur #12235e; gökte çintemani sıraları ve dalgalı bulut şeridi, güneş yerine dönen şemse; dalgalar kobalt/beyaz/firuze dönüşümlü; duman çintemani topu; laleler; üstüne 120px karo ızgarası (derz, pah, çatlak), karo parıltıları ve çapraz sır parlaması süpürmesi.
3. **Karagöz Perdesi** — Sıcak radyal ışıklı bez (#fff6d6→#8a4c18), kandil titremesi `0.5·S5+0.3·S7+0.2·S11`, dokuma dokusu; kuklalar `multiply` ile yarı saydam deri renkleri + koyu kahve kontur; pencereler ışık deliği (#ffedb8); tepelerde delik dizileri; kukla çubukları (`mark`); dalgalar kaymaz, sıra sıra sağa-sola sallanır (`sway`); vapur daha çok yalpalar (`rock 1.8`); bordo perde, saçak ve püsküller, alt tezgâh.
4. **Vitray** — Her parça düz mücevher rengi + 3–7px kurşun #14100e; gök güneş merkezli 6 halka × 16 dilim (sarı→turuncu→gül→mor→lacivert), dilimler döngüde bir dilim döner; dalga kamburları dikey kurşunla hücrelere bölünür; sivri kemerli taş çerçeve (clip); cam dokusu `overlay`, gezen 3 ışık lekesi `lighter`, kenar karartma.
5. **Neon Gece** — Zemin #070818, gök lacivert→mor; her şekil koyu dolgu + üç geçişli tüp çizgi (geniş soluk, renk, beyaz çekirdek); camgöbeği #3df5ff, pembe #ff3dbb, mor #b56bff, sarı #ffe14a; hilal + dönen yıldız, kırpışan yıldızlar, tepede titreşen pencere ışıkları; dalga çizgileri kesik tüp; suda yansıma çizgileri; çift neon çerçeve (biri kırpışır); bloom = kareyi 1/4 ve 1/8 küçültüp `lighter` ile geri bas.
6. **Kâğıt Kesme** — Kontur yok; her katman düz renk + gölge (blur 8–14, kaydırma 2–6); güneş etrafında tırtıklı 7 kâğıt halka (#3b2f6b→#f9cf7a); ipte asılı beyaz bulutlar; dalgalar #5fb8b8→#143a5e, gölge yukarı; ön planda sallanan yapraklar; gölgeli beyaz paspartu; lif dokusu (multiply).
7. **Retro Afiş** — 6 düz renk: krem #f6e7c6, turuncu #e8743b, hardal #f0b440, petrol #1f7a7a, lacivert #16324a, kırmızı #d9482f; kontur yok, tek taraflı gölge rolü (`shade`); ufukta dev güneş + 24 dönen ışın; deco hap bulutlar; suda güneş yansıma çubukları; altta lacivert bant, aralıklı büyük harf başlık (yazı kodla, sistem fontu); krem kenarlık; yarım ton nokta + gren (multiply).
8. **Linol Baskı** — 4 mürekkep: siyah #1b1815, kâğıt #efe6d2, kırmızı #cf4a2c, petrol #2f6f7a; kalın siyah kontur; gökte güneşi saran, dışa doğru akan oyma çentikleri; siyah tepelerde kesik kâğıt rengi oyma eğrileri; hareket saniyede 12 kare adımlı (`T=floor(72T)/72`), çizgi titremesi 4 karelik döngü; mürekkep boşluğu dokusu 4 varyant dönüşümlü; elle çizilmiş titrek çerçeve.

## 4b. Genişletilmiş katalog (Kasım 2026)
Kaynak: Lemo-Opuscar (99 stil), gbro-collage-broll, Claude Animation Base, onetake, HyperFrames. Reçeteler kendi sözümüzle özettir; bir stilin tam derinliği gerekirse `lemomo-ai/lemo-opuscar` içindeki `styles/<slug>/STYLE.md` okunur.

Kullanım kuralları:
- Her stil bölüm 3'teki kancalarla uygulanır; bölüm 1'in döngü kuralı geçerlidir.
- Adımlı hareket 6 sn'lik döngüde: 8 fps → `floor(48T)/48`, 10 fps → 60, 12 fps → 72, 15 fps → 90, 16 fps → 96. Kural: karakter adımlı, kamera/ışık akıcı (adımlı kamera titreme gibi okunur).
- **[G]** = aslı gerçek görüntü/fotoğraf ister; kodla çizimde yalnız kurgu ve ambalaj dili alınır. **[3B]** = aslı 3B sahne; bizde izometri ya da katmanla taklit edilir.
- Lisans: Lemo belgeleri CC BY-NC + kendi filmini yapmak için uyarlama izni (reçeteler kendi işimizde serbest, başkasına dağıtma/satma yok). onetake yalnız ticari olmayan kullanım. gbro ve Animation Base MIT, HyperFrames Apache-2.0. Clawd karakteri Anthropic'indir, kullanılmaz.

### A. Gelenek ve zanaat
- **Mürekkep Yıkama** (ink-wash) — pirinç kâğıdı #F2ECDE, beş ton mürekkep + tek kırmızı mühür #B02E22; kontur yok, yüklü fırça ve uçan beyaz; karenin %60–80'i boş kâğıt; figür 12 fps; şeyler boyanarak belirir, geçiş mürekkep açılması.
- **Gölge Oyunu** (shadow-puppet) — Karagöz'ün (#3) akrabası: arkadan kandilli pamuk perde, oyma yarı saydam boyalı deri, 3–5 boya + ham deri + mürekkep; kukla 24 fps sürekli, el titremesi; ateş/su parçaları 12 fps.
- **Ukiyo-e** — washi kâğıt, ince çift bordür, 6–9 düz pigment bloğu + siyah anahtar çizgi, bokashi gök, dikey başlık kartuşu, kırmızı mühür; kare çoğunlukla durur, 1–2 küçük hareket; figür 8 fps.
- **Kırmızı Kâğıt Oyma** (papercut-red) — Çin kırmızısı #D2201F; boya, gradyan, kontur yok, ayrıntı yalnız kesikle; derinlik bir ton farkla; perçinli eklem kuklalar 12 fps.
- **Kâğıt Fener Kutusu** (paper-lantern) — Kâğıt Kesme'nin (#6) arkadan aydınlatmalı hali: 6–9 katman, arka parlak-yarı saydam (#FFB862), ön koyu-opak (#0A1330); pencere ve ay delikten yanar; katmanlar çubuktaki kâğıt gibi kayar/döner, squash yok.
- **Altın Tezhip** (gilded-illumination) — Minyatür'ün (#1) Batı akrabası: lapis #22379A ya da altın zemin, vermilyon #C8321F, bakır yeşili #3F8F7A, gül #D97A8A; kalın mürekkep kontur, üstübeç noktalar, kare kare serilen altın varak; şekiller küçük yayla belirir, altın önce serilir sonra parlar.
- **Katedral Vitrayı** (stained-glass) — Vitray'ın (#4) karanlık taş salondan görünen hali: cam yalnız güneş arkasındayken parlar, yüzler kahverengi grisaille; iki ana renk (kobalt + yakut); figür 8 fps, ışık akıcı.

### B. Baskı
- **Bakır Gravür** (engraving) — kâğıt #F1E8D2, mürekkep #1C1510; ton dolguyla değil çizgi sıklığıyla (paralel → çapraz tarama → nokta); renk yalnız saydam toprak yıkaması; animasyon oyma sırasıdır: kontur → tarama → çapraz → koyular.
- **Yarım Ton Dosya** (halftone-dossier) — krem arşiv kâğıdı, tek koyu mürekkep + 4–5 düz spot renk; gölge yarım ton nokta, dev başlık kayık gölgeli, çarpan lastik damgalar; her şey taşmalı girer (0.3–0.45 sn), çizgi kaynaması ~10 fps.
- **Pop Art** — 4 kalıp: kırmızı #E4232B, sarı #FFD21F, mavi #1E62B0, siyah #141414, kâğıt #F8F2E2; ara tonlar kâğıda sabit Ben-Day noktası, üst baskıyla turuncu/yeşil/mor; kalıplar tam oturmaz; damga gibi (1.1→1) ya da kalıp kalıp basılır.
- **Kazıma Tahta Uzun Plan** (printed-long-take) [3B] — mürekkep #16171B, kâğıt #EDE5CD, tek kırmızı #C4332B, güneş için sarı #DFA443; gri = çizgi yoğunluğu; tek kesintisiz kamera; baskı titremesi 12 Hz.
- **Risograf** — sıcak kâğıt #F4EEE2 üstüne 2–3 yarı saydam spot mürekkep (mavi #0078BF, pembe #FF48B0, sarı #FFE800); yarım ton, mürekkep greni; kalıp kayıklığı her karede değil çekim başına sabit; karakter 12 fps.
- **Serigrafi Gezi Afişi** (silkscreen-poster) — Retro Afiş'in (#7) akrabası: 4–6 opak mürekkep, gradyan yerine basamaklı bant, kayık yerde ince kâğıt aralığı; renkler rakle çekişiyle doğrusal hızda tek tek basılır; altta bilgi bandı.
- **Eski Gravür Kolajı** (vintage-collage) [G: kamu malı baskılar] — eski kâğıt #ECDFC2, sıcak siyah, aşı kırmızı #C65F3A, petrol #2F7F7A, hardal #E1AB3B; beyaz paylı kesikler yırtık düz renk kâğıtlar üstünde; parçalar 12 fps, kayarak girip sallanarak oturur.
- **Ağaç Baskı** (woodcut) — Linol'ün (#8) akrabası: siyah tahtadır, beyaz bıçağın aldığıdır; en çok tek renk kalıbı, yalnız "yanan" şey için; tarama uzvun yerel uzayında durur (kaynamaz); karakter 12 fps.

### C. Resim ve illüstrasyon
- **Pastel Boya Kitabı** (crayon-book) — kâğıt #F4EFE3, bir düzine pastel, kontur asla siyah değil (çivit/kahve/mürdüm); renk çizgiden taşar; beyaz mum direnci + tek suluboya yıkama gizleneni açar; çizim 12 fps kaynar.
- **Suluboya Fırça** (watercolor) — pamuk kâğıt #F3E2C8; her şey tek tek yarı saydam fırça şeridi, kuru fırça boşlukları; beyaz = boyanmamış kâğıt, koyu = daha çok kat; 3–5 renk + mürekkep; ana hareket boyanarak belirme, silme kâğıt rengi sisle.
- **Yağlı Boya İmpasto** — spatula darbeleri: keskin kenarlı eğik düzlemler, sırt ve dudak, yandan vuran ışık; gradyan darbe basamaklarıyla; duran boya durur, yalnız hikâyenin oynattığı oynar.
- **Şehir Eskizi** (urban-sketch) — sepya ince uç: titrek, köşede taşan, kapanmayan çizgi + çizgiden kayık gevşek suluboya; gölgeler ortak soğuk mora; figürler 12 fps kaynar, sayfa kaynamaz.
- **Renkli Kalem Bilim Levhası** (colored-pencil) [3B kesit] — dişli kâğıt #F8F4EA; dört kat kalem, titrek grafit kontur; toprak kesiti (#4D3018→#DCB990), ot #8DAA45, gök #B3D4E6; taramalar çizdikleri yüzeye yapışık kalır.

### D. Eskiz ve tahta
- **Tek Çizgi** (one-line) — sıcak beyaz #F4EFE4 üstünde hiç kalkmayan tek mürekkep çizgisi #1D1A17; sahneler kesilmez, çizgi biçim değiştirir; sürekli akış; en çok bir vurgu, bir kez.
- **Beyaz Tahta** (whiteboard) — parlak tahta, sırayla yazılan el yazısı, el görünmez; en çok 3 kalem (koyu #23262C, mavi #2A5CB3, vurgu #D97757), her rengin anlamı sabit; tahta bir haritadır, kamera bölgeler arasında gezer; darbe yavaş-hızlı-yavaş.
- **Kara Tahta** (chalkboard) — temiz koyu mürekkep yeşili, ahşap çerçeve; tebeşir gerçek sırayla kendi yazar; beyaz yapı, tek vurgu tebeşiri; büyük harfte darbe ≈0.1 sn.
- **Görsel Not** (sketchnote) — noktalı kâğıt #FBFAF6, siyah ince uç #1E1E22, hacim için gri marker, tek sarı #F5AA00 "asıl şey" için; her şey kalem hızında çizilir; çizgi titremesi 12 fps.
- **Çöp Adam Anlatım** (stick-explainer) — kâğıt #F3F0EA, çizgi #24242C, tek vurgu #EB4A2A; yuvarlak baş + eş kalınlıkta eğri çizgiler, yüz yok; insanlar diyagramın kendisidir, tutulan el tek sürekli çizgi; pozlar sönümlü yayla geçer, ön kol geç gelir.
- **Tablet Eskiz** (ipad-sketch) — krem tuval #F3EADB, grafit #43362E; önce grenli kalem çizgisi, sonra çizgiden kayık ve tam dolmayan düz renk blokları; mercan #DC6A4C, sarı #F1C04F; tek sayfa dolar, sonunda bütün görünür.
- **Marker Kâğıt** (marker-paper) — mat beyaz #FAF9F5, top uçlu siyah marker (6–10px sabit kalınlık); mavi #2456D6 = verilen, kırmızı #E23B2E = aranan; çizim 12 fps, üç kaynama karesi.

### E. Çizgi film
- **80'ler Cel Anime** (cel-anime-80s) — airbrush fon + düz iki tonlu cel, arkadan neon ışık; karakter 12 fps, mimik 8 fps; geç 80'ler video dokusu; kahramana tek vurgu rengi.
- **Lastik Hortum 1930** (rubber-hose) — siyah-beyaz, ~6 gri; eş kalınlıkta dirseksiz uzuvlar, beyaz eldiven, pasta göz; her nesne canlıdır ve caza sallanır; karakter 12 fps.
- **Yüzyıl Ortası Çizgi Film** (midcentury-toon) — sıcak kâğıt, kapanmayan ince çizgi, her dolgu çizgisinden birkaç px kayık; gövde durur, eller çalışır; soyut renk bloğu odalar; poz 12 fps.
- **Manga Panelleri** (manga-panels) — kâğıt #F3F0E8, mürekkep #121212, tek spot #F03C1E; gri yalnız tram noktası; paneller vuruşta açılır (0.1 sn silme), ses efekti harf harf çarpar; hız çizgileri 8–12 fps kaynar.
- **Bilimkurgu Sitcom** (scifi-toon) — kalın kaynayan kontur, düz dolgu + sert kenarlı gölge, iri beyaz göz küçük gözbebeği; dünya başına 3–5 renklik ayrı palet; karakter 12 fps.
- **Çizgi Roman Tarih** (comic-history) — harita kâğıdı #F1E8D2 üstünde pirinç perçinli kâğıt kukla ülkeler; toprak değişimi kesme/yapıştırma/yırtma ile; iki kahraman iki renk (#6E93D6, #5D6672); kukla 12 fps, yay taşmalı.

### F. Grafik ve tipografi
- **Art Deco** — sıcak siyah, altın çizgi, fildişi + kahramana tek doygun vurgu; airbrush sert kenarlı hacim, tek dikey eksen; her şey merkezden açılır, ışık ampul ampul yanar.
- **Bauhaus Şekilleri** (bauhaus-shapes) — mat kâğıt #F8F7F3 üstünde opak daire/kare/üçgen; alan = miktar (iki kat = yarıçap×√2); role göre 6 renk; gerçek yuvarlanma, büyüme halka halka.
- **İsviçre Hareketli Grafik** (swiss-motion) — modüler ızgara, tek yazı tipi, kâğıt #EAE9E5 + siyah #111111 + tek sinyal rengi #E30613; iki eğri: hassas ease ve doğrusal; taşma ve yay yok.
- **Piktogram Hareket** (pictogram-motion) — kare ızgaralı çekirdek grafik (daire, yarım disk, desenli hücre; sıralar kayar) + geometrik piktogramlar; 5 renk × 5 ton + koyu nötr; her poz tam vuruşta.
- **Siluet Ritim** (silhouette-rhythm) — doygun gün batımına karşı saf siyah siluet #090307 (gök #FFB347→#FC4D2B→#E0245C→#380A52); her vuruşta poz (0.13 sn, hafif taşma), ana vuruşta her şey donar yalnız gök akar; su ikinci tuval.
- **60'lar Casus Jeneriği** (spy-titles) — 4 mürekkep: siyah #1B1714, krem #EFE4C9, sıcak #D23A22, ikincil #E2A52A; el kesimi kenar, profil siluet, yazılardan kurulan dekor; her nefesli vuruşu bir kesme; kukla 12 fps.
- **Yazı Flaş Kesmeleri** (text-flash-cuts) — kırmızı #D4162B, siyah #0A0A0C, beyaz #F2EFE8; tam ekran ağır yazı kartları 2–9 kare, mimari simgesel geometri; kurgu animasyonun kendisi, 150 BPM ızgara.
- **Ölçek Zum Anlatımı** (flat-space-explainer) — gece mavisi #1D2052, düz opak şekiller + tek gölge basamağı, parıltı iki sert halka; mavi #4D7CFE, nane #3FD8AE, mercan #FF6B5E; gerçek ölçek, rehber küçük karakter.

### G. Işık ve çizgi
- **Neon Tüpler** (neon-tubes) — Neon Gece'nin (#5) gerçekçi hali: yağmurlu sokak, tüp = gaz sütunu + cam çeper + üst parlaklık + hale; sönük tüp de görünür; tutuşma: tam 50 ms, karanlık 70 ms, %70, karanlık, tam; birikintide yansıma; #1FF2D9, #FF3D9E, #FF2A08, #3D75FF.
- **Devre Kartı** (circuit-board) — tepeden: yeşil maske üç ton (#05190F, #1C6A44, #4AA977), altın ped #D9B25B, beyaz serigrafi; yollar 0/45/90°, perspektif yok; akan şey yollarda ilerleyen ışık.
- **Ateşböceği Noktacılığı** (firefly-pointillism) — karenin yarısından fazlası siyah; her şey aynı tür nefes alan ışık noktası (#F5ECC6, #EEF5D6); noktalar yok olmaz, dağılır ve başka yerde toplanır; yollar hep eğri.
- **Akış Alanı** (flow-field) — sıcak kâğıt #ECE0C4 üstüne binlerce kesişmeyen ince akım çizgisi #262C38, üstlerinde yerel hızla koşan koyu darbeler; eşik aşımı için tek sıcak renk (#C46C26→#C83A24); çizgiler asla titreşmez.
- **Osiloskop Matematik** (oscilloscope-math) — yakın siyah #010402, fosfor yeşili #4DFF88, ızgara #0B2412, ışın ucu beyaz-sıcak #E6FFEC, ölçüm kehribar #FFB547; çizilen her şey gerçek matematik; yeni öğe 0.45 sn'de büyür.

### H. Ekran ve arayüz
- **Koyu Teknoloji Sunumu** (dark-keynote) — yakın siyah gradyan, kıl ince ızgara, soğuk nötr merdiven + tek marka vurgusu (#B7F34A / #8B7CFF / #FF7A1A); kahraman arayüz; her şey ızgaraya ve vuruşa oturur, dev tek rakam.
- **Masaüstü Uçuşu** (desktop-flythrough) [3B] — güneşli masada noktalı mat #E7E4F3, uygulama ekranları kâğıt kart, piksel karakterler işi karttan karta taşır; tek kesintisiz kamera; vurgu #6B4CE6, #F39A5B; zıplama squash-stretch.
- **Hologram HUD** (hologram-hud) — yakın siyah sahnede ışıktan tel kafes, tarama düzlemi modeli büyütür; hedef kutusu kilitlenir (0.2 sn, 3 kare beyaz), sayılar çöp gliften gerçeğe döner; tek soğuk renk + tek sıcak vurgu.
- **Maskotlu Ekran Kaydı** (living-screencast) — arayüz 2B yeniden çizilir, içinde düşük çözünürlüklü özgün bir maskot yazılımın yaptığını oynar; maskot kendi piksel ızgarasına adımlı.
- **1-bit Dither** (one-bit-dither) [3B] — tam iki renk (#16161A, #E9E6D6), gri ve kenar yumuşatma yok; ton = yüzeye sabit nokta yoğunluğu; kamera yumuşak, hızlı yanal pan yok.
- **Hesap Tablosu Filmi** (spreadsheet) — tek tablo penceresi; hücre (64×22) pikseldir, koşullu biçim resmi boyar, formül çubuğu konuşur; kamera zum ve kaydırma; hücreler ızgarada zıplar; #B8F25A başarı, #E8382D hata.

### I. Çizgi diyagram
- **Montaj Hattı Diyagramı** (assembly-line-diagram) — bir siluet (gövde, makine, bina) bebek evi gibi kesilir, her oda bir istasyon; kâğıt #F2ECE0, iç zemin #1D2030, spot #E04A2F #F3B23A #2E8D87; bant hiç durmaz, istasyon yük varınca çalışır.
- **Mavi Kopya** (blueprint) — Prusya mavisi (#18336B–#2A58A6) üstünde beyaz teknik çizgi #E7F0F9, çizim sırasıyla çizilir; mavi dışı tek renk yalnız bir kez (damga); bölüm arası vuruşta sert kesme.
- **Çizgisel Kesit** (hardcore-info) [3B] — ızgaralı sıcak beyaz kâğıt #FBFBF9, siyah kontur #141414, hacim için açık gri, tek vurgu #FF4D1A; nesne döner, açılır, kesilir; numaralı kılavuz çizgiler; kaynama yok.
- **Kurulum Kılavuzu** (instruction-manual) — kırık beyaz kâğıt #F4F1EA, siyah çizgi #1E1D1B, gerçek izometri; beyaz parçalar, yüzsüz insanlar, sarı vurgu #F7D35A; önce ok çizilir sonra hareket; parça noktalı kılavuz boyunca düz uçar.
- **İzometrik İnfografik** (iso-infographic) — düz gerçek izometri, katılarda kontur yok (yüz başına üç ton), soluk zemin + 5–7 renk, mürekkep #231A2C; hiçbir şey önünden bir çizgi gitmeden hareket etmez.
- **Kalem Plotter** (pen-plotter) — krem kâğıt #F1ECDF; her iz bir kalem darbesi (dolgu, gradyan, font yok; ton = tarama); mürekkepler #16161C, #763C1A, #CC221A; kalem her harekete yumuşak girer.
- **Renk Kodlu Mekanizma** (precise-mechanism) [3B] — kırık beyaz #F3F0EA, nötr #DDD8CF, sistem başına düz renk (#E6B94F, #79B09F, #8A97D4), anlatılan parça tek vurgu #E8472A; makine gerçek oranlarla, tek ana saatle çalışır.
- **Patlatılmış Söküm** (teardown) [3B] — koyu nötr sahne #0D0E10, ürün en parlak şey; katmanlar tek eksende 0.15–0.2 sn arayla kalkar; vurgu #FF6B3D.

### J. 3B ve minyatür [hepsi 3B]
- **Yapı Taşı** (brick-toy) — gerçek masa üstünde makro çekim, stop-motion; oyuncak ana renkler (#C91A09, #0055BF, #F2CD37, #237841); taşlar 12 fps.
- **Pastel Boya Dünyası** (crayon-world) — 3B dünya saniyede 12 kez mum boyayla yeniden çizilir; bir düzine pastel, siyah kontur yok; duran şey kaynamaz.
- **Cam Ürün** (glass-product) — sonsuz siyah stüdyo, şerit ışık süpürmeleri, saydam/buzlu cam, renk ayrışması; kamera hep süzülür; patlatılmış görünüm vuruşta kapanır.
- **İzometrik İnsan Sahnesi** (isometric-picture-book) — tek mekân tam kadraj düz renk izometri (#F1E8D8, mürekkep #2A2E29, kural vurgusu #D0573A); arkadan görülen yüzsüz küçük insanlar kuralı sırayla uygular; yazı zemine iner.
- **Low-poly Ada** (lowpoly-island) — ortografik izometri, düz gölgeli yüzeyler, pastel düşük kontrast; beliren her şey sıçrayarak ve bir notayla gelir.
- **Memphis Diorama** (memphis-diorama) — sıcak beyaz #FFFCF6 üstünde grenli organik çerçeve açılır; içinde düz Memphis renkleri (#FFD234, #FF7EB3, #5CC8FF, #5EDFB0, #B9A0FF), mürekkep #25214A kontur, sert mor gölge; çerçeve greni 12 fps.
- **Açılır Kitap** (paper-popup) — gerçek masada pop-up kitap; beyaz kenarlı düz kâğıt oyuncular, sayfadan fırlayan dekor; yayılım başına tek renk ailesi; kâğıt sert hareket eder, canlılık taşmalı easing'den gelir.
- **Tilt-Shift Minyatür** (tilt-shift) — yüksekten, yalnız ince yatay şerit net; doygun "taze boyalı maket" renkleri; hızlı çekimde dünya 8 Hz adımlı.

### K. Oyun
- **Ritim Yarışması** (game-show) — düz vektör, kalın konturlu oyuncak maskotlar, şeker rengi şeritler ve güneş ışınları; her vuruş sabit tempo ızgarasında ve aynı anda bir ses; boşta vuruşta zıplama, vuruşta squash.
- **2.5B Piksel** (hd-2d) [3B] — piksel dokulu maket içinde ışık alan düz piksel karakterler, yüksek üç çeyrek açı; soğuk ortam + küçük sıcak ışıklar; sprite 6–10 fps, gerisi akıcı.
- **Mikro Oyun Çılgınlığı** (microgame) — her mikro oyun: bağırılan komut + 2.5–4 sn + tek eylem + sonuç; her biri başka teknikte, film giderek hızlanır; #2A0F5C, #FF2E88, #FFC928, #1FD1D1.
- **16-bit Piksel RPG** (pixel-rpg) — 320×180 gerçek piksel ×6, sınırlı indeksli palet, gradyan sıralı dither; yazı kutuları, menüler; sprite 8–12 fps, kamera tam pikselde; palet tabloyla değişir.

### L. Film ve bant
- **ASCII CRT Terminal** (ascii-crt) — her şey eş aralıklı ızgarada gerçek karakter; tek fosfor (kehribar ya da yeşil), kavisli cam, tarama çizgileri; karakterler hücreden hücreye atlar.
- **Liminal Buluntu Kaset** (backrooms) — 90'lar VHS 4:3, elde tek kesintisiz çekim, boş ve tekrar eden floresan mekân; tek hastalıklı ana renk (hardal #D5BD66); kesme yalnız bant koptuğunda.
- **Çift Pozlama** (double-exposure) [G] — hayvan silueti bir penceredir, içinde ikinci manzara; tek renkli; nefes, ağırlık aktarma.
- **Kazıma Film** (scratch-film) — sıcak siyah emülsiyon #050403, her ışık krem bir çizik #FFF4DC, renk saydam boya (#1FB39A, #2F86FF, #FF3220, #FFC81C); saniyede 15 çizim, kamera da adımlı.
- **1920 Sessiz Film** (silent-film) — perdeler arasında 4:3 kopya, mürekkep çizgi + gümüş yıkama, titreme ve kayma, ara yazılar; hareket 16 fps el çevirmeli; ton ve hasar duygu ayarıdır.

### M. Veri ve harita
- **Veri Fizikselleştirme** (data-physical) [3B] — her birim sayılabilir nesne (plaka, blok, madeni para), kural ekranda bir kez yazılır; sıcak nötr stüdyo #C4BEB4, malzeme renkleri, tek vurgu #D4521C; yığın alttan üste 0.5–1 sn.
- **Veri Hikâyesi** (dataviz) — krem kâğıt, kırmızı-mavi kalem, sayılara iğnelenmiş el yazısı notlar; grafik filmin kendisidir; ritim verinin ritmidir. Veri gerçek olmalı.
- **3B Harita Anlatımı** (map-explainer) [G][3B] — gerçek yükselti, alçak sıcak güneş, derinliğe göre deniz (#0E2230→#1F5A5C); kehribar #FFA63D = veri, soğuk beyaz = sınır; kamera hiç tam durmaz.
- **Damlacık Simülasyonu** (pip-simulation) — sıcak kâğıt laboratuvar tahtasında küçük karakter kalabalığı gerçek bir simülasyon koşar (evrim, salgın, kuyruk); sabit tohum; kobalt #4A6FE3, mor #8B67D6, mercan #F2604A, sarı #F6BE45.
- **Metro Haritası** (transit-map) — kırık beyaz #F2EEE5, yalnız 8 yön ve tek köşe yarıçapı, beyaz durak, siyah konturlu aktarma kapsülü, su düz mavi bant #BCD6EA; hat parlayan kalem ucuyla çizilerek büyür.
- **Projeksiyonlu Beyaz Maket** (white-model) [G][3B] — karanlık odada beyaz kütle maketi #F3F3F1, veri üstüne ışık olarak düşer, katman başına tek renk ailesi.

### N. Alet ve kanıt
- **Arşiv Işık Masası** (archive-lighttable) [G] — soğuk arkadan aydınlatmalı masa #F7F9FB, gerçek arşiv nesneleri, inen büyüteç; tek sinyal rengi #FF5A1F.
- **Brifing Panosu** (briefing-board) [G] — gerçek beyaz pano, kesilmiş fotoğraflar ağırlıkla konur; grafit = ad, mavi = ölçü.
- **Radar Taramalı Belgesel** (dark-documentary) — dünya siyahtır, tarama geçene dek hiçbir şey yok; parlak cephe çizgisi → sönen yankılar (eş yükselti, tel kafes); yankı #B3DBFF, tek sıcak vurgu #F2C48D; tarama vuruşta atılır.
- **LiDAR Tarama** (lidar-survey) [G] — karanlıkta nokta bulutu (#1F3F35→#E2F3DC), tarama çizgisi geçince noktalar yüzeye yoğuşur.
- **Mikroskop Altında** (microscope) [G] — gerçek mikrograf, lamdan tek hücreye kesintisiz ölçek değişimi, odak nefes alır.
- **Uydu Brifingi** (satellite-briefing) [G] — griye çekilmiş uydu görüntüsü, ince beyaz ölçüm çizgileri, kilitlenen nişangâh, tek kehribar okuma #FFBE55.
- **Güvenlik Röntgeni** (security-xray) — bagaj konsolu #080F1A; nesne yalnız çift enerjili röntgenle görünür: organik turuncu, karışık yeşil, metal mavi, geçilmez siyah; üst üste binince renk değişir; bant ataletle durur.
- **Termal Kamera** (thermal-camera) — düşük çözünürlüklü gürültülü görüntü, demir paleti (#000008→#4D0894→#DB3352→#FA7812→#FFFADB), parlaklık = sıcaklık; ekranda renk çubuğu ve nokta ölçer; okuma ~6 Hz.

### O. Kurgu ve belgesel (çizim tekniği değil kurgu dili; aslı [G])
- **Altyazı Haber** (caption-news) — sessiz izlenebilir: dev altyazı başrolde, parça parça çarpar, tek anahtar kelime sarı #FFC21A üstünde; kesmeler 120 BPM yarım vuruş ızgarasında; veri kartı koyu defter #151512.
- **Şehir Senfonisi** (city-symphony) — zaman bükme: hız 0.3×–75×, kare harmanlama; kesmeler müziğin alt bölümleriyle sıklaşır; tek vurgu sodyum turuncu #D9772F.
- **Canlı Geri Sayım** (countdown) — gerçek zaman (ekran süresi = olay süresi), her saniye tıklayan saat, bölünmüş ekran; zemin #06080A, vurgu #FF5B1F.
- **Konstrüktivist Montaj** (kino-montage) — kırmızı #D52B1E, mürekkep #141210, kâğıt #EDE4D0; çapraz bantlar yazıyı taşır; her kesme 120 BPM ızgarasında.
- **Yayın Haber Paketi** (news-package) — tek paket sistemi: paralelkenar plaka, vurgu sekmesi, alt bant; koyu #121417 + sarı #F2CF1D; jenerik köşe logosuna dönüşür.
- **1920 Haber Filmi** (newsreel) — sıcak gümüş tek renk, 1.37:1 yuvarlak köşeli kapı, krem yazı; kesmeler 190–220 BPM caz vuruşunda.
- **Spor Taktik Tahtası** (telestrator) — oynat → geri sar → dondur → üstüne çiz (halka #FFD400, ok #3FD8FF, boşluk #FF3B30); bir dondurma = bir bulgu.
- **Görsel Soruşturma** (visual-investigation) — soğuk masa #0B0C0E, kaynaklar tek ortak saatte buluşur; öğeler 3–4 kare beyaz flaşla kesilerek girer, hiçbir şey zıplamaz; tek vurgu #FF4A2E.

