"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { mockCases } from "@/data/mockCases";

export function SuccessCases() {
  const { dict } = useLanguage();

  if (!dict?.cases) return null;
  const case1 = mockCases[0];
  const case2 = mockCases[1];

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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              {dict.cases.titlePrefix}
            </h2>
          </div>
          <Link
            href="/casos"
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
            <Link href={`/casos/${case1.slug}`} className="group block" data-cursor="card">
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
          </motion.div>

          {/* Secondary Case (Narrower) */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-5 mt-8 md:mt-0"
          >
            <Link href={`/casos/${case2.slug}`} className="group block" data-cursor="card">
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}
