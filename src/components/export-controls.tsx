import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MemeList } from "./ui/meme-list";

import {ExportControlsProps} from "../app/types/general";
import * as React from "react"

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/redux/store";

export default function ExportControls({
  hasImage,
  onExport,
  onSaveDraft
}: ExportControlsProps) {
  const images = useSelector((state: RootState) => state.images.list)
  console.log("🚀 ~ ExportControls ~ images:", images)
  return (
    <>
    {images && images.length > 0 && (
        <MemeList memes={images} />)}
  
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          SAVE VERSION:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-2 xs:gap-2 gap-4">
          <Button onClick={onSaveDraft} disabled={!hasImage} className="w-full cursor-pointer">
          Save
        </Button>
        <Button onClick={onExport} disabled={!hasImage} variant="outline"
            className="w-full bg-transparent cursor-pointer">
          Download
        </Button>
        </div>
      
          
      </CardContent>
    </Card>
    </>


  );
}
