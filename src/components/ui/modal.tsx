"use client";

import * as React from "react";
import { CircleX } from 'lucide-react';
import clsx from "clsx";
import { PopupProps } from "@/app/types/general";

const Modal: React.FC<PopupProps> = ({ open, onClose, children, className }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* opacity */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* content popup */}
      <div
        className={clsx(
          "relative z-10 w-full max-w-4xl rounded-xl bg-white shadow-lg p-6 animate-fadeIn",
          className
        )}
      >
        {/* close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
         <CircleX className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export { Modal };
