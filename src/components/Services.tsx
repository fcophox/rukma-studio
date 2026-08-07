"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Services() {
  const { dict } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!dict?.services?.rotatingTexts) return;
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dict.services.rotatingTexts.length);
        setAnimate(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [dict?.services?.rotatingTexts?.length]);

  if (!dict?.services) return null;

  const servicesList = dict.services.items || [];
  const isCarousel = servicesList.length >= 4;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-fondo-oscuro py-32 px-6" id="services">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-16 text-left"
        >
          {dict.services.badge && (
            <span className="block text-[11px] font-bold text-color-terciario uppercase tracking-[0.2em] mb-5">
              {dict.services.badge}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-1">
            <span className="text-white block mb-2">{dict.services.title}</span>
            <span className="text-color-terciario block min-h-[1.5em]">
              <span
                className={`inline-block transition-all duration-500 ease-in-out ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                {dict.services.rotatingTexts?.[textIndex] || ""}
              </span>
              <span className="text-white">.</span>
            </span>
          </h2>
          {dict.services.description && (
            <p className="mt-6 text-base md:text-lg text-white/60 font-light leading-relaxed">
              {dict.services.description}
            </p>
          )}
        </motion.div>

        {/* Carousel or Grid Container */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            className={
              isCarousel
                ? "flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8"
                : "grid grid-cols-1 md:grid-cols-3 gap-8"
            }
            style={isCarousel ? { scrollbarWidth: "none", msOverflowStyle: "none" } : undefined}
          >
            {servicesList.map((service: any, index: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                className={isCarousel ? "snap-start flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[420px]" : "w-full"}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="block group relative w-full h-[500px] md:h-[580px] rounded-[2rem] overflow-hidden focus:outline-none transition-all"
                  data-cursor="card"
                >
                  {/* Background Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-768px) 85vw, 420px"
                    priority={index === 0}
                  />

                  {/* Card Gradients */}
                  {/* Dark gradient from top to mid to make text readable */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                  {/* Bottom subtle shadow/gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Top-Aligned Content */}
                  <div className="absolute top-8 left-8 right-8 z-10 text-left">
                    <span className="block text-white/70 text-xs md:text-sm font-semibold tracking-wider mb-2 uppercase">
                      {service.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight leading-tight max-w-[90%]">
                      {service.title}
                    </h3>
                  </div>

                  {/* Bottom hover description indicator (optional micro-animation) */}
                  <div className="absolute bottom-8 left-8 right-8 z-10 flex items-center justify-between text-white/90 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sm font-light line-clamp-2 max-w-[80%]">
                      {service.shortDescription}
                    </p>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows (Bottom-Right aligned) - Only when 4 or more items */}
          {isCarousel && (
            <div className="flex justify-end gap-3 mt-6 pr-2">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300"
                aria-label="Anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center shadow-lg transition-all duration-300"
                aria-label="Siguiente"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
