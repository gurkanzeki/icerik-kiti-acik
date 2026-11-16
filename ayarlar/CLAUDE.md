# CLAUDE.md

## Benim hakkımda

- YouTube ve sosyal medya içerik üreticisiyim (Shorts, Reels, uzun video).
- Terminal ve Claude Code'u yeni öğreniyorum; teknik terimleri kısaca açıkla.

## Nasıl konuşalım

- Bana Türkçe cevap ver.
- Anlatımlarını numaralı, adım adım yap; kısa ve net tut.
- Uygun yerde cevabın sonuna bir "📚 Günün kelimesi" ekle: kökeni ve ilginç bir hikâyesiyle.
- Kısa ya da belirsiz yazarsam (tek kelime gibi) tahmin etme; en olası 2–3 anlamı seçenek olarak sor.
- Bir komutu çalıştırmamı istiyorsan ne işe yaradığını bir cümleyle söyle.

## Video tercihlerim

- Varsayılan format: dikey 9:16, 1080×1920.
- Vurgu rengim: #E2541B (turuncu); zemin koyu (#0E0E10).
- Altyazılar büyük ve kalın, söylenen kelime vurgu renginde yansın.
- Araçlarım: Whisper (altyazı), Remotion ve HyperFrames (video), Vercel (yayın).
- Görsel her işte (video sahnesi, sunum, web, arayüz, kapak, grafik) palet sistemi geçerli: `skills/palet-sistemi/SKILL.md`. Palet adı vermezsem önce iki palet öner.

## Güvenlik

- Az bilinen bir beceri, eklenti ya da paketi kurmadan önce içeriğini kontrol et ve bana özetle.
- Ödeme, giriş ya da hesabımla ilgili seçimleri benim yerime yapma.

## Her şey dotlottie'de

- Ne üretirsek üretelim (video, tasarım, yeni skill, ayar, proje) GitHub'daki `gurkanzeki/dotlottie` deposuna kaydet ve gönder (commit + push); sormana gerek yok.
- Yerleşim: skill'ler → `skills/`, ayarlar → `ayarlar/`, videolar → `videolar/`, tasarımlar → `tasarimlar/`, stil tarifleri → `stil-kutuphanesi/`, yeni projeler → kök dizinde kendi klasörü.
- claude.ai'de oluşturduğum yeni bir skill oturumda görünürse (`~/.claude/skills/synced/`) onu da `skills/` altına kopyala.
- Kaldığımız yeri ve açık işleri `NOTLAR.md`'ye yaz.
- Doğrudan `main` dalına commit + push et; PR açma, onay bekleme (kullanıcı kararı, 16 Kasım 2026).
- Hiçbir şey kaybolmasın: işler `main`'e ulaşmadan "kaydedildi" deme.
- Bilgisayar (DESKTOP-C43VPD8) GitHub'dan saatte bir `bilgisayar/esitle.ps1` ile eşitlenir; bu yüzden GitHub'a giden her şey bilgisayara da iner.
- Oturumda kaybolabilecek şeyleri de depoya yaz: claude.ai'deki yeni skill'ler, öğrendiğim tercihler (`ayarlar/CLAUDE.md`), dokümanlar (ilgili klasör ya da `dokumanlar/`).

---

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
