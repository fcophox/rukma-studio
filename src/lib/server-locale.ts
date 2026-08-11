import { cookies } from "next/headers";
import type { Locale } from "@/dictionaries";
import { LANG_COOKIE, parseLocale } from "@/lib/lang";

/**
 * Idioma activo del visitante, leído desde la cookie que escribe el switch
 * del navbar. Usar solo en Server Components / Route Handlers.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return parseLocale(store.get(LANG_COOKIE)?.value);
}
