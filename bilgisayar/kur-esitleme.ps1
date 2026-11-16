# dotlottie'yi bu bilgisayara indirir ve her saat GitHub ile eşitler (bir kere çalıştır).
# Yapar: Git'i kurar, depoyu %USERPROFILE%\dotlottie'ye indirir, saatlik eşitleme görevi ekler,
#        masaüstüne dotlottie kısayolu koyar.
$ErrorActionPreference = "Stop"
$Repo = Join-Path $env:USERPROFILE "dotlottie"

Write-Host "`n▶ 1/3  Git" -ForegroundColor Yellow
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  winget install --id Git.Git -e --silent --accept-package-agreements --accept-source-agreements
  $env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")
}

Write-Host "`n▶ 2/3  Depoyu indir ($Repo)" -ForegroundColor Yellow
if (Test-Path (Join-Path $Repo ".git")) {
  Write-Host "   Zaten var, atlanıyor."
} else {
  # İlk seferde tarayıcıda GitHub girişi açılır; onayla.
  git clone https://github.com/gurkanzeki/dotlottie.git $Repo
}

Write-Host "`n▶ 3/3  Saatlik eşitleme görevi" -ForegroundColor Yellow
$Betik = Join-Path $Repo "bilgisayar\esitle.ps1"
$Eylem = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$Betik`""
$Saatlik = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 1)
$Giriste = New-ScheduledTaskTrigger -AtLogOn
Register-ScheduledTask -TaskName "dotlottie esitle" -Action $Eylem -Trigger $Saatlik, $Giriste -Force | Out-Null

& powershell -NoProfile -ExecutionPolicy Bypass -File $Betik
Write-Host "`n✔ Bitti. Klasör: $Repo  ·  Kayıt: $env:LOCALAPPDATA\dotlottie-esitle.log" -ForegroundColor Green
