"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { cms, type Article } from "@/lib/cms";

interface FeaturedCase {
  slug: string;
  title: string;
  image: string;
  category: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200";

function toFeatured(a: Article): FeaturedCase {
  const data = (a.data ?? {}) as { topic?: string };
  return {
    slug: a.slug,
    title: a.title,
    image: a.cover_image_url ?? FALLBACK_IMAGE,
    category: data.topic ?? "",
  };
}

function EmptyCaseCard({ aspect, message }: { aspect: string; message: string }) {
  return (
    <div aria-hidden>
      <div
        className={`relative w-full ${aspect} rounded-2xl overflow-hidden mb-6 border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center`}
      >
        <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="space-y-3">
        <div className="h-2 w-20 rounded-full bg-white/5" />
        {message ? <p className="text-sm text-white/40 leading-snug">{message}</p> : <div className="h-2 w-40 rounded-full bg-white/5" />}
      </div>
    </div>
  );
}

export function SuccessCases() {
  const { dict, lang } = useLanguage();
  const [cases, setCases] = useState<FeaturedCase[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!dict?.cases?.rotatingTexts) return;
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dict.cases.rotatingTexts.length);
        setAnimate(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [dict?.cases?.rotatingTexts?.length]);

  useEffect(() => {
    let active = true;
    setLoaded(false);
    cms.articles
      .list({ category: "casos", locale: lang, limit: 2 })
      .then((articles) => {
        if (active) setCases(articles.map(toFeatured));
      })
      .catch(() => {
        if (active) setCases([]);
      })
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [lang]);

  if (!dict?.cases) return null;
  const case1 = cases[0];
  const case2 = cases[1];
  const emptyMessage = dict.cases.emptyState;

  return (
    <section className="py-24 px-6 bg-[#0D0F12]">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                {dict.cases.badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-1">
              {dict.cases.titlePrefix}
            </h2>
            <p className="text-4xl md:text-5xl lg:text-6xl font-light text-color-terciario tracking-tight min-h-[1.5em]">
              <span
                className={`inline-block transition-all duration-500 ease-in-out ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                {dict.cases.rotatingTexts[textIndex]}
              </span>
              <span className="text-white">.</span>
            </p>
          </div>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors self-start md:self-auto"
          >
            Explorar todos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

          {/* Main Case (Wider) */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:col-span-7"
          >
            {case1 ? (
              <Link href={`/cases/${case1.slug}`} className="group block" data-cursor="card">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={case1.image}
                    alt={case1.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                    {case1.category}
                  </span>
                  <h3 className="text-xl md:text-2xl text-white font-medium leading-snug group-hover:text-color-terciario transition-colors">
                    {case1.title}
                  </h3>
                </div>
              </Link>
            ) : loaded ? (
              <EmptyCaseCard aspect="aspect-[16/9]" message={emptyMessage} />
            ) : null}
          </motion.div>

          {/* Secondary Case (Narrower) */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-5 mt-8 md:mt-0"
          >
            {case2 ? (
              <Link href={`/cases/${case2.slug}`} className="group block" data-cursor="card">
                <div className="relative w-full aspect-2/1 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={case2.image}
                    alt={case2.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                    {case2.category}
                  </span>
                  <h3 className="text-xl md:text-2xl text-white font-medium leading-snug group-hover:text-color-terciario transition-colors">
                    {case2.title}
                  </h3>
                </div>
              </Link>
            ) : loaded ? (
              <EmptyCaseCard aspect="aspect-2/1" message="" />
            ) : null}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
