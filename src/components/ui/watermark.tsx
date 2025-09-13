import useImage from "use-image";
import { Image } from "react-konva";
import { StageSize } from "../../app/types/meme";

type WatermarkProp = {
  src: string;
  stageSize: StageSize; // use the proper type imported
};

const Watermark = ({ src, stageSize }: WatermarkProp) => {
  const [image] = useImage(src); // load the image for Konva

  // fallback width/height if stageSize is not provided
  const width = stageSize?.width ?? 0;
  const height = stageSize?.height ?? 0;

  return image ? (
    <Image
      image={image}
      width={90}
      height={40}
      x={width - 95}
      y={height - 40}
      opacity={0.5}
    />
  ) : null;
};

export { Watermark };
