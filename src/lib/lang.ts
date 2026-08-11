import type { Locale } from "@/dictionaries";

/** Cookie donde se persiste el idioma elegido en el navbar. */
export const LANG_COOKIE = "app_lang";

export const DEFAULT_LOCALE: Locale = "es";

/** Normaliza cualquier valor externo (cookie, query param) a un locale válido. */
export function parseLocale(value: string | null | undefined): Locale {
  return value === "en" || value === "es" ? value : DEFAULT_LOCALE;
}
