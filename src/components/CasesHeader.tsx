"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function CasesHeader() {
  const { dict } = useLanguage();
  const [textIndex, setTextIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!dict?.cases?.rotatingTexts) return;
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dict.cases.rotatingTexts.length);
        setAnimate(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [dict?.cases?.rotatingTexts?.length]);

  if (!dict?.cases) return null;

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12">
      <div className="space-y-8 max-w-3xl">
        <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
          {dict.cases.badge}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight leading-[1.1]">
          <span className="text-white block">{dict.cases.titlePrefix}</span>
          <span className="text-color-terciario block min-h-[1.5em]">
            <span
              className={`inline-block transition-all duration-500 ease-in-out ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              {dict.cases.rotatingTexts[textIndex]}
            </span>
            <span className="text-white">.</span>
          </span>
        </h1>
      </div>

      <div className="max-w-sm">
        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light pb-6">
          {dict.cases.description}
        </p>
      </div>
    </div>
  );
}
