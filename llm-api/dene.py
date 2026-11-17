"""LiteLLM proxy'yi dener: python3 llm-api/dene.py "soru" [model]"""
import json, os, sys, urllib.request

soru = sys.argv[1] if len(sys.argv) > 1 else "Bir cümleyle merhaba de."
model = sys.argv[2] if len(sys.argv) > 2 else "claude-haiku"
istek = urllib.request.Request(
    "http://localhost:4000/v1/chat/completions",
    data=json.dumps({"model": model, "messages": [{"role": "user", "content": soru}]}).encode(),
    headers={"Content-Type": "application/json",
             "Authorization": "Bearer " + os.environ.get("LITELLM_MASTER_KEY", "sk-icerik-kiti")},
)
cevap = json.load(urllib.request.urlopen(istek))
print(cevap["choices"][0]["message"]["content"])
