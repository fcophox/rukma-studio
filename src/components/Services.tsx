"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Services() {
  const { dict } = useLanguage();

  if (!dict?.services) return null;

  return (
    <section className="bg-fondo-oscuro py-32 px-6" id="servicios">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          {dict.services.badge && (
            <span className="block text-[11px] font-bold text-color-terciario uppercase tracking-[0.2em] mb-5">
              {dict.services.badge}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            {dict.services.title}
          </h2>
          {dict.services.description && (
            <p className="mt-6 text-base md:text-lg text-white/60 font-light leading-relaxed">
              {dict.services.description}
            </p>
          )}
        </motion.div>

        {/* Master View: Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.services.items.map((service: any, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
            >
              <Link
                href={`/servicios/${service.slug}`}
                className="block group relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl focus:outline-none focus:ring-2 focus:ring-color-terciario focus:ring-offset-4 focus:ring-offset-fondo-oscuro transition-all"
                data-cursor="card"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fondo-oscuro/90 via-fondo-oscuro/20 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-left transform transition-transform duration-500 group-hover:-translate-y-4">
                  <span className="text-color-terciario font-mono text-sm md:text-base mb-2 block">{service.id}.</span>
                  <h3 className="text-2xl font-semibold text-white tracking-tight leading-snug mb-2">{service.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
