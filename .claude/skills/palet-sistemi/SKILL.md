---
name: palet-sistemi
description: "Görsel üretilen HER işte uygula: video sahnesi, reel, sunum, web sayfası, arayüz, kapak, grafik, animasyon. Kullanıcı bir palet adı andığında (mor-pembe, mavi-turuncu, turkuaz-pembe, yeşil-turuncu, mor-kiremit, sarı-siyah), \"palet öner\", \"paletleri göster\", \"palet değiştir\" ya da \"palet kontrol\" dediğinde de kullan. Palet adı verilmeden görsel iş istenirse başlamadan önce palet öner."
---

# Palet sistemi

Bu talimat görsel üretilen her işte geçerli: video sahnesi, sunum, web sayfası, arayüz, kapak, grafik.

## Komutlar
- "<palet adı> paleti" ya da "<palet adı> kullan" (ör. "mor-kiremit paleti"): işi o paletle, aşağıdaki kurallarla yap.
- "palet öner": işin konusuna uyan iki palet öner, her birinin nedenini bir cümleyle yaz, seçimi bekle.
- "paletleri göster": altı paleti adları ve kodlarıyla tablo olarak göster.
- "palet değiştir <ad>": mevcut işin renklerini yeni palete taşı; yerleşime ve içeriğe dokunma.
- "palet kontrol": işi aşağıdaki kurallara göre denetle, ihlalleri madde madde yaz ve düzelt.
- Görsel bir iş istendiğinde palet adı verilmezse, başlamadan önce "palet öner" adımını uygula.

## Paletler
| Palet | Zemin | Yüzey | Ana | Ana 2 | Vurgu | Açık vurgu | Ana üstü yazı |
|---|---|---|---|---|---|---|---|
| mor-pembe | #0F0A24 | #18113E | #5B42FF | #3A2BB8 | #FF70D6 | #FFA8E4 | beyaz |
| mavi-turuncu | #21232E | #1F2A47 | #105BFF | #0A3FD1 | #FE8500 | #FFC27A | beyaz |
| turkuaz-pembe | #171F44 | #223A58 | #74FFED | #2A3A8A | #FE81D1 | #FFC2E8 | zemin rengi |
| yeşil-turuncu | #0A0C0B | #0D2118 | #1FBF7A | #0B8F62 | #FE8500 | #FFC27A | zemin rengi |
| mor-kiremit | #1B1020 | #28193B | #8B5CFF | #7A1F5C | #D97757 | #FFC9AE | beyaz |
| sarı-siyah | #111318 | #2E281C | #FFC23A | #FFA000 | #FFE08A | #FFE08A | zemin rengi |

## Renk rolleri
- Zemin: sayfanın ya da sahnenin arka planı, tek düz renk. Üstüne en fazla üç büyük, bulanık renk lekesi konabilir: ana (opaklık %40–55), ana 2 (%35–45) ve küçük bir vurgu lekesi (%50).
- Yüzey: kart ve panel zemini. Kenarı 1.5–2 px, ana rengin %35–45 opaklığında.
- Ana: çubuklar, grafik serileri, ikonlar, seçili durum, kenar çizgileri, başlıkta en fazla bir kelime.
- Ana 2: ikinci seri, ikincil dolgu. Gradyan gerekiyorsa yalnız ana → ana 2.
- Vurgu: her ekranda yalnız BİR öğe: birincil buton, tek bir rozet ya da öne çıkan tek bir rakam. Grafikte yalnız tek bir veri noktası. İkinci bir yere konmaz.
- Açık vurgu: koyu zeminde öne çıkan yazı: altyazıda o an konuşulan kelime, alıntı, bağlantı.
- Yazı: başlık beyaz (#FFFFFF), gövde beyazın %70'i, ikincil bilgi %50'si.

## Okunurluk
- Vurgu dolgulu butonun ya da rozetin üstündeki yazı her palette zemin rengidir. Beyaz yazı vurgunun üstünde okunmaz.
- Ana rengi düz yazı olarak yalnız turkuaz-pembe, yeşil-turuncu ve sarı-siyah'ta kullan. Diğer üç palette ana renk dolgu ve çizgi içindir; vurgulu yazıda açık vurguyu ya da beyazı kullan.
- Ana dolgunun üstündeki yazı rengi tablodaki "Ana üstü yazı" sütunundadır.
- Gövde metni zemine karşı en az 4.5:1 kontrastta olsun.

## Biçim
- Köşe yarıçapı: kart 20–28 px, buton 14–20 px. Her öğeyi hap biçimine çevirme.
- Gölge koyu ve yumuşak olsun (ör. 0 30px 80px rgba(0,0,0,.5)). Renkli parıltı yalnız vurgu öğesinde.
- Başlıklarda kalın sistem fontu (800–900), kod ve renk kodlarında monospace.
- Kullanma: varsayılan mor-mavi gradyan (#8B5CF6 → #6366F1 gibi), krem/bej zemin, ✨ ve süs emojileri, gökkuşağı gradyanı, üst üste cam efekti, palet dışı renk. Tek istisna başarı/hata gibi durum renkleri: küçük ve yalnız durumu gösterirken.

## Kodda
- Web ve HTML: renkleri :root altında değişken olarak tanımla ve yalnız bunları kullan:
  --bg, --surface, --main, --main-2, --accent, --accent-soft, --on-accent (= zemin), --on-main.
- Video sahnesi: aynı değişkenler; altyazıda konuşulan kelime --accent-soft.
- Sunum: her slaytta tek vurgu öğesi; grafiklerde ana ve ana 2, öne çıkan tek değer vurgu.

## Teslimden önce
Kısaca kontrol et ve sonucu bir satırla yaz: her ekranda tek vurgu var mı, palet dışı renk var mı, yazılar okunuyor mu.

## Diğer becerilerle ilişkisi
- Kodla çizim stil kütüphanesinde (Osmanlı Minyatürü, 8-bit vb.) stilin kendi paleti tekniğin parçasıdır; kullanıcı orada palet adı anarsa stil, palete taşınır (palet değiştir kuralı), anmazsa stilin paleti kalır ve başta bir kez palet önerilir.
- `/reel` işlerinde `style.md`'deki renkler bu paletlerden biri olarak yazılır.
