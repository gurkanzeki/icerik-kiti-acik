// ElevenLabs anahtarını ekranda göstermeden sorar ve projenin .env dosyasına
// ELEVENLABS_API_KEY olarak yazar. Kullanım: node scripts/anahtar-kaydet.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");

const askHidden = (q) =>
  new Promise((resolve) => {
    process.stdout.write(q);
    const stdin = process.stdin;
    let value = "";
    if (stdin.isTTY) stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const onData = (ch) => {
      for (const c of ch) {
        if (c === "\r" || c === "\n") {
          if (stdin.isTTY) stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", onData);
          process.stdout.write("\n");
          return resolve(value.trim());
        }
        if (c === "\u0003") process.exit(1); // Ctrl+C
        if (c === "\u007f" || c === "\b") value = value.slice(0, -1);
        else value += c;
      }
    };
    stdin.on("data", onData);
  });

const key = await askHidden("ElevenLabs API anahtarını yapıştır ve Enter'a bas (ekranda görünmez): ");
if (!key) {
  console.log("Anahtar boş, hiçbir şey kaydedilmedi.");
  process.exit(1);
}
let lines = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8").split(/\r?\n/) : [];
lines = lines.filter((l) => l && !l.startsWith("ELEVENLABS_API_KEY="));
lines.push(`ELEVENLABS_API_KEY=${key}`);
fs.writeFileSync(envPath, lines.join("\n") + "\n", { mode: 0o600 });
console.log(`Kaydedildi: ${envPath} (anahtarın son 4 hanesi: ${key.slice(-4)})`);
