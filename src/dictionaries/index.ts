import es from "./es.json";
import en from "./en.json";

const dictionaries = {
  es,
  en,
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = (locale: string) => {
  if (locale in dictionaries) {
    return dictionaries[locale as Locale];
  }
  return dictionaries['es'];
};
