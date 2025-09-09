"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18n from "../../public/locales/i18"; // Adjust the import path if needed
import {SelectInput} from "../components/ui/select-input";

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
        options={[
          { label: "English", value: "en" },
          { label: "Vietnamese", value: "vi" },
        ]}
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
      >
        <header className="p-1 header-bg border-b mb-4 relative">
          <LanguageSwitcher />
          <h1 className="text-4xl font-bold text-center">{t("meme_tool")}</h1>
          <p className="text-center text-lg mb-3 text-gray-500">{t("description")}</p>
        </header>
        {children}
      </body>
    </html>
  );
}