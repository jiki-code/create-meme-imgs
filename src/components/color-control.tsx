"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import ColorPicker from "./ui/color-picker";
import { useTranslation } from "react-i18next";
import { colorBackground  } from "../app/data/common";
import * as React from 'react'
import clsx from "clsx";
type UploadColorPickerProps = {
  onColorChange: (color: string) => void;
  onBackgroundChange: (bg: string, bg2?: void) => void;
};
export default function ColorControl({
  onColorChange,
  onBackgroundChange,
}: UploadColorPickerProps) {
  const { t } = useTranslation("common");
  const [backgroundColor, setBackgroundColor] = React.useState<string>('')
  // Pass color change to parent if needed
  const handleColorChange = (newColor: string) => {
    onColorChange(newColor);
  };

  return (
    <>
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
                title={t('text_color')}
              />
              {/* select background */}

              <div className="flex pt-2 flex-nowrap gap-1 w-full">
                {colorBackground.map((color) => (
                  <button
                    key={color}
                     className={clsx(
                                    "w-6 h-6 rounded-full ring-offset-2 ring-gray-400 cursor-pointer",
                                    color === backgroundColor && "border-2 opacity-50"
                                  )}
                    style={{ backgroundColor: color,  }}
                    onClick={() => onBackgroundChange(color,setBackgroundColor(color))}
                  />
                   
                ))}
              </div>
              {/* input opacity */}
              {/* <div className="pt-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="1"
                onChange={(e) => {
                  const opacity = parseFloat(e.target.value);
                 onBackgroundChange((prev: any) => {
                    if (prev.includes('rgba')) {
                      return prev.replace(/[\d\.]+\)$/g, `${opacity})`);
                    }
                    // Convert hex to rgba
                    const hex = prev.replace('#', '');
                    const r = parseInt(hex.substring(0, 2), 16);
                    const g = parseInt(hex.substring(2, 4), 16);
                    const b = parseInt(hex.substring(4, 6), 16);
                    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
                  });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
