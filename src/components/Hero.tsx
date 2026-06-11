"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import DarkVeil from "./DarkVeil";

export function Hero() {
  const { dict } = useLanguage();
  const [textIndex, setTextIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!dict?.hero?.rotatingTexts) return;
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dict.hero.rotatingTexts.length);
        setAnimate(true);
      }, 500); // Wait for fade out to complete before changing text
    }, 4000); // Total duration per word
    return () => clearInterval(interval);
  }, [dict?.hero?.rotatingTexts?.length]);

  if (!dict) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0D0F12]">

      {/* Animated DarkVeil effect layered over the image */}
      <div className="absolute inset-0 h-full w-full pointer-events-none opacity-100">
        <DarkVeil
          hueShift={48}
          speed={0.6}
          warpAmount={0.1}
          noiseIntensity={0.2}
          scanlineIntensity={0.05}
          scanlineFrequency={2}
        />
      </div>

      {/* Static background image */}
      <img
        src="/bg/background.svg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-40"
      />


      {/* Gradient overlay for smooth transition at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4/4 bg-gradient-to-t from-[#0D0F12] to-[#0D0F12]/50 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 flex h-full min-h-screen flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl space-y-10"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-light text-white tracking-tight leading-[1.1]">
            {dict.hero.titlePrefix}
            <br className="hidden md:block" />
            <span
              className={`inline-block text-color-terciario transition-all duration-500 ease-in-out ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              {dict.hero.rotatingTexts[textIndex] || ""}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl text-xl md:text-2xl text-white/90 leading-relaxed font-light"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5 pt-4"
          >
            <button className="px-8 py-4 rounded-full bg-acento text-texto-principal font-medium hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(221,227,230,0.25)]">
              {dict.hero.ctaPrimary}
            </button>
            <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
              {dict.hero.ctaSecondary}
            </button>
          </motion.div>
        </motion.div>

        {/* <p className="max-w-3xl text-sm md:text-base text-white/60 pt-16 font-light leading-relaxed">
            {dict.hero.optionalText}
          </p> */}
      </div>
    </section>
  );
}
