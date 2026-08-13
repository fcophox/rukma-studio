"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

type CasesContextType = {
  /** true si hay al menos un caso de estudio publicado en el CMS. */
  hasCases: boolean;
  /** true mientras la petición aún no ha terminado. */
  loading: boolean;
};

const CasesContext = createContext<CasesContextType>({
  hasCases: false,
  loading: true,
});

/**
 * Provider que consulta `/api/cases` una vez (por idioma) para saber si existen
 * casos de estudio publicados. Navbar, SuccessCases y Footer lo leen con
 * `useCasesAvailability()` para ocultar la sección y el enlace cuando no hay
 * ningún caso.
 */
export function CasesProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const [hasCases, setHasCases] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/cases?locale=${lang}&limit=1`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { cases: unknown[] }) => {
        setHasCases((data.cases ?? []).length > 0);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setHasCases(false);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [lang]);

  return (
    <CasesContext.Provider value={{ hasCases, loading }}>
      {children}
    </CasesContext.Provider>
  );
}

export function useCasesAvailability() {
  return useContext(CasesContext);
}
