import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        common: {
          welcome: "Welcome",
          description: "Create meme from JPG, GIF or PNG (Maximum  5MB)",
          meme_tool: "MEME TOOL",
          upload_image: "Upload Image",
          text_controls: "Text Controls",
          add_text: "Add Text",
          delete: "Delete",
          export: "Export",
          export_image: "Export Image",
          reset: "Reset",
          choose_image: "Choose Image",
          choose_color: "Choose Color",
          color_code: "Color Code",
          theme_suggestion: "Theme Suggestion",
          text_color: "Text Color",
          upload_an_image_to_get_started: "Upload an image to get started",
          save_version: "Save Version",
          save: "Save",
          download: "Download",
          edit_text: "Edit Text",
          text_content: "Text Content",
          detele_text: "Detele Text",
          template: "Template",
          select_template: "Select Template",
          drop_image_here: "Drop image here",
          or_drag_and_drop_image: "or drag and drop an image",
          drop_to_replace_image: "Drop to replace image",
          emoji_add: "Add Emoji",
          font_size: "Font size",
          font_family: "Font Family",
          delete_text: "Delete Text"

        },
      },
      vi: {
        common: {
          welcome: "Chào mừng",
          description: "Tạo meme từ JPG, GIF hoặc PNG (tối đa 5MB)",
          meme_tool: "CÔNG CỤ TẠO MEME",
          upload_image: "Tải lên hình ảnh",
          text_controls: "Điều khiển văn bản",
          add_text: "Thêm văn bản",
          delete: "Xóa",
          export: "Xuất ảnh",
          export_image: "Xuất hình ảnh",
          reset: "Đặt lại",
          choose_image: "Chọn hình ảnh",
          choose_color: "Chọn màu",
          color_code: "Mã màu",
          theme_suggestion: "Mẫu gợi ý",
          text_color: "Màu chữ",
          upload_an_image_to_get_started: "Tải lên một hình ảnh bất kỳ",
          save_version: "Lưu phiên bản",
          download: "Tải về",
          save: "Lưu",
          edit_text: "Chỉnh sửa văn bản",
          text_content: "Nội dung văn bản",
          detele_text: "Xóa nội văn bản",
          template: "Mẫu",
          select_template: "Lựa chọn mẫu",
          drop_image_here: "Thả hình ảnh ở đây",
          or_drag_and_drop_image: "hoặc kéo và thả hình ảnh",
          drop_to_replace_image: "Thả để thay hình ảnh",
          emoji_add: "Thêm Emoji",
          font_size: "Kích thước",
          font_family: "Kiểu chữ",
          delete_text: "Xóa chữ"
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
