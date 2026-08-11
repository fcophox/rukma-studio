"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getDictionary, Locale } from "@/dictionaries";
import { DEFAULT_LOCALE, LANG_COOKIE, parseLocale } from "@/lib/lang";

type LanguageContextType = {
  lang: Locale;
  dict: any;
  changeLanguage: (newLang: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function readCookieLang(): string | undefined {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LANG_COOKIE}=`))
    ?.split("=")[1];
}

function persistLang(newLang: Locale) {
  localStorage.setItem(LANG_COOKIE, newLang);
  document.cookie = `${LANG_COOKIE}=${newLang}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
  document.documentElement.lang = newLang;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [lang, setLang] = useState<Locale>(DEFAULT_LOCALE);
  const [dict, setDict] = useState<any>(getDictionary(DEFAULT_LOCALE));

  useEffect(() => {
    // Restaura la preferencia guardada y la refleja también en la cookie, que
    // es la que leen los Server Components para pedir el contenido al CMS.
    const cookieLang = readCookieLang();
    const savedLang = parseLocale(cookieLang ?? localStorage.getItem(LANG_COOKIE));
    persistLang(savedLang);
    setLang(savedLang);

    // Primera visita tras haber elegido idioma en una sesión anterior: el HTML
    // llegó en el idioma por defecto porque aún no existía la cookie.
    if (!cookieLang && savedLang !== DEFAULT_LOCALE) {
      router.refresh();
    }
  }, [router]);

  useEffect(() => {
    // Load dictionary when language changes
    setDict(getDictionary(lang));
  }, [lang]);

  const changeLanguage = useCallback(
    (newLang: Locale) => {
      setLang(newLang);
      persistLang(newLang);
      // Vuelve a renderizar los Server Components para que el contenido del CMS
      // (posts del blog) llegue en el nuevo idioma.
      router.refresh();
    },
    [router]
  );

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
