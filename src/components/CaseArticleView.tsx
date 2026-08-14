"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ReactionButton } from "@/components/ReactionButton";
import { CurtainImage } from "@/components/CurtainImage";
import type { PostDetail } from "@/lib/kontororu";

const DEFAULT_AUTHOR = "Equipo Rukma";
const DEFAULT_AUTHOR_IMAGE = "/icon.svg";

export function CaseArticleView({ post }: { post: PostDetail }) {
  const { lang } = useLanguage();
  const router = useRouter();

  // El servidor ya entrega el caso en el idioma de la cookie. Si aun así el
  // idioma activo no coincide (cambio de idioma sin recargar) y la traducción
  // vive en otro slug, navegamos a ella.
  useEffect(() => {
    if (!post.locale || post.locale === lang) return;

    const translatedSlug = post.translations?.[lang];
    if (translatedSlug && translatedSlug !== post.slug) {
      router.replace(`/cases/${translatedSlug}`);
    }
  }, [lang, post.locale, post.translations, post.slug, router]);

  const formattedDate = new Date(post.publishedAt)
    .toLocaleDateString(post.locale === "en" ? "en-US" : "es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();

  const topic = (post.customFields?.topic as string) ?? post.category?.name ?? "";

  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white overflow-hidden">
      <ReadingProgressBar />
      <PageBackground />

      <div className="relative z-10">
        <Navbar />

        <article className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/cases"
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
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {lang === "en" ? "Back to case studies" : "Volver a Casos de Estudio"}
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-white/90">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg md:text-xl text-white/60 font-light mb-12">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={DEFAULT_AUTHOR_IMAGE}
                    alt={DEFAULT_AUTHOR}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-white/90">{DEFAULT_AUTHOR}</span>
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

            {post.cover && (
              <CurtainImage
                src={post.cover.url}
                alt={post.cover.alt ?? post.title}
                sizes="(max-width: 1024px) 100vw, 900px"
                className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] mb-16 shadow-2xl"
              />
            )}

            <div
              className="prose prose-invert prose-lg md:prose-xl max-w-none text-white/70 font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            />

            {/* ── Reacciones ─────────────────────────────────── */}
            <div className="mt-12 border-t border-white/10">
              <ReactionButton slug={post.slug} locale={lang} />
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
