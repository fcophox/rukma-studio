"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Barra fija en la parte superior de la página que se llena con el color
 * primario (--color-color-primario) a medida que el usuario hace scroll
 * por el contenido.
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setProgress(0);
      return;
    }

    const pct = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    setProgress(pct);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Calculate initial position (e.g. if user refreshes mid-page)
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full z-[9999] pointer-events-none"
      style={{ height: "3px" }}
    >
      <div
        className="h-full transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, var(--color-color-terciario), var(--color-color-terciario))",
          boxShadow:
            progress > 0
              ? "0 0 8px rgba(183, 206, 199, 0.4), 0 0 2px rgba(183, 206, 199, 0.2)"
              : "none",
        }}
      />
    </div>
  );
}
