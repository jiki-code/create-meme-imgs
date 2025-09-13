import { TextElement } from "../app/types/meme";
import { Text } from "react-konva";

interface DraggableTextProps {
  textProps: TextElement;
  onSelect: () => void;
  isSelected: boolean
}
export default function DraggableText({
  textProps,
  onSelect,
}: DraggableTextProps) {
  return (
    <>
      <Text
        draggable
        className="cursor-move"
        {...textProps}
        onClick={onSelect}
        offsetX={textProps.text.length * textProps.fontSize * 0.3}
      />
    </>
  );
}
