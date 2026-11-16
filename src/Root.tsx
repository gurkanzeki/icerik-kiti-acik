import { Composition } from "remotion";
import { GunesReel, SURE_KARE as GUNES_SURE } from "./reels/gunes-8-dakika/Reel";

// Her reel buraya bir Composition olarak eklenir: 1080 × 1920, 30 fps.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="gunes-8-dakika" component={GunesReel} durationInFrames={GUNES_SURE} fps={30} width={1080} height={1920} />
    </>
  );
};
