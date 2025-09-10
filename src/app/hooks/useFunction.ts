'use client'

import { ColorElement, StageSize, TextElement } from "../types/meme";
import { calculateStageSize, loadImageFromFile } from "../utils/imgs";
import Konva from "konva";
import { useCallback, useRef, useState } from "react"

export const useFunction = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [stageSize, setStageSize] = useState<StageSize>({ width: 650, height: 650 })
  const [textElements, setTextElements] = useState<TextElement[]>([])
  const [color, setColor] = useState<ColorElement | null>(null)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const stageRef = useRef<Konva.Stage>(null)

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const img = await loadImageFromFile(file)
      const newStageSize = calculateStageSize(img)
      setStageSize(newStageSize)
      setImage(img)
      setTextElements([])
    } catch(error) {
      console.error("Error loading image:", error)
    }
  }, []);

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
    }
    setTextElements((prev) => [...prev, newText]);
    setSelectedId(newText.id);
  }, [stageSize]);

  const updateText = useCallback((id: string, newText: string) => {
    setTextElements((prev) => prev.map((el) => (el.id === id ? { ...el, text: newText } : el)))
  }, [])

  const deleteText = useCallback((id: string) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id))
    setSelectedId(null)
  }, [])

  const resetCanvas = useCallback(() => {
    setImage(null)
    setTextElements([])
    setSelectedId(null)
    setStageSize({ width: 650, height: 650 })
  }, [])

  const exportImage = useCallback(async () => {
    if (!stageRef.current) return

    await new Promise((resolve) => setTimeout(resolve, 150))
    const uri = stageRef.current.toDataURL({
      pixelRatio: 2,
      mimeType: "image/png",
    });
    const link = document.createElement("a")
    link.download = "meme.png"
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setColor({ color });
    }, []);
  
  const saveDraft = useCallback(() => {
    if (!image) {
      alert("No image to save!");
      return;
    }
  }, [image]);  

  
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
  }
}