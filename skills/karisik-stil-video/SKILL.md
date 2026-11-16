---
name: "karisik-stil-video"
description: "Seslendirme üstüne, içeriğin konusuna ve havasına göre seçilmiş birkaç sanat stilini kararında karıştıran, kodla çizilmiş 2D ya da sade 3D sunum/video üretir. Kullanıcı ses + metin verip video, animasyon ya da sunum istediğinde, ya da videoyu adını verdiği bir animasyon stiliyle (piksel, tebeşir, çöp adam, kil, low poly, PS2, yapı taşı, izometrik vb.) istediğinde kullan."
---

# Karışık stil video

Amaç: bir seslendirmenin üstüne, her bölümü anlamına en çok yakışan sanat stiliyle anlatan, kodla çizilmiş video: çoğunlukla 2D, anlam gerektirdiğinde ya da kullanıcı istediğinde sade 3D. Sanatsal ve özgün olacak, ama pratik ve ekonomik: süre uzamayacak, kullanıcı beklemeyecek, stiller boğmayacak.

## Değişmez kurallar

1. **Önce çiz, sonra incelt.** İlk somut parça (tek sahne, 8-12 sn) en geç 10 dakikada kullanıcıya gitmeli. Altyapı işine (hizalama, motor yazma) gömülüp kullanıcıyı bekletme.
2. **Her sahne bitince gönder.** Sahneyi sesle birleştirip önizleme olarak at, sonra sıradakine geç. En sonda tek dosyayı gönder.
3. **Stil sayısı sınırlı.** Dakika başına en fazla 2-3 stil; 5 dakikalık videoda toplam 4-5 stil ve bunlardan biri "ana stil" (sürenin yarısından fazlası). Aynı stile geri dönmek serbest ve iyidir; bütünlük verir.
4. **Stil anlamdan doğar.** Bir stili "güzel durur" diye değil, o cümlenin duygusuna ya da türüne uyduğu için seç. Seçimin gerekçesini bir cümleyle söyleyebilmelisin. Kullanıcı stili adıyla istediyse (ör. "Clay 3D", "PS2 Style", "tebeşir") o stil ana stildir: tartışmadan uygula, yan stilleri anlamdan seç ya da hiç ekleme.
5. **Dürüst ol.** Sesi dinleyemiyorsun ve videoyu izleyemiyorsun; kontrolü karelere bakarak yaptığını ve senkronun neye dayandığını (Whisper kelime zamanları mı, duraklama tahmini mi) kısa ve açık söyle.

## 1. Girdi ve senkron (en fazla 5 dakika)

- Ses ve metin gerekir. Metin yoksa iste; Whisper'ın yazıya çevirdiği metin yalnızca zamanlama içindir, altyazıya kullanıcının kendi metni girer.
- **İlk iş şunu sor:** seslendirme aracının altyazı/zaman damgası dosyası (SRT, VTT, kelime zamanları) var mı? Varsa onu kullan, senkron kesinleşir.
- Yoksa **Whisper ile kelime zamanlarını çıkar** (kurulum 1-2 dakika, ortam her oturumda sıfırlanabilir, o yüzden her seferinde kontrol et):
  - Kur: `pip install --break-system-packages -q faster-whisper` (model ilk çalıştırmada kendiliğinden iner).
  - Sesi faster-whisper'a dosya yolu olarak verme (bu ortamda ses çözücüsü hata veriyor); ffmpeg ile 16 kHz mono float diziye çevirip diziyi ver:
    ```python
    import subprocess, numpy as np
    from faster_whisper import WhisperModel
    raw = subprocess.run(["ffmpeg","-loglevel","error","-i",SES,"-f","f32le","-ac","1","-ar","16000","-"], capture_output=True, check=True).stdout
    m = WhisperModel("small", device="cpu", compute_type="int8")
    segs, info = m.transcribe(np.frombuffer(raw, dtype=np.float32), language="tr", word_timestamps=True, vad_filter=True)
    kelimeler = [(w.word.strip(), w.start, w.end) for s in segs for w in (s.words or [])]
    ```
  - Ekran kartı yok: `small` modeli kullan, 2-3 dakikalık ses için yeter. Sonuç zayıfsa `medium` dene.
  - Whisper kelimeleri yanlış yazabilir. Çıkan kelimeleri kullanıcının metniyle sırayla eşle (yazım farkını hoş gör), zamanı Whisper'dan, yazıyı metinden al. Eşleşmeyen kelimenin zamanını komşularından oranla.
  - İlk kullanımda 3-4 noktada kontrol et: kelime zamanları duraklama analiziyle (aşağıda) uyuşuyor mu? Kasım 2026'da kurulum denendi ama gerçek konuşmada doğruluğu henüz ölçülmedi.
- Whisper kurulamıyor ya da saçma sonuç veriyorsa duraklama tabanlı hizalama yap, ötesine geçme:
  - 250-3600 Hz bandında enerji zarfı çıkar, -50 dB altı ve 0,18 sn üstü boşlukları duraklama say.
  - Duraklamalar arası her parça bir "birim"dir. Birimleri metindeki noktalama parçalarına sırayla eşle; kontrol için hece sayısı / süre oranına bak.
  - Derin (dijital sessizlik) duraklamalar genelde cümle sonudur, sığ olanlar virgül ya da nefes.
  - Birim içindeki kelime zamanını hece oranıyla tahmin et.
- **Yapma:** ses-birim düzeyinde zorla hizalama, HMM eğitme, sentetik sesle DTW, spektrogramı gözle okuma. Bunlar burada saatler yer ve güvenilir sonuç vermez.
- Görsel vuruşları mümkün olduğunca **birim başlangıçlarına** bağla (duraklamadan sonraki an kesindir). Kelimeye bağlı vuruşlar yarım saniye kayabilir; bunu kullanıcıya söyle ve kayan yerin dakikasını iste.

## 2. Metni bölümle ve stil ata

Metni anlam bloklarına ayır (genelde 1-3 cümle, 8-20 sn). Her bloğa tür etiketi koy, sonra stil ata:

| Bloğun türü / havası | Uygun stil | Neden |
|---|---|---|
| Hayal, masal, kültürel gönderme, ironi | Gölge oyunu | Perde, siluet ve ışık; "hayal perdesi" çağrışımı |
| Nostalji, özlem, anı, umut | Sulu boya | Yayılan boya sıcaklık verir; akıp erimesi kaybı anlatır |
| Güncel durum, ekonomi, toplum, alıntı | Gazete kolajı | Manşet, daktilo, damga ciddiyet ve belge havası verir |
| Sıcak, samimi hikaye; karakterli sahne | Kağıt kesme (kukla, stop-motion) | El emeği hissi, sempatik karakter |
| Sayı, karşılaştırma, süreç, oran | Hareketli infografik | Gösterge, kart, çubuk; uydurma rakam kullanma |
| Soru, düşünme anı, sade vurgu | Tek çizgi | Boşluk ve tek hareket; nefes aldırır |
| Art arda olaylar, mizah, abartı | Çizgi roman paneli | Kare kare anlatım, efekt yazıları |
| Oyun mantığı, seçim, "kural" eleştirisi, alay | Retro piksel | Menü, envanter, can barı metaforu |
| Güçlü tek cümle, slogan | Kinetik tipografi | Söz kendisi görüntü olur |
| Dönüşüm, kader, belirsizlik, akışa bırakma | Ebru (su üstü boya) | Boya suda yüzer, tarakla şekil alır; kontrol ile teslimiyet arası |
| İdeal, inanç, yücelik, törensel an | Vitray | Kurşun çizgiler arasından sızan renkli ışık; kutsallık ve ağırlık |
| Öfke, direniş, emek, manifesto | Linol baskı | Oyulmuş sert çizgi, 2-3 renk; el gücü ve itiraz |
| Gençlik, enerji, popüler kültür, heves | Riso baskı | Kayık basılmış floresan spot renkler; ham ve neşeli |
| Gece, şehir, yalnızlık, arzu, tüketim | Neon tabela | Karanlıkta parlayan cam boru; cazibe ve boşluk bir arada |
| Miras, sabır, parça-bütün, toplum | Çini / mozaik | Tek tek dizilen parçalar; bütün ancak sonunda görünür |
| Aile, ev, bağ, onarma, anne emeği | Nakış (iplik) | Dikiş dikiş ilerleyen iplik; bağ kurmak ve sökülmek |
| Tarih anlatısı, rivayet, saray, kıssa | Minyatür | Düz perspektif, altın varak, katlı sahne; "bir varmış" ciddiyeti |
| Plan, strateji, mekanizma, "nasıl çalışır" | Mavi teknik çizim | Ölçü çizgisi ve kesit; soğukkanlı akıl |
| Bozulan hafıza, medya, ekran, teknoloji kaygısı | VHS / glitch | Kayan renk kanalları, bant izi; güvenilmez kayıt |
| Coşku, rüya, müzik, sarhoşluk, taşkınlık | Psikedelik afiş | Dalgalanan harfler, zıt canlı renkler; baş döndürür |
| Soyut fikir, sistem, denge, ilke | Bauhaus geometri | Daire-kare-üçgen ve ana renkler; kavram yalın biçime iner |

Tablolar bir palettir, hepsi aynı videoya girmez: 3. kuraldaki stil sınırı aynen geçerli. Kullanıcı "renkli, sıradışı" istediğinde ana stili alttaki canlı gruptan (ebru, vitray, riso, çini, psikedelik) seçmeyi dene; yine de gerekçe anlamdan gelmeli.

**Ek palet.** Aynı kurallarla seçilir. Reçeteleri 4. bölümde, kullanıcının söyleyebileceği İngilizce adlarla birlikte.

Çizgi, boya, baskı, kağıt:

| Bloğun türü / havası | Uygun stil | Neden |
|---|---|---|
| Gündelik durum, basit benzetme, "sıradan insan", hafif mizah | Çöp adam | Herkes kendini yerine koyar; sadelik fikri öne çıkarır |
| Ders, tanım, formül, "aslında şöyle" açıklaması | Tebeşir tahta | Öğretmen güveni verir; silinip yeniden yazılır |
| Keşif, fikir anı, merak, gece düşüncesi | Işıltılı çizim | Karanlıkta kendi kendine çizilen ışık; aydınlanma |
| Değer, zarafet, anma, saygı | Altın çizgi | Koyu zeminde ince altın kontur; ağırbaşlı ve seyrek |
| Taslak, ihtimal, hatıra defteri, kırılganlık | Karakalem | Bitmemişlik hissi; silinebilir çizgi |
| Sessizlik, yalnızlık, tefekkür, bilgelik, veda | Mürekkep (sumi) | Az fırça, çok boşluk; söylenmeyeni boşluk söyler |
| Yolculuk, mevsim, doğa gücü, destansı manzara | Ahşap baskı | Düz renk blokları ve solan gök; sakin heybet |
| Eski bilim, ansiklopedi, para, kurum, otorite | Gravür | Tarama çizgisi "eski kitap" resmiyeti verir |
| Çocukluk, uyku, şefkat, teselli | Pastel | Yumuşak gren, düşük kontrast; ses kısılır |
| Perde perde hikaye, sahne değişimi, "oyun içinde oyun" | Kağıt sahne | Katmanlar ayrı kayar, perde açılır |
| Adım adım dönüşüm, sabır, kırılgan güzellik | Origami | Her katlama bir karar; kağıt geri açılabilir |
| Çok sesli konu, kimlik, hafıza parçaları | Kolaj | Yırtık kağıt ve farklı dokular yan yana gelir |

Çizgi roman, dijital, retro:

