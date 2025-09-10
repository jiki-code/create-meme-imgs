"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { Label } from "./ui/label";
import ColorPicker from "./ui/color-picker";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type UploadColorPickerProps = {
  onColorChange: (color: string) => void;
};
export default function UploadColorPicker({ onColorChange }: UploadColorPickerProps) {
  const { t } = useTranslation("common");
  const [color, setColor] = useState("#ffffff");

  // Pass color change to parent if needed
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
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
          <div className="space-y-4">
            <div>
              <ColorPicker
                onColorChange={handleColorChange}
              />
            </div>
            <Label>
              {t("color_code")} <span>{color}</span>
            </Label>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
