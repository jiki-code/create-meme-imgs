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
    <div className="relative inline-block w-10" ref={pickerRef}>
      <button
        onClick={() => setShowPicker((prev) => !prev)}
         className="h-12 cursor-pointer"
      >
        <span className="text-xl">😊</span>
      </button>

      {showPicker && (
        <div className="absolute bottom-full mb-2 w-full z-50 shadow-lg">
          <EmojiPicker onEmojiClick={handleEmojiClick}  />
        </div>
      )}
    </div>
  );
}
