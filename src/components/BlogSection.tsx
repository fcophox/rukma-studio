"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { cms, type Article } from "@/lib/cms";

interface FeaturedPost {
  slug: string;
  title: string;
  image: string;
  category: string;
  author: string;
}

function toFeaturedPost(a: Article): FeaturedPost {
  const data = (a.data ?? {}) as { topic?: string; author?: string };
  return {
    slug: a.slug,
    title: a.title,
    image: a.cover_image_url ?? "",
    category: data.topic ?? "",
    author: data.author ?? "Equipo Rukma",
  };
}

function EmptyPostCard({ message }: { message: string }) {
  return (
    <div aria-hidden>
      <div className="relative w-full aspect-2/1 rounded-2xl overflow-hidden mb-6 border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center">
        <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
          <div className="h-2 w-24 rounded-full bg-white/5" />
        </div>
        <div className="h-2 w-16 rounded-full bg-white/5" />
      </div>
      {message ? (
        <p className="text-sm text-white/40 leading-snug">{message}</p>
      ) : (
        <div className="h-2 w-40 rounded-full bg-white/5" />
      )}
    </div>
  );
}

const EMPTY_SLOTS = [0, 1, 2];

export function BlogSection() {
  const { dict, lang } = useLanguage();
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!dict?.blog?.rotatingTexts) return;
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dict.blog.rotatingTexts.length);
        setAnimate(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [dict?.blog?.rotatingTexts?.length]);

  useEffect(() => {
    let active = true;
    setLoaded(false);
    cms.articles
      .list({ category: "blog", locale: lang, limit: 3 })
      .then((articles) => {
        if (active) setPosts(articles.map(toFeaturedPost));
      })
      .catch(() => {
        if (active) setPosts([]);
      })
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [lang]);

  if (!dict?.blog) return null;

  const isEmpty = loaded && posts.length === 0;
  const emptyMessage = dict.blog.emptyState;

  return (
    <section className="py-24 px-6 bg-[#0D0F12]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
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
                {dict.blog.badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              <span className="text-white block mb-2">{dict.blog.homeSectionTitle}</span>
              <span className="text-color-terciario block min-h-[1.5em]">
                <span
                  className={`inline-block transition-all duration-500 ease-in-out ${
                    animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {dict.blog.rotatingTexts?.[textIndex] || ""}
                </span>
                <span className="text-white">.</span>
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors self-start md:self-auto"
          >
            {dict.blog.exploreButton}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isEmpty
            ? EMPTY_SLOTS.map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
                >
                  <EmptyPostCard message={i === 0 ? emptyMessage : ""} />
                </motion.div>
              ))
            : posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block" data-cursor="card">
                    <div className="relative w-full aspect-2/1 rounded-2xl overflow-hidden mb-6">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-white">{post.author}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl text-white/90 font-medium leading-snug group-hover:text-color-terciario transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
        </div>

      </div>
    </section>
  );
}
