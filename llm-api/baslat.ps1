# LiteLLM proxy'yi Windows'ta başlatır: http://localhost:4000
# Önce anahtarlarını ayarla (bir kere):  setx ANTHROPIC_API_KEY "sk-ant-..."
if (-not $env:LITELLM_MASTER_KEY) { $env:LITELLM_MASTER_KEY = "sk-icerik-kiti" }
litellm --config "$PSScriptRoot\config.yaml" --port 4000
