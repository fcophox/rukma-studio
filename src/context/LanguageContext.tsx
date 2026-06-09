"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getDictionary, Locale } from "@/dictionaries";

type LanguageContextType = {
  lang: Locale;
  dict: any;
  changeLanguage: (newLang: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Locale>("es");
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    // Check local storage on mount
    const savedLang = localStorage.getItem("app_lang") as Locale;
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    // Load dictionary when language changes
    getDictionary(lang).then((loadedDict) => {
      setDict(loadedDict);
    });
  }, [lang]);

  const changeLanguage = (newLang: Locale) => {
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  // Don't render until dictionary is loaded to prevent flash of empty content
  if (!dict) return null;

  return (
    <LanguageContext.Provider value={{ lang, dict, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
