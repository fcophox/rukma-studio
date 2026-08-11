import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { kontororu, type PostDetail } from "@/lib/kontororu";
import { getLocale } from "@/lib/server-locale";
import { CaseArticleView } from "@/components/CaseArticleView";
import type { Locale } from "@/dictionaries";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Busca el caso en el idioma activo. Si ese slug no existe en ese idioma, cae
 * al idioma en que sí existe (p. ej. al abrir un enlace compartido).
 */
async function resolveCase(
  slug: string,
  locale: Locale
): Promise<{ data: PostDetail } | null> {
  const inLocale = await kontororu.posts.bySlug(slug, locale).catch(() => null);
  if (inLocale) return inLocale;

  return kontororu.posts.bySlug(slug).catch(() => null);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const result = await resolveCase(slug, locale);

  if (!result) {
    return {
      title: "Casos de Éxito",
      description: "Caso de éxito de Rukma Studio.",
    };
  }

  const caseItem = result.data;
  const description = caseItem.seo.description ?? caseItem.excerpt ?? "";

  return {
    title: caseItem.seo.title ?? caseItem.title,
    description,
    openGraph: {
      title: caseItem.seo.title ?? caseItem.title,
      description,
      url: `https://rukma.studio/cases/${caseItem.slug}`,
      type: "article",
      images: caseItem.cover
        ? [
            {
              url: caseItem.cover.url,
              width: caseItem.cover.width,
              height: caseItem.cover.height,
              alt: caseItem.cover.alt ?? caseItem.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `https://rukma.studio/cases/${caseItem.slug}`,
      languages: caseItem.translations
        ? Object.fromEntries(
            Object.entries(caseItem.translations).map(([lang, translatedSlug]) => [
              lang,
              `https://rukma.studio/cases/${translatedSlug}`,
            ])
          )
        : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const result = await resolveCase(slug, locale);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">
          {locale === "en" ? "Case study not found." : "Caso no encontrado."}
        </p>
      </div>
    );
  }

  const caseItem = result.data;

  // El caso existe, pero en otro idioma y con un slug distinto para el idioma
  // activo: mandamos al usuario a la versión traducida.
  const translatedSlug =
    caseItem.locale !== locale ? caseItem.translations?.[locale] : undefined;
  if (translatedSlug && translatedSlug !== slug) {
    redirect(`/cases/${translatedSlug}`);
  }

  return <CaseArticleView post={caseItem} />;
}
