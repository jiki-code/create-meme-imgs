"use client";
import * as React from "react";
import { LayoutTemplate } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";

import { ThemeSelector } from "./ui/theme-select";
import {UploadControlsProps} from "../app/types/general"

export default function ThemeSelected({ onImageUpload }: UploadControlsProps) {
  const handleSelectTemplate = (template: any) => {
    onImageUpload(template);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5" />
            Theme Suggestion
          </CardTitle>
        </CardHeader>
        <ThemeSelector onSelected={handleSelectTemplate} />
      </Card>
    </>
  );
}
