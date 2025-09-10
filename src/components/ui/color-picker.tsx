'use client';
import * as React from "react"

type ColorPickerProps = {
  onColorChange: (color: string) => void;
};
const DEFAULT_COLOR = "#fff";

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  return (
    <div className="flex items-center mb-2">
      <label htmlFor="background">Background :</label>
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