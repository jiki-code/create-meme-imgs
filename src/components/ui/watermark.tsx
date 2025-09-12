import useImage from "use-image";
import { Image } from "react-konva";

const Watermark = ({ src,  }: { src: string }) => {
  const [image] = useImage(src); // this loads the image for Konva

  return image ? (
    <Image
      image={image}
      x={1}
      y={0}
      width={100}
      height={50}
      opacity={0.5}
    />
  ) : null;
};

export  {Watermark};
