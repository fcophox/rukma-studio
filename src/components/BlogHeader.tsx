"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function BlogHeader() {
  const { dict } = useLanguage();
  const [textIndex, setTextIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!dict?.blog?.rotatingTexts) return;
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dict.blog.rotatingTexts.length);
        setAnimate(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [dict?.blog?.rotatingTexts?.length]);

  if (!dict?.blog) return null;

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12">
      <div className="space-y-8 max-w-3xl">
        <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
          {dict.blog.badge}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tight leading-[1.1]">
          <span className="text-white block">{dict.blog.titlePrefix}</span>
          <span className="text-color-terciario block min-h-[1.5em]">
            <span
              className={`inline-block transition-all duration-500 ease-in-out ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              {dict.blog.rotatingTexts?.[textIndex] || ""}
            </span>
            <span className="text-white">.</span>
          </span>
        </h1>
      </div>

      <div className="max-w-sm">
        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light pb-6">
          {dict.blog.description}
        </p>
      </div>
    </div>
  );
}
