export interface ExportControlsProps {
    hasImage: boolean;
    onExport: () => void;
    onSaveDraft: () => void;

}
export interface ColorPickerProps {
  onColorChange?: (color: string) => void;
}

export interface EmojiPickerProps {
  onEmojiClick?: (emoji: string) => void;
}

export interface ImageItem {
  id: number;
  image: string;
  text: string;
  fullUrl: string;
}

export interface CustomToastProps {
  message: string;
  type?: "success" | "error" | "info";
  closeToast?: () => void;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

export interface TemplateSelectorProps {
  templates: object;
}

export interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface ThemeSelect {
  id: string;
  title: string;
  url: string;
}

export interface UploadControlsProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ChildProps {
  onSelected: (item: any) => void;
}




