import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { Shorts, shortsSchema } from "./Shorts";
import { Kisa, TOTAL_FRAMES, FPS } from "./Kisa";
import { Cikmaz, CIKMAZ_FRAMES, CIKMAZ_FPS } from "./Cikmaz";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />

      <Composition id="Cikmaz" component={Cikmaz} fps={CIKMAZ_FPS} width={1080} height={1920} durationInFrames={CIKMAZ_FRAMES} />
      <Composition id="Kisa" component={Kisa} fps={FPS} width={1080} height={1920} durationInFrames={TOTAL_FRAMES} />
      <Composition
        id="Shorts"
        component={Shorts}
        schema={shortsSchema}
        fps={30}
        width={1080}
        height={1920}
        durationInFrames={300}
        defaultProps={{
          audio: "ses.wav",
          duration: 10,
          words: [],
          title: "",
          accent: "#E2541B",
        }}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.max(30, Math.ceil((props.duration + 0.5) * 30)),
        })}
      />
    </>
  );
};
