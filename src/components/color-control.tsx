"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import ColorPicker from "./ui/color-picker";
import { useTranslation } from "react-i18next";
import { colorBackground } from "../app/data/common";
import * as React from "react";
import clsx from "clsx";
type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;

type UploadColorPickerProps = {
  onColorChange: (color: string) => void;
  onBackgroundChange: (bg: RGBAColor | string) => void;
};
export default function ColorControl({
  onColorChange,
  onBackgroundChange,
}: UploadColorPickerProps) {
  const { t } = useTranslation("common");
  const [backgroundColor, setBackgroundColor] = React.useState<string>("");
  const [opacity, setOpacity] = React.useState<number>(1);

  const handleColorChange = (newColor: string) => {
    onColorChange(newColor);
  };

  const handleBackgroundColorSelect = (color: string) => {
    setBackgroundColor(color);
    
    // Convert hex to rgba với opacity 
    if (color.startsWith('#')) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const rgbaColor: RGBAColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      onBackgroundChange(rgbaColor);
    } else if (color.startsWith('rgba')) {
      //  update opacity
      const rgbaColor = color.replace(/[\d\.]+\)$/g, `${opacity})`) as RGBAColor;
      onBackgroundChange(rgbaColor);
    } else {
      onBackgroundChange(color);
    }
  };

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
    
    if (backgroundColor) {
      if (backgroundColor.startsWith('#')) {
        const hex = backgroundColor.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const rgbaColor: RGBAColor = `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
        onBackgroundChange(rgbaColor);
      } else if (backgroundColor.startsWith('rgba')) {
        const rgbaColor = backgroundColor.replace(/[\d\.]+\)$/g, `${newOpacity})`) as RGBAColor;
        onBackgroundChange(rgbaColor);
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            {t("choose_color")}
          </CardTitle>
        </CardHeader>
        <div className="space-y-1">
          <div>
            <ColorPicker
              onColorChange={handleColorChange}
              title={t("text_color")}
            />
            {/* select background */}
            <div className="flex pt-2 flex-nowrap gap-1 w-full">
              {colorBackground.map((color) => (
                <button
                  key={color}
                  className={clsx(
                    "w-6 h-6 rounded-full ring-offset-2 ring-gray-400 cursor-pointer",
                    color === backgroundColor && "ring-1 opacity-50"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleBackgroundColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
            {/* input opacity */}
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => {
                  const newOpacity = parseFloat(e.target.value);
                  handleOpacityChange(newOpacity);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}