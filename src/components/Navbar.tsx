"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, dict, changeLanguage } = useLanguage();
  const otherLang = lang === "es" ? "en" : "es";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent background when at the top
      setIsScrolled(currentScrollY > 50);
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 px-6 w-full transition-all duration-500 ease-in-out ${
          isHidden && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled || isMobileMenuOpen
            ? "backdrop-blur-md bg-[#0D0F12]/90 border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full relative z-50">
          <Link href="/" className="transition-transform hover:scale-105" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/brand/logotipo-rukma.svg"
              alt="Rukma Studio Logo"
              width={180}
              height={48}
              priority
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-white/80 font-medium">


            <Link href="/cases" className="hover:text-white transition-colors">{dict.navbar.casos}</Link>
            <Link href="/blog" className="hover:text-white transition-colors">{dict.navbar.blog}</Link>
            <Link href="/contact" className="px-6 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white">
              {dict.navbar.contacto}
            </Link>
            <div className="h-6 w-px bg-white/20 mx-2"></div>
            <button 
              onClick={() => changeLanguage(otherLang)} 
              className="hover:text-color-terciario transition-colors uppercase font-bold text-sm tracking-widest focus:outline-none"
            >
              {otherLang}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 focus:outline-none transition-transform active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0D0F12] z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div 
          className={`flex flex-col items-center gap-8 text-white/90 font-medium text-2xl transition-all duration-500 delay-100 ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >


          <Link href="/cases" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-color-terciario transition-colors">
            {dict.navbar.casos}
          </Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-color-terciario transition-colors">
            {dict.navbar.blog}
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-10 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white mt-4 text-xl">
            {dict.navbar.contacto}
          </Link>
          
          <div className="w-12 h-px bg-white/20 my-2"></div>
          
          <button 
            onClick={() => { changeLanguage(otherLang); setIsMobileMenuOpen(false); }} 
            className="hover:text-color-terciario transition-colors uppercase font-bold tracking-widest focus:outline-none text-xl"
          >
            {otherLang}
          </button>
        </div>
      </div>
    </>
  );
}
