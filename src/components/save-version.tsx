import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MemeList } from "./ui/meme-list";
import {RightControlsProps} from "../app/types/general";
import * as React from "react"
import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { useTranslation } from "react-i18next";
export default function SaveVersion ({
  hasImage,
  onExport,
  onSaveDraft,
  onChangeImage
}: RightControlsProps) {
  const images = useSelector((state: RootState) => state.images.list);
  const { t } = useTranslation("common"); // translte
  return (
    <>
    {images && images.length > 0 && (
        <MemeList memes={images} onSelected={onChangeImage} />)}
  
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          {t('save_version')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-2 xs:gap-2 gap-4">
          <Button onClick={onSaveDraft} disabled={!hasImage} className="w-full cursor-pointer">
            {t('save')}
        </Button>
        <Button onClick={onExport} disabled={!hasImage} variant="outline"
            className="w-full bg-transparent cursor-pointer">
         {t('download')}
        </Button>
        </div>
      
          
      </CardContent>
    </Card>
    </>


  );
}
