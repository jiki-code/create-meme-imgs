"use client";

import ExportControls from "@/components/export-controls";
import MemeCanvas from "@/components/meme-canvas";
import TextControls from "@/components/text-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadControls from "@/components/upload-controls";
import i18n from "../../public/locales/i18";
import { useTranslation } from "react-i18next";
import { useMemeGenerator } from "../app/hooks/useMeneGenerator";
const Home = () => {
  const {
    image,
    stageSize,
    stageRef,
    handleImageUpload,
    addText,
    updateText,
    setSelectedId,
    deleteText,
    resetCanvas,
    exportImage,
    textElements,
    selectedId,
  } = useMemeGenerator();
const { t } = useTranslation("common"); // Move useTranslation inside the component
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Controls */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{t("upload_image")}</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                placeholder={t("upload_image")}
                className="w-full text-gray-700"
              />
            </div>

            {/* Text Controls */}
            {image && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">{t("text_controls")}</h2>
                <button
                  onClick={addText}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  {t("add_text")}
                </button>
                {textElements.map((el) => (
                  <div key={el.id} className="mt-4">
                    <input
                      type="text"
                      value={el.text}
                      onChange={(e) => updateText(el.id, e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                    <button
                      onClick={() => deleteText(el.id)}
                      className="mt-2 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700 transition"
                    >
                      {t("delete")}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Export Controls */}
            {image && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">{t("export")}</h2>
                <button
                  onClick={exportImage}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  {t("export_image")}
                </button>
                <button onClick={resetCanvas} className="mt-2 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition">
                  {t("reset")}
                </button>
              </div>
            )}
          </div>

          {/* Meme Canvas */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow flex justify-center items-center">
            <div
              className="border border-dashed border-gray-300 w-full h-full flex justify-center items-center"
              style={{ minHeight: "400px" }}
            >
              {image ? (
                <div
                  className="relative"
                  style={{
                    width: stageSize.width,
                    height: stageSize.height,
                    backgroundImage: `url(${image.src})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  {textElements.map((el) => (
                    <div
                      key={el.id}
                      contentEditable
                      suppressContentEditableWarning
                      onClick={() => setSelectedId(el.id)}
                      style={{
                        position: "absolute",
                        top: el.y,
                        left: el.x,
                        fontSize: el.fontSize,
                        color: el.fill,
                        WebkitTextStroke: `${el.strokeWidth}px ${el.stroke}`,
                        fontFamily: el.fontFamily,
                        textAlign: el.align as any,
                        cursor: "move",
                        userSelect: selectedId === el.id ? "text" : "none",
                        outline: selectedId === el.id ? "1px solid blue" : "none",
                      }}
                    >
                      {el.text}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Upload an image to start</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
