'use client';
import * as React from "react"
import { Label } from "../ui/label";

type ColorPickerProps = {
  onColorChange: (color: string) => void;
  title: string
};
const DEFAULT_COLOR = "#333";

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange, title }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  return (
    <div className="flex items-center mb-2">
      <Label>{title}</Label>
      <input
        defaultValue={DEFAULT_COLOR}
        id="background"
        type="color"
        onChange={handleChange}
        style={{ marginLeft: "8px" }}
      />
    </div>
  );
};
// 
export default ColorPicker;