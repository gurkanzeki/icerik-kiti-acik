---
name: "icerik-arac-seti"
description: "Video ya da içerik üretirken ses efekti/ses tasarımı, serbest lisanslı ses arama, hazır skill arama, plan/beyin fırtınası ya da görsel istem ilhamı gerektiğinde kullan: kurulu araç setini kurar ve hangisinin ne zaman kullanılacağını söyler."
---

# İçerik araç seti

Kullanıcı bu araçların, içeriğe uygun görüldüğünde kendiliğinden kullanılmasını istedi. Hepsini her işte kullanma; iş neyi gerektiriyorsa onu kur ve kullan. Çalışma alanı her sohbette sıfırdan açılır, o yüzden önce kurulu mu diye bak (`which earshot`, `ls ~/.claude/skills`), yoksa aşağıdaki adımlarla kur.

## Hangi iş, hangi araç

| İş | Araç |
|---|---|
| Videoya ses efekti döşemek (kullanıcının tüm videolarında ses efekti isteniyor) | RealSFX + Openverse |
| Bir sesin gerçekten istenen şey olup olmadığını denetlemek, bitmiş videonun sesini dinleyip kontrol etmek | Earshot |
| Serbest lisanslı gerçek ses kaydı bulmak | Openverse betiği |
| "Şu iş için hazır skill var mı" sorusu | find-skills |
| Büyük bir işi planlamak, fikir geliştirmek | superpowers: brainstorming, writing-plans |
| Kapak/görsel istemi için stil ilhamı | gpt-image-2-style-library (541 örnek, 19 stil) |
| Çok parçalı projeyi görevlere bölmek | task-master (yapay zekâ anahtarı ister; yoksa görev listesini elle kur) |
| Kapak, infografik, sayfa ya da arayüz tasarımı; tasarımın "yapay zekâ işi" gibi durmaması | impeccable, hallmark, taste-skill (design-taste-frontend): tasarım sırasında yön ve bitince kalite denetimi |
| YouTube başlığı/açıklaması/etiketlerinde aranabilirlik, ileride kurulacak bir web sitesinin denetimi | claude-seo (seo ve seo-* skill'leri) |

## Kurulum (incelenmiş sürümler)

Depoları ayrı klasörlere klonla ve aşağıdaki, daha önce kodu gözden geçirilmiş commit'lere sabitle. Daha yeni bir sürüm gerekiyorsa önce farkı oku.

```bash
mkdir -p /home/claude/vendor && cd /home/claude/vendor
klon() { git clone -q https://github.com/$1 $2 && git -C $2 checkout -q $3; }
klon Leonxlnx/earshot earshot 4ac3d2ac2b15
klon Clipwing/skills clipwing edbefcbc3474
klon vercel-labs/skills vercel-skills b716f9dc2ba3
klon obra/superpowers superpowers 22f0b463e7a5
klon freestylefly/awesome-gpt-image-2 gptimage 0ebea1f83ccd   # 356 MB; yalnızca görsel ilhamı gerekiyorsa
klon pbakaus/impeccable impeccable 2b86d9c07b97        # 111 MB; tasarım işi varsa
klon Nutlope/hallmark hallmark 04977e15f3df            # 124 MB; tasarım işi varsa
klon Leonxlnx/taste-skill taste f6b76575f949           # 70 MB; tasarım işi varsa
klon AgriciDaniel/claude-seo claude-seo 2e40a5fa6220   # SEO işi varsa
```

**Earshot** (yaklaşık 1,1 GB model indirir, birkaç dakika):

```bash
uv tool install "earshot[mcp] @ /home/claude/vendor/earshot"
export PATH="$HOME/.local/bin:$PATH"
earshot doctor --fetch        # "earshot looks healthy" demeli
```

Kullanım: `EARSHOT_THREADS=2 earshot describe SES`, `earshot match SES "açıklama"`, `earshot timeline VIDEO`, `earshot critique VIDEO`. Her çağrı modelleri yeniden yükler (20-40 sn).

**Skill'ler** (yalnızca skill klasörleri; otomatik kancaları/hook'ları KURMA):

```bash
S=~/.claude/skills; mkdir -p $S
cp -r /home/claude/vendor/clipwing/skills/real-sfx $S/
cp -r /home/claude/vendor/earshot/skills/earshot /home/claude/vendor/earshot/skills/real-sound $S/
cp -r /home/claude/vendor/vercel-skills/skills/find-skills $S/
cp -r /home/claude/vendor/superpowers/skills/* $S/
cp -r /home/claude/vendor/gptimage/agents/skills/gpt-image-2-style-library $S/
cp -r /home/claude/vendor/impeccable/plugin/skills/impeccable $S/
cp -r /home/claude/vendor/hallmark/skills/hallmark $S/
cp -r /home/claude/vendor/taste/skills/taste-skill $S/
cd $S/real-sfx && python3 scripts/setup.py check
```

