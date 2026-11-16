import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Altyazi } from "../../ortak/Altyazi";
import { FONT, IN, KAY, Kelime, OTUR, RENK } from "../../ortak/tema";
import kelimeler from "./kelimeler.json";

const K = kelimeler as Kelime[];
const DIR = "reels/gunes-8-dakika";
export const SURE_KARE = 530;

// Saniye cinsinden an → değer. Her şey o anki kareden hesaplanır.
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};
const iv = (t: number, [a, b]: [number, number], [x, y]: [number, number], easing = OTUR) =>
  interpolate(t, [a, b], [x, y], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
// Kısa kabarma: a anında başlar, 0.3 sn'de geri oturur.
const kabar = (t: number, a: number, h = 0.07) =>
  t < a || t > a + 0.32 ? 0 : t < a + 0.1 ? iv(t, [a, a + 0.1], [0, h]) : iv(t, [a + 0.1, a + 0.32], [h, 0], KAY);

// Sahne geometrisi
const DUNYA = { x: 830, y: 700, r: 56 };
const YOL = { x0: 324, x1: 750, y: 700 };
const GUNES_SON = { x: 190, y: 700, r: 110 };

const Gunes: React.FC = () => {
  const t = useT();
  const gec = iv(t, [3.4, 3.9], [0, 1]);
  const x = 510 + (GUNES_SON.x - 510) * gec;
  const y = 800 + (GUNES_SON.y - 800) * gec;
  const r = (230 + (GUNES_SON.r - 230) * gec) * iv(t, [0, 0.5], [0.72, 1], IN) * (1 + kabar(t, 1.14) + kabar(t, 2.68) + kabar(t, 12.89));
  const son = iv(t, [14.01, 14.25], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: 2 * r,
        height: 2 * r,
        borderRadius: "50%",
        background: interpolateColors(son, [0, 1], [RENK.accent, RENK.surface]),
        boxSizing: "border-box",
        border: `${4 * son}px solid ${RENK.mainBorder}`,
      }}
    />
  );
};

const Kanca: React.FC = () => {
  const t = useT();
  if (t > 3.7) return null;
  const cik = iv(t, [3.4, 3.65], [0, 1]);
  const cizgi = iv(t, [1.62, 2.1], [0, 1], KAY);
  return (
    <div style={{ position: "absolute", left: 80, top: 290, fontFamily: FONT, fontWeight: 900, fontSize: 92, lineHeight: 1.08, letterSpacing: -3, opacity: 1 - cik, translate: `0px ${-70 * cik}px` }}>
      <div style={{ color: RENK.text }}>Gördüğün Güneş</div>
      <div style={{ color: RENK.accentSoft }}>8 dakika önceki.</div>
      <svg width={720} height={30} style={{ display: "block", marginTop: 6 }}>
        <line x1={4} y1={12} x2={4 + 700 * cizgi} y2={12} stroke={RENK.main} strokeWidth={12} strokeLinecap="round" />
      </svg>
    </div>
  );
};

const Rozet: React.FC = () => {
  const t = useT();
  if (t < 2.23 || t > 3.7) return null;
  const s = iv(t, [2.23, 2.5], [0.4, 1], IN);
  const cik = iv(t, [3.4, 3.65], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        left: 420,
        top: 1050,
        padding: "16px 30px",
        borderRadius: 22,
        background: RENK.surface,
        border: `2px solid ${RENK.mainBorder}`,
        boxShadow: "0 30px 80px rgba(0,0,0,.5)",
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 46,
        color: RENK.text,
        fontVariantNumeric: "tabular-nums",
        scale: s,
        opacity: 1 - cik,
      }}
    >
      8 dk 20 sn önce
    </div>
  );
};

const Dunya: React.FC = () => {
  const t = useT();
  const s = iv(t, [3.45, 3.85], [0, 1], IN);
  if (s <= 0) return null;
  const halka = iv(t, [11.28, 11.9], [0, 1]);
  const r = DUNYA.r * s;
  return (
    <>
      <div style={{ position: "absolute", left: DUNYA.x - r, top: DUNYA.y - r, width: 2 * r, height: 2 * r, borderRadius: "50%", overflow: "hidden", background: RENK.main }}>
        <div style={{ position: "absolute", left: r, top: 0, width: r, height: 2 * r, background: RENK.main2 }} />
      </div>
      {halka > 0 && halka < 1 ? (
        <div
          style={{
            position: "absolute",
            left: DUNYA.x - (DUNYA.r + 80 * halka),
            top: DUNYA.y - (DUNYA.r + 80 * halka),
            width: 2 * (DUNYA.r + 80 * halka),
            height: 2 * (DUNYA.r + 80 * halka),
            borderRadius: "50%",
            boxSizing: "border-box",
            border: `6px solid ${RENK.main}`,
            opacity: 1 - halka,
          }}
        />
      ) : null}
    </>
  );
};

