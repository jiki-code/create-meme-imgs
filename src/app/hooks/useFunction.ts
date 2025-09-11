"use client";

import { ColorElement, StageSize, TextElement } from "../types/meme";
import {
  calculateStageSize,
  loadImageFromFile,
  urlToBase64,
  getImageSrcFromFile
} from "../utils/imgs";
import Konva from "konva";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setImages,
  addImage,
  removeImage,
  clearImages,
} from "@/app/redux/imageSlice";
export const useFunction = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileNotEdit, setFileNotEdit] = useState<string | null>('');
  const [stageSize, setStageSize] = useState<StageSize>({
    width: 700,
    height: 600,
  });
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [color, setColor] = useState<ColorElement | null>(null);
  const [timesSave, setTimesSave] = useState(<number>0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const dispatch = useDispatch();

  const handleAddImage = () => {
    if (!stageRef.current) return;
    const imageData = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/png",
    });
    

    dispatch(
      addImage({
        id: randomDigits(12),
        text: textElements.map((t) => t.text).join(", "),
        image: fileNotEdit,
        fullUrl: imageData,
      })
    );
  };

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const img = await loadImageFromFile(file);
        const src = await getImageSrcFromFile(file);
        const newStageSize = calculateStageSize(img);
        setStageSize(newStageSize);
        setImage(img);
        setTextElements([]);
        setFileNotEdit(src)

      } catch (error) {
        console.error("Error loading image:", error);
      }
    },
    []
  );

  const addText = useCallback(() => {
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      text: "MEME TEXT",
      x: stageSize.width / 2,
      y: stageSize.height / 2,
      fontSize: 40,
      fill: "white",
      stroke: "white",
      strokeWidth: 2,
      fontFamily: "Impact, Arial Black, sans-serif",
      align: "center",
    };
    setTextElements((prev) => [...prev, newText]);
    setSelectedId(newText.id);
  }, [stageSize]);

  const updateText = useCallback((id: string, newText: string) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, text: newText } : el))
    );
  }, []);

  const deleteText = useCallback((id: string) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedId(null);
  }, []);

  const resetCanvas = useCallback(() => {
    setImage(null);
    setTextElements([]);
    setSelectedId(null);
    setStageSize({ width: 600, height: 600 });
    dispatch(clearImages());
  }, []);

  const exportImage = useCallback(async () => {
    if (!stageRef.current) return;

    await new Promise((resolve) => setTimeout(resolve, 150));
    const uri = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/png",
    });
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setColor({ color });
  }, []);

  const saveDraft = useCallback(() => {
    if (!image) {
      toast.warning("No image to save!");
      return;
    } 
    else if (timesSave > 2) {
      toast.warning("Maximum of 3 saves reached!");
      return;
    }
    handleAddImage();
    setTimesSave(timesSave + 1);
    toast.success("Draft saved!");
  }, [image, timesSave]);

  const selecetTheme = async (event: any) => {
    if (!event) return;

    try {
      const base64 = await urlToBase64(event.url);
      const img = new Image();
      img.src = base64;
      setTimeout(() => {
        const newStageSize = calculateStageSize(img);
        setStageSize(newStageSize);
        setImage(img);
        setFileNotEdit(event.url)
        setTextElements([]);
      }, 100);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  const randomDigits = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return Number(result);
  };

  return {
    image,
    textElements,
    selectedId,
    stageSize,
    stageRef,
    handleImageUpload,
    addText,
    updateText,
    setSelectedId,
    deleteText,
    resetCanvas,
    exportImage,
    handleColorChange,
    color,
    saveDraft,
    selecetTheme,
  };
};
