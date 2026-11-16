# Plan: gunes-8-dakika

Ses: Zeki (ElevenLabs, 2. kayıt), 17.08 sn. Video: 530 kare (17.67 sn), 30 fps, 1080 × 1920.
Okunacak her şey güvenli alanda: x 80–940, y 220–1500. Görsel alan y 260–1150, altyazı y 1260–1460.
Palet mavi-turuncu. Vurgu (#FE8500) her sahnede tek öğe: Güneş. Söylenen kelime #FFC27A.

| # | Cümle | Başlangıç–bitiş | Ekranda |
|---|---|---|---|
| 1 | Şu an gördüğün Güneş, sekiz dakika önceki Güneş. | 0.00–3.40 | İlk karede başlık: "Gördüğün Güneş / 8 dakika önceki." Turuncu Güneş ortada iner ve oturur (0–0.5). "sekiz dakika"da (1.62) başlığın altında mavi çizgi kendini çizer. "Güneş."te (2.68) Güneş bir kez kabarıp oturur. |
| 2 | Aradaki yüz elli milyon kilometreyi ışık, saniyede üç yüz bin kilometreyle geçer. | 3.40–9.28 | Başlık yukarı çıkar; Güneş küçülüp sola kayar, sağa mavi Dünya iner (3.40–3.90). "yüz"de (3.96) aradaki çizgi kendini çizer ve üstünde mesafe 0'dan 150.000.000 km'ye sayar (3.96–5.07). "ışık"ta (5.90) beyaz ışık noktası Güneş'ten Dünya'ya akmaya başlar. "saniyede"de (6.48) altında hız 0'dan 300.000 km/sn'ye sayar. |
| 3 | Bu yolculuk sekiz dakika yirmi saniye sürer. | 9.28–12.54 | Etiketler çekilir, ortada dev sayaç belirir. "yolculuk"ta (9.45) tek ışık noktası yola çıkar, arkasında çizgi mavi dolar; sayaç 0:00'dan 8:20'ye sayar ve nokta Dünya'ya vardığında (11.28) durur. Dünya'dan bir halka yayılır. |
| 4 | Yani Güneş şimdi sönse, sekiz dakika boyunca fark etmezdin. | 12.54–17.67 | "Güneş"te (12.89) Güneş kabarır. "sönse"de (14.01) Güneş söner (turuncu → koyu yüzey, ince mavi kenar). "sekiz"te (14.54) son ışık hâlâ yolda Dünya'ya ilerler, sayaç 8:20'den geri sayar; Dünya aydınlık kalır. |

## "Make it look good" denetimi
- Fikir bir çizim: Güneş, Dünya, aradaki yol, yolda ilerleyen ışık, sayaç. Ekranda az kelime.
- Her cümlede resim değişiyor ve var olan dönüşüyor: Güneş küçülür, çizgi dolar, Güneş söner.
- Sayılar sayıyor, çizgiler kendini çiziyor. Yavaş solma, dönme, sürüklenme yok.
- İlk karede başlık yazılı ve Güneş hareket halinde.
- Tek yazı tipi (Inter), yalnız palet renkleri, gradyan/parıltı/emoji yok.
- Aynı anda en fazla 2 grafik öğe hareket ediyor (altyazı hariç).

## Ses efektleri (kodla üretildi, sesin altında)
pop 0.05 sn (Güneş iner) · tık 3.96 (çizgi başlar) · vın 9.45 (ışık yola çıkar) · ding 11.28 (Dünya'ya varış) · güm 14.01 (Güneş söner)
