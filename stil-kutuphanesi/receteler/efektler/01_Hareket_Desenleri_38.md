<!-- Kaynak: kodla-cizim-stil-kutuphanesi becerisi, satır 189-284 (15 Kasım 2026'da çıkarıldı) -->

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

