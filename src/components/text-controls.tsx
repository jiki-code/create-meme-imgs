import { Type } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { TextElement } from "../app/types/meme";
import EmojiPicker from './ui/emoji';
import { useTranslation } from "react-i18next";
interface TextControlsProps {
  hasImage: boolean;
  onAddText: () => void;
  onUpdateText: (id: string, text: string) => void;
  onDeleteText: (id: string) => void;
  selectedId: string | null;
  textElements: TextElement[];
}
export default function TextControls({
  hasImage,
  selectedId,
  textElements,
  onAddText,
  onUpdateText,
  onDeleteText,
}: TextControlsProps) {
  const selectedText = textElements ? textElements.find((el) => el.id === selectedId) : null;
  const {t} = useTranslation('common')
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
             {t('add_text')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={onAddText} disabled={!hasImage}>
             {t('add_text')}
          </Button>
        </CardContent>
      </Card>

      {selectedId && selectedText && (
        <Card>
          <CardHeader>
            <CardTitle> {t('edit_text')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2 w-full">
                  <Label>{t('text_content')}</Label>
                  <Input
                    className="mt-1 "
                    placeholder="Enter meme text..."
                    value={selectedText.text}
                    onChange={(e) => onUpdateText(selectedId, e.target.value)}
                  />
               <EmojiPicker  onEmojiClick={(emoji: string) =>  onUpdateText(selectedId, selectedText.text + emoji)} />
              </div>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => onDeleteText(selectedId)}
              >
               {t('delete_text')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
