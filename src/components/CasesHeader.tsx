"use client";

import { useLanguage } from "@/context/LanguageContext";

export function CasesHeader() {
  const { dict } = useLanguage();
  
  if (!dict?.cases) return null;

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12">
      <div className="space-y-8 max-w-3xl">
        <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
          {dict.cases.badge}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1]">
          <span className="text-white block">{dict.cases.titlePrefix}</span>
          <span className="text-white/40 block">{dict.cases.titleSuffix}</span>
        </h1>
      </div>
      
      <div className="max-w-sm">
        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
          {dict.cases.description}
        </p>
      </div>
    </div>
  );
}
