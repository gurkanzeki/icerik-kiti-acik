#!/usr/bin/env bash
# Bulut oturumu kurulumu (Linux): Whisper, HyperFrames, Vercel, Remotion, beceriler, CLAUDE.md, video-yap
set -e
KIT="$(cd "$(dirname "$0")" && pwd)"

pip install --break-system-packages -q torch --index-url https://download.pytorch.org/whl/cpu
pip install --break-system-packages -q openai-whisper
pip install --break-system-packages -q "litellm[proxy]"
npm install -g --no-audit --no-fund hyperframes vercel
(cd "$KIT/remotion-video" && npm install --no-audit --no-fund)

mkdir -p ~/.claude/skills
cp -r "$KIT/skills/." ~/.claude/skills/
cp "$KIT/ayarlar/CLAUDE.md" ~/.claude/CLAUDE.md

rm -f /usr/local/bin/video-yap
printf '#!/bin/sh\nexec python3 "%s/video-yap.py" "$@"\n' "$KIT" > /usr/local/bin/video-yap
chmod +x /usr/local/bin/video-yap
echo "İçerik kiti hazır."
