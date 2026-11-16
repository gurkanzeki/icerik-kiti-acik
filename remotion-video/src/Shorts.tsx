import React from "react";
import {
  AbsoluteFill,
  Html5Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const wordSchema = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
});

export const shortsSchema = z.object({
  audio: z.string(),
  duration: z.number(),
  words: z.array(wordSchema),
  title: z.string().optional(),
  accent: z.string().optional(),
});

type Word = z.infer<typeof wordSchema>;

const WORDS_PER_GROUP = 3;
const BG = "#0E0E10";
const INK = "#F5F3EE";
const MUTED = "#8C8A85";

// Group words into short caption chunks; a long pause also starts a new chunk.
const groupWords = (words: Word[]): Word[][] => {
  const groups: Word[][] = [];
  let current: Word[] = [];
  words.forEach((w, i) => {
    const prev = words[i - 1];
    const pause = prev ? w.start - prev.end : 0;
    if (current.length >= WORDS_PER_GROUP || (current.length > 0 && pause > 0.6)) {
      groups.push(current);
      current = [];
    }
    current.push(w);
  });
  if (current.length) groups.push(current);
  return groups;
};

export const Shorts: React.FC<z.infer<typeof shortsSchema>> = ({
  audio,
  duration,
  words,
  title,
  accent = "#E2541B",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const groups = groupWords(words);
  const active =
    groups.find((g, i) => {
      const next = groups[i + 1];
      return t >= g[0].start && (next ? t < next[0].start : true);
    }) ?? null;

  const groupStartFrame = active ? Math.round(active[0].start * fps) : 0;
  const pop = spring({ frame: frame - groupStartFrame, fps, config: { damping: 14, mass: 0.6 } });
  const scale = interpolate(pop, [0, 1], [0.86, 1]);
  const progress = Math.min(1, t / duration);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}>
      <Html5Audio src={staticFile(audio)} />

      {title ? (
        <div
          style={{
            position: "absolute",
            top: 140,
            left: 80,
            right: 80,
            color: MUTED,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
      ) : null}

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        {active ? (
          <div
            style={{
              transform: `scale(${scale})`,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 28px",
              textAlign: "center",
            }}
          >
            {active.map((w, i) => {
              const spoken = t >= w.start;
              const speaking = t >= w.start && t < w.end;
              return (
                <span
                  key={i}
                  style={{
                    fontSize: 118,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: speaking ? accent : spoken ? INK : MUTED,
                    textShadow: "0 6px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {w.text}
                </span>
              );
            })}
          </div>
        ) : null}
      </AbsoluteFill>

      <div style={{ position: "absolute", left: 80, right: 80, bottom: 160, height: 8, borderRadius: 4, background: "#26262A" }}>
        <div style={{ width: `${progress * 100}%`, height: "100%", borderRadius: 4, background: accent }} />
      </div>
    </AbsoluteFill>
  );
};
