import React from "react";
import {
  AbsoluteFill,
  Html5Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const BG = "#0E0E10";
const INK = "#F5F3EE";
const MUTED = "#8C8A85";
const ACCENT = "#E2541B";

// Each scene: lines of text; words wrapped in *stars* get the accent color.
export const SCENES: { lines: string[]; sec: number }[] = [
  { lines: ["Mayıs sineği", "sadece *bir gün* yaşar."], sec: 3 },
  { lines: ["Öyle mi?"], sec: 1.5 },
  { lines: ["Aslında hayatının", "neredeyse tamamını", "*suyun altında* geçirir."], sec: 3.5 },
  { lines: ["Larva olarak", "*bir yıla kadar*,", "bazen daha fazla."], sec: 3.5 },
  { lines: ["Sonra kanatlanır…"], sec: 2 },
  { lines: ["…ve yetişkinken", "*yemek bile yemez.*"], sec: 3 },
  { lines: ["Tek bir işi vardır:", "*çiftleşip yumurtlamak.*"], sec: 3 },
  { lines: ["Bazı türlerde bu", "birkaç saat,", "hatta *birkaç dakika* sürer."], sec: 3.5 },
  { lines: ["*300 milyon yıldır*", "bu planı değiştirmedi."], sec: 3.5 },
  { lines: ["Kısa bir ömür değil,", "*uzun bir hazırlık.*"], sec: 3 },
  { lines: ["Adı da buradan gelir:", "Yunanca *ephēmeros*", "\"bir günlük\""], sec: 3.5 },
  { lines: ["Takip et:", "yarın başka bir *aslında*."], sec: 2.5 },
];

export const FPS = 30;
export const TOTAL_FRAMES = Math.round(SCENES.reduce((s, x) => s + x.sec, 0) * FPS);

export const Scene: React.FC<{ lines: string[]; frames: number }> = ({ lines, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = lines.map((l) => l.split(" "));
  let idx = 0;
  const out = interpolate(frame, [frames - 6, frames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 90, opacity: out }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {words.map((ws, li) => {
          let accentOn = false;
          return (
            <div key={li} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 26px" }}>
              {ws.map((raw, wi) => {
                const i = idx++;
                const startsAccent = raw.startsWith("*");
                if (startsAccent) accentOn = true;
                const isAccent = accentOn;
                if (raw.endsWith("*") || raw.endsWith("*,") || raw.endsWith("*.")) accentOn = false;
                const text = raw.replace(/\*/g, "");
                const s = spring({ frame: frame - i * 3, fps, config: { damping: 13, mass: 0.5 } });
                return (
                  <span
                    key={wi}
                    style={{
                      fontSize: 104,
                      fontWeight: 800,
                      lineHeight: 1.12,
                      color: isAccent ? ACCENT : INK,
                      opacity: s,
                      transform: `translateY(${(1 - s) * 40}px) scale(${0.9 + s * 0.1})`,
                      display: "inline-block",
                    }}
                  >
                    {text}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Kisa: React.FC = () => {
  const frame = useCurrentFrame();
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}>
      <Html5Audio src={staticFile("kisa-ses.wav")} />
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", color: MUTED, fontSize: 36, fontWeight: 700, letterSpacing: 10 }}>
        ASLINDA
      </div>
      {SCENES.map((sc, i) => {
        const frames = Math.round(sc.sec * FPS);
        const seq = (
          <Sequence key={i} from={from} durationInFrames={frames}>
            <Scene lines={sc.lines} frames={frames} />
          </Sequence>
        );
        from += frames;
        return seq;
      })}
      <div style={{ position: "absolute", left: 90, right: 90, bottom: 170, height: 8, borderRadius: 4, background: "#26262A" }}>
        <div style={{ width: `${(frame / TOTAL_FRAMES) * 100}%`, height: "100%", borderRadius: 4, background: ACCENT }} />
      </div>
    </AbsoluteFill>
  );
};
