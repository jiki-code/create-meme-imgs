"use client";
import "./globals.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18n from "../../public/locales/i18"; // Adjust the import path if needed
import {SelectInput} from "../components/ui/select-input";
import ToastProvider from "./ToastProvider";
import { Providers } from "./Providers";
import {languageList} from "../app/data/common"
function LanguageSwitcher() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return (
    <div className="w-full flex justify-end left-0">
      <SelectInput
        className="w-36"
        options={languageList}
        value={i18n.language}
        onChange={changeLanguage}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation("common"); // Move useTranslation inside the component

  return (
    <html lang="en">
      <body
      className="overflow-hidden min-h-screen"
      >
        <header className="p-1 header-bg border-b relative header-sticky">
          <LanguageSwitcher />
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-white">{t("meme_tool")}</h1>
          <p className="text-center text-lg lg:text-md my-2 text-gray-200">{t("description")}</p>
        </header>
       <Providers>
          {children}
        </Providers>
        <ToastProvider />
      </body>
    </html>
  );
}