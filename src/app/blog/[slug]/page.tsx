import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { kontororu, type PostDetail } from "@/lib/kontororu";
import { getLocale } from "@/lib/server-locale";
import { BlogArticleView } from "@/components/BlogArticleView";
import type { Locale } from "@/dictionaries";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Busca el artículo en el idioma activo. Si ese slug no existe en ese idioma,
 * cae al idioma en que sí existe (p. ej. al abrir un enlace compartido).
 */
async function resolvePost(
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
  const result = await resolvePost(slug, locale);

  if (!result) {
    return {
      title: "Blog",
      description: "Artículo del blog de Rukma Studio.",
    };
  }

  const post = result.data;
  const description = post.seo.description ?? post.excerpt ?? "";

  return {
    title: post.seo.title ?? post.title,
    description,
    openGraph: {
      title: post.seo.title ?? post.title,
      description,
      url: `https://rukma.studio/blog/${post.slug}`,
      type: "article",
      images: post.cover
        ? [
            {
              url: post.cover.url,
              width: post.cover.width,
              height: post.cover.height,
              alt: post.cover.alt ?? post.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `https://rukma.studio/blog/${post.slug}`,
      languages: post.translations
        ? Object.fromEntries(
            Object.entries(post.translations).map(([lang, translatedSlug]) => [
              lang,
              `https://rukma.studio/blog/${translatedSlug}`,
            ])
          )
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const result = await resolvePost(slug, locale);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">
          {locale === "en" ? "Article not found." : "Artículo no encontrado."}
        </p>
      </div>
    );
  }

  const post = result.data;

  // El artículo existe, pero en otro idioma y con un slug distinto para el
  // idioma activo: mandamos al usuario a la versión traducida.
  const translatedSlug = post.locale !== locale ? post.translations?.[locale] : undefined;
  if (translatedSlug && translatedSlug !== slug) {
    redirect(`/blog/${translatedSlug}`);
  }

  return <BlogArticleView post={post} />;
}
