"use client";
import { useEffect } from "react";
import i18n from "../../public/locales/i18"; // Adjust the import path if needed
import { SelectInput } from "./ui/select-input";
import { languageList } from "../app/data/common";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);
  const { t } = useTranslation("common"); // Move useTranslation inside the component
  return (
    <>
      <header className="p-1 header-bg border-b relative header-sticky">
        <div className="w-full flex justify-end left-0">
          <SelectInput
            className="w-36 bg-white"
            options={languageList}
            value={i18n.language}
            onChange={changeLanguage}
          />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-black ">
          {t("meme_tool")}
        </h1>
        <p className="text-center text-lg lg:text-md mt-3 text-gray-600">
          {t("description")}
        </p>
      </header>
    </>
  );
}
