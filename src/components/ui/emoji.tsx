"use client";

import * as React from "react"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {EmojiPickerProps} from "@/app/types/general";

export default function customEmojiPicker({ onEmojiClick }: EmojiPickerProps) {
  const [showPicker, setShowPicker] = React.useState<boolean>(false);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  // close picker when click out 
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiClick?.(emojiData.emoji);
    setShowPicker(false);
  };

   return (
    <div className="relative inline-block w-full" ref={pickerRef}>
      <button
        onClick={() => setShowPicker((prev) => !prev)}
        className="px-2 py-1 border rounded-lg shadow-sm bg-white hover:bg-gray-100 cursor-pointer"
      >
        😊
      </button>

      {showPicker && (
        <div className="absolute bottom-full mb-2 z-50 shadow-lg">
          <EmojiPicker onEmojiClick={handleEmojiClick}  />
        </div>
      )}
    </div>
  );
}
