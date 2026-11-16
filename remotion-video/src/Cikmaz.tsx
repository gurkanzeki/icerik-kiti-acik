import React from "react";
import { AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Scene } from "./Kisa";

const BG = "#0E0E10";
const MUTED = "#8C8A85";
const ACCENT = "#E2541B";

// "Gündem" story: AK Parti'nin üç duvarı. Veriler Kasım 2026 itibarıyla.
export const CIKMAZ_SCENES: { lines: string[]; sec: number }[] = [
  { lines: ["AK Parti bugün", "*üç duvar* arasında."], sec: 3 },
  { lines: ["1. duvar:", "*Sandık.*"], sec: 2 },
  { lines: ["2023'te", "*%35,6* oy aldı.", "Bugün anketlerde", "*%30 civarı.*"], sec: 4 },
  { lines: ["Muhalefet bölündü.", "Yine de YENİ Parti", "sadece *3 puan* geride."], sec: 4 },
  { lines: ["2. duvar:", "*Aday.*"], sec: 2 },
  { lines: ["Erdoğan'ın", "yeniden adaylığı için", "Meclis'te", "*360 oy* gerekiyor."], sec: 4 },
  { lines: ["AK Parti + MHP:", "*327.*", "*33 oy* eksik."], sec: 3.5 },
  { lines: ["Anahtar *DEM Parti'de.*", "Masadaki şart:", "*anayasa değişikliği.*"], sec: 4 },
  { lines: ["3. duvar:", "*Cüzdan.*"], sec: 2 },
  { lines: ["Ekim enflasyonu", "hâlâ *%29,8.*"], sec: 3 },
  { lines: ["Bir kapıyı açmak", "*diğerini zorluyor.*"], sec: 3 },
  { lines: ["Çıkmaz da bu:", "*her yolun*", "*bir bedeli var.*"], sec: 3.5 },
  { lines: ["Sence hangi duvar", "önce yıkılır?", "*Yorumlara yaz.*"], sec: 3 },
];

export const CIKMAZ_FPS = 30;
export const CIKMAZ_FRAMES = Math.round(CIKMAZ_SCENES.reduce((s, x) => s + x.sec, 0) * CIKMAZ_FPS);

export const Cikmaz: React.FC = () => {
  const frame = useCurrentFrame();
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}>
      <Html5Audio src={staticFile("cikmaz-ses.wav")} />
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", color: MUTED, fontSize: 36, fontWeight: 700, letterSpacing: 10 }}>
        GÜNDEM
      </div>
      {CIKMAZ_SCENES.map((sc, i) => {
        const frames = Math.round(sc.sec * CIKMAZ_FPS);
        const seq = (
          <Sequence key={i} from={from} durationInFrames={frames}>
            <Scene lines={sc.lines} frames={frames} />
          </Sequence>
        );
        from += frames;
        return seq;
      })}
      <div style={{ position: "absolute", left: 90, right: 90, bottom: 170, height: 8, borderRadius: 4, background: "#26262A" }}>
        <div style={{ width: `${(frame / CIKMAZ_FRAMES) * 100}%`, height: "100%", borderRadius: 4, background: ACCENT }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 110, textAlign: "center", color: MUTED, fontSize: 26, fontWeight: 600 }}>
        Kaynak: TÜİK · 10 anket ortalaması · TBMM — Kasım 2026
      </div>
    </AbsoluteFill>
  );
};
