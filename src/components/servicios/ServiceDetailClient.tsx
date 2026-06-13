"use client";

import { use } from "react";
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
          <div className="max-w-4xl mx-auto">
            {/* ===== Header (estilo artículo) ===== */}
            {/* Botón volver */}
            <Link
              href="/#servicios"
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

              {/* Para quién es */}
              {selectedService.forWho?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-4">
                    <h4 className="text-2xl font-semibold text-white sticky top-32">
                      {dict.serviceDetail?.forWho || "¿Para quién es?"}
                    </h4>
                  </div>
                  <div className="md:col-span-8">
                    <ul className="space-y-4">
                      {selectedService.forWho.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-4 text-white/80">
                          <span className="text-color-terciario mt-1 text-xl">•</span>
                          <span className="leading-relaxed text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Valor al negocio */}
              {selectedService.value?.length > 0 && (
                <div className="bg-gradient-to-br from-color-primario/40 to-transparent border border-color-primario/30 rounded-3xl p-8 md:p-12">
                  <h4 className="text-2xl font-semibold text-color-terciario mb-8">
                    {dict.serviceDetail?.howItAddsValue || "¿Cómo aporta valor?"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedService.value.map((item: any, i: number) => (
                      <div key={i} className="flex items-start gap-4 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-color-terciario/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-color-terciario font-bold">{i + 1}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium text-white text-lg">{typeof item === 'string' ? item : item.title}</span>
                          {typeof item !== 'string' && item.description && (
                            <span className="text-white/70 leading-relaxed">{item.description}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between text-white/60 text-lg">
                    <span>{dict.serviceDetail?.estimatedDuration || "Duración estimada:"}</span>
                    <span className="text-white font-medium">{selectedService.duration}</span>
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
                      href="/contacto"
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
