"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { dict } = useLanguage();

  if (!dict?.services) return null;

  const selectedService = dict.services.items.find(
    (s: any) => s.slug === resolvedParams.slug
  );

  if (!selectedService) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-fondo-oscuro relative">
      <Navbar />
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/#servicios"
              className="mb-8 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Volver a servicios</span>
            </Link>

            <div className="flex flex-col gap-12">
              {/* Image Header */}
              <div className="w-full h-64 md:h-96 relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fondo-oscuro/90 via-fondo-oscuro/40 to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-color-terciario font-mono text-xl mb-2 block">{selectedService.id}.</span>
                  <h3 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">{selectedService.title}</h3>
                  <p className="text-xl text-acento/80 mt-3 font-light">{selectedService.subtitle}</p>
                </div>
              </div>

              {/* Content List */}
              <div className="max-w-4xl mx-auto flex flex-col gap-16">
                {/* Description */}
                <div className="">
                  <p className="text-3xl md:text-4xl text-white font-medium leading-tight mb-6">
                    {selectedService.shortDescription}
                  </p>
                  <div className="text-texto-secundario text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {selectedService.longDescription}
                  </div>
                </div>

                {/* Para quién es */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-4">
                    <h4 className="text-2xl font-semibold text-white sticky top-32">¿Para quién es?</h4>
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

                {/* Valor al negocio */}
                <div className="bg-gradient-to-br from-color-primario/40 to-transparent border border-color-primario/30 rounded-3xl p-8 md:p-12">
                  <h4 className="text-2xl font-semibold text-color-terciario mb-8">¿Cómo aporta valor?</h4>
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
                    <span>Duración estimada:</span>
                    <span className="text-white font-medium">{selectedService.duration}</span>
                  </div>
                </div>

                {/* Proceso (si existe) */}
                {selectedService.process && (
                  <div className="space-y-8 pt-4">
                    <h4 className="text-3xl font-semibold text-white">Proceso estándar</h4>

                    {selectedService.process.distribution && (
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium text-white/50 uppercase tracking-widest">Distribución sugerida</h5>

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
                            <h5 className="text-sm font-medium text-white/50 uppercase tracking-widest mb-4">Hitos del proceso</h5>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed">
                              Un paso a paso claro y estructurado para asegurar que cada etapa del proyecto aporte valor y nos acerque al objetivo final.
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
                <div className="space-y-8 pt-8 border-t border-white/10">
                  <h4 className="text-3xl font-semibold text-white">Planes disponibles</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {selectedService.plans.map((plan: any, i: number) => (
                      <div key={i} className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors gap-6">
                        <div className="flex flex-col gap-2">
                          <span className="text-2xl text-white font-semibold">{plan.name}</span>
                          {plan.description && (
                            <p className="text-white/70 leading-relaxed">{plan.description}</p>
                          )}
                        </div>

                        {plan.includes && (
                          <div className="flex-1">
                            <p className="text-sm text-white/50 mb-4 uppercase tracking-widest">Incluye</p>
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

                        <div className="pt-6 border-t border-white/10 flex flex-col">
                          {plan.priceLabel && <span className="text-sm text-white/50 uppercase tracking-widest mb-1">{plan.priceLabel}</span>}
                          <span className="text-color-terciario text-xl font-medium">{plan.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condiciones (si existe) */}
                {selectedService.conditions && (
                  <div className="space-y-6 pt-8 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white/50 uppercase tracking-widest">Supuestos y condiciones</h4>
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
