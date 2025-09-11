import { StageSize, TextElement } from "../app/types/meme";
import { Upload } from "lucide-react";
import { Stage, Layer, Image, Rect, Text } from "react-konva";

import DraggableText from "./dragable-text";
import Konva from "konva";
import { waterMark } from "../app/data/common";
import { useTranslation } from "react-i18next";
interface MemeCanvasProps {
  image: HTMLImageElement | null;
  textElements: TextElement[];
  stageSize: StageSize;
  onSelectText: (id: string) => void;
  stageRef: React.RefObject<Konva.Stage | null>;
  color: string;
  bgColor?: string;
}

export default function MemeCanvas({
  image,
  textElements,
  stageSize,
  onSelectText,
  stageRef,
  color,
  bgColor,
}: MemeCanvasProps) {
  const { t } = useTranslation("common");
  if (!image) {
    return (
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100"
        style={{ width: stageSize.width, height: stageSize.height }}
      >
        <div className="text-center text-gray-500">
          <Upload className="w-12 h-12 mx-auto mb-2" />
          <p> {t("upload_an_image_to_get_started")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
      style={{ width: stageSize.width, height: stageSize.height }}
    >
      <Stage
        id="myImage"
        width={stageSize.width}
        height={stageSize.height}
        ref={stageRef}
      >
        <Layer>
          {/* Background */}
          <Rect
            x={0}
            y={0}
            width={stageSize.width}
            height={stageSize.height}
            fill={bgColor}
          />
          {/* images */}
          <Image
            image={image}
            width={stageSize.width}
            height={stageSize.height}
            x={0}
            y={0}
            cornerRadius={10}
            shadowBlur={10}
            shadowOpacity={0.3}
          />

          {/* Watermark */}
          <Text
            text={waterMark}
            fontSize={15}
            fill="red"
            opacity={0.5}
            x={stageSize.width - 120}
            y={stageSize.height - 30}
          />

          {/* Text user add */}
          {textElements.map((textEl) => (
            <DraggableText
              key={textEl.id}
              textProps={{
                ...textEl,
                fill: color || textEl.fill || "white",
              }}
              onSelect={() => onSelectText(textEl.id)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
