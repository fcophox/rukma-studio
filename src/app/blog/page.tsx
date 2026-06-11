import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogClient } from "@/components/BlogClient";
import { BlogHeader } from "@/components/BlogHeader";
import { PageBackground } from "@/components/PageBackground";
import { mockPosts } from "@/data/mockPosts";

export const metadata = {
  title: "Blog | Rukma Studio",
  description: "Ideas y perspectivas para equipos que innovan.",
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
