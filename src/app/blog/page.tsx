import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogClient } from "@/components/BlogClient";
import { BlogHeader } from "@/components/BlogHeader";
import { PageBackground } from "@/components/PageBackground";
import { cms } from "@/lib/cms";

export const metadata = {
  title: "Blog",
  description:
    "Perspectivas e inspiración para el crecimiento digital, la innovación y el diseño de mejores experiencias. Artículos sobre UX, Product Design, tecnología y estrategia digital.",
  openGraph: {
    title: "Blog | Rukma Studio",
    description:
      "Perspectivas e inspiración para el crecimiento digital, la innovación y el diseño de mejores experiencias.",
    url: "https://rukma.studio/blog",
  },
  alternates: {
    canonical: "https://rukma.studio/blog",
  },
};

export default async function BlogPage() {
  const articles = await cms.articles.list({ category: "blog" }).catch(() => []);

  const posts = articles.map((a) => {
    const data = (a.data ?? {}) as { topic?: string; author?: string };
    return {
      id: a.id,
      slug: a.slug,
      title: a.title,
      image: a.cover_image_url ?? "",
      author: data.author ?? "Equipo Rukma",
      authorImage: "/icon.svg",
      category: data.topic ?? "",
      date: a.published_at ?? "",
    };
  });

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
