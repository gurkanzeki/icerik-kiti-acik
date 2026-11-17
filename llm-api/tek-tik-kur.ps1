# LiteLLM proxy'yi tek komutla kurar, Anthropic anahtarını kaydeder, başlatır ve dener.
# Çalıştır:  powershell -ExecutionPolicy Bypass -File .\llm-api\tek-tik-kur.ps1
$ErrorActionPreference = "Stop"
$dir = $PSScriptRoot

Write-Host "1/4  LiteLLM kuruluyor..." -ForegroundColor Cyan
python -m pip install --quiet "litellm[proxy]"

if (-not $env:ANTHROPIC_API_KEY -and -not [Environment]::GetEnvironmentVariable("ANTHROPIC_API_KEY", "User")) {
    Write-Host "2/4  Anthropic API anahtarini yapistir (ekranda gorunmez), Enter'a bas:" -ForegroundColor Cyan
    $gizli = Read-Host -AsSecureString
    $anahtar = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($gizli))
    if (-not $anahtar.StartsWith("sk-ant-")) { throw "Anahtar 'sk-ant-' ile baslamali." }
    [Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", $anahtar, "User")
    $env:ANTHROPIC_API_KEY = $anahtar
    Write-Host "     Anahtar kalici olarak kaydedildi." -ForegroundColor Green
} else {
    if (-not $env:ANTHROPIC_API_KEY) {
        $env:ANTHROPIC_API_KEY = [Environment]::GetEnvironmentVariable("ANTHROPIC_API_KEY", "User")
    }
    Write-Host "2/4  Anahtar zaten tanimli, atlandi." -ForegroundColor Green
}

if (-not $env:LITELLM_MASTER_KEY) { $env:LITELLM_MASTER_KEY = "sk-icerik-kiti" }

Write-Host "3/4  Proxy baslatiliyor (ayri pencerede)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", "`"$dir\baslat.ps1`""

$hazir = $false
for ($i = 0; $i -lt 40; $i++) {
    Start-Sleep -Seconds 2
    try { Invoke-RestMethod "http://localhost:4000/health/liveliness" | Out-Null; $hazir = $true; break } catch {}
}
if (-not $hazir) { throw "Proxy 80 saniyede acilmadi; acilan penceredeki hataya bak." }

Write-Host "4/4  Deneniyor..." -ForegroundColor Cyan
python "$dir\dene.py" "Bir cumleyle merhaba de."
Write-Host "`nKurulum tamam. Proxy: http://localhost:4000  (sifre: $env:LITELLM_MASTER_KEY)" -ForegroundColor Green
