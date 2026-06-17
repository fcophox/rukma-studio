"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { useLanguage } from "@/context/LanguageContext";
import { cms, type Article } from "@/lib/cms";

const DEFAULT_AUTHOR = "Equipo Rukma";
const DEFAULT_AUTHOR_IMAGE = "/icon.svg";

export function BlogArticle({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    cms.articles
      .bySlug({ category: "blog", slug, locale: lang })
      .then((a) => {
        if (active) {
          setArticle(a);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setArticle(null);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [slug, lang]);

  const backLabel = lang === "en" ? "Back to blog" : "Volver al blog";
  const notFoundLabel =
    lang === "en" ? "Article not found." : "Artículo no encontrado.";

  const formattedDate = article?.published_at
    ? new Date(article.published_at)
        .toLocaleDateString(lang === "en" ? "en-US" : "es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toUpperCase()
    : "";

  const topic = ((article?.data ?? {}) as { topic?: string }).topic ?? "";

  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white overflow-hidden">
      <PageBackground />

      <div className="relative z-10">
        <Navbar />

        <article className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-texto-secundario hover:text-white transition-colors mb-12"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-3"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              {backLabel}
            </Link>

            {loading ? (
              <div className="py-24 text-white/40">…</div>
            ) : !article ? (
              <p className="py-24 text-white/60">{notFoundLabel}</p>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-white/90">
                  {article.title}
                </h1>
                {article.excerpt && (
                  <p className="text-lg md:text-xl text-white/60 font-light mb-12">
                    {article.excerpt}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={DEFAULT_AUTHOR_IMAGE}
                        alt={DEFAULT_AUTHOR}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-white/90">
                      {DEFAULT_AUTHOR}
                    </span>
                  </div>

                  <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-texto-secundario">
                    {topic && (
                      <>
                        {topic} <span className="mx-2 opacity-50">/</span>{" "}
                      </>
                    )}
                    {formattedDate}
                  </div>
                </div>

                {article.cover_image_url && (
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-2xl">
                    <Image
                      src={article.cover_image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <div
                  className="prose prose-invert prose-lg md:prose-xl max-w-none text-white/70 font-light leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: article.content_html ?? "",
                  }}
                />
              </>
            )}
          </div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
