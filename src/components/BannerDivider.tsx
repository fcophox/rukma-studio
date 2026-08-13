"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function BannerDivider() {
  const { dict } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (!dict?.banner?.slides) return;
    const slidesCount = dict.banner.slides.length;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidesCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [dict?.banner?.slides?.length]);

  if (!dict?.banner?.slides) return null;

  const currentSlide = dict.banner.slides[currentIndex];

  return (
    <section className="bg-[#0D0F12]">
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-full overflow-hidden flex items-center justify-center shadow-2xl"
        >
          <AnimatePresence>
            <motion.div
              key={`img-${currentIndex}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentSlide.image}
                alt="Banner"
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
              {/* Overlay oscuro para asegurar que el texto sea legible */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </motion.div>
          </AnimatePresence>

          {/* Texto central */}
          <div className="relative z-10 text-center px-6 md:px-12">
            <AnimatePresence mode="wait">
              <motion.h2 
                key={`text-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight max-w-4xl mx-auto leading-tight"
              >
                {currentSlide.titlePrefix}<span className="font-light text-color-terciario">{currentSlide.titleHighlight}</span>{currentSlide.titleSuffix}
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-30 pointer-events-none">
          {dict.banner.slides.map((_: any, idx: number) => (
            <div 
              key={idx} 
              className={`w-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "h-8 bg-color-terciario" : "h-2 bg-white/30"}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
