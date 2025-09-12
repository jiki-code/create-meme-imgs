import { useState, useRef, useCallback } from "react";
import { StageSize, TextElement } from "../app/types/meme";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Stage, Layer, Image, Rect, Text } from "react-konva";
import DraggableText from "./dragable-text";
import Konva from "konva";
import  {APP_IMG}  from "../assets/images";
import { useTranslation } from "react-i18next";


interface MemeCanvasProps {
  image: HTMLImageElement | null;
  textElements: TextElement[];
  stageSize: StageSize;
  onSelectText: (id: string) => void;
  stageRef: React.RefObject<Konva.Stage | null>;
  color: string;
  bgColor?: string;
  onImageDrop?: (image: HTMLImageElement) => void;
}

export default function MemeCanvas({
  image,
  textElements,
  stageSize,
  onSelectText,
  stageRef,
  color,
  bgColor,
  onImageDrop,
}: MemeCanvasProps) {
  const { t } = useTranslation("common");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Properly typed image creation function
  const createImageElement = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            try {
              if (event.target?.result) {
                const img = await createImageElement(event.target.result as string);
                if (onImageDrop) {
                  onImageDrop(img);
                }
              }
            } catch (error) {
              console.error("Error loading image:", error);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [onImageDrop]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    // Only set to false if leaving the container, not just entering a child
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDraggingOver(false);
  }, []);

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            try {
              if (event.target?.result) {
                const img = await createImageElement(event.target.result as string);
                if (onImageDrop) {
                  onImageDrop(img);
                }
              }
            } catch (error) {
              console.error("Error loading image:", error);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [onImageDrop]
  );

  const handleClickUploadArea = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  if (!image) {
    return (
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 relative"
        style={{ width: stageSize.width, height: stageSize.height }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClickUploadArea}
      >
        <div
          className={`absolute inset-0 bg-blue-100 bg-opacity-70 flex items-center justify-center transition-opacity duration-200 ${
            isDraggingOver ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center text-blue-600 font-medium">
            <ImageIcon className="w-12 h-12 mx-auto mb-2" />
            <p>{t("drop_image_here")}</p>
          </div>
        </div>
        
        <div className="text-center text-gray-500">
          <Upload className="w-12 h-12 mx-auto mb-2" />
          <p>{t("upload_an_image_to_get_started")}</p>
          <p className="text-sm mt-2">({t("or_drag_and_drop_image")} )</p>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
        />
      </div>
    );
  }

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden relative"
      style={{ width: stageSize.width, height: stageSize.height }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Drop overlay when dragging over existing image */}
      <div
        className={`absolute inset-0 bg-blue-100 bg-opacity-70 flex items-center justify-center transition-opacity duration-200 pointer-events-none ${
          isDraggingOver ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center text-blue-600 font-medium">
          <ImageIcon className="w-12 h-12 mx-auto mb-2" />
          <p>{t("drop_to_replace_image")}</p>
        </div>
      </div>
      
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
          
          {/* Image */}
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
          {/* <Image
            image={'../assets/images/watermark.png'}
            width={20}
            height={30}
            x={0}
            y={0}
          /> */}

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
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInput}
      />
    </div>
  );
}