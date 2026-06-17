import type { Metadata } from "next";
import { CaseArticle } from "@/components/CaseArticle";
import { cms } from "@/lib/cms";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Metadata en español (locale por defecto), consistente con el resto del sitio.
  const caseItem = await cms.articles.bySlug({ category: "casos", slug });

  if (!caseItem) {
    return {
      title: "Casos de Éxito",
      description: "Caso de éxito de Rukma Studio.",
    };
  }

  const description = caseItem.seo_description ?? caseItem.excerpt ?? "";
  return {
    title: caseItem.seo_title ?? caseItem.title,
    description,
    openGraph: {
      title: caseItem.seo_title ?? caseItem.title,
      description,
      url: `https://rukma.studio/casos/${caseItem.slug}`,
      type: "article",
      images: caseItem.cover_image_url
        ? [
            {
              url: caseItem.cover_image_url,
              width: 1200,
              height: 630,
              alt: caseItem.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `https://rukma.studio/casos/${caseItem.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  return <CaseArticle slug={slug} />;
}
