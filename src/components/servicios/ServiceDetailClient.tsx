"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";

export function ServiceDetailClient({ slug }: { slug: string }) {
  const { dict } = useLanguage();
  const [activeAudience, setActiveAudience] = useState(0);
  const audienceItems = dict?.serviceDetail?.audience ?? [];

  useEffect(() => {
    if (audienceItems.length < 2) return;
    const interval = setInterval(() => {
      setActiveAudience((prev) => (prev + 1) % audienceItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [audienceItems.length]);

  if (!dict?.services) return null;

  const selectedService = dict.services.items.find(
    (s: any) => s.slug === slug
  );

  if (!selectedService) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white overflow-hidden">
      <PageBackground />

      <div className="relative z-10">
        <Navbar />

        <article className="pt-40 pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            {/* ===== Header (estilo artículo) ===== */}
            {/* Botón volver */}
            <Link
              href="/#services"
              className="inline-flex items-center text-sm text-texto-secundario hover:text-white transition-colors mb-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              {dict.serviceDetail?.backToServices || "Volver a servicios"}
            </Link>

            {/* Título y Subtítulo */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-white/90">
              {selectedService.title}
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-light mb-12">
              {selectedService.shortDescription}
            </p>

            {/* Imagen principal */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-2xl">
              <Image src={selectedService.image} alt={selectedService.title} fill className="object-cover" priority />
            </div>

            {/* ===== Cuerpo (componentes con estilos originales) ===== */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-16"
            >
              {/* Descripción */}
              <div className="text-texto-secundario text-base md:text-lg leading-relaxed whitespace-pre-line">
                {selectedService.longDescription}
              </div>

              {/* Para quién es — Tabbed Carousel */}
              {audienceItems.length > 0 && (() => {
                const item = audienceItems[activeAudience];
                // First sentence of description becomes the card headline
                const descParts = item.description.split(/\.\s+/);
                const headline = descParts[0].replace(/\.$/, "");
                const body = descParts.slice(1).join(". ");

                return (
                  <div className="space-y-8">
                    {/* Section title */}
                    <h4 className="text-2xl md:text-3xl font-light text-white">
                      {dict.serviceDetail?.forWhoTitle || "Este servicio es para ti si eres..."}
                    </h4>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2">
                      {audienceItems.map((tab: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setActiveAudience(i)}
                          className={`text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 ${i === activeAudience
                            ? "bg-color-terciario text-[#0D0F12]"
                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                            }`}
                        >
                          {tab.title}
                        </button>
                      ))}
                    </div>

                    {/* Main card — split layout */}
                    <motion.div
                      key={activeAudience}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden"
                    >
                      <div className="flex flex-col lg:flex-row min-h-[400px]">

                        {/* Left: content */}
                        <div className="flex flex-col justify-between gap-8 p-8 md:p-10 flex-1">
                          <div className="space-y-5">
                            {/* Badge */}
                            <div className="inline-flex items-center px-3 py-1 rounded-full border border-color-terciario/30 bg-color-terciario/10">
                              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-color-terciario">
                                {item.title}
                              </span>
                            </div>
                            {/* Headline */}
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-snug">
                              {headline}
                            </h3>
                            {/* Body */}
                            {body && (
                              <p className="text-white/50 text-sm md:text-base leading-relaxed">
                                {body}
                              </p>
                            )}
                          </div>

                          {/* Why / What */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/[0.08]">
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-color-terciario">
                                {dict.serviceDetail?.whyNeed || "Por qué lo necesitas"}
                              </p>
                              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                {item.why}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-color-terciario">
                                {dict.serviceDetail?.whatGet || "Qué obtienes"}
                              </p>
                              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                {item.what}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right: visual panel */}
                        <div className="relative lg:w-[42%] h-56 lg:h-auto flex-shrink-0 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-color-primario/50 to-color-primario/10" />
                          <div
                            className="absolute inset-0 opacity-25"
                            style={{ background: "radial-gradient(circle at 65% 35%, var(--color-terciario, #60efff), transparent 55%)" }}
                          />
                          <div
                            className="absolute inset-0 opacity-[0.05]"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v32H0zm31 0h1v32h-1zM0 0h32v1H0zM0 31h32v1H0z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                              backgroundRepeat: "repeat",
                            }}
                          />
                          {/* Centered icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-4">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mx-auto backdrop-blur-sm">
                                <svg className="w-8 h-8 text-color-terciario" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                              </div>
                              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>

                    {/* Dots nav */}
                    {audienceItems.length > 1 && (
                      <div className="flex justify-center gap-2 pt-2">
                        {audienceItems.map((_: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => setActiveAudience(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeAudience
                              ? "bg-color-terciario w-6"
                              : "bg-white/20 w-1.5 hover:bg-white/40"
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Valor al negocio */}
              {selectedService.value?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                  {/* Left: título sticky */}
                  <div className="md:col-span-4">
                    <div className="sticky top-32 space-y-4">
                      <h4 className="text-3xl md:text-4xl font-light text-white leading-snug">
                        {dict.serviceDetail?.howItAddsValue || "¿Cómo aporta valor al negocio?"}
                      </h4>
                      {selectedService.duration && (
                        <p className="text-white/40 text-sm">
                          {dict.serviceDetail?.estimatedDuration || "Duración estimada:"}{" "}
                          <span className="text-white/70 font-medium">{selectedService.duration}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: cards grid */}
                  <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedService.value.map((item: any, i: number) => {
                        const icons = [
                          // shield
                          "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                          // lightning
                          "M13 10V3L4 14h7v7l9-11h-7z",
                          // trending up
                          "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                          // layers
                          "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                          // target
                          "M12 22a10 10 0 100-20 10 10 0 000 20zm0 0V12m0 0a4 4 0 100-8 4 4 0 000 8z",
                          // code
                          "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                        ];
                        const icon = icons[i % icons.length];
                        return (
                          <div
                            key={i}
                            className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-color-primario/60 flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-color-terciario" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                                <path d={icon} />
                              </svg>
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-white leading-snug">
                                {typeof item === "string" ? item : item.title}
                              </p>
                              {typeof item !== "string" && item.description && (
                                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Proceso (si existe) */}
              {selectedService.process && (
                <div className="space-y-8 pt-4">
                  <h4 className="text-3xl font-semibold text-white">
                    {dict.serviceDetail?.standardProcess || "Proceso estándar"}
                  </h4>

                  {selectedService.process.distribution && (
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-white/50 uppercase tracking-widest">
                        {dict.serviceDetail?.suggestedDistribution || "Distribución sugerida"}
                      </h5>

                      {/* Segmented Progress Bar with Labels */}
                      <div className="w-full h-14 md:h-16 bg-white/5 rounded-full flex overflow-hidden shadow-inner">
                        {selectedService.process.distribution.map((dist: any, i: number) => {
                          const opacities = ["bg-color-terciario", "bg-color-terciario/80", "bg-color-terciario/60", "bg-color-terciario/40", "bg-color-terciario/20"];
                          const textColors = ["text-[#0D0F12]", "text-[#0D0F12]", "text-[#0D0F12]", "text-white", "text-white"];

                          return (
                            <div
                              key={i}
                              className={`h-full flex flex-col items-center justify-center overflow-hidden px-1 md:px-2 border-r border-[#0D0F12]/10 last:border-r-0 ${opacities[i % opacities.length]} ${textColors[i % textColors.length]}`}
                              style={{ width: dist.percentage }}
                              title={`${dist.name} - ${dist.percentage}`}
                            >
                              <span className="font-bold text-sm md:text-base leading-none mb-1">{dist.percentage}</span>
                              <span className="text-[10px] md:text-xs font-medium truncate w-full text-center opacity-80 leading-none">{dist.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {selectedService.process.milestones && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-4">
                      <div className="md:col-span-4">
                        <div className="sticky top-32">
                          <h5 className="text-sm font-medium text-white/50 uppercase tracking-widest mb-4">
                            {dict.serviceDetail?.processMilestones || "Hitos del proceso"}
                          </h5>
                          <p className="text-white/70 text-base md:text-lg leading-relaxed">
                            {dict.serviceDetail?.processMilestonesSubtitle || "Un paso a paso claro y estructurado para asegurar que cada etapa del proyecto aporte valor y nos acerque al objetivo final."}
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-8">
                        <div className="space-y-8">
                          {selectedService.process.milestones.map((milestone: any, i: number) => (
                            <div key={i} className="relative pl-8 border-l-2 border-white/10">
                              <div className="absolute w-3 h-3 bg-color-terciario rounded-full -left-[7px] top-2"></div>
                              <h6 className="text-xl text-white font-medium mb-2">{i + 1}. {milestone.title}</h6>
                              <p className="text-white/60 text-lg leading-relaxed">{milestone.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Planes */}
              {selectedService.plans?.length > 0 && (
                <div className="space-y-8 pt-8 border-t border-white/10">
                  <h4 className="text-3xl text-center font-semibold text-white">
                    {dict.serviceDetail?.availablePlans || "Planes disponibles"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-[min(1100px,92vw)] lg:relative lg:left-1/2 lg:-translate-x-1/2">
                    {selectedService.plans.map((plan: any, i: number) => (
                      <div key={i} className="flex flex-col h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors gap-6">
                        <div className="flex flex-col gap-2">
                          <span className="text-2xl text-white font-semibold">{plan.name}</span>
                          {plan.description && (
                            <p className="text-white/70 leading-relaxed">{plan.description}</p>
                          )}
                        </div>

                        {plan.includes && (
                          <div className="flex-1">
                            <p className="text-sm text-white/50 mb-4 uppercase tracking-widest">
                              {dict.serviceDetail?.includes || "Incluye"}
                            </p>
                            <ul className="space-y-3">
                              {plan.includes.map((inc: string, j: number) => (
                                <li key={j} className="flex items-start gap-3 text-white/80">
                                  <span className="text-color-terciario mt-1">✓</span>
                                  <span className="leading-relaxed">{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {plan.priceLabel && (
                          <div className="pt-4 border-t border-white/10 mt-auto">
                            <span className="text-sm text-white/50 uppercase tracking-widest">{plan.priceLabel}</span>
                            <p className="text-white font-medium mt-1">{plan.price}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center pt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-color-terciario text-[#0D0F12] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-opacity-90 transition-opacity"
                    >
                      {dict.serviceDetail?.getQuote || "Cotizar"}
                      <span className="ml-3 font-normal text-lg leading-none">→</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Condiciones (si existe) */}
              {selectedService.conditions?.length > 0 && (
                <div className="space-y-6 pt-8 border-t border-white/10">
                  <h4 className="text-sm font-medium text-white/50 uppercase tracking-widest">
                    {dict.serviceDetail?.assumptionsAndConditions || "Supuestos y condiciones"}
                  </h4>
                  <ul className="space-y-3">
                    {selectedService.conditions.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-white/50 text-sm">
                        <span className="text-white/30 mt-0.5">-</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
