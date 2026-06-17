import type { Metadata } from "next";
import { BlogArticle } from "@/components/BlogArticle";
import { cms } from "@/lib/cms";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Metadata en español (locale por defecto), consistente con el resto del sitio.
  const post = await cms.articles.bySlug({ category: "blog", slug });

  if (!post) {
    return {
      title: "Blog",
      description: "Artículo del blog de Rukma Studio.",
    };
  }

  const description = post.seo_description ?? post.excerpt ?? "";
  return {
    title: post.seo_title ?? post.title,
    description,
    openGraph: {
      title: post.seo_title ?? post.title,
      description,
      url: `https://rukma.studio/blog/${post.slug}`,
      type: "article",
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    alternates: {
      canonical: `https://rukma.studio/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogArticle slug={slug} />;
}
