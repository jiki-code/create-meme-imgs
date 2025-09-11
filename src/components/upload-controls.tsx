"use-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTranslation } from "react-i18next";
import * as React from "react";
interface UploadControlsProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function UploadControls({
  onImageUpload,
  onReset,
}: UploadControlsProps) {
  const { t } = useTranslation("common");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-0">
          <Upload className="w-5 h-5" />
          {t("upload_image")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              type="file"
              accept="acceptedImageTypes.join(',')"
              className="mt-1 hidden"
               ref={fileInputRef}
              onChange={onImageUpload}
            />
          </div>
          <Button type="button" className="w-full" onClick={handleButtonClick}>
            {t("choose_image")}
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t("reset")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
