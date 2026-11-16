# İçerik Kiti — Windows Kurulumu

## Kurulum (bir kere, ~15–20 dakika)

1. `icerik-kiti.zip` dosyasını indir.
2. Sağ tıkla → **Tümünü ayıkla** → kalıcı bir yere çıkar, örneğin `C:\Users\<adın>\icerik-kiti`.
   (Sonradan taşıma: `video-yap` bu klasörü kullanır.)
3. Klasörün içinde boş bir yere sağ tıkla → **Terminalde aç**.
4. Şunu yapıştır, Enter'a bas:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\kur.ps1
   ```

5. Bitince terminali **kapatıp yeniden aç**.
6. Claude Code'a bir kere giriş yap: `claude` yaz, açılan tarayıcıda hesabınla onayla.
7. Yayın için bir kere: `vercel login`

## Bilgisayarda otomatik yedek (bir kere)

Her şeyin bilgisayarda da durması ve GitHub'la saatte bir eşitlenmesi için:

1. [`bilgisayar/kur-esitleme.ps1`](bilgisayar/kur-esitleme.ps1) dosyasını indir (GitHub'da dosyayı aç → **Download raw file**).
2. İndirdiğin klasörde sağ tık → **Terminalde aç**, şunu yapıştır:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\kur-esitleme.ps1
   ```

3. Tarayıcıda GitHub girişi açılırsa onayla.

Sonuç: depo `C:\Users\<adın>\dotlottie` klasörüne iner; her saat ve her oturum açılışında
bilgisayardaki değişiklikler GitHub'a gönderilir, GitHub'daki yenilikler indirilir, Claude ayarları ve skill'ler güncellenir.
Masaüstüne **dotlottie** kısayolu konur; çift tıklayınca klasör açılır.
Kayıt dosyası: `%LOCALAPPDATA%\dotlottie-esitle.log`.

## Kullanım

```powershell
video-yap C:\Users\<adın>\Desktop\kayit.m4a --baslik "Asimetrinin Gücü"
```

- Video: `icerik-kiti\cikti\<dosya adı>\` klasörüne çıkar.
- `--renk "#1F4FD8"` → vurgu rengi, `--model medium` → daha doğru altyazı, `--yayinla` → Vercel'de yayınla.
- İlk çalıştırmada Whisper modeli (~460 MB) iner, biraz bekletir.

## Kitte ne var

| Dosya / klasör | Ne işe yarar |
|---|---|
| `kur.ps1` | Her şeyi kuran betik |
| `video-yap.py` | Ses → altyazı → video → yayın |
| `remotion-video\` | 9:16 Shorts şablonu (`src\Shorts.tsx`) |
| `ayarlar\CLAUDE.md` | Tercihlerin → `%USERPROFILE%\.claude\` içine kopyalanır (eskisi yedeklenir) |
| `skills\` | 10 beceri → `%USERPROFILE%\.claude\skills\` içine kopyalanır |

## Sorun çıkarsa

- **"winget bulunamadı"** → Microsoft Store'da "Uygulama Yükleyici"yi (App Installer) güncelle.
- **"betik çalıştırılamaz" hatası** → 4. adımdaki komutu aynen kullan (`-ExecutionPolicy Bypass`).
- **Bir komut "bulunamadı"** → terminali kapatıp yeniden aç; olmazsa `kur.ps1`'i bir kez daha çalıştır.
- Takıldığın yerde hata mesajını kopyalayıp Claude'a yapıştır.
