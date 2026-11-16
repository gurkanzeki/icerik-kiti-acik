// Remotion'ın Whisper.cpp aracını ve çok dilli modeli kurar (bir kez).
// Kullanım: node scripts/whisper-kur.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { installWhisperCpp, downloadWhisperModel } from "@remotion/install-whisper-cpp";

export const WHISPER_PATH = path.join(process.cwd(), "whisper.cpp");
export const WHISPER_VERSION = "1.5.5";
export const WHISPER_MODEL = "medium"; // çok dilli (Türkçe dahil), ~1.5 GB

await installWhisperCpp({ to: WHISPER_PATH, version: WHISPER_VERSION });

const modelFile = path.join(WHISPER_PATH, `ggml-${WHISPER_MODEL}.bin`);
if (!fs.existsSync(modelFile)) {
  try {
    await downloadWhisperModel({ model: WHISPER_MODEL, folder: WHISPER_PATH });
  } catch (e) {
    // Bazı ağlarda Node'un fetch'i vekil sunucuyu kullanmaz; curl ile dene.
    console.log("Model indirilemedi, curl ile deneniyor:", e.message);
    execFileSync("curl", ["-sSL", "--retry", "3", "-o", modelFile,
      `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-${WHISPER_MODEL}.bin`], { stdio: "inherit" });
  }
}
console.log("Whisper hazır:", modelFile);
