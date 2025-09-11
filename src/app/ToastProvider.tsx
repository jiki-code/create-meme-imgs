// app/ToastProvider.tsx
"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
}
