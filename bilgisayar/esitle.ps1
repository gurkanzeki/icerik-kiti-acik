# Bilgisayardaki dotlottie'yi GitHub ile iki yönlü eşitler; Görev Zamanlayıcı her saat çalıştırır.
# 1) Bilgisayardaki değişiklikleri kaydedip gönderir  2) GitHub'daki yenilikleri indirir
# 3) ayarlar\CLAUDE.md ve skills\'i Claude'un klasörüne kopyalar.
$Repo = Join-Path $env:USERPROFILE "dotlottie"
$Log = Join-Path $env:LOCALAPPDATA "dotlottie-esitle.log"
function Yaz($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm')  $m" | Add-Content -Encoding UTF8 $Log }

Set-Location $Repo
git checkout main 2>$null
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -m "Bilgisayardan otomatik kayıt ($env:COMPUTERNAME)" | Out-Null
  Yaz "Yerel değişiklikler kaydedildi."
}
git pull --rebase origin main 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
  git rebase --abort 2>$null
  Yaz "ÇAKIŞMA: indirme yapılamadı; dosyalar yerinde duruyor. Claude'a bu kaydı göster."
  exit 1
}
git push origin main 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { Yaz "UYARI: gönderilemedi (internet ya da giriş?)."; exit 1 }

$Claude = Join-Path $env:USERPROFILE ".claude"
New-Item -ItemType Directory -Force -Path (Join-Path $Claude "skills") | Out-Null
Copy-Item (Join-Path $Repo "ayarlar\CLAUDE.md") (Join-Path $Claude "CLAUDE.md") -Force
Copy-Item (Join-Path $Repo "skills\*") (Join-Path $Claude "skills") -Recurse -Force
# Masaüstünde dotlottie kısayolu yoksa oluştur (OneDrive masaüstü dahil).
$Kisayol = Join-Path ([Environment]::GetFolderPath("Desktop")) "dotlottie.lnk"
if (-not (Test-Path $Kisayol)) {
  $k = (New-Object -ComObject WScript.Shell).CreateShortcut($Kisayol)
  $k.TargetPath = $Repo
  $k.Description = "dotlottie: videolar, skill'ler, ayarlar"
  $k.Save()
  Yaz "Masaüstü kısayolu oluşturuldu."
}
Yaz "Eşitlendi: $(git rev-parse --short HEAD)"