const Yol: React.FC = () => {
  const t = useT();
  const ciz = iv(t, [3.96, 4.8], [0, 1], KAY);
  if (ciz <= 0) return null;
  const L = YOL.x1 - YOL.x0;
  // 3. sahne: ışık yola çıkar, arkası dolar. 4. sahne: Güneş söndükten sonra dolu kısmın kuyruğu geri çekilir.
  const git = iv(t, [9.45, 11.28], [0, 1], KAY);
  const kuyruk = iv(t, [14.54, 17.6], [0, 0.985], (x) => x);
  const dolu0 = t >= 14.54 ? kuyruk : 0;
  const dolu1 = t >= 9.45 ? git : 0;

  // Işık noktası: 2. sahnede tekrar eden darbeler, 3. sahnede tek yolculuk, 4. sahnede son ışık.
  let p: number | null = null;
  if (t >= 5.9 && t < 9.28) p = ((t - 5.9) / 0.9) % 1;
  else if (t >= 9.45 && t < 11.28) p = git;
  else if (t >= 11.9 && t < 14.01) p = ((t - 11.9) / 0.9) % 1;
  else if (t >= 14.54) p = kuyruk;
  const pulseS = t >= 5.9 && t < 6.1 ? iv(t, [5.9, 6.1], [0, 1], IN) : t >= 11.9 && t < 12.1 ? iv(t, [11.9, 12.1], [0, 1], IN) : 1;

  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <line x1={YOL.x0} y1={YOL.y} x2={YOL.x0 + L * ciz} y2={YOL.y} stroke={RENK.mainBorder} strokeWidth={8} strokeLinecap="round" />
      {dolu1 > dolu0 ? (
        <line x1={YOL.x0 + L * dolu0} y1={YOL.y} x2={YOL.x0 + L * dolu1} y2={YOL.y} stroke={RENK.main} strokeWidth={8} strokeLinecap="round" />
      ) : null}
      {p !== null ? (
        <>
          <line x1={YOL.x0 + L * Math.max(0, p - 0.16)} y1={YOL.y} x2={YOL.x0 + L * p} y2={YOL.y} stroke="rgba(255,255,255,0.4)" strokeWidth={10} strokeLinecap="round" />
          <circle cx={YOL.x0 + L * p} cy={YOL.y} r={14 * pulseS} fill={RENK.text} />
        </>
      ) : null}
    </svg>
  );
};

const fmt = (n: number) => Math.round(n).toLocaleString("tr-TR");

const Etiketler: React.FC = () => {
  const t = useT();
  if (t < 3.96 || t > 9.6) return null;
  const cik = iv(t, [9.28, 9.5], [0, 1]);
  const mesafe = iv(t, [3.96, 5.07], [0, 150_000_000]);
  const hizGir = iv(t, [6.48, 6.7], [0, 1], IN);
  const hiz = iv(t, [6.48, 8.0], [0, 300_000]);
  const ortak: React.CSSProperties = { position: "absolute", left: 80, width: 860, textAlign: "center", fontFamily: FONT, fontVariantNumeric: "tabular-nums", opacity: 1 - cik };
  return (
    <>
      <div style={{ ...ortak, top: 440, fontWeight: 900, fontSize: 86, letterSpacing: -2, color: RENK.text, scale: iv(t, [3.96, 4.2], [0.6, 1], IN) }}>
        {fmt(mesafe)} <span style={{ color: RENK.text50, fontSize: 56 }}>km</span>
      </div>
      {t >= 6.48 ? (
        <div style={{ ...ortak, top: 790, fontWeight: 800, fontSize: 66, letterSpacing: -1, color: RENK.text, scale: hizGir }}>
          {fmt(hiz)} <span style={{ color: RENK.text50, fontSize: 46 }}>km/sn</span>
        </div>
      ) : null}
    </>
  );
};

const Sayac: React.FC = () => {
  const t = useT();
  if (t < 9.28) return null;
  const gir = iv(t, [9.28, 9.55], [0.5, 1], IN);
  const saniye = t < 14.54 ? iv(t, [9.45, 11.28], [0, 500], KAY) : iv(t, [14.54, 17.6], [500, 0], (x) => x);
  const s = Math.round(saniye);
  return (
    <div style={{ position: "absolute", left: 80, top: 840, width: 860, textAlign: "center", fontFamily: FONT, scale: gir }}>
      <div style={{ fontWeight: 900, fontSize: 230, lineHeight: 1, letterSpacing: -6, color: RENK.text, fontVariantNumeric: "tabular-nums" }}>
        {Math.floor(s / 60)}:{String(s % 60).padStart(2, "0")}
      </div>
      <div style={{ fontWeight: 700, fontSize: 42, color: RENK.text50, marginTop: 10 }}>dakika : saniye</div>
    </div>
  );
};

export const GunesReel: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: RENK.bg }}>
      <Audio src={staticFile(`${DIR}/ses.mp3`)} volume={1} />
      <Sequence from={Math.round(0.05 * fps)} durationInFrames={Math.round(0.5 * fps)} name="sfx pop">
        <Audio src={staticFile(`${DIR}/sfx-pop.wav`)} volume={0.3} />
      </Sequence>
      <Sequence from={Math.round(3.96 * fps)} durationInFrames={Math.round(0.3 * fps)} name="sfx tık">
        <Audio src={staticFile(`${DIR}/sfx-tik.wav`)} volume={0.25} />
      </Sequence>
      <Sequence from={Math.round(9.45 * fps)} durationInFrames={Math.round(0.6 * fps)} name="sfx vın">
        <Audio src={staticFile(`${DIR}/sfx-vin.wav`)} volume={0.2} />
      </Sequence>
      <Sequence from={Math.round(11.28 * fps)} durationInFrames={Math.round(0.8 * fps)} name="sfx ding">
        <Audio src={staticFile(`${DIR}/sfx-ding.wav`)} volume={0.25} />
      </Sequence>
      <Sequence from={Math.round(14.01 * fps)} durationInFrames={Math.round(0.6 * fps)} name="sfx güm">
        <Audio src={staticFile(`${DIR}/sfx-gum.wav`)} volume={0.35} />
      </Sequence>

      <Yol />
      <Gunes />
      <Dunya />
      <Kanca />
      <Rozet />
      <Etiketler />
      <Sayac />
      <Altyazi kelimeler={K} satirlar={[4, 4, 5, 2, 5, 2, 5, 4, 3, 2]} />
    </AbsoluteFill>
  );
};
