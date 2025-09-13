import { Type, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { TextElement } from "../app/types/meme";
import {CustomEmojiPicker}  from "./ui/emoji";
import { useTranslation } from "react-i18next";
import {fontList} from "../app/data/common"
import {SelectInput} from "../components/ui/select-input"

interface TextControlsProps {
  hasImage: boolean;
  onAddText: () => void;
  onUpdateText: (id: string, text: string) => void;
  onDeleteText: (id: string) => void;
  selectedId: string | null;
  textElements: TextElement[];
  onFontSizeChange: (id: string, fontSize: number) => void;
  onFontFamilyChange: (id: string, fontFamily: string) => void; 
  currentFontSize?: number;
  fontFamily?: string;
}


export default function TextControls({
  hasImage,
  selectedId,
  textElements,
  onAddText,
  onUpdateText,
  onDeleteText,
  onFontSizeChange,
  onFontFamilyChange, 
  fontFamily,
  currentFontSize = 40,
}: TextControlsProps) {
  const selectedText = textElements
    ? textElements.find((el) => el.id === selectedId)
    : null;
  const { t } = useTranslation("common");
  // increase font size
  const increaseFontSize = () => {
    if (selectedId && onFontSizeChange) {
      onFontSizeChange(selectedId, Math.min(currentFontSize + 2, 100));
    }
  };

  // decrease font size
  const decreaseFontSize = () => {
    if (selectedId && onFontSizeChange) {
      onFontSizeChange(selectedId, Math.max(currentFontSize - 2, 20));
    }
  };

  // handle font family
  const handleFontFamilyChange = (fontFamily: string) => {
    if (selectedId) {
      onFontFamilyChange(selectedId, fontFamily);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            {t("add_text")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={onAddText} disabled={!hasImage}>
            {t("add_text")}
          </Button>
        </CardContent>
      </Card>

      {selectedId && selectedText && (
        <Card>
          <CardHeader>
            <CardTitle>{t("edit_text")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2 w-full">
                <Label>{t("text_content")}</Label>
              
                {/* Emoji Picker và Input */}
                <div className="w-full flex justify-start items-center gap-2">
                    <CustomEmojiPicker
                    onEmojiClick={(emoji: string) =>
                      onUpdateText(selectedId, selectedText.text + emoji)
                    }
                  />
                  <Input
                    className="flex-1"
                    placeholder="Enter meme text..."
                    value={selectedText.text}
                    onChange={(e) => onUpdateText(selectedId, e.target.value)}
                  />
                </div>

                {/* Font family selector */}
                <div className="space-y-2">
                  <Label>{t("font_family")}</Label>
                   <SelectInput options={fontList} value={fontFamily ?? ""} className="w-full" onChange={handleFontFamilyChange} />
                </div>

                {/* Font size controls */}
                <div className="space-y-2">
                  <Label>{t("font_size")}</Label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decreaseFontSize}
                      className="p-2 rounded-md border hover:bg-gray-100"
                      title={t("decrease_font_size")}
                      disabled={currentFontSize <= 20}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-sm font-medium min-w-[40px] text-center">
                      {currentFontSize}px
                    </span>
                    <button
                      onClick={increaseFontSize}
                      className="p-2 rounded-md border hover:bg-gray-100"
                      title={t("increase_font_size")}
                      disabled={currentFontSize >= 100}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => onDeleteText(selectedId)}
              >
                {t("delete_text")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}