"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function BannerDivider() {
  const { dict } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  
  // Custom cursor state
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!dict?.banner?.slides) return;
    const slidesCount = dict.banner.slides.length;
    let newIndex = Math.floor(latest * slidesCount);
    if (newIndex >= slidesCount) newIndex = slidesCount - 1;
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  });

  if (!dict?.banner?.slides) return null;

  const currentSlide = dict.banner.slides[currentIndex];

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX - 50); // 100px width / 2
    cursorY.set(e.clientY - 50); // 100px height / 2
  };

  return (
    <section 
      ref={containerRef}
      className="bg-[#0D0F12]"
      style={{ height: `${dict.banner.slides.length * 100}vh` }}
    >
      <div className="sticky top-[25vh] h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-full overflow-hidden flex items-center justify-center shadow-2xl cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
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

        {/* Custom Scroll Cursor */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-white"
          style={{
            width: 100,
            height: 100,
            x: cursorXSpring,
            y: cursorYSpring,
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.5,
          }}
          transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
            <path d="m7 15 5 5 5-5"/>
            <path d="m7 9 5-5 5 5"/>
          </svg>
          <span className="text-[10px] tracking-[0.2em] font-semibold">SCROLL</span>
        </motion.div>
      </div>
    </section>
  );
}

