import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogClient } from "@/components/BlogClient";
import { BlogHeader } from "@/components/BlogHeader";
import { PageBackground } from "@/components/PageBackground";

const mockPosts = [
  {
    id: "1",
    slug: "ux-research-2024",
    title: "UX Research en 2024: Métodos que están transformando productos digitales",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
    author: "Equipo Rukma",
    authorImage: "/icon.svg",
    category: "UX RESEARCH",
    date: "2024-01-15",
  },
  {
    id: "2",
    slug: "diseno-sistemas",
    title: "Cómo construir un Design System escalable",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800",
    author: "Equipo Rukma",
    authorImage: "/icon.svg",
    category: "PRODUCT DESIGN",
    date: "2024-02-20",
  },
  {
    id: "3",
    slug: "mvp-estrategia",
    title: "MVP: De la idea al producto en 8 semanas",
    image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80&w=800",
    author: "Equipo Rukma",
    authorImage: "/icon.svg",
    category: "ESTRATEGIA",
    date: "2024-03-10",
  },
];

export const metadata = {
  title: "Blog",
  description:
    "Ideas, perspectivas y recursos para equipos que innovan. Artículos sobre UX, Product Design, tecnología y estrategia digital.",
  openGraph: {
    title: "Blog | Rukma Studio",
    description:
      "Ideas, perspectivas y recursos para equipos que innovan.",
    url: "https://rukma.studio/blog",
  },
  alternates: {
    canonical: "https://rukma.studio/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0D0F12] relative overflow-hidden">
      <PageBackground />

      <div className="relative z-10">
        <Navbar />

        {/* Blog Header */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">

            <BlogHeader />

            {/* Divider */}
            <div className="w-full h-px bg-white/10 mt-20 mb-8"></div>

            {/* Client Interactive Component */}
            <BlogClient posts={mockPosts} />

          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
