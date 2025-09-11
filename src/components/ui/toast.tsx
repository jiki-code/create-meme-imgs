// components/CustomToast.tsx
import { X } from "lucide-react"; // icon đóng nếu dùng lucide-react
import * as React from "react"
import {CustomToastProps} from "../../app/types/general";


export default function CustomToast({ message, type = "info", closeToast }: CustomToastProps) {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div className={`flex items-center justify-between px-4 py-2 text-white rounded-lg shadow ${bgColor}`}>
      <span>{message}</span>
      {closeToast && (
        <button onClick={closeToast} className="ml-3">
          <X size={18} />
        </button>
      )}
    </div>
  );
}
