---
name: "youtube-ajani"
description: "Kullanıcı \"YouTube ajanı\", \"bugünün videosunu yap\", \"konuyu sen seç\" dediğinde ya da konu vermeden video istediğinde kullan: konuyu seçer, metni yazar, videoyu üretir, paketi hazırlar, onayla YouTube'a yükler."
---

# YouTube Ajanı

Konu seçiminden yüklemeye kadar tek akış. Kullanıcı yalnızca kanalı söyler (söylemezse sor ya da öncelikli kanallardan birini seçip hangisini seçtiğini söyle); gerisini sen yürütürsün. Her aşamada kullanıcının kayıtlı tercihleri (format, süre, seslendirme durumu, ses efektleri, stil çeşitliliği) geçerlidir; bu dosyayla çelişirse kayıtlı tercih ve kullanıcının o anki sözü kazanır.

## 1. Kanalı ve ekseni belirle

- Kanalın kimliğine ve konu eksenlerine bak (yayın planı notları). Örnek: Mesele Başka için gündem, popüler, tarihî, felsefi, bilim, gündem ekonomi.
- Kanal belli değilse tek soru sor; kullanıcı yoksa öncelikli kanallardan birini seç ve en başta belirt.

## 2. Konuyu sen seç

1. Gündeme bağlı eksenlerde web'de ara: bugün ne konuşuluyor, ne merak ediliyor. Güncel olgu ve rakamı kaynaktan doğrula, ezberden yazma.
2. Geçmiş sohbetlerde aynı kanal için işlenmiş konulara bak; tekrar etme.
3. Üç aday çıkar, her birine tek cümlelik kanca yaz. Ölçüt: merak uyandırması, tartışma açması, 2-3 dakikaya sığması, kanalın sesine uyması.
4. En güçlüsünü seç ve neden seçtiğini bir cümleyle söyle. Diğer ikisini "yedek" olarak listele. Kullanıcı itiraz etmezse beklemeden devam et.

## 3. Metni yaz

- `kancali-icerik-yazari` skill'ini yükle ve metni onunla yaz.
- Uzunluk: aksi söylenmedikçe okunduğunda 2 dakikanın üstünde, 3 dakikanın altında.
- Olgusal iddialar 2. adımdaki kaynaklara dayansın; emin olmadığın şeyi metne koyma.

## 4. Videoyu üret

- `video-making` skill'ini, ardından konuya göre `karisik-stil-video` ya da `kodla-cizim-stil-kutuphanesi` skill'ini yükle.
- Varsayılan: 9:16 dikey, ses efektli, altyazılı. Seslendirme için o an geçerli tercihe uy (seslendirmesiz dönemde yalnızca altyazı; kullanıcı ses dosyası gönderirse ona göre senkronla).
- Stil, konuya ve metnin havasına göre seçilsin; bir önceki videoda kullanılan stil ve hareket desenlerini tekrarlama.
- Bitince videoyu baştan sona izleyerek kontrol et: altyazı taşması, senkron, ses efektleri, süre.

## 5. Paketi hazırla

Her videoyla birlikte, ayrıca istenmeden:

