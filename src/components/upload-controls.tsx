import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTranslation } from "react-i18next";

interface UploadControlsProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function UploadControls({
  onImageUpload,
  onReset,
}: UploadControlsProps) {
  const { t } = useTranslation("common"); 
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          {t("upload_image")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>{t("choose_image")}</Label>
            <Input
              type="file"
              accept="image/jpeg,image/png"
              className="mt-1"
              onChange={onImageUpload}
            />
          </div>
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
