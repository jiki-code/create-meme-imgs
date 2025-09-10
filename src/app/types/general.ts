export default interface ExportControlsProps {
    hasImage: boolean;
    onExport: () => void;
    onSaveDraft: () => void;

}


export default interface ColorPickerProps {
  onColorChange?: (color: string) => void;
}

export default interface EmojiPickerProps {
  onEmojiClick?: (emoji: string) => void;
}

export interface ImageItem {
  id: number;
  url: string;
  text: string;
  fullUrl: string;
}