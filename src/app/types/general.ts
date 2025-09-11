export interface RightControlsProps {
    hasImage: boolean;
    onExport: () => void;
    onSaveDraft: () => void;
    onChangeImage: (item: ImageItem) => void;


}
export interface ColorPickerProps {
  onColorChange?: (color: string) => void;
}

export interface TextElement {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  fill: string
  stroke: string
  strokeWidth: number
  fontFamily: string
  align: string
}

export interface EmojiPickerProps {
  onEmojiClick?: (emoji: string) => void;
}

export interface ImageItem {
  id: number;
  image: string;
  text: TextElement[];
  fullUrl: string;
  isActive?: boolean
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

export interface OpacityInputProps {
  color: string; 
  onChange: (colorWithOpacity: string) => void;
  initialOpacity?: number;
}




