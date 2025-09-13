"use client";

import SaveVersion from "@/components/save-version";
import MemeCanvas from "@/components/meme-canvas";
import TextControls from "@/components/text-controls";
import TemplateSelector from "@/components/template-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadControls from "@/components/upload-controls";
import ColorControl from "@/components/color-control";
import { useFunction } from "./hooks/useFunction";
import * as React from "react";
import { useSelector } from "react-redux";
import { Loading } from "@/components/ui/loading";
import { RootState } from "../app/redux/store";
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
    handleBackgroundChange,
    saveDraft,
    color,
    bgColor,
    selectTheme,
    onChangeImage,
    onImageDrop,
    onFontSizeChange,
    onFontFamilyChange,
    fontSize,
    fontFamily,
    isDown
  } = useFunction();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <>
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <div className="p-3 body-content">
          <div className="mx-auto">
            <div className="w-full flex lg:flex-row flex-col gap-2">
              {/* Controls Panel */}
              <div className="lg:w-4/12 xl:w-3/12 w-full flex flex-col gap-3  max-h-[80vh] overflow-hidden lg:overflow-auto  custom-scrollbar">
                <UploadControls
                  onImageUpload={handleImageUpload}
                  onReset={resetCanvas}
                />
                <TemplateSelector onImageUpload={selectTheme} />

                <ColorControl
                  onBackgroundChange={handleBackgroundChange}
                  onColorChange={handleColorChange}
                 
                />
                <TextControls
                  hasImage={!!image}
                  onAddText={addText}
                  selectedId={selectedId}
                  textElements={textElements}
                  onUpdateText={updateText}
                  onDeleteText={deleteText}
                  currentFontSize={fontSize}
                  fontFamily={fontFamily}
                  onFontSizeChange={onFontSizeChange}
                  onFontFamilyChange={onFontFamilyChange}
                />
              </div>
              {/* Canvas Area */}
              <div className="lg:w-4/12 xl:w-7/12 w-full flex flex-col gap-2">
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
                      bgColor={bgColor}
                      onImageDrop={onImageDrop}
                      isDownload={isDown}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:w-4/12 xl:w-3/12 w-full flex flex-col  max-h-[80vh] overflow-hidden lg:overflow-auto gap-3 custom-scrollbar">
                <SaveVersion
                  onChangeImage={onChangeImage}
                  hasImage={!!image}
                  onExport={exportImage}
                  onSaveDraft={saveDraft}
                  
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
