// Ses dosyasından her kelimenin başlangıç ve bitiş zamanını çıkarır.
// Metin esastır: kelimeler ve yazımları metinden, yalnız zamanlar Whisper'dan alınır.
// Kullanım: node scripts/kelime-zamanlari.mjs <ses.mp3|wav> <metin.txt> <cikti.json> [dil=tr]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";

const [audio, scriptFile, outFile, language = "tr"] = process.argv.slice(2);
if (!audio || !scriptFile || !outFile) {
  console.error("Kullanım: node scripts/kelime-zamanlari.mjs <ses> <metin.txt> <cikti.json> [dil]");
  process.exit(1);
}

// 1. Whisper 16 kHz, 16 bit mono WAV ister.
const wav = path.join(os.tmpdir(), `kz-${process.pid}.wav`);
execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", audio, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav]);

// 2. Whisper ile kelime zamanları.
const out = await transcribe({
  inputPath: wav,
  whisperPath: path.join(process.cwd(), "whisper.cpp"),
  whisperCppVersion: "1.5.5",
  model: "medium",
  language,
  tokenLevelTimestamps: true,
  splitOnWord: true,
  printOutput: false,
});
fs.rmSync(wav, { force: true });
const heard = toCaptions({ whisperCppOutput: out }).captions
  .map((c) => ({ text: c.text.trim(), startMs: c.startMs, endMs: c.endMs }))
  .filter((c) => c.text);

// 3. Metindeki kelimeleri duyulan kelimelerle hizala.
const norm = (s) => s.toLocaleLowerCase(language).normalize("NFKD").replace(/[^\p{L}\p{N}]/gu, "");
const words = fs.readFileSync(scriptFile, "utf8").split(/\s+/).filter(Boolean);
const a = words.map(norm), b = heard.map((h) => norm(h.text));

// Levenshtein benzeri hizalama (eşleşme, atlama, değiştirme).
const n = a.length, m = b.length;
const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
for (let i = 0; i <= n; i++) dp[i][0] = i;
for (let j = 0; j <= m; j++) dp[0][j] = j;
for (let i = 1; i <= n; i++)
  for (let j = 1; j <= m; j++)
    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
const match = new Array(n).fill(-1);
for (let i = n, j = m; i > 0 && j > 0;) {
  if (dp[i][j] === dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) { match[i - 1] = j - 1; i--; j--; }
  else if (dp[i][j] === dp[i - 1][j] + 1) i--;
  else j--;
}

// 4. Eşleşmeyen kelimelere komşularının arasından zaman ver.
const result = words.map((text, i) => (match[i] >= 0 ? { text, startMs: heard[match[i]].startMs, endMs: heard[match[i]].endMs } : { text, startMs: null, endMs: null }));
for (let i = 0; i < result.length; i++) {
  if (result[i].startMs !== null) continue;
  let k = i; while (k < result.length && result[k].startMs === null) k++;
  const from = i > 0 ? result[i - 1].endMs : 0;
  const to = k < result.length ? result[k].startMs : (heard.at(-1)?.endMs ?? from + 400 * (k - i));
  const step = (to - from) / (k - i);
  for (let q = i; q < k; q++) { result[q].startMs = Math.round(from + step * (q - i)); result[q].endMs = Math.round(from + step * (q - i + 1)); }
  i = k - 1;
}
fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log(`${result.length} kelime, ${match.filter((x) => x >= 0).length} tanesi doğrudan eşleşti → ${outFile}`);
