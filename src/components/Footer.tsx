"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCasesAvailability } from "@/context/CasesContext";
import { useState, useEffect } from "react";

export function Footer() {
  const { dict } = useLanguage();
  const { hasCases } = useCasesAvailability();
  const [textIndex, setTextIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!dict?.footer?.ctaRotatingTexts) return;
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dict.footer.ctaRotatingTexts.length);
        setAnimate(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [dict?.footer?.ctaRotatingTexts?.length]);

  if (!dict) return null;

  return (
    <footer className="bg-fondo-oscuro pt-16 md:pt-24 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* CTA Card — dark card with aurora gradient effect */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0a0d10]">
          {/* Aurora gradient overlays */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(15,42,46,0.55) 0%, transparent 70%), " +
                "radial-gradient(ellipse 50% 60% at 70% 30%, rgba(58,70,77,0.35) 0%, transparent 70%), " +
                "radial-gradient(ellipse 40% 40% at 50% 80%, rgba(183,206,199,0.08) 0%, transparent 60%)",
            }}
          />
          {/* Subtle light streak */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
            }}
          />

          <div className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-28 lg:py-32">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] max-w-4xl">
              {dict.footer.ctaTitle1}<br className="hidden md:block" />
              {dict.footer.ctaTitle2Prefix}
              <span className={`inline-block text-color-terciario transition-all duration-500 ease-in-out ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {dict.footer.ctaRotatingTexts ? dict.footer.ctaRotatingTexts[textIndex] : ""}
              </span>
              {dict.footer.ctaTitle2Suffix}
            </h2>
            <p className="mt-5 md:mt-6 text-sm md:text-base text-white/50 max-w-xl leading-relaxed">
              {dict.footer.subtitle}
            </p>
            <Link
              href="/contact"
              className="mt-8 md:mt-10 inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#0D0F12] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              {dict.footer.ctaButton}
              <span className="ml-3 font-normal text-lg leading-none">›</span>
            </Link>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-14 md:mt-16 mb-12">
          <Link href="/">
            <Image
              src="/brand/logotipo-rukma-horizontal.svg"
              alt="Rukma Studio Logo Horizontal"
              width={240}
              height={48}
              className="h-10 sm:h-12 md:h-16 w-auto max-w-full opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        {/* Navigation & Socials */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 md:gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">
            {hasCases && (
              <Link href="/cases" className="hover:text-white transition-colors">Casos</Link>
            )}
            <Link href="/blog" className="hover:text-white transition-colors">{dict.navbar.blog}</Link>
            <Link href="/contact" className="hover:text-white transition-colors">{dict.navbar.contacto}</Link>
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            {/* Social Icons */}
            <a href="https://www.linkedin.com/company/rukmastudio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-texto-secundario/60 text-center md:text-left">
          <p>{dict.footer.rights.replace('{year}', new Date().getFullYear().toString())}</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-white transition-colors">{dict.footer.privacy}</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">{dict.footer.terms}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
