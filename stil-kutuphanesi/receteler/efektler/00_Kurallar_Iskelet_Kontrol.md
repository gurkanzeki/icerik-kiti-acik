<!-- Kaynak: kodla-cizim-stil-kutuphanesi becerisi, satır 1-29 (15 Kasım 2026'da çıkarıldı) -->

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

<!-- Kaynak: kodla-cizim-stil-kutuphanesi becerisi, satır 386-999 (15 Kasım 2026'da çıkarıldı) -->

## 5. Kontrol
- Tarayıcıda T=0 ile T≈1 karelerini karşılaştır: fark sıfıra yakın olmalı (Linol'de bir adımlık fark normal).
- Renk karıştırma yardımcıları her zaman `#rrggbb` döndürsün (iç içe kullanım bozulmasın).
- Test için `window.__T` tanımlıysa onu kullan, yoksa saat zamanını.

## 6. Yeni sahne ya da yeni stil
- Yeni sahne: bölüm 1–3 aynen, yalnızca geometri ve yerleşim değişir; roller korunur ki 8 stil hazır çalışsın.
- Yeni stil: bölüm 3'teki kancaları doldur; palet + boyama tekniği + doku + hareket karakteri dördünü de tanımla.
- Katalog stili (4b/4c/4e) seçildiyse: reçetedeki palet, teknik ve hareket karakterini kancalara çevir; aynı aileden çekirdek stil varsa (ör. Neon Tüpler ↔ Neon Gece) onun kodundan başla, farkı uygula.
- Stil seçimi konuya ve metne göre yapılır; [G] ve [3B] etiketli stiller kodla çizime uyarlanmadan önce kullanıcıya uyarlamanın sınırı söylenir.