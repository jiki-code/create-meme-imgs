import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import ExportControlsProps from "../app/types/general";

export default function ExportControls({
  hasImage,
  onExport,
}: ExportControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onExport} disabled={!hasImage} className="w-full">
          Download PNG
        </Button>
      </CardContent>
    </Card>
  );
}
