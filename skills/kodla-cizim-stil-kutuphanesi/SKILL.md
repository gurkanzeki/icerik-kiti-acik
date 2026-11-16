---
name: "kodla-cizim-stil-kutuphanesi"
description: "Tek dosyalık, kodla çizilmiş döngülü HTML animasyon (1080x1920) istendiğinde ya da kütüphanedeki bir stil (8 çekirdek stil ya da genişletilmiş katalogdaki 100+ stil) anıldığında kullan."
---

# Kodla Çizim Stil Kütüphanesi

Kullanıcının "kütüphanemiz" dediği stil seti. İlk kullanım: İstanbul Boğazı sahnesi (Galata Kulesi + cami silüeti, Kız Kulesi, vapur, duman, martılar), 8 stilde 8 ayrı HTML.

## 1. Değişmez kurallar
- Tek HTML dosyası, tek `<canvas>` 1080x1920; CSS ile ekrana sığdır (`width:min(100vw,calc(100vh*9/16))`).
- Görsel, video, font dosyası, kütüphane yok. Her şey Canvas 2D ile çizilir.
- Döngü 6 sn. `T = (now/1000 % 6)/6`. Her hareket ya `sin(2π·k·T + faz)` (k TAM SAYI) ya da tam periyot kaydırmadır. Rastgelelik tohumlu (`mulberry32`) ve kareden bağımsızdır.
- En az 3 paralaks katmanı; her öğe sürekli kıpırdar (bayrak, selvi, bulut, ışık, doku).
- Teslim: yalnızca HTML dosyası (kullanıcı "yalnızca HTML" dediyse başka şey ekleme).
- Birden çok stil istenirse sırayla üret, her biri bitince gönder.

## 2. Ortak sahne iskeleti (stilden bağımsız)
- Kamera: `cam(d) = sin(2πT)·55·d`. Derinlikler: uzak tepeler 0.06, şehir tepeleri 0.12, Kız Kulesi 0.37, kayık 0.52, vapur 0.71, ön plan 1.2–1.7.
- Yerleşim: ufuk y≈985; güneş/ay (815,410) ya da ortada (540,640–760); Galata x=290 taban y=892; cami x=800 taban y=902; Kız Kulesi x=610 taban y=1168; vapur merkez (520,1545); baca ucu yerel (-78,-342).
- Dalga: 13 sıra `y=1004+700·u^1.2`, `λ=58+170u`, `A=7+22u`, her sıra döngüde 1 dalga boyu kayar; öne 2 sıra daha (λ 250/300, döngüde 2 dalga boyu). Tepe eğrisi bezier kambur. Nesneler y değerine göre sıraların arasına girer.
- Duman: 8 top, faz `(T+i/8)%1`; baştan sona büyür, sola-yukarı süzülür, alfa `min(1,10p)·(1-p³)`.
- Martılar: 4'ü kapalı Lissajous yörüngede, 2'si döngüde bir kez soldan çıkıp sağdan girer (sarım ekran dışında); kanat frekansı tam sayı (6–9).
- Bulutlar: aynı biçimli, eşit aralıklı (P=360 ve 270) iki sıra; döngüde tam P kadar kayar.
- Vapur: `rot=0.03·sin(2πT)+0.01·sin(4πT)`, `bob=7·sin(4πT)+3·sin(2πT)`.

## 3. Mimari: iskelet + stil nesnesi
Geometri bir kez yazılır; her şekil bir ROL ile boyanır (`wall, wall2, roof, dome, window, gold, red, hull, funnel, flag, rock, tree, bird, line, shade`). Stil dosyası şunları tanımlar: `paint(role, önem)`, `ln(role, kalınlık)`, `sky, farHills, hillsB, waterBase, wave, puff, fore, frame, post` ve isteğe bağlı `clip, town, mark, quant, sway, rock`. Böylece yeni stil = yeni palet + yeni boyama tekniği + kendi gök/su/duman/çerçeve/doku çizimi. Yalnızca renk değiştirmek stil sayılmaz; teknik ve hareket de değişmeli.

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

