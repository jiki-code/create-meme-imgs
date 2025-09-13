"use client";
import * as React from "react";
import { LayoutTemplate } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";

import { ThemeSelector } from "./ui/theme-select";
import {ChangeThemeProps, ThemeSelect} from "../app/types/general"
import { useTranslation } from "react-i18next";
export default function ThemeSelected({ onImageUpload }: ChangeThemeProps) {
  const handleSelectTemplate = (template: ThemeSelect) => {
     onImageUpload(template)
  };
    const { t } = useTranslation("common"); 
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5" />
            {t('theme_suggestion')}
          </CardTitle>
        </CardHeader>
        <ThemeSelector onSelected={handleSelectTemplate} />
      </Card>
    </>
  );
}
