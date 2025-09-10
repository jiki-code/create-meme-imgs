import { Type } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { TextElement } from "../app/types/meme";
import EmojiPicker from './ui/emoji';

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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Add Text
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={onAddText} disabled={!hasImage}>
            Add Text
          </Button>
        </CardContent>
      </Card>

      {selectedId && selectedText && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2 w-full">
                  <Label>Text Content</Label>
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
                Delete Text
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
