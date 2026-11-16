# İçerik kiti kurulumu (Windows)
# Kurar: Python, Node.js, ffmpeg, Whisper, HyperFrames, Vercel CLI, Claude Code,
#        Remotion projesi, 10 beceri, CLAUDE.md ve video-yap komutu.
$ErrorActionPreference = "Stop"
$Kit = $PSScriptRoot
$ClaudeDir = Join-Path $env:USERPROFILE ".claude"

function Adim($m) { Write-Host "`n▶ $m" -ForegroundColor Yellow }
function Yenile { $env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User") }

Adim "1/7  Temel programlar (Python, Node.js, ffmpeg)"
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  throw "winget bulunamadı. Microsoft Store'dan 'Uygulama Yükleyici'yi (App Installer) güncelle ve tekrar dene."
}
foreach ($id in "Python.Python.3.12", "OpenJS.NodeJS.LTS", "Gyan.FFmpeg") {
  winget install --id $id -e --silent --accept-package-agreements --accept-source-agreements
  if ($LASTEXITCODE -ne 0) { Write-Host "   ($id zaten kurulu olabilir, devam ediliyor)" }
}
Yenile

Adim "2/7  Whisper (altyazı)"
python -m pip install --upgrade pip
python -m pip install openai-whisper

Adim "3/7  Claude Code, HyperFrames, Vercel"
npm install -g @anthropic-ai/claude-code hyperframes vercel

Adim "4/7  Remotion projesi"
Push-Location (Join-Path $Kit "remotion-video")
npm install
Pop-Location

Adim "5/7  CLAUDE.md ve beceriler"
New-Item -ItemType Directory -Force -Path (Join-Path $ClaudeDir "skills") | Out-Null
$Hedef = Join-Path $ClaudeDir "CLAUDE.md"
if (Test-Path $Hedef) {
  Copy-Item $Hedef "$Hedef.yedek" -Force
  Write-Host "   Eski CLAUDE.md yedeklendi: CLAUDE.md.yedek"
}
Copy-Item (Join-Path $Kit "ayarlar\CLAUDE.md") $Hedef -Force
Copy-Item (Join-Path $Kit "skills\*") (Join-Path $ClaudeDir "skills") -Recurse -Force

Adim "6/7  video-yap komutu"
$Bin = Join-Path $env:USERPROFILE "bin"
New-Item -ItemType Directory -Force -Path $Bin | Out-Null
"@python `"$Kit\video-yap.py`" %*" | Set-Content -Encoding ASCII (Join-Path $Bin "video-yap.cmd")
$UserPath = [Environment]::GetEnvironmentVariable("Path","User")
if ($UserPath -notlike "*$Bin*") { [Environment]::SetEnvironmentVariable("Path", "$UserPath;$Bin", "User") }
Yenile

Adim "7/7  Kontrol"
foreach ($c in "python", "node", "ffmpeg", "claude", "hyperframes", "vercel", "video-yap") {
  if (Get-Command $c -ErrorAction SilentlyContinue) { Write-Host "   ✔ $c" -ForegroundColor Green }
  else { Write-Host "   ✘ $c (terminali kapatıp yeniden aç, tekrar dene)" -ForegroundColor Red }
}

Write-Host "`n✔ Kurulum bitti. Terminali kapatıp yeniden aç, sonra:" -ForegroundColor Green
Write-Host "   claude          → Claude Code'u başlatır"
Write-Host "   video-yap ses.mp3 --baslik `"Başlık`"   → altyazılı video üretir"
Write-Host "   vercel login    → yayın için bir kerelik giriş"
