"use client";
import {
  ColorElement,
  StageSize,
  TextElement,
} from "../types/meme";
import {
  calculateStageSize,
  loadImageFromFile,
  urlToBase64,
  getImageSrcFromFile,
} from "../utils/imgs";
import Konva from "konva";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loading";
import { addImage, clearImages } from "@/app/redux/imagesMeme";
export const useFunction = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileNotEdit, setFileNotEdit] = useState<string | null>("");
  const [stageSize, setStageSize] = useState<StageSize>({
    width: 750,
    height: 625,
  });
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [color, setColor] = useState<ColorElement | null>(null);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [timesSave, setTimesSave] = useState(<number>0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [fontSize, setFontSize] = useState(<number>40);
  const [fontFamily, setFontFamily] = useState(<string>'Impact, Arial Black, sans-serif');


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
        text: textElements,
        image: fileNotEdit,
        fullUrl: imageData,
        isActive: false,
      })
    );
  };

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        dispatch(showLoading());
        const img = await loadImageFromFile(file);
        const src = await getImageSrcFromFile(file);
        const newStageSize = calculateStageSize(img);
        setStageSize(newStageSize);
        setImage(img);
        setTextElements([]);
        setFileNotEdit(src);
        toast.success("Added image successful!");
        dispatch(hideLoading());
      } catch (error) {
        console.error("Error loading image:", error);
        dispatch(hideLoading());
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
      fontSize: fontSize,
      fill: "white",
      stroke: "white",
      strokeWidth: 2,
      fontFamily: fontFamily,
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
    setStageSize({ width: 750, height: 625 });
    dispatch(clearImages());
    setTimesSave(0);
  }, []);

  const exportImage = useCallback(async () => {
    if (!stageRef.current) return;

    await new Promise((resolve) => setTimeout(resolve, 150));
    const uri = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/png",
    });
    const link = document.createElement("a");
    link.download = `meme_${Math.random() * 99}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported file successful!");
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setColor({ color });
  }, []);

  const handleBackgroundChange = useCallback((bg: string) => {
    setBgColor(bg);
  }, []);

  const saveDraft = useCallback(() => {
    if (!image) {
      toast.warning("No image to save!");
      return;
    } else if (timesSave > 2) {
      toast.warning("Maximum of 3 saves reached!");
      return;
    }
    dispatch(showLoading());
    setTimesSave(timesSave + 1);
    handleAddImage();
    toast.success("Saved successful!");
    dispatch(hideLoading());
  }, [image, timesSave]);

  const selecetTheme = async (event: any) => {
    if (!event) return;
    dispatch(showLoading());

    try {
      const base64 = await urlToBase64(event.url);
      const img = new Image();
      img.src = base64;
      setTimeout(() => {
        const newStageSize = calculateStageSize(img);
        setStageSize(newStageSize);
        setImage(img);
        setFileNotEdit(event.url);
        setTextElements([]);
        dispatch(clearImages());
        setTimesSave(0);
        toast.success("Added image successful!");
      }, 100);
      dispatch(hideLoading());
    } catch (error) {
      console.error("Error loading image:", error);
      dispatch(hideLoading());
    }
  };

  const randomDigits = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return Number(result);
  };

  const onChangeImage = async (event: any) => {
    if (!event) return;

    try {
      const base64 = await urlToBase64(event.fullUrl);
      const img = new Image();
      img.src = base64;
      setTimeout(() => {
        const newStageSize = calculateStageSize(img);
        setStageSize(newStageSize);
        setImage(img);
        setTextElements(event.text);
      }, 100);
    } catch (error) {
    }
  };

  const onImageDrop = async (evt: any) => {
    if (!evt) return;
    try {
      dispatch(showLoading());
      setImage(evt);
      toast.success("Added image successful!");
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const onFontSizeChange = useCallback((id: any, font: number) => {
    setFontSize(font)
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, fontSize: font } : el))
    );
  }, [])

    const onFontFamilyChange = useCallback((id: any, font: string) => {
    setFontFamily(font)
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, fontFamily: font } : el))
    );
  }, [])

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
    handleBackgroundChange,
    color,
    bgColor,
    saveDraft,
    selecetTheme,
    onChangeImage,
    onImageDrop,
    onFontSizeChange,
    onFontFamilyChange,
    fontSize,
    fontFamily
  };
};
