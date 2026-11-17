# LLM API (LiteLLM proxy)

Claude, GPT ve Gemini'yi **tek bir OpenAI uyumlu adreste** toplar: `http://localhost:4000`.
Kod hangi sağlayıcıyı kullanırsa kullansın aynı biçimde istek atar; model adını değiştirmek yeter.

## En kolayı (Windows, tek komut)

```powershell
powershell -ExecutionPolicy Bypass -File .\llm-api\tek-tik-kur.ps1
```

Kurar, anahtarı gizli olarak sorup kalıcı kaydeder, proxy'yi başlatır ve dener.

## Kurulum

```bash
pip install 'litellm[proxy]'
```

(`bulut-kurulum.sh` ve `kur.ps1` bunu kendisi yapar.)

## Anahtarlar

Anahtarlar ortam değişkenlerinden okunur, depoya **asla** yazılmaz:

| Değişken | Ne |
|---|---|
| `ANTHROPIC_API_KEY` | Claude (console.anthropic.com) |
| `OPENAI_API_KEY` | GPT (isteğe bağlı) |
| `GEMINI_API_KEY` | Gemini (isteğe bağlı) |
| `LITELLM_MASTER_KEY` | Proxy'nin kendi şifresi; varsayılan `sk-icerik-kiti` |

## Başlat ve dene

```bash
./llm-api/baslat.sh                                 # Linux / Mac
powershell -File .\llm-api\baslat.ps1               # Windows
python3 llm-api/dene.py "Merhaba de" claude-haiku   # deneme
```

Modeller: `claude-opus`, `claude-sonnet`, `claude-haiku`, `gpt`, `gemini` (`config.yaml`).

OpenAI SDK ile:

```python
from openai import OpenAI
c = OpenAI(base_url="http://localhost:4000", api_key="sk-icerik-kiti")
print(c.chat.completions.create(model="claude-sonnet",
      messages=[{"role": "user", "content": "Selam"}]).choices[0].message.content)
```

## Bulut oturumu notu

Claude Code bulut oturumunda `api.anthropic.com` için kullanıcı anahtarı kaydedilemiyor
(oturumun kendisi yönetiyor). Claude'u proxy üzerinden kullanmak için proxy'yi kendi
bilgisayarında çalıştır. OpenAI/Gemini anahtarları bulutta ortamın ağ sırrı olarak eklenebilir.
