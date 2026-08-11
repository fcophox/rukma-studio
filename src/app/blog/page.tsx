import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogClient } from "@/components/BlogClient";
import { BlogHeader } from "@/components/BlogHeader";
import { PageBackground } from "@/components/PageBackground";
import { listBlogPosts, topicOf } from "@/lib/content";
import { getLocale } from "@/lib/server-locale";

export const metadata = {
  title: "Blog",
  description:
    "Ideas e inspiración para el crecimiento digital, la innovación y el diseño de mejores experiencias. Artículos sobre UX, Product Design, tecnología y estrategia digital.",
  openGraph: {
    title: "Blog | Rukma Studio",
    description:
      "Ideas e inspiración para el crecimiento digital, la innovación y el diseño de mejores experiencias.",
    url: "https://rukma.studio/blog",
  },
  alternates: {
    canonical: "https://rukma.studio/blog",
  },
};

export default async function BlogPage() {
  const locale = await getLocale();
  const articles = await listBlogPosts(locale);

  const posts = articles.map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    image: article.cover?.url ?? "",
    author: (article.customFields?.author as string) ?? "Equipo Rukma",
    authorImage: "/icon.svg",
    category: topicOf(article),
    date: article.publishedAt,
  }));

  return (
    <main className="min-h-screen bg-[#0D0F12] relative overflow-hidden">
      <PageBackground />

      <div className="relative z-10">
        <Navbar />

        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">

            <BlogHeader />

            <div className="w-full h-px bg-white/10 mt-20 mb-8" />

            <BlogClient posts={posts} />

          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
