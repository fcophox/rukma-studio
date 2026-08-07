import type { Metadata } from "next";
import { kontororu, type PostDetail } from "@/lib/kontororu";
import { BlogArticleView } from "@/components/BlogArticleView";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await kontororu.posts.bySlug(slug);

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
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const result = await kontororu.posts.bySlug(slug);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">Artículo no encontrado.</p>
      </div>
    );
  }

  return <BlogArticleView post={result.data} />;
}
