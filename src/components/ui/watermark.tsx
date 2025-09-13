import useImage from "use-image";
import { Image } from "react-konva";
import { StageSize } from "../../app/types/meme";

type WatermarkProp = {
  src: string,
  StageSize: StageSize
};
const Watermark = ({ src, stageSize  }: WatermarkProp) => {
  const [image] = useImage(src); // this loads the image for Konva

  return image ? (
    <Image image={image} width={90}
              height={40}
              x={stageSize.width - 95}
              y={stageSize.height - 40}
              opacity={0.5} />
  ) : null;
};

export { Watermark };