## 4c. Diğer repolardan stil ve teknikler
- **Kolaj B-roll** (gbro-collage-broll) — ~5 sn'lik tek cümle → tek keskin görsel metafor. Düz, tek renk kâğıt zemin (renk anlama göre seçilir); iskelet siyah-beyaz yarım ton fotoğraf kesikleri + seçili renkli karton vurgular; keskin kesim kenarı, krem keyline, düşük opaklı yumuşak gölge, kâğıt lifi. Özne ortadaki %70'te, bol boş renk alanı, 3–6 ayrılabilir kâğıt grubu. Hareket boş zeminden parça parça kurulmadır (önce yapı, sonra özne/kartlar, en son eylem ve sonuç), stop-motion zamanlamayla; kayma, sallanma, yavaş zum sayılmaz. Yazı ve logo yok. Aslı yapay zekâ görsel+video modeliyle çalışır; kodla çizimde fotoğraf kesiği yerine yarım ton doldurulmuş siluet kullan.
- **El Boyaması Çizgi Film** (Claude Animation Base) — fırça darbesi, düz 2B, kaynama. Karakter düz yıkama + mürekkep kontur; fon kenarı sızan yumuşak suluboya, kontursuz ya da ince. Çizgi saniyede 12 kez yeniden tohumlanır; yerinde durması gereken şeyler (yıldız konumu gibi) sabit hash alır, her öğe kendi tohumunu taşır. 3B projeksiyon yok: dönüş çizilmiş anahtar görünümlerle, derinlik örtüşme/ölçek/renkle (uzak = küçük, mavi, soluk). Işık eklemeli parıltı, kâğıt greninin altında. Yumuşak palet, saf siyah/beyaz yok. Ekranda yazı yok; her sahnede bir şey olur; sahneler hep geçişle bağlanır (fırça silmesi); bir şekil = bir kontur. Karakter özgün tasarlanır.
- **Tek Plan Süreklilik** (onetake; genel ilkelerin kendi sözümüzle özeti) — sahneyi değiştirme, taşı: her bölüm sınırında ekrandan bir şey sağ kalır ve görünür biçimde sonraki sahneye dönüşür (kutu pencereye açılır, çizgi sonraki sahnenin ilk çizgisi olur, daire açılıp dünyayı kaplar, kamera bir kartın içinden geçer, sonda her şey işarette toplanır). Kamera kesmez, özneyi yarım vuruş önden izler. Metronomla kesme yok (eşit süreler slayt gibi okunur). Kare hep hareket etmesin: duraklar vuruşu indirir, sürenin kabaca üçte biri durgun. Küçük öğe, büyük zemin (%70 boş). Hareketin nedeni görünsün. Çok hızlı harekette hareket bulanıklığı. Konfeti ve parçacık patlaması yok. Ses tek malzeme seti, tek oda. Görünümler: paper (beyaz sayfa, siyah yazı, tek yeşil), dusk (mor-siyah gece, tek mor özne, krem yazı), tabletop (sıcak gri masa, beyaz nesneler, kırmızı-turuncu neden), ultramarine (doygun mavi alan, beyaz yazı, tek sarı), riso (krem kâğıt, floresan pembe ve mavi), ember (sıcak kâğıt, kahve mürekkep, turuncu ışık).
- **HyperFrames** (HeyGen) — "HTML yaz, video çıkar" çatısı. Bize yarayanlar:
  - Tema belirteç sözleşmesi: `bg, fg, muted, surface, border, brand, accent, accent-2` + üç font + köşe/boşluk + `dur-beat` ve iki ease. Stil değiştirmek = belirteç değiştirmek.
  - Üç tema: **bold** (#080611 zemin, #FF3D81 marka, #7C5CFF, #00D4FF; vuruş 0.32 sn, taşmalı ease), **editorial** (#E9E1D2 kâğıt, #202725 mürekkep, #246B63; serif; 0.48 sn), **neutral** (#F3F4F6, #111318, #1D4ED8; 0.40 sn).
  - Görünüm kuralı: kendi haline bırakılan iş hep aynı görünür. Görünümü dış girdi belirler; sıra: projenin tasarım dosyası > gerçek marka > verilen referans > konunun kendi dünyası. Referanstan içerik değil dilbilgisi alınır (plan süreleri, başlık giriş-çıkışı, geçişler, palet rolleri).
  - Hazır sunum görünümleri: biennale-yellow, blockframe, blue-professional, bold-poster, broadside, capsule, cartesian, cobalt-grid, code-editorial, coral, creative-mode, daisy-days, editorial-forest.
  - Blok aileleri (fikir kaynağı): altyazı türleri (karaoke hap, kinetik çarpma, neon, glitch RGB, matris çözülme), alt bantlar, geçişler (blur, cover, dissolve, distortion, grid, light, mechanical, push, radial, scale, 3D), shader zeminler (aurora, mesh gradient, plasma, voronoi, godrays, halftone), sıvı cam, veri blokları (bar yarışı, çizgi grafik, haritalar), el yazısı vurgular (daire, alt çizgi, ok), imleç hareketleri.

## 4d. Hareket desenleri ve üretim dersleri (Kasım 2026, ikinci tarama)
Kaynak: Kokonut UI (kokonut-labs/kokonutui, MIT, 116 bileşen), Evil Buttons (radiumcoders/evil-buttons, Apache-2.0, 29 düğme), useLayouts (iurvish/uselayouts, MIT, 69 bileşen), PODIE (podie.dev; 1.100+ öğelik katalog, repo ve lisans görünmüyor: yalnız fikir), istem galerileri (prompt-motion.com, promptmotion.org, claudevideo.org, jasonzhu.ai) ve iki istem derlemesi (joeseesun/opus-video-prompts, zhuyansen/awesome-opus-5.5-video). Galerilerdeki istemler yazarlarına aittir, lisans verilmemiştir: kopyalanmaz, aşağıda yalnız ortak dersler kendi sözümüzle durur. Arayüz kütüphaneleri React bileşenidir; biz kodunu değil hareket fikrini alıp Canvas'a çeviririz.

Kullanım kuralı: bu desenlerin aslı dokunmayla çalışır. Videoda dokunan yoktur, o yüzden hareketin nedeni ekranda görünmeli: bir imleç, bir el, düşen bir nesne ya da önceki sahneden gelen bir vuruş. Nedensiz oynayan desen ekran koruyucu gibi okunur.

### Fiziksel yazı
- **Tel üstünde başlık:** yazı gergin bir telin üstünde durur; tel çekilip bırakılınca yazı sönümlü titreşir (genlik üstel azalır, 2-3 saniyede durur). Vurgu cümlesi için.
- **Newton beşiği:** harfler ipte asılı; baştaki harfe vuruş kelime boyunca tık tık aktarılır, sondaki harf savrulur. Neden-sonuç, zincirleme etki için.
- **Bölmeli tabela:** her karo yalnız yeni harfine kadar döner, komşusundan bir vuruş sonra durur. Tarih, sayı, durum değişimi için.
- **Güneş saati gölgesi:** harflerin uzun yumuşak gölgesi zamanla döner; zaman geçişi için.
- **İşaret kalemi:** vurgu, alt çizgi, daire ve üstü çizme el çizimi gibi okuma sırasıyla çizilir.
- **Spoiler benekleri:** yazı süzülen beneklerin altında gizli; benekler tek noktadan dışa savrulup yazıyı açar. Sır ve ifşa için.
- **Taşınan harfler:** kelime değişirken ortak harfler yeni yerine kayar, eskiler düşer, yeniler üstten konar.
- **Kusurlu daktilo:** arada yanlış harf yazıp siler; imleç yalnız yazmıyorken yanıp söner.
- **Bant kayması:** yazı yatay bantlara bölünüp sert kayar, ince kırmızı-camgöbeği ayrımla; kısa patlama, sürekli değil.

### Onay, yıkım, geri dönüşsüzlük
- **Koçan yırtma:** bilet perforasyonundan delik delik ayrılır, koçan menteşe gibi açılır ya da kopar.
- **Basılı tut:** dolgu sıfırdan yüze büyür; erken bırakılırsa geri boşalır ve sarsılır, sona varırsa tik çizilir. Kararlılık, sabır için.
- **Fitil boyunca kaydır:** tutamaç fitilin ucuna sürüklenir, sonda patlar.
- **Kağıt öğütme:** sayfa aşağı kayarken şeritlere ayrılır.
- **Kül patlaması:** öge kor gibi parlar, kül taneleri saçılıp ögenin üstüne yığılır.
- **Taş çatlaması:** piksel taş her vuruşta biraz daha çatlar, sonunda parçalara ayrılıp düşer.
- **İp çekme:** sarkan ip çekilir, lamba yanar; ip sarkaç gibi sönümlenir.
- **Çan:** çan sallanır, tokmak gövdeye gerçekten vurduğu anda ses gelir.
- **Bekleme halkası:** tıklamadan sonra ögenin kenarında boşalan radyal sayaç.

### Sıvı, kumaş, ışık
- **Sıvı gösterge:** kap doldukça yüzey çalkalanır, kabarcık yükselir; oran ve birikim için.
- **Pileli perde:** rüzgarda dalgalanan perde, itilince kıvrımı kayar.
- **Suda mürekkep:** yazı suya mürekkeple yazılmış gibi kanar, sonra yeniden toplanır.
- **Havuz tabanı:** ışık ağı (kostik) zeminde dalgalanır, damla düşünce halka ışığı büker.
- **Yağmurlu cam:** damlalar birikir, akar; her damla arkadaki görüntüyü ters çeviren küçük bir mercektir.
- **Sıvı köprü:** yan yana iki hap biçim yaklaşınca aralarında sıvı köprü kurulur, uzaklaşınca kopar.

### Kart, deste, kağıt
- **Fiş yazıcı:** fiş satır satır basılır, sonra çekilince yırtılıp düşer (Termal Fiş kartının hareketli hali).
- **Sayfa çevirme:** sayfa köşesinden tutulup sırt üstünden çevrilir; kalınlık ve gölge açıyı izler.
- **Polaroid yelpazesi:** yedi fotoğraf yığından tek köşe etrafında yay biçiminde açılır.
- **Deste:** üstteki kart fırlatılır, destenin altına girer.
- **Araziye yatan ısı haritası:** düz kare ızgara eğilip 3B araziye dönüşür.
- **Uçuş kartı:** bilgi değişince yalnız değişen karakterler döner, eski değer üstü çizili kalır.
- **Gizli dosya:** zarf mektubu dışarı çeker, çevirir, öne koyar.

### Zemin ve arayüz anlatısı
- Zeminler: bir vuruştan halka halka yayılan nokta zarı; bir engelin çevresinden ayrılan akış çizgileri; yavaş kayan eş yükselti haritası; büyüteç altında irileşen yarım ton.
- Yapay zeka arayüzü anlatırken: adımlar listesi ve canlı günlük; araç çağrıları satır satır akıp tek satıra katlanır; bağlam halkası dolar; kaynak etiketi dayandığı cümleyi yakar; kodda satır imleci aşağı iner.

### Test sonucu (Kasım 2026)
38 desen tek tuvalde Canvas 2D ile kodlandı ve tarayıcıda döngünün yedi anında çizilip karelere bakılarak denendi; hareketin akışı izlenmedi. Çalışan halleri "Hareket Desenleri Test Panosu" adlı sayfada durur. Hepsi 300x300 mantıksal tuvalde, `f(ctx, u, t)` biçiminde saf fonksiyondur (u: döngü içi 0-1).

**İyi, kullanıma hazır (29).** Ayarlarıyla:
- Tel üstünde başlık: çekme 26 px, sönüm 3,2/sn, 5 Hz; harf telin o noktadaki sapmasını izler.
- Newton beşiği: yalnız uçtaki iki harf savrulur (0,55 rad), ortadakiler vuruş anında 2-3 px titrer.
- Bölmeli tabela: hücre başına gecikme döngünün %5-6'sı, durmadan önce saniyede 16 rastgele harf, ortada 2 px yarık.
- İşaret kalemi: sıra vurgu, alt çizgi, daire; alt çizgi 2,5 px sinüs titremeli.
- Spoiler benekleri: 260 benek, dokunulan noktadan dışa itilir ve solar.
- Taşınan harfler: aynı harfler eşleştirilir ve yay çizerek taşınır; eşleşmeyen eski düşer, yeni üstten konar.
- Kusurlu daktilo: betikli adım listesi (yanlış harf iki adım bekler); imleç yalnız yazmıyorken yanıp söner.
- Koçan yırtma: koçan alt köşeden menteşelenir, 0,55 rad'da kopar ve düşer; delikler 9 px aralıklı.
- Basılı tut: ilk denemede %60'ta bırakılır, boşalır ve 6 px sarsılır; ikincide dolar ve tik çizilir.
- Kağıt öğütme: sayfa sabit hızla iner, 9 şerit ayrı fazda 3 px salınır.
- Taş çatlaması: üç vuruşta üç çatlak, dördüncüde 40 karo yerçekimiyle dağılır.
- İp çekme: ip 24 px uzar, bırakılınca ışık yanar; ip 0,3 rad'dan sönümlü salınır.
- Çan: tokmak gövdeden 0,11 sn geride sallanır; ses yayları yalnız açı farkı 0,2 rad'ı geçince çıkar.
- Bekleme halkası: halka doğrusal boşalır (ease yok), ortada geri sayım.
- Sıvı gösterge: yüzey iki sinüsün toplamı, dolarken genlik 9 px, durunca 2 px; 7 kabarcık.
- Havuz tabanı: iki yönde 16'şar dalgalı çizgi, toplamsal karışım; yazı gölgesi 4 px oynar.
- Sıvı köprü: mesafe 2,6 yarıçapın altında köprü kurulur, kalınlık mesafenin karesiyle incelir, sınırda kopar.
- Fiş yazıcı: satır satır basılır, alt kenar dişli; yırtılınca dönerek düşer.
- Sayfa çevirme: genişlik cos(açı) ile daralır, 90 dereceden sonra sol sayfaya biner; gölge sin(açı) ile.
- Polaroid yelpazesi: yedi kart tek köşe etrafında 13 derecelik adımlarla açılır.
- Deste: üst kart sağa fırlar, 0,35 rad döner, en alta girer.
- Araziye yatan ısı haritası: her hücrenin dört köşesi düz kareden izometrik eşkenar dörtgene ayrı ayrı taşınır (yalnız konumu taşımak çizgiye çökertir); yükseklik değerle orantılı.
- Uçuş kartı: yalnız değişen karakter dikey kayar, eski değer altında üstü çizili kalır.
- Nokta zarı: halka hızı 150 px/sn, dalga boyu 44 px, nokta 2-7 px.
- Akış çizgileri: sapma R²·dy / (dx² + dy² + 0,7R²); payda yumuşatılmazsa engelin üstünde sivri çıkıntı oluşur.
- Yarım ton ve büyüteç: nokta yarıçapı ışıklı kürenin parlaklığından; mercek içinde aynı desen 2,2 kat.
- Adımlar ve katlanma, Dolan halka, Kaynak etiketi: arayüz anlatısı için hazır.

**Orta, çalışıyor ama ayar ister (8).** Bant kayması (yalnız kısa patlamayla), Fitil boyunca kaydır (küçük kalıyor, patlama zayıf), Kül patlaması (yığılma seyrek), Pileli perde (tek karede iyi, hareketi görülmedi), Suda mürekkep (tuval bulanıklık filtresi ister, yavaş; Python hattında yok), Yağmurlu cam (damlalar küçük, mercek hissi zayıf), Gizli dosya (çevirme anı belirsiz), Eş yükselti haritası (halkalar yapay; gerçek eş yükselti için yükseklik alanı gerekir).

**Zayıf, bu haliyle kullanma (1).** Güneş saati gölgesi: kopya yığınıyla yapılan gölge leke gibi duruyor.

### Üretim dersleri (istem galerilerinin ortak paydası)
- Önce vuruş çizelgesi, sonra kod: toplam süre, sahne sayısı, her sahnede ne olduğu yazılmadan çizime başlama.
- Kamera dilini adıyla yaz (takip, yaklaşma, eşleştirmeli kesme). En çok atlanan ve en çok fark yaratan satır budur.
- Her işe bir yasak listesi koy. Şablon kokusunun çoğu şunlardan gelir: parçacık patlaması, şok dalgası halkası, RGB ayrımı, mercek parlaması, neon ışıma, zıplayan easing, kamera sarsıntısı, ızgara zemin, yanıp sönen arka plan.
- Tek biçim, hiç kesme: aynı öge boyut, köşe yarıçapı ve renk değiştirerek bir halden ötekine geçer; içeriği kısa bir bulanıklıkla değişir.
- Müzik ızgarası: 120 BPM'de bir ölçü 2 saniyedir; her vuruşta bir şey olur, kesmeler güçlü vuruşa oturur. Ses efektinin dosya başı değil tepe noktası olaya denk gelir; efektler müziğin altında kalır.
- Yay hareketi t'nin saf fonksiyonu olsun: değer, her hedef değişimi için bir yay yanıtının toplamıdır (durum tutma yok). Bir ögenin iki kenarını farklı yaya bağla: öndeki kenar esner, arkadaki geç gelir.
- Hızlı harekette kare başına 3-4 alt kare çizip harmanla (gerçek hareket bulanıklığı).
- Döngüde son kare ilk kareyle aynı olsun; hareket eden şeyin konumu ve hızı da.
- Ekrandaki yazıda cümle sonu noktası yok; sahne başına tek fikir, bol boşluk, tek vurgu rengi, tek yazı ailesi.
- Tam render öncesi vuruş başına bir kareye bak (uzun işte en az 20 kare): üst üste binen, sıkışan, okunmayan yeri düzelt.

## 4e. Üçüncü tarama: zanaat, kamera altı, algoritmik desen, malzeme (Kasım 2026)
Kaynak: geleneksel Türk sanatları yazını ve deneysel animasyon / üretken sanat teknikleri; reçeteler kendi sözümüzle. 16 stilin hiçbiri henüz test edilmedi: ilk kullanımda döngünün yedi anında kareye bakılır, sonuç (iyi/orta/zayıf) buraya işlenir. Hepsi bölüm 3'teki kancalarla uygulanır.

### P. Anadolu zanaatı
- **Ebru** — kitreli su teknesi: zemin soluk krem #EFE6D0; toprak boyalar lahor çividi #24406B, aşı kırmızı #A8402A, zırnık sarı #D9A63A, çamlıca yeşili #5E7A4A, is siyahı #1E1A17. Kontur yok; her şekil üst üste açılan eşmerkezli damla halkalarıdır (yeni damla eskileri dışa iter). Gök battal (serpme benek), su gelgit ve taraklı (biz ve tarakla çekilmiş şeritler: dalga sıraları `sin` ile ileri-geri taranır), duman açılan damlalar, lale ebrusu ön planda. Hareket: yüzey çok yavaş çalkalanır (tüm çizimi 2-4 px'lik düşük frekanslı sapma alanı büker), damla açılması 0→tam yarıçap üstel yavaşlar; sert kenar ve hızlı hareket yok. Geçiş: kâğıdın tekneye yatırılıp kaldırılması (soldan sağa silme).
- **Kündekari** — ceviz #5A3A22, açık şimşir #C9A46A, abanoz #23160F, fildişi kakma #EFE3C8. Sahne onlu yıldız ağına (36°/72° açılar) oturan çokgen parçalara bölünür; her parça ağaç damarı taraması (paralel ince çizgi, parçaya göre yönü değişir) + 2 px pah (üst-sol açık, alt-sağ koyu) + parçalar arasında koyu kiniş çizgisi. Renk az, ton damar yönünden gelir. Hareket: parçalar çivisiz geçme gibi tek tek kayıp tık diye kilitlenir (doğrusal yaklaşma, son 6 px'te ani durma, taşma yok); döngüde gök yıldızları yerinde 36° döner (simetri sayesinde kusursuz kapanır), ışık çapraz süpürür.
- **Kilim** — kök boya: kökboyası kırmızı #A6321F, çivit #24365E, cehri sarı #D4A12C, ceviz kahve #5B3A24, yün beyazı #EDE4D0, yeşil #4F6B3A. Her şey 12 px'lik ilmek ızgarasına kuantalanır (`quant`); eğri yok, köşegenler basamaklı; alan sınırlarında kilim yarığı (1 hücrelik dikey boşluk). Motifler: koçboynuzu, elibelinde, su yolu (bordür), göz, yıldız; tepe ve dalga basamaklı zikzak. Doku: her hücrede yatay atkı çizgileri + hafif renk abrajı (satır satır ton oynaması). Hareket: 8 fps adımlı (`floor(48T)/48`), her şey tam hücre atlar; dalga sıraları dönüşümlü birer hücre kayar; saçak altta sallanır; giriş alttan üste sıra sıra dokunarak.
- **Hat ve Tuğra** — aharlı kâğıt #F1E7CF, is mürekkebi #17130F, altın #C9A03A, lal kırmızı #9E2B25, lacivert #1F2F6B. Tek araç kamış kalem: çizgi kalınlığı = kalem ağzı genişliği × |sin(çizgi açısı − 60°)|, yani yön değiştikçe kalın-ince; dolgu yok, biçimler kavis, elif ve keşide (uzatma) ile kurulur. Vapur ve kuleler birkaç fırça darbesiyle, su uzun keşideler, tuğranın beyzeleri (iç içe iki oval kavis) güneşi sarar, tuğ çizgileri direk ve minare olur. Yazı gerçek metin taklidi yapmaz: soyut kavis kullan, anlamsız Arap harfi dizme. Hareket: çizgiler yazılış sırasıyla çekilir (başta yavaş, ortada hızlı, sonda mürekkep incelir); döngüde yalnız altın zerefşan parlar, mürekkep hafifçe nemli-kuru ton değiştirir.
- **Sedef Kakma** — zemin koyu ceviz #2A1B12 ya da abanoz; sedef parçaları açık gri-krem #E8E4DA taban üstüne yanardöner geçiş (pembe #F2C6D4, su yeşili #BFE6D6, leylak #CFC6F0, altın #F0E2B0), bağa için kızıl kehribar #8A3B1C, tel kakma gümüş #C8C8C8. Her şekil küçük çokgen sedef parçalarına bölünür, aralarında ince ahşap damar kalır. Yanardönerlik: parça rengi = palet(parça açısı + ışık fazı); ışık fazı `2πT` ile döner, komşu parçalar farklı fazda yanar söner. Hareket ağır ve azdır: yalnız ışık gezer, su parçaları sırayla parlar; nesneler adım adım değil akıcı.
- **Keçe ve Yazma** — iki akraba. Keçe: mat yün renkleri (kiremit #B5522E, hardal #C99A2E, çivit #2E3F66, ham yün #E6DCC6, koyu kahve #3B2A20); kontur yok, her kenar 3-5 px tüylü (tohumlu gürültüyle dişli + yarı saydam lif çizgileri), motifler iri ve yuvarlak. Yazma (Tokat işi): ham bez #EFE6D2 üstüne ıhlamur kalıbıyla siyah kontur + elle doldurma kırmızı #B5301F, yeşil #3F6B45, sarı; kalıp tekrar eder, her baskı 1-2 px kayık ve mürekkebi eşit değil. Hareket: keçe 10 fps yumuşak adım, parçalar hafif nefes alır; yazmada kalıp damga gibi iner (1.08→1, 0.12 sn), kumaş rüzgârda tek dalga taşır.

### R. Kamera altı deneysel animasyon
- **Kum Animasyonu** — alttan aydınlatılmış cam: ışık #F6E7C4 → kalın kum #2B1E14, arası sıcak kahve tonları (ton = kum kalınlığı; renk yok). Kenar asla keskin değil: her sınır taneli geçiş (2-10 px içinde tohumlu nokta yoğunluğu). Çizim iki yolla: kum dökerek karartma, parmakla açarak aydınlatma (ışık çizgileri parmak genişliğinde, uçları yuvarlak). Hareket: metamorfoz, kesme yok; bir biçim süpürülüp ötekine dönüşür, süpürme izinde taneler savrulur ve 0.3 sn'de yatışır; 12 fps, tane dokusu her adımda hafifçe yeniden tohumlanır (duran alanda sabit). Dalgalar avuç içi süpürmesi, duman serpiştirilmiş kum.
- **Cam Üstü Boya** — arkadan ışıklı camda ıslak yağlı boya: koyu sıcak zemin, parlak yerler boyanın inceltildiği yerdir. Palet toprak ve ışık: #1B1410, #5A3520, #B4682C, #E9B45A, #F4E3B0, soğuk karşılık #2F4A5C. Biçimler geniş, yönlü fırça ve parmak sürmeleriyle; kenar yumuşak, bulaşık. Hareket: her kare bir öncekinin üstüne boyanır, o yüzden hareket edenin arkasında silik iz kalır (önceki konumun %30-40 hayaleti, 3-4 adımda söner); 12 fps; duran alan da hafifçe yeniden sürülmüş gibi kıpırdar. Sahne geçişi sürerek dönüştürme.
- **İğne Perdesi** — yalnız gri: zemin #101010 → #E8E8E8. Görüntü çok sık bir iğne ızgarasıdır (3-4 px aralık); ton, yandan gelen ışıkta iğnenin gölge boyu, yani her hücrede eğik kısa çizgi uzunluğu. Kenarlar pusludur, saf çizgi yok; kazıma gravür ile karakalem arası bir his. Hareket: biçimler iğneleri itip çekerek yer değiştirir, dalga gibi yayılan ton cephesiyle; 12 fps; ışık yönü döngüde hafifçe salınır (tüm gölgeler birlikte uzar kısalır).
- **Kil Boyama** — cama yayılmış plastilin: doygun mat renkler (#C8452E, #E0A22E, #2F7F6B, #2C4F8F, #EADBC0, #3A2A22), kontur yok, renkler sınırda birbirine sürülür (mermerleşme). Yüzeyde parmak izi ve spatula oluğu (yönlü ince paralel çizgi + üst kenarda açık, altta koyu kabartma). Hareket: 12 fps, şekiller ezilip yoğrularak dönüşür, her adımda doku biraz değişir; squash-stretch serbest.

### S. Algoritmik desen
- **Truchet Karoları** — kare ızgara (60-90 px), her karoda iki çeyrek yay ya da köşegen; yön tohumlu rastgele. İki renk + kâğıt (ör. #F3EEE2, #1F2A44, vurgu #D9502F); sahne şekilleri karoların hangi yönde duracağını ve şerit kalınlığını belirler (koyu bölge kalın şerit). Hareket: karolar vuruşta 90° döner (0.25 sn, taşmasız), dönüş dalga cephesiyle yayılır; döngü için her karo çift sayıda çeyrek dönüş yapar. Şerit boyunca koşan ışık noktaları sürekliliği gösterir.
- **Reaksiyon-Difüzyon** — Gray-Scott dokuları: benek, labirent, mercan. Gerçek simülasyon döngüye kapanmaz ve ağırdır; iki yol: (a) düşük çözünürlükte (270x480) açılışta önceden koşturup 6 sn'lik kareleri sakla, sonu başa harmanla; (b) taklit: tam sayı k'lı birkaç kaydırılmış gürültü katmanının toplamını eşikle (`sin(2πkT)` ile faz), kenarı yumuşat. İki ton + tek vurgu (#0E1A24, #E9E2D0, #E25A3A); sahne şekilleri besleme haritasıdır (suda labirent, gökte benek, yapılarda düz dolgu). Hareket yavaş ve organik, hiçbir şey zıplamaz.
- **Daire Paketleme ve L-sistem** — her şekil çakışmayan dairelerle doldurulur (büyükten küçüğe, tohumlu; kenara yaklaştıkça küçülür), ağaç ve duman L-sistem dallanmasıdır. Kâğıt #F5F1E8, mürekkep #22252B, 3-4 düz renk. Hareket: daireler merkezden kenara sırayla büyüyerek belirir (yay taşmalı), döngüde her daire kendi fazında %4 nefes alır; dallar uçtan uca çizilerek büyür ve rüzgârda eklem eklem salınır.
- **Moiré ve Harmonograf** — siyah #0B0B0D üstüne ince beyaz çizgi (ya da tersi) + tek renk. Moiré: iki eş aralıklı çizgi/halka ızgarası üst üste; biri döngüde tam bir periyot kayar ya da küçük açıyla salınır, girişim bantları kendiliğinden akar. Harmonograf: `x=A·sin(a·t+φ)·e^(−d·t)` çiftleriyle çizilen sönümlü sarkaç eğrisi güneş/ay olur, uçtaki kalem ucu parlak. Su yatay çizgi ızgarası, dalga genliği çizgiyi büker. Titreme hassasiyeti: çizgi kalınlığı en az 1.5 px, yoksa videoda kırpışır.

### T. Malzeme ve ekran
- **Kanaviçe ve Boncuk** — etamin bezi #EDE6D6, delikli ızgara 16 px; her hücre çarpı dikiş (iki çapraz iplik, üstteki hep aynı yönde, 1 px gölge), renkler DMC tadında (#B3273A, #2E5C8A, #3F7D4E, #E0B23C, #5A3E2B). Boncuk varyantı: hücre başına küçük cam küre + beyaz parlama noktası. Arka plan boş bezdir. Hareket: 8 fps, hücre hücre; yeni dikişler iğne sırasıyla (satır satır, yılan gibi) atılır, iplik ucu görünür; boncukta ışık süpürmesi parlamaları sırayla yakar.
- **Flip-dot ve Nixie** — iki ekran. Flip-dot: siyah pano #121212, 18 px'lik diskler, bir yüz mat siyah bir yüz sarı #F2D21B; görüntü 60x106 ikili ızgara, sıralı dither ile ton. Disk dönerken 2 karelik elips aşaması geçirir, değişim sütun sütun süpürülür (her sütun 1 kare gecikmeli) ve her dönüşte tık sesi. Nixie: is siyahı cam tüpler, turuncu kızıl katot #FF7A1A + dış hale #FF4A00, sönük rakamlar tel örgü gibi arkada görünür; rakam değişimi anlık, ilk 80 ms hafif titrek. Sahnede nixie sayaç, saat ya da tarih için kullanılır; ana görüntü flip-dot panodadır.

## 4f. Video efektleri (Kasım 2026, 20 efekt, test edildi)
Kendi yazımımız (Python + cairo + numpy/cv2), 1080x1920, 30 fps; her efekt `f(ctx, u, t)` (u: efekt içi 0-1). Hepsi "20 efekt" tanıtım videosunda çalışır halde denendi (kare kontrolü yapıldı, akış izlenmedi). Malzeme: kendi sahnelerimizin altyazısız kareleri + saydam ön plan katmanı. Ses: her efektin olayına kare doğruluğunda bir ses (tepe noktası olaya).
- **Orbit:** kartlar elips yörüngede (rx 330, ry 150) döner; derinlik = sin(açı), boy ve saydamlık derinlikle, arkadan öne sıralı çizim; ortada odak daire.
- **Chat Takeover:** baloncuklar sol/sağ dönüşümlü, yaylanarak (sönümlü yay) girer, hız üstel artar (n = u^1.6), ekran dolunca üstten taşar.
- **Frame Escape:** kart içinde kırpılmış ön plan büyür; yolun yarısında kırpma kalkar, özne çerçeveyi aşar.
- **Snap Zoom:** 0,06 sn'de 1→2,4 yakınlaşma, 4 alt karelik hareket bulanıklığı, kısa beyaz flaş; geri dönüş 0,08 sn.
- **Checklist Pop:** satır kartı yayla açılır, onay kutusu taşmalı büyür, tik iki parçada çizilir.
- **Headline Storm:** 12 manşet şeridi yanlardan döne döne gelir; tohumlu konum, 3 boy, gölgeli düz renk bant (Condensed Bold).
- **Zoom Portal:** A sahnesinde bir noktaya üstel yakınlaş (1→10), o noktada açılan dairenin içinde B sahnesi büyür ve ekranı kaplar.
- **Growth Curve:** yalnız gerçek veri; eğri uçtan çizilir, ucu üç halkalı parlar, sayaç eğriyle aynı değeri gösterir, ara etiketler eşikte düşer.
- **Studio Reveal:** iki ışık konisi (doğrusal geçiş) yanar, kart sahneye gelir, altında solan ayna yansıması.
- **B-roll Overlay:** ana görüntü yavaş zum; ikinci çekim yuvarlak köşeli kartta sağdan kayar, gölge + beyaz kenar + B-ROLL etiketi, sonda geri çıkar.
- **Paper Cutout:** düzensiz kesim maskesi + 19 px genişletilmiş beyaz lif kenarı (cv2.dilate), masaya düşer, kayık gölge, 8 fps kıpırtı, bant.
- **Dolly Zoom:** arka plan 1,9→0,95 uzaklaşır, ön plan sabit boy; arka plan %45 karartılır.
- **Magazine Cover:** dev başlık, künye satırı, sol kapak yazıları, sağ alt kapak notları, barkod; parçalar sırayla iner.
- **Liquid Glass:** cv2.remap ile gezen mercek: içte büyütme k = 0,42 + 0,58·d^2,2, kenarda %60 beyaz halka, dışta ince gölge, sol üstte parlama, hafif sıcak ton. Kare başına ~0,33 sn.
- **Zoom Through Cut:** A'da bir noktaya 1→15 yakınlaş, tam ortada 0,04 sn beyaz flaşla kes, B aynı yerden 11→1 açılır.
- **Green Screen:** anahtar alfa = 255 − (G − max(R,B) − 40)·4, 3 px yumuşatma, yeşil taşma bastırma (G ≤ max(R,B)+30); ham ile anahtarlı arasında kayan bölme çizgisi.
- **Frame Break:** önce merkezden 9 çatlak çizgisi, sonra kart 7×12×2 üçgene bölünür, merkezden dışa ve yerçekimiyle savrulur, arkada yeni sahne belirir.
- **Digital Zoom:** 1-2-4-8x adımlı kırpma + en yakın komşu büyütme + 4 satırda bir tarama; köşe nişangâhı ve zum değeri.
- **Phone Mockup:** telefon alttan yayla gelir, hafif sallanır; ekranda sahneler dikey kaydırma akışıyla geçer, çentik.
- **Checklist:** iki sütun 20 madde, her biri 0,03u arayla tiklenir, solda dev sayaç.

Uygulama dersleri: cairo'da grup çizdikten sonra kaynak (source) o grupta kalır; bir sonraki katmanı çizmeden önce `set_source_rgb` ile sıfırla, yoksa şekiller görünmez çizilir. Ölçek 0 olunca matris hatası verir: ölçeği en az 0,02'de tut. Her karede değişen tam ekran gren videoyu 10 kat şişirir: sabit gren kullan.

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

## 5. Kontrol
- Tarayıcıda T=0 ile T≈1 karelerini karşılaştır: fark sıfıra yakın olmalı (Linol'de bir adımlık fark normal).
- Renk karıştırma yardımcıları her zaman `#rrggbb` döndürsün (iç içe kullanım bozulmasın).
- Test için `window.__T` tanımlıysa onu kullan, yoksa saat zamanını.

## 6. Yeni sahne ya da yeni stil
- Yeni sahne: bölüm 1–3 aynen, yalnızca geometri ve yerleşim değişir; roller korunur ki 8 stil hazır çalışsın.
- Yeni stil: bölüm 3'teki kancaları doldur; palet + boyama tekniği + doku + hareket karakteri dördünü de tanımla.
- Katalog stili (4b/4c/4e) seçildiyse: reçetedeki palet, teknik ve hareket karakterini kancalara çevir; aynı aileden çekirdek stil varsa (ör. Neon Tüpler ↔ Neon Gece) onun kodundan başla, farkı uygula.
- Stil seçimi konuya ve metne göre yapılır; [G] ve [3B] etiketli stiller kodla çizime uyarlanmadan önce kullanıcıya uyarlamanın sınırı söylenir.