| Bloğun türü / havası | Uygun stil | Neden |
|---|---|---|
| Suç, sır, ihanet, ahlaki ikilem, iç ses | Noir çizgi roman | Siyah-beyaz sert kontrast, tek kırmızı vurgu |
| Tüketim, şöhret, reklam, tekrar | Pop art | İri yarım ton noktalar, çığlık renkler; abartı bilinçli |
| Açık anlatım, keşif, çocuk merakı | Açık çizgi (ligne claire) | Eşit kontur, gölgesiz düz renk; her şey okunur |
| Eski zaman neşesi, absürt mizah, şarkılı sahne | 1930'lar çizgi filmi | Hortum gibi kol-bacak, siyah-beyaz; masum taşkınlık |
| Sistem, kod, bürokrasi, "makine konuşuyor" | ASCII terminal | Görüntü harflerden kurulur; soğuk gerçek |
| Radar, hedef, takip, uzay | CRT vektör | Siyah ekranda parlak çizgi ve fosfor izi |
| Gelecek tahmini, yapay zeka, "burada ama yok" | Hologram | Yarı saydam ve titrek; var ile yok arası |
| Gizli olanı görmek, öfke, beden, gözetim | Termal kamera | Duyguyu ısı olarak gösterir |
| Sahte nostalji, internet melankolisi, tüketim rüyası | Vaporwave | Pembe-mor gün batımı, ızgara zemin; ironik huzur |
| Olasılık, şans, kalabalık davranışı, "ortalama" | Galton tahtası | Çan eğrisi göz önünde kendiliğinden oluşur |

Tasarım akımları:

| Bloğun türü / havası | Uygun stil | Neden |
|---|---|---|
| Genel açıklama, nötr anlatım, hafif tonda "nasıl işler" | Düz vektör | Düz renk, yuvarlak biçim; güncel ve yorumsuz. Ana stil adayı |
| Zenginlik, ihtişam, hırs, yükseliş ve çöküş | Art Deco | Altın-siyah simetri, ışınlar, basamaklı biçim |
| Devlet, kurum, baskı, kitle | Brütalizm | Beton, dev blok, iri harf; insan küçülür |
| Oyunbazlık, kural bozma, 80'ler neşesi | Memphis | Kıvrım, konfeti, pastel + siyah desen |
| Düzen, veri, nesnellik, resmi açıklama | İsviçre düzeni | Izgara, sola yaslı yazı, tek kırmızı vurgu |
| Büyüme, doğa, şifa, kadim bilgi | Botanik süsleme | Dal çerçeveden içeri büyür |
| Sokak, itiraz, gençlik öfkesi | Grafiti | Sprey, damla, şablon; duvar konuşur |
| Açılış, kapanış, bölüm başlığı, "büyük iddia" | Afiş / dergi kapağı | Tek güçlü görsel + iri başlık |
| Huzur, hayret, belirsiz umut | Aurora | Koyu gökte akan renk perdeleri |
| Uygulama, arayüz, teknoloji ürünü | Buzlu cam | Bulanık renk üstünde yarı saydam kart |
| Ev, reklam çağı, iyimserlik, "güzel günler" | Mid-century | Toprak tonları, organik biçim |
| 2000'ler iyimserliği, ilk internet | Y2K | Parlak krom, kabarcık, parıltı |

3D (sade, kodla):

| Bloğun türü / havası | Uygun stil | Neden |
|---|---|---|
| Doğa, yolculuk, sade dünya, masal coğrafyası | Low poly | Az yüzey, düz gölge; dünya yalın bir maket olur |
| İnşa, emek, parça parça kurma, şehirleşme | Voxel | Küp küp kurulur ve dağılır |
| 2000'ler nostaljisi, çocukluk oyunları, tekinsiz boşluk | Retro oyun 3D | Düşük çözünürlük, titrek köşe, sis; eski konsol hafızası |
| Kurma-bozma, sistemin parçaları, takım işi | Yapı taşı oyuncak | Her şey sökülüp yeniden kurulabilir |
| Sıcak, şefkatli, komik gündelik hikaye; sakarlık | Kil | Parmak izi ve el yapımı kusur; sevimli |
| Canlı, neşeli, çocuk dostu anlatım | Toon / cel | Düz ton + siyah kontur; çizgi film netliği |
| Adım adım süreç, gündelik rutin, iş fikri | Anlatım 3D | Yuvarlak sade karakter, pastel oda; dikkat anlatımda kalır |
| Maskot, koleksiyon, sevimli ironi | Tasarım oyuncak | Parlak plastik, iri kafa; nesneleşmiş karakter |
| Nesne tanıtımı, mekanizma, "içine bakalım" | CGI ürün | Stüdyo ışığı, krom yansıma; nesne başroldedir |
| Sistem, şehir, ekonomi, "kuş bakışı düzen" | İzometrik | Küçük dünyada her şey aynı anda görünür |
| "Küçük dünya", uzaktan bakış, kader karşısında insan | Minyatür diorama | Kenar bulanıklığı sahneyi maket yapar |
| Büyüklük karşılaştırma, zaman içinde artış | 3D veri grafiği | Her birim bir nesne; sayı elle tutulur olur |

3D'yi mekan, nesne ya da derinlik anlatının parçasıysa ya da kullanıcı adıyla istediyse seç; yoksa 2D daha hızlı çıkar ve daha kişilikli durur. Piksel, ASCII, termal, hologram, gravür ve CRT filtre olarak da uygulanır (4. bölüm): ayrı sahne istemezler, bitmiş karenin üstüne gelirler.

Sabit kartlı 20 stil de palettedir (4. bölümde "Sabit kartlı stiller"): her kartın "Uygun" satırı bu tablolardaki ilk sütunun karşılığıdır. Aynı malzemenin hem kartı hem serbest reçetesi bloğa uyuyorsa kartı seç; kullanıcı kendi paletini verdiyse serbest reçeteyi kullan.

Atama kuralları:
- Önce ana stili seç: içeriğin genel havasına en yakın olan. Kanalın kimliği için kullanıcıya tek cümleyle öner.
- Diğer stilleri yalnızca tür değişen bloklara koy. Arka arkaya iki blok aynı türdeyse stil değiştirme.
- Bir stil en az 8 saniye ekranda kalsın; daha kısa blokları komşusuyla birleştir.
- Planı kullanıcıya kısa bir liste olarak göster (blok, süre, stil, tek cümle gerekçe) ve beklemeden ilk sahneye başla.

## 3. Geçişler

Geçiş, iki stilin malzemesini birbirine bağlamalı ve 0,3 saniyeyi geçmemeli. İşe yarayanlar:
- Işık patlayıp kağıt rengine dönüşür (perde -> kağıt).
- Boyalar aşağı akar; tablo masada kartpostala dönüşür, üstüne yeni malzeme çarpar.
- Makas ipleri keser, nesneler düşer, yeni kağıt üstüne kayar.
- Kısa renk silmesi ya da sert kesme (cümle sınırında).
Her geçişi sahnenin kendi dosyasının içine koy; bitmiş dosyalar arasında sonradan geçiş yapma.

## 4. Üretim (pratik ve ekonomik)

