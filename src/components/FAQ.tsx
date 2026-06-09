"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function FAQ() {
  const { dict } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!dict) return null;

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-fondo-oscuro py-32 px-6" id="faq">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left Column - Subtitle */}
          <div className="md:col-span-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] sticky top-32">
              {dict.faq.title}
            </h2>
          </div>

          {/* Right Column - Accordion Items */}
          <div className="md:col-span-8 flex flex-col">
            {dict.faq.items.map((faq: any, index: number) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="border-b border-white/10 py-6 last:border-b-0"
                >
                  <button
                    onClick={() => toggleOpen(index)}
                    className="w-full flex items-center justify-between gap-4 text-left focus:outline-none group"
                  >
                    <h3 className="text-lg md:text-xl font-light text-white/90 group-hover:text-white transition-colors">
                      {faq.question}
                    </h3>
                    <div className={`flex items-center justify-center flex-shrink-0 transition-transform duration-300 text-white/40 group-hover:text-white/80 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                      </svg>
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="text-white/60 text-base md:text-lg leading-relaxed whitespace-pre-line font-light pr-8 md:pr-12">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
