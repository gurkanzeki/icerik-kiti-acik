#!/usr/bin/env bash
# LiteLLM proxy'yi başlatır: http://localhost:4000
DIR="$(cd "$(dirname "$0")" && pwd)"
export LITELLM_MASTER_KEY="${LITELLM_MASTER_KEY:-sk-icerik-kiti}"
# Bulut oturumunda gerçek anahtarı ağ vekili ekler; burada sahte değer yeter.
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-sk-ant-vekil-ekler}"
exec litellm --config "$DIR/config.yaml" --port "${PORT:-4000}" "$@"
