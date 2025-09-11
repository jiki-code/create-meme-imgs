"use client";
 
import ExportControls from "@/components/export-controls";
import MemeCanvas from "@/components/meme-canvas";
import TextControls from "@/components/text-controls";
import TemplateSelector from "@/components/template-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadControls from "@/components/upload-controls";
import UploadColorPicker from "@/components/upload-color-picker";
import { useFunction } from "./hooks/useFunction";
import * as React from "react"
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
    handleColorChange,
    saveDraft,
    color,
    selecetTheme
  } = useFunction();
 
  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <div className="mx-auto">
        <div className="w-full flex sm:flex-row flex-col gap-2">
          {/* Controls Panel */}
          <div className="sm:w-2/12 w-full flex flex-col gap-3">
          <UploadControls
              onImageUpload={handleImageUpload}
              onReset={resetCanvas}
            />
          <TemplateSelector onImageUpload={selecetTheme} />            

            {/* <UploadColorPicker onColorChange={handleColorChange} />
            <TextControls
              hasImage={!!image}
              onAddText={addText}
              selectedId={selectedId}
              textElements={textElements}
              onUpdateText={updateText}
              onDeleteText={deleteText}
            /> */}
          </div>
          {/* Canvas Area */}
          <div className="sm:w-8/12 w-full flex flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Canvas</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <MemeCanvas
                  color={color?.color || "#ffffff"} // Pass the selected color or default to white
                  image={image}
                  stageRef={stageRef}
                  stageSize={stageSize}
                  textElements={textElements}
                  onSelectText={setSelectedId}
                />
              </CardContent>
            </Card>
          </div>
            <div className="sm:w-2/12 w-full flex flex-col gap-3">
              <ExportControls hasImage={!!image} onExport={exportImage} onSaveDraft={saveDraft} />
            </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
