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
          meme_tool: "Meme Tool",
          upload_image: "Upload Image",
          text_controls: "Text Controls",
          add_text: "Add Text",
          delete: "Delete",
          export: "Export",
          export_image: "Export Image",
          reset: "Reset",
        },
      },
      vi: {
        common: {
          welcome: "Chào mừng",
          description: "Tạo meme từ JPG, GIF hoặc PNG (tối đa 5MB)",
          meme_tool: "Công cụ tạo meme",
          upload_image: "Tải lên hình ảnh",
          text_controls: "Điều khiển văn bản",
          add_text: "Thêm văn bản",
          delete: "Xóa",
          export: "Xuất ảnh",
          export_image: "Xuất hình ảnh",
          reset: "Đặt lại",
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