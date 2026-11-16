import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, GUVENLI, Kelime, OTUR, RENK } from "./tema";

// Satırlar kelime sayısıyla verilir (ör. [4, 4, 5]); dile göre elle bölünür.
export const Altyazi: React.FC<{ kelimeler: Kelime[]; satirlar: number[]; y?: number }> = ({
  kelimeler,
  satirlar,
  y = 1270,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const ms = (frame / fps) * 1000;

  // Satırları kur.
  const gruplar: Kelime[][] = [];
  let i = 0;
  for (const n of satirlar) {
    gruplar.push(kelimeler.slice(i, i + n));
    i += n;
  }
  if (i < kelimeler.length) gruplar.push(kelimeler.slice(i));

  // Şu anki satır: ilk kelimesi başlamış son satır.
  let aktif = -1;
  for (let g = 0; g < gruplar.length; g++) if (gruplar[g][0].startMs <= ms) aktif = g;
  if (aktif < 0) return null;
  const satir = gruplar[aktif];
  const basla = (satir[0].startMs / 1000) * fps;

  const alanGenislik = width - GUVENLI.left - GUVENLI.right;
  return (
    <div
      style={{
        position: "absolute",
        left: GUVENLI.left,
        top: y,
        width: alanGenislik,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: 22,
        rowGap: 6,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 74,
        lineHeight: 1.12,
        letterSpacing: -1,
        translate: `0px ${interpolate(frame, [basla, basla + 5], [18, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: OTUR,
        })}px`,
      }}
    >
      {satir.map((k, j) => {
        const goruldu = k.startMs <= ms;
        const soyleniyor = goruldu && ms < (satir[j + 1]?.startMs ?? k.endMs + 250);
        const f0 = (k.startMs / 1000) * fps;
        return (
          <span
            key={j}
            style={{
              color: soyleniyor ? RENK.accentSoft : RENK.text,
              opacity: goruldu ? 1 : 0,
              scale: interpolate(frame, [f0, f0 + 4], [0.85, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: OTUR,
              }),
            }}
          >
            {k.text}
          </span>
        );
      })}
    </div>
  );
};
