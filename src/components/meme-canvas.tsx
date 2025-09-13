import { useState, useRef, useCallback, useEffect } from "react";
import { StageSize, TextElement } from "../app/types/meme";
import { Upload, ImageIcon, Undo2, ZoomIn, ZoomOut } from "lucide-react";
import { Stage, Layer, Image, Rect, Transformer } from "react-konva";
import DraggableText from "./dragable-text";
import Konva from "konva";
import { useTranslation } from "react-i18next";
import watermarkSrc from "../assets/images/laoho.png";
import { Watermark } from "./ui/watermark";
import {ImageState} from "../app/types/general"
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
  bgColor = "#ffffff",
  onImageDrop,
}: MemeCanvasProps) {
  const { t } = useTranslation("common");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  const [imageState, setImageState] = useState<ImageState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scale: 1,
    rotation: 0,
  });

  setShowWatermark(true)
  useEffect(() => {
    if (image && stageSize.width > 0 && stageSize.height > 0) {
      const ratio = Math.min(
        stageSize.width / image.width,
        stageSize.height / image.height
      );
      
      setImageState({
        x: (stageSize.width - image.width * ratio) / 2,
        y: (stageSize.height - image.height * ratio) / 2,
        width: image.width * ratio,
        height: image.height * ratio,
        scale: 1,
        rotation: 0,
      });
    }
  }, [image, stageSize]);

  // Update transformer when selection changes
  useEffect(() => {
    if (selectedId === "image" && trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer()?.batchDraw();
    } else if (trRef.current) {
      trRef.current.nodes([]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

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
      setSelectedId(null);
      
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

  const handleZoomIn = () => {
    setImageState(prev => ({
      ...prev,
      scale: prev.scale * 1.2
    }));
  };

  const handleZoomOut = () => {
    setImageState(prev => ({
      ...prev,
      scale: Math.max(0.1, prev.scale / 1.2)
    }));
  };

  const handleResetImage = () => {
    if (image && stageSize.width > 0 && stageSize.height > 0) {
      const ratio = Math.min(
        stageSize.width / image.width,
        stageSize.height / image.height
      );
      
      setImageState({
        x: (stageSize.width - image.width * ratio) / 2,
        y: (stageSize.height - image.height * ratio) / 2,
        width: image.width * ratio,
        height: image.height * ratio,
        scale: 1,
        rotation: 0,
      });
    }
    setSelectedId(null);
  };

  const handleImageClick = () => {
    setSelectedId(selectedId === "image" ? null : "image");
  };

  const handleImageTransform = () => {
    if (imageRef.current) {
      const node = imageRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      
      setImageState(prev => ({
        ...prev,
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        scale: scaleX,
        rotation: node.rotation(),
      }));
      
      // Reset scale for next transformation
      node.scaleX(1);
      node.scaleY(1);
    }
  };

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
      {/* Background color picker button */}
      <div className="absolute top-0 right-1 z-10 flex flex-col gap-2">
        {/* Image controls */}
        <div className="flex flex-col gap-2 bg-[#f5f5f5] p-2 rounded-lg shadow-md">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            title={t("zoom_in")}
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            title={t("zoom_out")}
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetImage}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            title={t("back")}
          >
            <Undo2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
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
          
          {/* Image with transformation capabilities */}
          {image && (
            <>
              <Image
                ref={imageRef}
                image={image}
                x={imageState.x}
                y={imageState.y}
                width={imageState.width}
                height={imageState.height}
                scaleX={imageState.scale}
                scaleY={imageState.scale}
                rotation={imageState.rotation}
                cornerRadius={10}
                shadowBlur={10}
                shadowOpacity={0.3}
                onClick={handleImageClick}
                onTap={handleImageClick}
                onTransformEnd={handleImageTransform}
                onDragEnd={handleImageTransform}
                draggable={selectedId === "image"}
              />
              
              {selectedId === "image" && (
                <Transformer
                  ref={trRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // Limit resize to prevent negative values
                    if (newBox.width < 5 || newBox.height < 5) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
              )}
            </>
          )}

          {/* Watermark - using generated image instead of external file */}
          {showWatermark && (
            <Watermark
              src={watermarkSrc.src}
              stageSize={stageSize}
            />
          )}

          {/* Text user add */}
          {textElements.map((textEl) => (
            <DraggableText
              key={textEl.id}
              textProps={{
                ...textEl,
                fill: color || textEl.fill || "white",
              }}
              onSelect={() => {
                onSelectText(textEl.id);
                setSelectedId(null);
              }}
              isSelected={selectedId === textEl.id}
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