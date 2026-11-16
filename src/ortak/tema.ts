import { Easing, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// style.md → mavi-turuncu paleti. Kodda yalnız bu renkler kullanılır.
export const RENK = {
  bg: "#21232E",
  surface: "#1F2A47",
  main: "#105BFF",
  main2: "#0A3FD1",
  accent: "#FE8500",
  accentSoft: "#FFC27A",
  onAccent: "#21232E",
  onMain: "#FFFFFF",
  text: "#FFFFFF",
  text70: "rgba(255,255,255,0.7)",
  text50: "rgba(255,255,255,0.5)",
  mainBorder: "rgba(16,91,255,0.4)",
} as const;

// Inter, yerel dosyadan (public/fonts): render internete bağlı kalmaz. Değişken font, 100–900 kalınlık.
export const FONT = "Inter";
loadFont({
  family: FONT,
  url: staticFile("fonts/inter-latin.woff2"),
  weight: "100 900",
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
});
loadFont({
  family: FONT,
  url: staticFile("fonts/inter-latin-ext.woff2"),
  weight: "100 900",
  unicodeRange:
    "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
});

// Hızlı gelip oturan hareket.
export const OTUR = Easing.bezier(0.16, 1, 0.3, 1);
// Küçük taşmayla iniş.
export const IN = Easing.bezier(0.34, 1.56, 0.64, 1);
export const KAY = Easing.bezier(0.65, 0, 0.35, 1);

// Instagram'ın kapattığı kenarlar.
export const GUVENLI = { top: 220, bottom: 420, right: 140, left: 80 } as const;

export type Kelime = { text: string; startMs: number; endMs: number };