- Kapak görseli (dikey videoda Shorts'a uygun)
- Başlık: 3 seçenek, en iyisi işaretli
- Açıklama: ilk iki satır kanca, sonra özet, kaynaklar, etiketler (#)
- Etiketler: virgülle ayrılmış liste
- Seslendirme metni: ayrı bir düz metin dosyası; içinde yalnızca okunacak metin, not ya da açıklama yok

Videoyu ve dosyaları kullanıcıya gönder.

## 6. YouTube'a yükle

Yükleme dışarıya yayın yapmaktır; her video için ayrı onay gerekir.

1. Yüklemeden önce tek mesajda göster: kanal, başlık, açıklama, etiketler, kapak, görünürlük (Özel / Liste dışı / Herkese açık), varsa zamanlama. Açık bir "evet" bekle.
2. Kullanıcı görünürlük söylemediyse **Özel** olarak yükle ve bunu belirt; herkese açmak tek tık.
3. Yol sırası:
   - **Önce Metricool** (kullanıcının seçtiği yol). Sırayla:
     1. `getBrandSettings` ile markaları ve bağlı ağları oku. Hedef kanalın bağlı olduğu markayı (blogId) ve saat dilimini al. YouTube bağlı değilse dur, Metricool'un verdiği bağlantı sayfasını kullanıcıya ilet; başka kanala yükleme.
     2. Videoyu Metricool'un çekebileceği bir adrese koy: Metricool yalnızca herkese açık dosya bağlantısı ya da Google Drive/Dropbox bağlantısı kabul eder. Varsayılan: videoyu ve kapağı kullanıcının Google Drive'ına yükle, o bağlantıları `media` ve `videoThumbnailUrl` alanlarına ver (kapak jpg/png olmalı). Drive, Metricool hesabında bağlı değilse kullanıcıya söyle.
     3. `createScheduledPost` ile gönder: `providers: [{"network":"youtube"}]`, `text` = açıklama, `youtubeData` içinde `title`, `type` (dikey ve 3 dakikanın altındaysa `short`, değilse `video`), `privacy`, `tags`, `madeForKids`, uygun `category`. `privacy` söylenmediyse `private`.
     4. `isAiGeneratedContent`: yalnızca videoda gerçekçi görünen yapay ya da değiştirilmiş görüntü/ses varsa `true`. Emin değilsen onay mesajında kullanıcıya sor.
     5. Zaman: kullanıcı "hemen" dediyse birkaç dakika sonrası; saat vermediyse `getBestTimeToPostByNetwork` ile öner ve onay mesajında göster. Geçmiş tarih verilemez.
     6. Hata dönerse aynı girdiyle tekrar deneme; hatayı olduğu gibi ilet. Kapak reddedilirse (VIDEO_THUMBNAIL_NOT_APPLICABLE) kapaksız gönder ve kapağı elle eklemesi gerektiğini söyle.
     7. Bitince Metricool'un döndürdüğü planlayıcı bağlantısını ver.
   - Metricool kullanılamıyorsa, bağlı başka bir yayın bağlayıcısı (connector) YouTube'a video gönderebiliyorsa onu kullan.
   - Yoksa tarayıcıyla YouTube Studio: kullanıcının oturumu açık tarayıcı tercih edilir. Oturum açık değilse kullanıcıdan kendisinin giriş yapmasını iste; şifre ya da doğrulama kodunu sohbette isteme, kendin yazma.
   - İkisi de mümkün değilse yüklemeyi yapma: paketi "yüklemeye hazır" olarak teslim et ve neyin eksik olduğunu tek cümleyle söyle.
4. Yükleme formunda: başlık, açıklama, etiketler, kapak, "çocuklara özel değil" (içerik çocuklara yönelik değilse), görünürlük. Formda kullanıcının görmediği bir beyan ya da koşul çıkarsa (ücretli tanıtım, değiştirilmiş içerik beyanı vb.) dur ve sor; kendiliğinden işaretleme.
5. Yanlış kanal seçili görünüyorsa dur ve sor.
6. Bittiğinde bildir: video bağlantısı, kanal, görünürlük, yayın zamanı.

## Kullanıcı başında değilken (zamanlanmış çalışma)

1-5. adımları tamamla, 6. adımda dur: paketi teslim et, "yükleme onayını bekliyor" de. Onaysız yükleme yapma.

## Yapma

- Başkasının videosunu, müziğini, görselini ya da metnini kullanma; her şey özgün üretim olsun.
- Doğrulamadığın güncel bilgiyi kesinmiş gibi yazma.
- Yanıltıcı başlık ya da kapak yapma: kanca güçlü olsun ama videonun verdiğinden fazlasını vaat etmesin.