**Claude SEO** (26 skill + 19 yardımcı ajan, kütüphaneleri ayrı ortamda):

```bash
C=/home/claude/vendor/claude-seo; S=~/.claude/skills; mkdir -p ~/.claude/agents
for d in $C/skills/*/; do cp -r "$d" $S/; done
for x in schema data scripts; do mkdir -p $S/seo/$x && cp -r $C/$x/* $S/seo/$x/; done
cp $C/agents/*.md ~/.claude/agents/
uv venv -q /home/claude/venvs/seo && uv pip install -q --python /home/claude/venvs/seo/bin/python -r $C/requirements.txt
```

SEO betiklerini `/home/claude/venvs/seo/bin/python` ile çalıştır.

Kullanmadan önce ilgili skill'in `SKILL.md` dosyasını oku ve ona göre çalış.

**RealSFX kütüphanesi:** içinden 78 hazır CC0 arayüz sesi çıkar (uisfx). Gerçek kayıtlar için Openverse'ten indirilenleri kütüphane olarak bağla:

```bash
cd ~/.claude/skills/real-sfx && python3 scripts/setup.py add-library openverse /home/claude/ses-kutuphanesi/openverse --tier main --index
```

Akış: `scripts/look.py VIDEO --out work/look` → anları bul (`find_moments.py` ya da kendi olay listen) → `from_cues.py` → `mix.py ... --plan`, sonra `--plan`'sız → `critique.py`. Çıktı: yeni MP4 + ayrı SFX WAV + rapor.

## Openverse ile ses bulma

Kurulum gerekmez; API anahtarsız çalışır. Sınırlar:

- `cdn.freesound.org` bu çalışma alanını reddediyor (403). Etrafından dolaşma. İndirilebilen kaynak **Wikimedia Commons**; aramada `source=wikimedia_audio` kullan.
- Wikimedia tanıtıcı bir User-Agent ister, yoksa 429 döner. İndirmeler arasında 2 sn bekle.
- Yalnızca `cc0`, `pdm` ya da `by` lisanslı ses al. `by` ise atıf satırını video açıklamasına ekle.
- Her indirilen sesin lisansını ve atıfını `KAYNAKLAR.csv` dosyasına yaz.

```bash
UA="SesKutuphanesi/0.1 (https://openverse.org; kisisel video ses tasarimi) curl"
# ara
curl -sS -A "$UA" "https://api.openverse.org/v1/audio/?q=door+knock&license=cc0,pdm,by&source=wikimedia_audio&page_size=20"
# tek kaydın ayrıntısı (url, license, attribution alanları)
curl -sS -A "$UA" "https://api.openverse.org/v1/audio/<id>/"
# indir
mkdir -p /home/claude/ses-kutuphanesi/openverse
curl -sS -A "$UA" -o /home/claude/ses-kutuphanesi/openverse/<ad>.<uzanti> "<url>"
```

İndirdikten sonra sesi Earshot ile doğrula (`earshot match`): "strong" ya da "plausible" değilse kullanma, başka kayıt ara.

## Kurallar

- Sesi duyamazsın; bir seçimi "dinledim" diye sunma. Earshot'ın ölçtüğünü söyle ve kullanıcının kulağıyla bakması gereken yeri belirt.
- Uygun gerçek ses bulunamazsa o anı sessiz bırak ve raporda söyle; uydurma.
- `i-have-adhd` üslup skill'ini ve superpowers/adhd oturum kancalarını yalnızca kullanıcı açıkça isterse devreye al.
- find-skills yeni bir üçüncü taraf skill önerirse, kurmadan önce kodunu oku ve kullanıcıya sor.
- Kullanıcının bilgisayarına kurulum ayrı iştir; bilgisayar bağlıyken ve kullanıcı isteyince yapılır. ThinkRail (JetBrains'in masaüstü geliştirme ortamı) yalnızca bilgisayara kurulur.
- Impeccable'ın tasarım denetimi ve claude-seo'nun şema doğrulama kancalarını (hook) kullanıcı istemedikçe kurma.
- TradingAgents'ı kullanıcı açıkça istemedikçe kurma: ücretli API anahtarı ister. Alım satım yapma, yatırım tavsiyesi verme; en fazla video konusu olarak nasıl çalıştığını anlat.