- 1920x1080, 30 fps. Yerleşimi 1280x720 mantıksal koordinatta yaz, 1,5 ile çarp.
- Her stil ayrı bir Python dosyası; ortak modülde tuval, yazı tipleri, zaman tablosu, easing ve kodlayıcı bulunsun. `frame(t)` saf fonksiyon olsun: hem tek kare hem tam render aynı koddan çıksın.
- Sahne başına tek dosya kodla (libx264, crf 18, yuv420p), geçici adla yaz, bitince yeniden adlandır. Sonra concat (`-c copy`) ve sesi `-c:v copy` ile ekle.
- İki çekirdek varsa iki 2D sahneyi aynı anda render et (3D'de kazancı yok; "3D sahneler" başlığına bak).
- Üç çizim yolu var: 2D sahneler Python'da (bu bölüm), 3D sahneler tarayıcıda Three.js ile ("3D sahneler"), filtreler bitmiş karenin üstüne Python'da ("Filtre stilleri"). Üçü de aynı boyut, kare hızı ve kodlayıcı ayarıyla sahne dosyası üretir; birleştirme aynıdır.
- Tam render öncesi 5-6 kareyi tek kontak föyünde birleştirip bak. Bitmiş videodan da geçiş anlarını içeren 8-12 kare alıp kontrol et.
- Yazı tipleri (Türkçe destekli): Lora ve Lora Italic (edebi altyazı), TeX Gyre Chorus (el yazısı havası), TeX Gyre Heros Cn Bold (manşet), TeX Gyre Cursor (daktilo), TeX Gyre Pagella Bold (gazete adı), Poppins ve Inter (düz, modern).
- Altyazı stile uygun olsun ve birim birim değişsin. Metin zaten sahnede yazılıyorsa (manşet, daktilo) ayrı altyazı koyma.
- Deneme videolarında köşeye küçük stil etiketi koy; asıl videoda kaldır.

### Stil reçeteleri (kısa)

- **Gölge oyunu:** ılık ışıklı kumaş (merkezden kenara renk geçişi + dokuma dokusu + hafif titreme), koyu çerçeve ve delikli bordür. Figürler: koyu kontur + yarı saydam renkli iç (maske ve çarpım katmanı), eklem yerlerinden döner; giren nesne bulanık başlar, perdeye yaklaşınca netleşir. Çene ses zarfıyla oynar.
- **Sulu boya:** dokulu kağıt; her boya katmanı maske x (kenar koyulaşması + lekelenme + gren) yoğunluğu, renkler çarpımsal (emilim toplanır, exp ile uygulanır). Boya bir noktadan ya da süpürerek açılır; ıslakken koyu, kururken açılır. Üstüne titrek mürekkep çizgileri çizilerek gelir. Alttaki boyayı kapatması gereken nesnede "örtücü" katman kullan, önceden boşluk bırakma (erken görünür). Bitişte boyaları aşağı akıt.
- **Gazete kolajı:** koyu masa, sararmış gazete sayfası (kurgusal gazete adı), yarım ton fotoğraf, kelime kelime basılan manşet, yırtık şeritte daktilo yazısı, bant, takvim, kırmızı damga. Hareket 15 pozda (ikişer kare), çarpma anında hafif sarsıntı.
- **Kağıt kesme:** lifli kağıt dokusu, eğri kesim kenarı, parça altı gölge, raptiyeli kukla, ipte sallanan nesneler, 15 poz.
- **İnfografik:** koyu ızgara zemin, gösterge, kart, ilerleme çubuğu; yalnızca temsili ya da kullanıcının verdiği gerçek veriler.

- **Ebru:** koyu ya da krem "tekne" zemini, hafif su parıltısı. Her damla bir daire olarak düşer ve öncekileri dışarı iter (damla formülü: noktaları merkezden sqrt(r² + a²) uzaklığına taşı). Tarak ve biz hareketi, noktaları çizgi boyunca üstel azalan kaydırmadır. Şekli (lale, kuş, harf) son biz darbeleri ortaya çıkarır. Bitiş: kağıt üstüne kapanır, kaldırılınca desen kağıtta kalır. Yazı: TeX Gyre Chorus, altın ya da krem.
- **Vitray:** siyah kurşun çizgilerle Voronoi benzeri parçalar; her cam parçası doygun renk + iç gren + kenarda koyulaşma. Arkadan gezen ışık kaynağı parlaklığı çarpar, zemine renkli ışık lekeleri düşer. Parçalar tek tek "yanarak" açılır. Yazı: Pagella Bold, cam parçası içine.
- **Linol baskı:** kirli beyaz kağıt, 2-3 düz renk (ör. siyah + kiremit + hardal). Biçimler kalın, köşeli; kenarlar hafif tırtıklı, mürekkep içinde gürültüyle açılan boşluklar. Her renk ayrı "baskı" olarak merdane geçişiyle gelir ve 2-4 piksel kayık oturur. Hareket 12 poz. Yazı: Heros Cn Bold, oyulmuş gibi.
- **Riso baskı:** 2-3 floresan spot renk (pembe, turkuaz, sarı), çarpımsal üst üste biner ve üçüncü rengi doğurur. Yarım ton noktalı gölgeler, belirgin gren, katmanlar arası 3-5 piksel kayma. Biçimler düz ve iri. Geçişte katmanlar ayrı yönlere kayar. Yazı: Poppins kalın.
- **Neon tabela:** koyu tuğla ya da ıslak asfalt zemin. Borular: beyaza yakın çekirdek çizgi + aynı çizginin 2-3 kademe bulanık renkli halesi (toplamsal). Açılışta titreyerek yanar, arada bir harf cızırdar; yerde bulanık yansıma. Aynı anda en fazla iki renk. Yazı: tek çizgili el yazısı havası (Chorus), boru gibi çizilerek gelir.
- **Çini / mozaik:** kireç derzli zemin, küçük kare ya da altıgen parçalar; her parçada hafif renk sapması ve parlak sır yansıması. Kobalt, turkuaz, mercan kırmızısı, beyaz. Parçalar tek tek ya da dalga halinde yerine oturur; görüntü uzaklaştıkça okunur. Kırılma anı için parçaları dağıt. Yazı: parçalardan dizilir ya da Pagella.
- **Nakış:** keten kumaş dokusu (dokuma ızgarası + gölge), kasnak çerçeve. Çizgiler kesik dikiş olarak ilerler, dolgu alanlar paralel saten dikişle taranır; her dikişte küçük kabarıklık gölgesi. İğne ucu görünür, iplik arkasından gelir. Bitiş ya da kayıp için ipliği geri sök. Yazı: çapraz dikiş harfler ya da Chorus.
- **Minyatür:** krem aharlı kağıt, altın varak çerçeve (gezen parlama), perspektifsiz üst üste dizilmiş katlar, düz doygun renkler (lacivert, zincifre, zümrüt), ince kontur. Figürler kurgusal ve yüzleri sade; kağıt kesme gibi kayarak ve eklemden dönerek oynar. Bulut ve su kıvrımları yavaşça akar. Yazı: çerçeveli kartuş içinde Lora Italic.
- **Mavi teknik çizim:** lacivert zemin, ince beyaz ızgara, beyaz/açık mavi çizgiler cetvelle çizilir gibi uçtan uca ilerler; ölçü okları, kesit taraması, numaralı etiketler. Tek vurgu rengi (turuncu). Yazı: Cursor ya da Inter, büyük harf.
- **VHS / glitch:** görüntüyü R, G, B kanallarına ayırıp yatayda farklı kaydır; tarama çizgileri, altta bant gürültüsü şeridi, ara sıra satır kayması ve renk taşması. Efekt kısa patlamalarla gelsin (0,2-0,4 sn), sürekli titretme. Yazı: Cursor, köşede kurgusal sayaç.
- **Psikedelik afiş:** birbirine zıt doygun çiftler (mor-turuncu, pembe-yeşil), eşmerkezli dalgalanan halkalar, sinüsle bükülen ve boşluğu dolduran harfler. Renkler yavaşça döner (ton kaydırma), biçimler nefes alır gibi büyür küçülür. Okunurluk için metin odağı tek ve iri.
- **Bauhaus geometri:** kırık beyaz zemin, kırmızı-sarı-mavi + siyah; yalnızca daire, kare, üçgen, çizgi. Biçimler ızgaraya oturarak kayar, döner, birbirini keser; kesişimde renk çarpılır. Her kavram tek biçimle temsil edilir ve sahne boyunca aynı kalır. Yazı: Poppins, küçük harf.

Ek 2D reçeteler (parantezde kullanıcının söyleyebileceği İngilizce adlar):

- **Çöp adam** (Stickman, Minimal Line, Line Art) ✓: kırık beyaz kağıt, 7 px koyu çizgi, hafif dalgalı (1,5 px; 3-4 karede bir yeniden titret). Kafa daire, gövde ve uzuvlar tek çizgi, yüz iki nokta + kavis. Arkada kalan çizgiyi zemin renkli dolguyla ört. Tek vurgu rengi yalnız anlam taşıyan nesnede.
- **Tebeşir tahta** (Chalkboard) ✓: koyu yeşil tahta + geniş leke gürültüsü + silgi izi, ahşap çerçeve. Çizgi 7 px, ince gürültü eşiğiyle (yaklaşık üçte biri boşluk) kırılır, çevresinde hafif toz halesi. Dolgu yerine renkli tebeşir taraması; ok ve etiketle işaretle. Yazı: Chorus, aynı grenle.
- **Işıltılı çizim** (Glow Sketch) ✓: lacivert-siyah zemin, seyrek yıldız. 3 px beyaz çekirdek + aynı çizginin 3, 9 ve 26 px bulanık renkli haleleri (toplamsal). İki renk (camgöbeği, macenta) + odakta sıcak renk. Çizgi uçtan uca çizilir, kalem ucunda parlak nokta.
- **Altın çizgi** (Gold Line Art) ✓: koyu zümrüt ya da lacivert zemin, kenara doğru kararır. 3 px çizgi; rengi açık altın ile koyu altın arasında yavaş gürültüyle değişir, 6 px ılık hale. Kesik çizgili süs halkaları, köşelerde dört uçlu parıltı; seyrek tut. Yazı: Lora Italic, altın.
- **Karakalem** (Pencil Sketch, Grease Pencil) ✓: grenli krem kağıt. Her dış çizgi üç kez, farklı titremeyle (2,2 px), yarı saydam çarpımsal. Gölge 45° tarama (7-11 px aralık), koyu yerde çapraz ikinci yön. Hareket: çizgi "kaynar" (4 karede bir yeni titreme).
- **Mürekkep** (Ink Wash, Sumi Ink, Japanese Ink) ✓: lifli krem kağıt. Islak leke: maskeyi 13-26 px bulandır, eşikle, kenarını koyulaştır, içini gürültüyle lekele (çarpımsal). Kuru fırça: kalın çizgi x fırça yönünde uzamış gürültü. Kadrajın yarısından fazlası boş. Tek renk vurgusu kiremit kırmızı. Mühür soyut bir işaret olsun; gerçek harf ya da damga taklidi yok.
- **Ahşap baskı** (Woodblock Print, Ukiyo-e) ✓: gök üstte çivit mavisi, aşağı doğru kreme solar. Düz renk blokları yatay ahşap damarıyla çarpılır. Koyu kontur 4,5 px, dolgudan 3 px kayık ve yer yer kırık. Yatay bulut bantları, köşede dikey kırmızı başlık kartuşu. Palet: çivit, adaçayı, hardal, kiremit, krem. Bilinen bir baskıyı kopyalama.
- **Pastel** (Dreamy Pastel) ✓: pembe-krem gök, düşük kontrastlı palet. Kenarlar 2-3 px yumuşak, dolgu ince grenle delikli. Odağın çevresinde geniş ılık hale, birkaç parıltı. Fazla bulandırma: biçimler seçilmeli.
- **Kağıt sahne** (Paper Theatre): 4-6 düz katman, aralarında gölge; katmanlar farklı hızda kayar. Sahne çerçevesi ve açılan perde; dekor yandan ya da üstten girer. Karton (Cardboard Craft) varyantı: oluklu mukavva dokusu ve bant.
- **Origami** ✓: her biçim 6-9 köşeli çokgene iner, merkezden üçgenlere bölünür. Üçgenler ışık yönüne göre farklı ton alır, kat izleri ince beyaz, biçim altında yumuşak gölge. Hareket: üçgen kat çizgisi etrafında döner (ölçek 1'den -1'e, ton değişir).
- **Kolaj** (Collage Art, Mixed Media, Surreal): yırtık kenarlı kağıtlar (kenarda beyaz lif), farklı dokular (çizgili defter, kraft, yarım ton), bant, hafif eğim. Parçalar 2 karede oturur. Gazete kolajından farkı: belge değil duygu.
- **Noir çizgi roman** (Noir Comic, Cel-Shaded Noir, Graphic Novel) ✓: yalnız siyah, beyaz ve tek kırmızı. Işık kaynağından yere beyaz kama; figür siluet + ışık tarafında 4 px beyaz kenar. İnce yağmur çizgileri, gren, vinyet. İç ses beyaz çerçeveli kutuda, Cursor ile.
- **Pop art** (Pop Art, Pulp Comic, Thick-Line Graphic) ✓: doygun düz renk + 8 px siyah kontur. Gökte ve gölgelerde yarım ton noktaları (13-16 px aralık, yarıçap koyulukla büyür). Odağın arkasında yıldız patlaması; eğik, konturlu efekt yazısı (Heros Cn Bold). Tanınmış bir eseri ya da ünlü yüzünü kopyalama.
- **Açık çizgi** (Ligne Claire) ✓: 3,5 px eşit kalınlıkta siyah kontur, gölgesiz düz renk, taramasız. Her biçim önce dolgu, sonra kendi konturu (ressam sırası). Karakterler özgün.
- **1930'lar çizgi filmi** (1930s Cartoon, Rubber Hose) ✓: gri tonlama + hafif sepya, 8-9 px kontur. Uzuvlar eklemsiz kalın eğri, pasta dilimi gözler, iri ayakkabı; nesneler de esner. Film çiziği, toz lekesi, güçlü gren, yuvarlak vinyet, hafif bulanıklık. 12 fps, sürekli zıplama. Karakter özgün olsun: dönemin bilinen karakterlerinin kulağını, eldivenini, siluetini kopyalama.
- **Vaporwave** (Vaporwave, Eighties Retro) ✓: mor, macenta, turuncu gök. Aşağı doğru kalınlaşan yatay kesikli güneş. Ufukta kaçış noktalı ızgara (yataylar aşağı doğru seyrekleşir), çizgide macenta hale. Siluetler koyu mor, odak nesnede camgöbeği neon kenar, tarama çizgisi, yazıda pembe-camgöbeği kayma. Marka logosu yok.
- **Galton tahtası** (Galton Board) ✓: 12 sıra çivi. Her top için sol/sağ dizisi önceden çekilir (tohumlu rastgele); konum t'den hesaplanır (top başına gecikme, satır başına 0,11 sn, satır arası küçük sıçrama). Biten top hücresinde üçlü sıralarla istiflenir; üstüne beklenen çan eğrisi. Gerçek simülasyon: sonucu elle düzeltme.
- **Düz vektör** (Flat Vector, Vector Art) ✓: 5-6 renk, kontur yok, yuvarlak biçim. Nesnelerden sağ alta soluk uzun gölge, odakta yumuşak hale, çok hafif gren. Hareket: yaylanarak oturma, ögeler 60-80 ms arayla.
- **Art Deco** (Art Deco, Dark Deco) ✓: lacivert-siyah zemin, altın çizgi. Odaktan yayılan ışınlar (her üçüncüsü kalın), basamaklı iç içe çerçeve, yelpaze katlı ağaç, zeminde balık pulu yayları, çift kenar çerçevesi. Simetri. Başlık geniş aralıklı büyük harf (Poppins), iki yanında üçlü çizgi.
- **Brütalizm** (Brutalism): beton dokusu (gürültü + kalıp izi), dev bloklar, sert gölge, tek sinyal rengi, dev sıkışık büyük harf (Heros Cn Bold). İnsan figürü küçük.
- **Memphis** (Memphis Design): kıvrım çizgi, üçgen, nokta, zikzak; pastel + siyah desen; biçimlerin kayık siyah gölgesi. Ögeler zıplayarak girer.
- **İsviçre düzeni** (Swiss Design, Editorial): beyaz zemin, görünür ızgara, sola yaslı Inter ya da Heros, tek kırmızı vurgu, iri numara. Hareket yalnız ızgara çizgileri boyunca.
- **Botanik süsleme** (Botanical, Ornamental, Bohemian): dal eğrisi uçtan büyür, yapraklar sırayla açılır, simetrik çerçeve süsü; toprak tonları.
- **Grafiti** (Graffiti): tuğla duvar. Sprey: yumuşak kenarlı çizgi + çevresinde serpinti + zamanla uzayan damla. Şablon: keskin kenar + hale.
- **Afiş / dergi kapağı** (Poster Art, Magazine Cover, Movie Poster): tek güçlü görsel + iri başlık. Dergi adı ve künye kurgusal; gerçek bir afişin düzenini kopyalama.
- **Aurora**: koyu gök, yıldız. Dikey ışık perdeleri (x'e bağlı gürültü + düşeyde sönüm), yeşil-mor toplamsal, yavaş dalga; önde siyah siluet.
- **Buzlu cam** (Glassmorphism): renkli bulanık toplar. Kart: arka planın 20 px bulanığı + hafif beyaz + 1 px açık kenar + yumuşak gölge.
- **Mid-century** (Mid-Century, Seventies, Retro): hardal, petrol, kiremit, krem; bumerang ve böbrek biçimler, yıldız patlaması, kuru fırça kenarı.
- **Y2K** (Y2K Glossy, Holographic): parlak kabarcık (radyal geçiş + parlama), krom yazı (ufuk çizgili dikey geçiş), dört uçlu parıltılar; mavi, gümüş, pembe.

✓ işaretli reçeteler Kasım 2026'da durağan tek karede denendi (hareket kısmı denenmedi). İşaretsizler, yukarıdaki ebru-Bauhaus grubu dahil, tarif düzeyindedir ve ayar isteyebilir. Hangisi olursa olsun, bir reçeteyi ilk kullanışta tek karede dene ve kontak föyüne bak.

Yeni bir stil gerekiyorsa aynı kalıbı izle: malzeme dokusu + o malzemenin doğal hareketi + o malzemeye uygun yazı.

### Filtre stilleri (bitmiş karenin üstüne)

Ayrı sahne çizmezler: 2D ya da 3D bir karenin üstüne Python'da (numpy, cv2) uygulanırlar. Bir sahnenin tamamında ya da kısa bir bölümünde açılıp kapanabilirler; anlam gerekçesi yine şart.

- **Piksel** (Pixel Art, Pixel Explainer) ✓: 320x180'e küçült (alan ortalaması), k-means ile 16-24 renge indir, en yakın komşuyla 6 kat büyüt. Elle çizilen piksel sahne için "Retro piksel" satırı geçerli.
- **ASCII terminal** (ASCII Art, ASCII Terminal, Retro Terminal) ✓: 14x26 px hücre. Parlaklığı yüzdeliklerle ger (%4 ile %99,5 arası), gama 1,7. Rampa ` .:-=+*#%@`. Glifleri önceden karo olarak çiz, dizinle birleştir. Yeşil fosfor + bulanık hale + tarama çizgisi. Odak karedeki en parlak yer olmalı; açık renk gök ekranı doldurur.
- **Termal kamera** (Thermal Cam) ✓: parlaklık + sıcak renk farkını 7 px bulandır, 0-1 arasına ger; palet siyah, çivit, mor, kırmızı, turuncu, sarı, beyaz. Artı işareti ve sıcak-soğuk çubuğu; derece uydurma. Neyin "sıcak" olacağını anlam belirler.
- **Hologram** (Hologram, Hologram AR, Futuristic) ✓: yalnız özneye uygula, zemin koyu kalsın. Dış çizgi + soluk dolgu, camgöbeği toplamsal hale, 3 pikselde bir tarama çizgisi, birkaç satırda yatay kayma, pembe ve mavi kenar saçağı; altta projektör halkaları ve ışık konisi.
- **Gravür** (Vintage Engraving, Victorian) ✓: krem kağıt, sepya mürekkep. Koyuluğa göre kalınlaşan paralel çizgi (9 px aralık, yaklaşık 35°); koyuluk yarıyı geçince çapraz ikinci yön. Üstüne kenar çizgisi (Canny), çift çerçeve.
- **CRT vektör** (CRT Vector) ✓: kenarları çıkar (Canny), siyah zeminde yeşil çekirdek + iki kademe hale. Fosfor izi: önceki konumların soluk kopyaları (durum tutma, t'den hesapla). Hafif fıçı bükülmesi, tarama çizgisi, köşede kurgusal gösterge yazısı.
- VHS / glitch, yarım ton noktası ve riso renk ayrımı da aynı şekilde filtre olarak kullanılabilir.

### 3D sahneler (sade, kodla)

Beklenti: karakterler kutu, küre, kapsül ve silindirden kurulur; temiz ve oyuncak gibi durur, film kalitesi değildir. Yüz iki nokta gözdür, ifade beden diliyle verilir. İlk 3D sahneden önce bunu kullanıcıya bir cümleyle söyle.

Yol (Kasım 2026'da denendi: Three.js r187, yazılımla çizim, ekran kartı yok):
1. Sahne klasöründe `npm install three`. Klasörü `python3 -m http.server` ile sun (file:// modül yüklemez). HTML'de importmap: `three` -> `/node_modules/three/build/three.module.js`, `three/addons/` -> `/node_modules/three/examples/jsm/`.
2. Python Playwright ile `/usr/bin/google-chrome` aç (headless); bayraklar: `--no-sandbox --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`. Görünüm 1920x1080.
3. Her sahne ayrı bir HTML dosyası; gök, ışık, malzeme ve figür yardımcıları ortak. Tuval 1920x1080, `WebGLRenderer({canvas, antialias:true, preserveDrawingBuffer:true})`, `setPixelRatio(1)`. `window.draw(t)` saf olsun (aynı t aynı kareyi verir) ve `gl.finish()` ile bitsin; Python her kare için `draw(i/30)` çağırır.
4. Kareyi `page.screenshot(type="jpeg", quality=92)` ile al, baytları ffmpeg'e boruyla ver (`-f image2pipe -c:v mjpeg -framerate 30 -i -`), çıkışta bu bölümdeki kodlayıcı ayarlarını kullan. Ekran görüntüsü HTML katmanını da alır: altyazıyı ve etiketleri tuvalin üstüne HTML/CSS ile koy (sistem yazı tipleri ve Türkçe karakterler sorunsuz). Bir 3D noktaya etiket için `vector.project(camera)` ile piksel konumunu bul.
5. Çizim süresi, 1080p'de kare başına: retro 0,05 sn; toon, low poly, izometrik, anlatım 0,2-0,5 sn; ürün ve tasarım oyuncak 0,5 sn; ışımalı çizgi 0,6 sn; kil ve veri grafiği 0,7 sn; tilt-shift 0,8 sn; voxel ve yapı taşı 1,1-1,3 sn. Ekran görüntüsü kare başına 0,15 sn kadar ekler. 10 saniyelik sahne 300 karedir: 1 ile 7 dakika arası. İki 3D sahneyi aynı anda çizmek yalnızca %10-15 kazandırır (çizici zaten iki çekirdeği kullanır); sırayla çiz. 12 fps stillerde yalnız 12 kare/sn çiz: ffmpeg girişine `-framerate 12`, çıkışına `-r 30`.
6. Tuzaklar: `scene.add(mesh)` sahneyi döndürür, zincirleme `.position.set(...)` bütün sahneyi kaydırır. r187'de yumuşak gölge `PCFShadowMap` + `light.shadow.radius` (3-7) ile olur. Son işlem hedefinde `HalfFloatType` üç kat yavaş: `UnsignedByteType` ve `samples:4` kullan. Bloom parlak sahnede her şeyi patlatır: yalnız koyu zeminli çizgi sahnelerinde kullan. Kalın çizgi için `LineSegments2` ya da `Line2` gerekir (düz çizgi 1 px kalır). `MeshBasicMaterial` gölgelendiricisinde `objectNormal` tanımsız; tepe noktasını şişirirken `normal` kullan.

3D reçeteler (hepsi ✓):

- **Low poly** (Low Poly 3D): az yüzeyli geometri (`IcosahedronGeometry(r, 0)`, 6 kenarlı silindir), `flatShading:true`, köşeleri hafif kaydırılmış zemin ağı. Sıcak yönlü ışık + yarım küre ışığı, sis, köşe renkli gök küresi.
- **Voxel** (Voxel Art): 0,25 birimlik küpler `InstancedMesh` ile; `setColorAt` ile küp başına hafif ton sapması; tam sayı yükseklik haritası. Yapı küp küp kurulur ya da dağılır. Bilinen bir oyunun karakterini ya da blok dokusunu kopyalama.
- **Retro oyun 3D** (PS1 Style, PS2 Style, Retro Game 3D, Nintendo DS Style): 480x270 çiz, CSS `image-rendering:pixelated` ile tuvali 4 kat büyüt; `antialias:false`. 32 px gürültülü doku, `NearestFilter`. Köşe titremesi: `onBeforeCompile` ile `project_vertex` sonrasında ekran konumunu 120x67,5'lik ızgaraya yuvarla. Renk: kanal başına 24 kademe + 4x4 Bayer titreme. Koyu sis. Konsol logosu, oyun karakteri yok.
- **Yapı taşı oyuncak** (Brick Toy, Toy Bricks): düğme aralığı 0,4; tuğla yüksekliği 0,48, plaka 0,16; tuğlalar arası 0,014 boşluk. Üst yüzeye silindir düğmeler (`InstancedMesh`). Parlak plastik: `roughness:0.3` + `RoomEnvironment` + ACES ton eşleme. Sınırlı doygun palet. Parçalar tek tek düşüp oturur. Figür özgün olsun (ör. kutu kafalı robot).
- **Kil** (Clay 3D, Claymation, Stop-Motion Clay, Claymorphism): yuvarlak geometri (kutu yerine `RoundedBoxGeometry`). Köşeleri konuma bağlı gürültüyle, yarıçapın %5'i kadar oynat (aynı konum aynı kayma; normal boyunca itersen dikişler açılır), sonra normalleri yeniden hesapla. `roughness:0.9` + parmak izi `bumpMap` (tuvale eş merkezli elipsler). Yumuşak gölge (radius 7). 12 fps + poz başına minik titreme.
- **Toon / cel** (Cartoon, Anime Cel, Cel-Shaded, Comic Book 3D): `MeshToonMaterial` + 4 kademeli `gradientMap` (`DataTexture`, `NearestFilter`). Kontur: aynı geometrinin `BackSide` siyah kopyası, köşeleri normal boyunca 0,026 şişirilmiş. Düz gök, beyaz bulut. Çizgi roman hissi için üstüne yarım ton filtresi.
- **Anlatım 3D** (Explainer 3D, 3D Cartoon): kapsül gövde + küre kafa + nokta göz; pastel oda (zemin, duvar, pencere, masa, bitki); mat malzeme (`roughness:0.75`), yumuşak gölge. Yürüyüş: bacak ve kollara zıt fazlı sinüs, gövdede küçük zıplama.
- **Tasarım oyuncak** (Vinyl Toy): iri kafa, küçük gövde. `MeshPhysicalMaterial` (`clearcoat:1`, `clearcoatRoughness:0.08`). Döner sehpa; zemin fon rengiyle aynı + sis (sonsuz fon).
- **CGI ürün** (CGI Motion, CGI Product, 3D CGI, Metallic Chrome): `LatheGeometry` gövde, metal parçalar (`metalness:1`, `roughness` 0,08-0,3), `RoomEnvironment` yansıması, ACES, yumuşak gölge. Nesne yavaş döner, kamera hafif yaklaşır. Ürün kurgusal; gerçek marka yok.
- **İzometrik** (Isometric): `OrthographicCamera`, konum (20, 20, 20), merkeze bakar. Kalın bir zemin bloğu üstünde küçük dünya; düz renk, yumuşak gölge. 2D'de aynı görünüm: sx = (x - y)·cos30°, sy = (x + y)·sin30° - z.
- **Minyatür diorama** (Miniature Diorama, Clay Diorama): sahneyi yuvarlak ahşap tabana koy; kamera yüksekten, dar açıyla (fov 20). `HorizontalTiltShiftShader` + `VerticalTiltShiftShader` (h = 11/genişlik, v = 11/yükseklik, r = 0,5), doygunluğu 1,35 kat artır, hafif vinyet.
- **Işıltılı kenar çizgisi** (Glow Sketch 3D, Neon Glow 3D, Blueprint 3D): yüzeyleri zemin renginde ört (`polygonOffset`), `EdgesGeometry(geo, 15)` -> `LineSegments2` (2,6 px), üstüne `UnrealBloomPass` (güç 0,85; yarıçap 0,55; eşik 0,02). Çizilerek gelme: `computeLineDistances()`, `dashed:true`, `dashSize` = toplam uzunluk x ilerleme, `gapSize` çok büyük.
- **3D veri grafiği** (3D Data Chart): her birim bir nesne (deste, kutu); sütunlar yukarıdan düşerek istiflenir, hafif rastgele açıyla. Etiketler HTML katmanında. Yalnız gerçek veri ya da ekranda "temsili" diye yazılmış veri.

### Sabit kartlı stiller (Motion Stil Atlası)

Kullanıcının atlasından 20 hazır görsel dil. Serbest reçetelerden farkı: kartın paleti, yazısı, hareket grameri ve yasakları sabittir; kart seçilince o bölüm boyunca kart yönetir. Kart, adıyla istendiğinde ya da "Uygun" satırı bloğa oturduğunda kullanılır. "Çizim" notu tekniği verir ya da ilgili reçeteye gönderir; kart ile reçete çelişirse kart kazanır. 20 kartın hepsi Kasım 2026'da kendi paletiyle durağan tek karede denendi; hareket kısımları denenmedi.

Kart kuralları (yalnız kartlarda geçerli):
- Palet kapalıdır: listede olmayan renk kullanılmaz; gölge ve saydamlık paletin tonlarıyla yapılır. Kartın kendi metninde adı geçen renk (ör. beyaz kontur) serbesttir.
- Bir sahnede tek bir şey hareket eder ya da tek bir yöne hareket edilir. Dikkat bölünmez.
- Yazı en çok iki boydadır: büyük ve küçük. Arası yok.
- Türkçe karakterleri (ç, ş, ğ, ü, ö, ı, İ) seçilen yazı tipinde render alıp doğrula; büyük harfe çevirirken i ve ı ayrımını koru.
- Güvenli alan: kenarlardan en az %6 boşluk; dikey videoda altta %20, üstte %12 arayüz için boş kalır.
- Durmak da harekettir: her 5-8 saniyede en az yarım saniye tam duruş.
- Bir kart en az 20 saniye ekranda kalsın (yaklaşık 30 saniyede bir değişebilir). Art arda gelen iki kart farklı aileden olsun. Geçiş kesme ya da tek hamle olsun, çapraz erime olmasın; tek bir menteşe öge (bir renk, bir biçim ya da ses dalgası) önceki kartın son karesinde ve sonrakinin ilk karesinde aynı yerde dursun.
- Klişe listesi (kartlarda kullanma): mor mavi gradyan zemin, cam efekti kartlar, her şeyde yuvarlak köşe, havada süzülen parçacıklar, her ögede aynı aşağıdan yukarı belirme, sürekli parlama ve ışık çizgisi, emoji ikon, sebepsiz glitch, her kelimeye ayrı renk, ortalanmış başlık ve altında üç kutu düzeni.

Aileler: A baskı ve kağıt, B tipografi ve düzen, C el ve zanaat, D teknik ve veri, E mekan ve ışık.

- **1. Kağıt Kesiği Kolaj** (A): yırtık kenarlı kağıt katmanları, stop motion hissi. Palet: `#e9dcc3 #e8553a #2f6f73 #f0b84a #1d3a4a`. Yazı: kalın sıkışık grotesk, beyaz konturlu çıkartma gibi, hafif eğik. Hareket: 8 fps adımlı; her karede 1-2 piksel titreme; katmanlar farklı hızda kayar; kağıt gölgesi sert ve kısa. Kaçın: yumuşak ease, gradyan, kusursuz vektör kenar. Uygun: hikaye anlatımı, kural listesi, sıcak tonlu açıklama. Çizim: Kağıt kesme reçetesi; yırtık kenar için maskeyi hafif bulandır, gürültü ekle, eşikle; altına paletin açık tonuyla lif kenarı.
- **2. Risograf Kayması** (A): iki mürekkep üst üste, baskı hatası bilerek bırakılmış. Palet: `#f3eee2 #ff5a8a #2b50d6`. Yazı: kalın display, iki renk 4-5 piksel ofsetli. Hareket: katmanlar multiply ile karışır; kayma 10 fps'te değişir; üstte hareketli gren. Kaçın: üçüncü renk, gölge, saf siyah. Uygun: kültür, müzik, etkinlik duyurusu, genç ton. Çizim: Riso baskı reçetesi, yalnız iki mürekkeple.
- **3. İsviçre Izgarası** (B): her şey 8 kolonluk ızgaraya oturur. Palet: `#f4f4f1 #111111 #e2231a`. Yazı: Helvetica ailesi (burada TeX Gyre Heros), küçük harf, sola yaslı, dev başlık ve minik metin. Hareket: sadece yatay ve dikey kayma; yazı maskeden çıkar; duruşlar sert; kolon çizgileri görünür kalabilir. Kaçın: dönme, ortalama, dekoratif öge. Uygun: ciddi açıklama, kurumsal, rakam ve madde. Çizim: İsviçre düzeni reçetesi.
- **4. Derin Tipografi** (B): kelimeler derinlikte asılı, kamera aralarından geçer. Palet: `#0e1430 #eef1ff #ffd23f`. Yazı: tek bir sıkışık display font (burada Heros Cn Bold), büyük harf. Hareket: kamera z ekseninde sabit hızla ilerler; yakın kelime büyür ve erir; vurgu kelimesi sarı, gerisi beyaz; yatay salınım çok az. Kaçın: her kelimeye ayrı efekt, 3D ekstrüzyon, parlama. Uygun: seslendirmeye kilitli anlatım, manifesto, hızlı tempo. Çizim: kelime boyu derinlikle ters orantılı (odak kelime 310 px ise 310/z); uzak kelime zemine doğru solar; en yakın kelime dev, bulanık ve neredeyse saydam.
- **5. Teknik Çizim** (D): mühendislik paftası, çizgi çizgi kurulur. Palet: `#0f3f8c #eaf2ff`. Yazı: tek kalınlıkta mono, büyük harf, ölçü etiketi ve pafta notu. Hareket: çizgiler baştan sona çizilir; önce gövde, sonra detay, en son ölçü okları; hiçbir şey dolmaz. Kaçın: dolgu, renk çeşitliliği, yumuşak gölge. Uygun: nasıl çalışır anlatımı, sistem mimarisi, ürün anatomisi. Çizim: Mavi teknik çizim reçetesi, turuncu vurgu olmadan; ok uçları iki açık çizgi.
- **6. Split-flap Tabela** (B): havalimanı tabelası, harfler çevrilerek oturur. Palet: `#0c0c0d #1b1b1d #f2e9c9 #ffcc00`. Yazı: sıkışık sans, sabit hücre, hücre ortasında ince yarık. Hareket: harfler soldan sağa sırayla durur; durmadan önce saniyede 15-18 rastgele karakter; sarı sadece küçük etiketlerde. Kaçın: kayan yazı, yumuşak geçiş, renkli zemin. Uygun: tarih, saat, sıralama, durum değişimi, geri sayım. Çizim: sabit hücre ızgarası; dönen hücrede üst yarıda bir harf, alt yarıda başka harf, ikisi de soluk.
- **7. Termal Fiş** (A): yazarkasa fişi, satır satır basılır. Palet: `#cfd2d6 #fbfbf8 #222222`. Yazı: mono, tek boy, hizalama boşluk ve noktayla. Hareket: kağıt sabit hızla iner; satır basıldığı anda belirir; sonda kısa besleme ve tırtıklı kesim. Kaçın: ikon, renk, büyük başlık. Uygun: maliyet dökümü, liste, özet, mizahi ciddiyet. Çizim: zemin üstünde kağıt şeridi, alt kenar üçgen dişli; baskı koyuluğu ince gürültüyle dalgalanır.
- **8. Fotokopi Zine** (A): kes yapıştır harfler, fotokopi kiri. Palet: `#f2f0ea #111111`. Yazı: her harf başka fonttan, kutulu, eğik, yarısı negatif. Hareket: 6 fps; harfler yerinde zıplar; dikey tarama çizgisi geçer; kum gibi gren. Kaçın: hizalı düzen, gri ton, temiz kenar. Uygun: itiraz, uyarı, dürüst itiraf, enerji isteyen bölüm. Çizim: harf başına rastgele yazı tipi, kutu ve 9 dereceye kadar eğim; kir için benek, kenar gölgesi ve dikey şerit; en sonda bütün kareyi iki tona eşikle.
- **9. Halftone Baskı** (A): biçim nokta büyüklüğüyle anlatılır. Palet: `#f4e8cf #e23d28 #1b2a6b`. Yazı: kalın slab ya da gazete başlığı serifi (burada Bonum Bold). Hareket: noktalar büyüyüp küçülerek biçimi taşır; iki katman iki ayrı açıda (15 ve 60 derece) ve multiply. Kaçın: düz dolgu, bulanıklık, fotoğraf. Uygun: haber tonu, karşılaştırma, iki fikrin çarpışması. Çizim: Pop art reçetesindeki yarım ton noktası, 24 px aralıkla.
- **10. Bauhaus Mekanik** (B): daire, kare, üçgen saat mekanizması gibi çalışır. Palet: `#efe6d2 #d62f24 #1f4fa3 #f0b323 #161616`. Yazı: geometrik sans (burada Adventor ya da Poppins), küçük harf. Hareket: 90 derecelik adımlı dönüş, kısa duruş, tekrar; sarkaç ritmi; her şekil tek bir iş yapar. Kaçın: organik biçim, doku, dördüncü ana renk. Uygun: süreç, döngü, sistem parçaları. Çizim: Bauhaus geometri reçetesi.
- **11. Mürekkep Fırça** (C): tek fırça hamlesi, kuru fırça izi, kırmızı mühür. Palet: `#efe7d6 #1a1816 #c0271c`. Yazı: ince serif (burada Lora), küçük boy, bol boşluk. Hareket: hamle tek nefeste çizilir (2-3 saniye), sonra uzun durur; mühür en son, küçük bir ölçek darbesiyle basılır. Kaçın: birden çok renk, hızlı kesme, dolu kadraj. Uygun: tek cümlelik fikir, kapanış, sakinlik isteyen an. Çizim: Mürekkep reçetesi; hamle bir yay boyunca incelir, kuru boşluklar sona doğru çoğalır; mühür soyut işaret.
- **12. Ebru** (C): su üstünde boya halkaları tarakla çekilir. Palet: `#13233f #e8dcc0 #b8322a #1f7a7a #e0a526`. Yazı: az; gerekirse ince düz sans, desenin dışında düz bir şeritte. Hareket: iç içe halkalar yavaş genişler; sinüs tarak deseni dalga gibi geçer; sert kesme yok. Kaçın: keskin geometri, hızlı tempo, desenin üstüne yazı. Uygun: geçiş, soyut kavram, duygu, müzikli bölüm. Çizim: Ebru reçetesi, ters eşlemeyle: her piksel için önce tarağı, sonra damlaları sondan başa geri al (damlanın tersi: merkeze uzaklık d ise sqrt(d² - r²) olur; d küçükse piksel o damlanın rengidir).
- **13. Dokuma Tezgahı** (C): görüntü kilim gibi sıra sıra dokunur. Palet: `#efe3c8 #a8261d #1d2f52 #d79a2b #3a2a1e`. Yazı: piksel ızgarasına oturan köşeli harf. Hareket: mekik bir sağa bir sola gider, her geçişte bir sıra tamamlanır; çözgü iplikleri hep görünür. Kaçın: eğri, gradyan, serbest konum. Uygun: adım adım kurulum, birikim, emek vurgusu. Çizim: 12x10 px hücre; desen elmas mesafesinin (yatay + dikey uzaklık) kademeleri; çözgü çizgisi her yerde, dokunmuş kısımda dama sırasıyla üstte; harfler 5x7 hücre.
- **14. Nakış** (C): çarpı işi dikişler tek tek atılır. Palet: `#e6ddcb #b3271f #1f3f6d #d39a22 #2f6b4f`. Yazı: çarpı işiyle yazılmış harf ya da el yazısı etiketi. Hareket: dikişler sırayla belirir; kesik teyel çizgisi kasnak çevresinde ilerler; kumaş dokusu sabit. Kaçın: dolgu yüzey, parlak renk, hızlı hareket. Uygun: kişisel hikaye, aile, gelenek, sabır. Çizim: Nakış reçetesi; çarpı için hücre başına iki çapraz çizgi, üstünde ince açık iz, altında gölge.
- **15. Topografya** (D): eş yükselti eğrileri, rota çizgisi, koordinat notları. Palet: `#f1eee3 #7a4a2a #c8d6b0 #c0271c`. Yazı: küçük mono etiket, italik serif yer adı. Hareket: eğriler yavaş nefes alır; kırmızı kesik rota ilerler; etiketler sırayla düşer; her dördüncü eğri kalın. Kaçın: uydu görüntüsü, 3D arazi, ikon yağmuru. Uygun: yolculuk, plan, aşamalar, coğrafya. Çizim: yumuşak gürültüden yükseklik alanı h ve f = h x N; eğriye piksel uzaklığı = |f - round(f)| / (eğim x N); alçak yerlere yeşil ton.
- **16. Osiloskop** (D): fosfor yeşili sinyal. Palet: `#04110a #8dffb8 #5cff9a`. Yazı: küçük mono, ölçüm değeri gibi. Hareket: Lissajous eğrisi ve dalga formu sürekli akar; genliği sesin şiddeti sürer; ızgara sabit; hafif ışıma. Kaçın: ikinci renk, dolgu, abartılı ekran titremesi. Uygun: ses, müzik, veri akışı, sadece ses olan açılış. Çizim: 3 px çekirdek + iki kademe bulanık hale (Işıltılı çizim tekniği); genlik için seslendirmenin enerji zarfını kullan.
- **17. Tel Kafes Arazi** (E): vektör ekran estetiği, kehribar çizgiler. Palet: `#0b0b0c #ffb000`. Yazı: mono, gösterge paneli etiketi. Hareket: kamera sabit hızla ilerler; uzak çizgiler solar; yüzey yok, sadece çizgi; ortada düz bir koridor. Kaçın: mor pembe gradyan, ufukta güneş, parlama. Uygun: gelecek, keşif, 3D'ye geçiş anı. Çizim: yükseklik alanını perspektifle izdüşür; sıraları uzaktan yakına çiz ve her sıranın altını zemin rengiyle doldur (arkada kalan çizgi gizlenir).
- **18. İzometrik Minyatür** (E): küçük bloklardan bir şehir. Palet: `#dde6e8 #f26b4e #2e8c8a #154f4f`. Yazı: kalın sans, blokların üst yüzüne yatırılır. Hareket: blok yükseklikleri dalga halinde değişir; kamera dönmez; her blokta üç ton: üst açık, sol orta, sağ koyu. Kaçın: perspektif, gerçekçi doku, yumuşak gölge. Uygun: veri, şehir, altyapı, büyüme. Çizim: İzometrik reçetesindeki 2D formül; blokları arkadan öne çiz, aralarında ince boşluk bırak; yazıyı üst yüze afin dönüşümle yatır.
- **19. Termal Kamera** (D): ısı haritası, iri piksel. Palet: `#000000 #3c0a6e #be145a #f05a14 #ffc828`. Yazı: beyaz mono okuma değerleri, sağda renk skalası. Hareket: sıcak bölgeler yavaş gezer; artı işareti en sıcak noktayı izler; değer canlı değişir. Kaçın: yumuşak gradyan, ince detay, palet dışı renk. Uygun: yoğunluk, dikkat, nerede ne oluyor sorusu. Çizim: Termal kamera filtresinin kart hali: 24 px hücre, 5 sert kademe; okunan değer alanın gerçek değeri olsun.
- **20. Neon Noir** (E): ıslak zemin, kırmızı tabela, mavi tüp, sis. Palet: `#04060d #ff2a3c #2f7bff`. Yazı: kontur neon tüp harf, tek kelime. Hareket: tabela ara ara kırpışır (sürekli değil); yağmur sabit; kamera çok yavaş; zeminde soluk yansıma. Kaçın: üçüncü neon rengi, sürekli titreme, glitch. Uygun: gece, şehir, sinematik kapanış. Çizim: Neon tabela reçetesi; kontur harf için genişletilmiş maskeden daraltılmışı çıkar; yansıma üst görüntünün ters çevrilmiş, satır satır hafif kaydırılmış, bulanık ve solan kopyası.

**İki kartı birleştirme.** Kartlar ikişerli de kullanılır (190 kombinasyon). Yarı yarıya karıştırma, rolleri paylaştır: bir karttan palet ve doku, ötekinden hareket grameri ve yazı kuralı (örnek: Halftone Baskı'nın noktaları ve renkleri + İsviçre Izgarası'nın eksenli hareketi ve sola yaslı yazısı). İki kartın yasak listeleri birleşir: birinin yasakladığı şey kombinasyonda da yasaktır. Palet yine kapalıdır: iki paletten toplam en çok 5 renk. Aynı aileden iki kartı birleştirme, fark görünmez. İyi çalışan eşleşmeler: Teknik Çizim + Nakış (Teknik Çizim + Topografya değil), Neon Noir + Split-flap Tabela, Kağıt Kesiği + İzometrik Minyatür, Ebru + Derin Tipografi. Kombinasyona kısa bir ad ver ve üç durağan kareyle (açılış, orta, kapanış) doğrula, sonra üret.

**Referanstan yeni kart.** Kullanıcı bir görsel ya da pano gösterirse taklit etme, kuralını çıkar: en çok 5 renk (hex), bir yazı karakteri tarifi, bir doku, bir hareket fiili, üç yasak. Bunu aynı biçimde 21. kart olarak yaz, üç durağan kareyle doğrula, sonra üret.

### Ad eşleme ve sınırlar

Kullanıcı stili İngilizce adıyla söyleyebilir. Yukarıda parantez içinde geçmeyenler:
- Pixel Art -> Retro piksel (ya da Piksel filtresi). Game UI Style -> Retro piksel. Comic Art, Comic Book -> Çizgi roman paneli. Paper Cutout, Puppet Stop-Motion -> Kağıt kesme. Shadow Puppet -> Gölge oyunu. Watercolor, Anime Watercolor -> Sulu boya. Risograph -> Riso baskı. Blueprint -> Mavi teknik çizim. Glitch Art -> VHS / glitch. Neon Glow, Cyberpunk Neon -> Neon tabela. Bauhaus, Geometric Abstract -> Bauhaus geometri. Glass Mosaic -> Vitray ya da Çini / mozaik. Knit, Knitted Puppet -> Nakış (ilmek dokulu varyant). Handwritten -> Kinetik tipografi (el yazısıyla). Minimalism, Maximalism -> stil değil, yoğunluk ayarı.
- **Kodla olmayanlar:** Oil Painting, Photorealistic Collage, Realistic, CGI Cinematic (Hollywood 3D), Cinematic 3D, 3D Movie Style. Bunlar görsel ya da video üreten model işidir. Kullanıcıya açıkça söyle ve en yakın karşılığı öner (yağlı boya için sulu boya ya da pastel; sinematik 3D için anlatım 3D ya da low poly). Akıcı el çizimi karakter animasyonu ve ayrıntılı yüz ifadesi de (Retro Anime, Cyberpunk Anime, Hand-Drawn Animation) kodun zayıf yanıdır: toon 3D ya da açık çizgiyle sadeleştir ve bunu söyle.
- **İsim taşıyanlar:** bir markanın, stüdyonun ya da kişinin adını taşıyan stillerde yalnız alttaki tekniği al; karakterini, logosunu, imza görünümünü kopyalama ve bunu kullanıcıya bir cümleyle söyle. Karşılıklar: Lego Style -> Yapı taşı oyuncak. Kurzgesagt Style -> Düz vektör. Dan Koe Style -> koyu zeminde Tek çizgi ya da Çöp adam + Kinetik tipografi. ZackD Films -> Anlatım 3D. "Pixar benzeri" -> Anlatım 3D ya da Toon. "Tintin stili" -> Açık çizgi. "Minecraft benzeri" -> Voxel.

## 4b. Stil kütüphanesiyle bağlantı ve çeşitlilik

Kullanıcının "kütüphanemiz" dediği `kodla-cizim-stil-kutuphanesi` becerisi bu becerinin deposudur. Her yeni videoda, sahneleri kurmadan önce o beceriyi yükle ve şu üç yere bak:
- **Hareket desenleri (4d):** test edilmiş 38 desen. "İyi" notlu olanlar doğrudan kullanılır, "orta" olanlar önce tek karede denenir, "zayıf" olan kullanılmaz. Desen sahnenin anlamına uymalı (ör. geri dönüşü olmayan karar için koçan yırtma, zincirleme etki için Newton beşiği, durum değişimi için bölmeli tabela, birikim için sıvı gösterge).
- **Genişletilmiş katalog (4b ve 4c):** 100'den fazla stil reçetesi. Bu becerideki tablolarda uygun stil yoksa ya da aynı stil son videolarda kullanıldıysa oradan seç.
- **Üretim dersleri (4d sonu):** yasak listesi, vuruş çizelgesi, kamera dili, döngü kuralı.

Desenler dokunmayla çalışmak üzere tasarlanmıştır; videoda hareketin nedeni ekranda görünmeli (imleç, el, düşen nesne ya da önceki sahneden gelen vuruş).

**Çeşitlilik kuralı.** Kullanıcı tekdüzeliği sevmez ve her işte yeni bir şey denenmesini ister. Bu yüzden:
- Her yeni videoda, kullanıcıyla yapılan önceki videolarda kullanılmamış en az bir stil ya da hareket deseni olsun.
- Aynı ana stili art arda iki videoda kullanma; kullanıcı adıyla istemediyse.
- Çeşitlilik anlamın önüne geçmez: yeni öge de 4. kuraldaki gibi anlamdan doğmalı, yalnızca farklı olsun diye eklenmez. Stil sayısı sınırı (3. kural) aynen geçerli.
- Teslimde tek satırla söyle: bu videoda ilk kez neyi denedin.

## 4c. Hepsi bir arada: kalıcı varsayılanlar, araçlar ve yetenekler

Çalışma alanı her sohbette sıfırdan açılır; bu bölüm, geçmişte ve şimdi kurulan her şeyin her yeni videoda hazır gelmesi içindir. Videoya başlamadan önce bu listeyi baştan sona oku. Hepsini her işte kullanma: iş neyi gerektiriyorsa onu kur ve kullan. Kullanıcının o anki sözü ve kayıtlı tercihleri bu bölümle çelişirse onlar kazanır.

### Kalıcı varsayılanlar (kullanıcı aksini söylemedikçe)

- **Biçim:** 9:16 dikey, 1080x1920, 30 fps. "Üretim" bölümündeki 1920x1080 yalnızca kullanıcı yatay istediğinde geçerlidir; dikeyde yerleşimi 720x1280 mantıksal koordinatta yaz, 1,5 ile çarp.
- **Süre:** metin okunduğunda 2 dakikanın üstünde, 3 dakikanın altında.
- **Ses efekti:** her videoda var. Konuşma sesi olmasa bile efekt döşenir.
- **Seslendirme:** kullanıcı ses göndermediyse video seslendirmesiz ve altyazılı hazırlanır; altyazı zamanı doğal okuma temposuna göre kurulur. Kullanıcı sonradan ses dosyası gönderirse video o sese göre yeniden senkronlanır (Bölüm 1).
- **Görsellik:** sahneler ekstra renkli; her videoda infografik, izleyeni ekranda tutan efekt ve geçişler bulunur. "Kararında kalma listesi" yine geçerlidir: renk çok, karmaşa yok.
- **Çeşitlilik:** Bölüm 4b'deki kural. Günlük zamanlanmış video görevlerinde ayrıca Google Drive'daki "MeseleBaska Stil" notlarına bak; aynı günün ve son günlerin ana stilini tekrarlama, bitince yeni stil notunu yaz.
- **Teslim paketi (her videoda, ayrıca istenmeden):** video (mp4), kapak görseli (2-4 kelimelik yazıyla), başlık + 2 alternatif, açıklama, etiketler, sabit yorum önerisi ve seslendirme metni. Seslendirme metni ayrı bir düz metin (.txt) dosyasıdır; içinde yalnızca okunacak metin bulunur. Ses dosyasıyla birleştirilmiş sürüm teslim edilirken paket yeniden atılır.
- **Yayın:** yükleme, planlama ve paylaşma yalnızca kullanıcının sohbetteki açık onayıyla yapılır.

### Hangi iş, hangi araç

| İş | Nereden |
|---|---|
| Ses efekti döşemek, serbest lisanslı ses bulmak, bitmiş sesi denetlemek | `icerik-arac-seti` becerisini yükle: RealSFX, Openverse, Earshot |
| Stil reçetesi, hareket deseni, üretim dersi | `kodla-cizim-stil-kutuphanesi`: 4, 4b, 4c, 4d, 4e |
| Video efekti (Orbit, Snap Zoom, Zoom Portal, Liquid Glass, Frame Break vb.) | `kodla-cizim-stil-kutuphanesi` 4f. Sonradan eklenen efekt paketleri de oraya yazılır; her videoda 4f'yi baştan oku |
| Kelime zamanı çıkarmak (ses geldiğinde) | Whisper, Bölüm 1 |
| Nesneyi ya da kişiyi arka plandan ayırmak (Frame Escape, Paper Cutout, Dolly Zoom için ön plan katmanı) | rembg: `pip install --break-system-packages -q rembg onnxruntime`; `from rembg import remove; on_plan = remove(goruntu)`. Model ilk kullanımda iner. Yalnızca kullanıcının kendi görüntüsünde ya da kendi çizdiğimiz karede kullan |
| Müzik altlığı | Önce kodla sentez (numpy ile basit akor yatağı ve vuruş, kütüphanedeki müzik ızgarasına oturur): telif sorunu yok. Hazır parça gerekiyorsa yalnızca lisansı açıkça izin veren kaynaktan al ve atıf satırını açıklamaya yaz. Altlık seslendirmeyi ve efektleri bastırmasın (en az 12 dB altta) |
| Kodla çizilemeyen görsel ya da kısa klip (yağlı boya, fotogerçekçi, sinematik) | ElevenLabs bağlayıcısı. Kullanıcının kredisini harcar: üretmeden önce sor, tekrar deneme için aynı çağrıyı yineleme |
| Kapak ve infografik tasarımı | `icerik-arac-seti` içindeki tasarım becerileri (impeccable, hallmark, taste-skill) ve görsel istem ilhamı |
| Metin, kanca, başlık, açıklama, sabit yorum | `kancali-icerik-yazari` |
| Başlık, açıklama ve etiketlerde aranabilirlik | `icerik-arac-seti` içindeki claude-seo |
| Hangi video tuttu, bir sonrakinde ne değişsin | Metricool bağlayıcısının izlenme verisi. Yalnızca okuma; bulduğunu teslimde tek cümleyle söyle |
| Konu seçiminden yüklemeye tek akış | `youtube-ajani` |

### Kurallar

- Bir araç kurulamazsa ya da bağlayıcı yoksa videoyu durdurma: o adımı en yakın kodla çözümle yap ve teslimde neyin eksik kaldığını tek cümleyle söyle.
- Bu listede adı geçip reçetesi ilgili beceride henüz yazılı olmayan bir şeyi (ör. yeni bir efekt paketi) ezberden uydurma; kullanıcıya eksik olduğunu söyle.
- Kullanıcının bilgisayarına kurulum ayrı iştir; bilgisayar bağlıyken ve kullanıcı isteyince yapılır.

## 4c. Ses, efekt ve araç seti (Kasım 2026)

Kullanıcı bu araçların içeriğe uygun düştükçe kendiliğinden kullanılmasını istedi. Çalışma alanı her sohbette sıfırlanır: önce kurulu mu bak (`which earshot astryx`, `ls ~/.claude/skills`), değilse `icerik-arac-seti` skill'indeki kurulum adımlarını izle (incelenmiş commit'ler orada). Hepsini her işte kullanma; iş neyi gerektiriyorsa onu.

### Dikey (9:16) üretim düzeni
- Kullanıcının varsayılanı 9:16: 1080x1920, 30 fps. Bu skill'deki 1920x1080 yönergesi yalnızca yatay istendiğinde geçerli.
- Güvenli alan: üst %12 (230 px) ve alt %20 (384 px) arayüze bırakılır; görsel 300-1500, altyazı ~1420-1450 civarı.
- Seslendirme yoksa (kullanıcının şimdiki düzeni) altyazı zamanlaması tahmindir: parça süresi ≈ 0,6 + 0,40 × kelime sn, cümle sonunda +0,35 sn, blok başı 0,7 / sonu 0,6 sn nefes. Bu ~145 kelime/dk eder; ses gelince Whisper kelime zamanlarıyla yeniden senkronla.
- Motor: Python + pycairo (`pip install --break-system-packages pycairo`), ham BGRA kareleri ffmpeg'e boru; 17 sn'lik sahne ~9 sn'de çıkar. İki çekirdekte iki süreç.
- Tuzaklar: cairo'da grup çizdikten sonra kaynak o grupta kalır, sonraki katmandan önce `set_source_rgb` ile sıfırla; ölçek 0 matris hatası verir (en az 0,02); her karede değişen tam ekran gren dosyayı 10 kat şişirir (sabit gren kullan); `show_text` sonrası `new_path()`.

### Ses efektleri (her videoda zorunlu)
- **İşaret listesi + karıştırıcı:** her olay için (zaman, ses, dB). Sesin tepe noktası olay karesine oturur (`argmax` ile bulunur); gerçek kayıtlar tarama gibi bir hareketle birebir eşleşecekse dosya başı hizalanır. Kare zamanları sahne kodundaki aynı ifadelerden hesaplanır, elle yazılmaz.
- **Ses kaynakları:** (1) Earshot ses bankası, 252 ses, tepe zamanları bilinir: `earshot sfx list`, `earshot sfx render <id> -o x.wav --sr 48000` (her biri ~3 sn; `checks` uyarısı veren sesi kullanma: "ucuz duruyor" dediği pop sesi elendi). (2) RealSFX içindeki uisfx: 12 paket × 78 CC0 arayüz sesi. (3) Openverse: 5,2 milyon serbest lisanslı ses; buradan yalnız Wikimedia kaynaklılar indirilebiliyor, çok istekte 429 veriyor: indirmeler arası bekle, ısrar etme. Gerçek kayıt yoksa gerçek kısa seslerden kur (örn. alkış = 900 gerçek parmak vuruşu, istenirse alçak geçirenle boğuk).
- **Düzey:** seslendirme altında kalacak SFX izi tepe −3 dBFS, yaklaşık −29 LUFS. Film bloklarına kısık ortam (projektör tıkırtısı −36 dB + hışırtı) eklenebilir.
- **Doğrulama:** bitmiş videoyu `earshot timeline VIDEO` ile dinlet; kesmelerin kaçının bir kare içinde bir sesle buluştuğunu raporlar (ilk videoda %87). Sonucu kullanıcıya ölçüm olarak söyle; "dinledim" deme.
- Lisans: CC0 dışında (BY) bir ses kullanıldıysa atıfı açıklamaya yaz; her indirmenin künyesi `KAYNAKLAR.csv`'de.

### Gerçek veri ve infografik
- Ekrandaki sayılar gerçek olsun: Openverse sayıları API'den o gün (`/v1/audio/stats/`), sesin spektrogramı librosa ile (Earshot'un ortamında: `~/.local/share/uv/tools/earshot/bin/python`), Earshot skorları gerçek testten. Uydurma veri gerekiyorsa ekranda "temsili" yaz.

### Video efektleri (41 efekt, test edildi)
Tarifleri stil kütüphanesinin 4f ve 4g bölümlerinde. Her efekt `f(ctx, u, t)` saf fonksiyon; anlama uyanı seç, sahne içinde kullan ya da geçiş yap.
- 1. paket: Orbit, Chat Takeover, Frame Escape, Snap Zoom, Checklist Pop, Headline Storm, Zoom Portal, Growth Curve, Studio Reveal, B-roll Overlay, Paper Cutout, Dolly Zoom, Magazine Cover, Liquid Glass, Zoom Through Cut, Green Screen, Frame Break, Digital Zoom, Phone Mockup, Checklist.
- 2. paket: Live cursor, Clone row, Day dial, Predict keys, Orbit ring, Code body, Post wall, Letter dive, Comment drop, Layer explode, Sketch words, Blade slice, Head stack, Rack focus, Banknote, Voice note, Impact frame, Dolly zoom (yaklaşan), Press front, Paper tear, Blow away.
- Özne gereken efektlerde (Head stack, Clone row, Code body, Orbit ring, Frame Escape) saydam bir özne katmanı kullan: kodla çizilmiş figür, ya da rembg ile arka planından ayrılmış gerçek bir nesne/kişi (`isnet-general-use`, ayrı venv, ~35 sn/fotoğraf; fotoğraf kenarından kesilen tarafı 180 px alfa geçişiyle soldur). Serbest lisanslı fotoğraf: Openverse görsel araması, `source=stocksnap,rawpixel` (Flickr/Wikimedia hız sınırına takılıyor). Kullanıcı kendi çekimini gönderirse özne o olur.

### Diğer araçlar (içeriğe göre)
- Kapak, açılış sayfası, arayüz görünümü: `impeccable`, `hallmark`, `taste-skill` ile yön + bitince denetim; Astryx (`astryx search ...`) arayüz bileşeni gerektiğinde. AI slop klişelerinden (mor-pembe geçiş, her yerde parlayan kutu) kaçın.
- Başlık, açıklama, etiket: `kancali-icerik-yazari` + gerekirse `seo` skill'leri.
- Plan/beyin fırtınası: superpowers `brainstorming`, `writing-plans`. Hazır skill arama: `find-skills` (kurmadan önce kodu oku ve kullanıcıya sor).
- Kapak görseli için stil ilhamı: `gpt-image-2-style-library`.

### Teslim paketi (her video)
Video + seslendirme metni (ayrı .txt, yalnız okunacak metin) + kapak (1080x1920 PNG) + 3-5 başlık seçeneği + kapak yazısı + açıklama (ilk iki satır kanca, ses atıfları) + etiketler + sabit yorum. Önce ilk sahneyi sesiyle önizleme olarak gönder.

## 4d. Eklentilerle plan aşaması (Kasım 2026)

Kullanıcının kataloğundaki video, yazı ve görsel eklentileri plan aşamasında yardımcıdır. Kurulu olanlar oturumun beceri listesinde görünür: videoyu planlamadan önce listeye bak. Kurulu olmayan eklenti için bu bölümü atla, videoyu durdurma.

Kasım 2026'da bu eklentilerin yalnızca adları ve tanıtım cümleleri görüldü; henüz kurulu değillerdi, içerikleri okunmadı ve denenmedi. İçeriklerini ezberden uydurma: eklenti kuruluysa ilgili becerisini yükle ve oradaki adımları izle.

| Plan adımı | Eklenti ve becerisi | Not |
|---|---|---|
| Konu ve anahtar kelime araştırması (plandan önce) | TubeAlfred YouTube: `youtube-keyword-ideas`, `youtube-competitor`, `youtube-shorts` | Yalnızca okur. Bulduğunu plana tek cümleyle yaz |
| Kanca ve senaryo iskeleti | Social Media Skills: `hook-writer`, `short-form-video-script`, `youtube-shorts`, `reels-script` | Ana kaynak `kancali-icerik-yazari`; bunlar ikinci görüş. Kullanıcının sesi kazanır |
| Sahne planı (storyboard) | Social Media Skills: `scripting-and-storyboarding`; Writing With Agents: `architect` | Çıkan iskeleti Bölüm 2'deki blok, süre, stil, gerekçe listesine çevir |
| Görüntü ve sesin tek çizelgeden kurulması | animation-studio | Yalnızca plan mantığını al (tek ortak nota); motor ve işaret listesi bu becerideki gibi kalır |
| Kurgu çizelgesi, gömülü altyazı | AI Video Editor (ManyMotions) | Hesap ve kredi ister: kullanmadan önce sor |
| Kapak planı | Social Media Skills: `thumbnail-design`; Codesign: `video-thumbnail-template` | Kapak yine 1080x1920 ve 2-4 kelime |
| Platforma göre boyutlandırma, ses temizleme | Adobe: `adobe-resize-photos-and-videos`, `adobe-cleanup-audio` | Adobe hesabı ister |
| Yayın paketi denetimi | Social Media Skills: `youtube-publishing-and-metadata` | Paketin kendisi 4c'deki listeye göre hazırlanır |
| Metnin son okuması | anti-ai-writing | İngilizce odaklı olabilir; Türkçede zayıfsa bırak |

Kurallar:
- Bu becerinin değişmez kuralları, 4c'deki kalıcı varsayılanlar ve kullanıcının tercihleri bir eklentinin önerisiyle çelişirse bunlar kazanır (9:16, 2-3 dakika, stil sınırı, ses efekti, teslim paketi).
- Eklentiler plana yardım eder, üretimi devralmaz: sahneler yine kodla çizilir.
- Kredi ya da hesap isteyen araçta önce kullanıcıya sor.
- Bir eklentiden işe yarayan bir plan adımı çıkarsa teslimde tek cümleyle söyle; kullanıcı isterse o adım bu bölüme kalıcı olarak yazılır.

## 4e. Kurulu tasarım ve video araçları (Kasım 2026)

Kullanıcının hesabında kurulu olup 4c'de adı geçmeyen görsel tasarım ve video araçları. Hepsini her işte kullanma: iş neyi gerektiriyorsa onu yükle. Beceriler oturumun beceri listesinde görünür; listede yoksa o satırı atla, videoyu durdurma.

| İş | Araç | Nasıl |
|---|---|---|
| Render düzeni ve bitmiş videoyu değiştirme | `video-making` becerisi | Her yeni videodan önce oku (aşağıda özeti var) |
| İnfografik sahnede grafik türü seçmek | `ui-ux-pro-max` eklentisi: 25 grafik türü; `dataviz` becerisi | Grafik çizmeden önce `dataviz`i oku; hangi veri hangi grafiğe gider sorusunu eklentinin grafik tablosunda ara |
| Kapak ve infografikte renk uyumu, yazı tipi eşleşmesi, ikon | `ui-ux-pro-max`: 192 palet, 74 yazı tipi eşleşmesi, 105 ikon | Arama betiğiyle sor (aşağıda) |
| Kapak, kanal kapağı, hikaye görseli | `ui-ux-pro-max:banner-design` | HTML/CSS ile kur, tam boyutta PNG'ye çek |
| Kanal kimliği: renk, yazı, ton | `ui-ux-pro-max:brand`, `ui-ux-pro-max:design-system` | Yalnızca kullanıcı kanal kimliği isterse; marka kuralı uydurma |
| Logo, ikon, sosyal görsel seti | `ui-ux-pro-max:design` | Kullanıcı isterse |
| Web sayfası ya da arayüz görünümlü sahne | `frontend-design`, `ui-ux-pro-max:ui-styling` | Sahne bir arayüzü gösteriyorsa (telefon ekranı, uygulama) yön için |
| Kapağı ya da tasarımı Canva'da isterse | Canva bağlayıcısı | Kullanıcının hesabında tasarım açar: önce sor. Araçların ne yaptığını kendi açıklamalarından oku, ezberden varsayma |

### `video-making` özeti (bu becerideki üretim kurallarıyla aynı yönde)
- Tam render kullanıcıyı bekletir: istek başına bir tam render hedefle. Öncesinde ekranın en kalabalık olduğu anlardan birkaç kareyi tam boyutta çizip bak.
- Sahne başına tek kodlanmış dosya; hepsi aynı boyut, kare hızı ve kodlayıcı ayarında. Geçici ad `.mp4` ile bitsin, ffmpeg 0 ile çıkınca yeniden adlandır.
- Duran kare (yakınlaşma yok): `-framerate 30 -i s.png -vf format=yuv420p,loop=-1:1,trim=duration=SÜRE -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p`. `-loop 1` kullanma: resmi her karede yeniden çözer.
- Bitmiş videoda değişiklik: tek sahne değiştiyse yalnız o dosyayı (ve ondan geçiş taşıyan sonrakini) yeniden çiz. Yeni ses ya da kısaltılmış son: `-c:v copy` (yeni seste ayrıca `-map 0:v -map 1:a`). Gömülü altyazı değişimi ya da küçük kopya: bitmiş dosyayı yeniden kodla, hiçbir şey çizme.

### `ui-ux-pro-max` arama betiği
- Eklenti kökünü bul: `find /root/.claude/plugins -maxdepth 3 -type d -name ui-ux-pro-max`. Betik: `<kök>/.claude/skills/ui-ux-pro-max/scripts/search.py`.
- Kullanım: `python <betik> "<sorgu>" --domain <alan> [-n <adet>]`. Alan adlarını ve öbür bayrakları eklentinin kendi SKILL.md dosyasından oku.
- Veriler web ve uygulama arayüzü için derlenmiştir, video için değil. Videoda işe yarayanlar: paletler (kapak ve infografikte renk uyumu), yazı tipi eşleşmeleri (yazı tipi ortamda kuruluysa ve Türkçe karakterleri doğrulandıysa), grafik türü tablosu, ikonlar. 17 hareket ön ayarı fareyle üstüne gelme ve sayfa kaydırma içindir; videoya yalnızca süre ve yumuşatma (easing) fikri olarak taşınır, hareket desenleri için kaynak yine stil kütüphanesidir.

### `banner-design` kuralları (kapakta geçerli olanlar)
- Boyutlar: dikey video kapağı ve hikaye 1080x1920; YouTube kanal kapağı 2560x1440.
- Kritik içerik tuvalin ortadaki %70-80'inde; en çok 2 yazı tipi; yazı ile zemin arasında en az 4,5:1 kontrast.
- Görsel bir modelle üretilecekse istemde yazı, harf ya da kelime olmasın; kapak yazısı sonradan kodla eklenir, düzenlenebilir kalır.
- Becerinin kendi akışı 3 seçenek üretip soru sorar; video tesliminde tek kapak yeter, kullanıcı seçenek isterse çoğalt.

### Çelişki kuralları
- Stil reçeteleri ve sabit kartlar bu becerinin kendisinden gelir. Kartın paleti kapalıdır: eklentiden palet alıp karta ekleme.
- Eklentinin stil listesinde geçip kartların klişe listesinde yasak olan şeyler (cam efekti kart, mor-mavi gradyan, sürekli parlama) kartlı sahnelerde yine yasaktır.
- 4c'deki kalıcı varsayılanlar (9:16, 2-3 dakika, ses efekti, teslim paketi) ve kullanıcının o anki sözü bu araçların varsayılanlarıyla çelişirse onlar kazanır.
- Kasım 2026'da `video-making` ve `banner-design` metinleri ile `ui-ux-pro-max` veri sayıları okundu; arama betiği bir video işinde henüz denenmedi. İlk kullanımda sonucu tek karede dene.

## 5. Kararında kalma listesi

Göndermeden önce sor:
- Her stil değişiminin anlamla ilgili bir gerekçesi var mı?
- Bir sahnede aynı anda üçten fazla hareket eden öge var mı? Varsa azalt.
- Renk paletleri birbirini itiyor mu? Ortak bir sıcak ya da soğuk ton tut. Canlı stillerde (riso, psikedelik, vitray, neon) bir videoda yalnızca biri "en yüksek ses" olsun; diğerlerinin doygunluğunu bir kademe indir ya da ortak bir rengi (ör. aynı turkuaz) hepsinde tekrar et.
- Yazı miktarı sesi bastırıyor mu? Ekranda aynı anda tek bir metin odağı olsun.
- Gerçek kişi, marka, telifli karakter ya da gerçekmiş gibi duran belge var mı? Olmasın; kurgusal adlar kullan.

## 6. Teslim

Kısa yaz: dosya adı, süre, hangi blokta hangi stil (liste), kontrolün nasıl yapıldığı, senkronun tahmini olduğu ve en az emin olunan aralık. Sonra tek bir sonraki adım sor (ör. tamamını bu karışımla yapayım mı).