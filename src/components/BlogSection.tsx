"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export function BlogSection() {
  const { dict } = useLanguage();

  const posts = [
    {
      id: 1,
      title: "Protegiendo tus activos digitales en la era de la IA",
      category: "SEGURIDAD",
      author: "Equipo Rukma",
      authorImage: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "La Seguridad en Software: Un Pilar Irrenunciable del Desarrollo Moderno.",
      category: "SEGURIDAD",
      author: "Equipo Rukma",
      authorImage: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "La importancia de la diversidad y la inclusión en el entorno laboral actual",
      category: "NEGOCIO",
      author: "Equipo Rukma",
      authorImage: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    }
  ];

  if (!dict?.blog) return null;

  return (
    <section className="py-24 px-6 bg-[#0D0F12]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                {dict.blog.badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              <span className="text-white block mb-2">{dict.blog.homeSectionTitle}</span>
              <span className="text-white/40 block">{dict.blog.homeSectionSubtitle}</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors self-start md:self-auto"
          >
            {dict.blog.exploreButton}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
            >
              <Link href={`/blog/${post.id}`} className="group block" data-cursor="card">
                <div className="relative w-full aspect-2/1 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                      <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                    </div>
                    <span className="text-sm font-medium text-white">{post.author}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl text-white/90 font-medium leading-snug group-hover:text-color-terciario transition-colors">
                  {post.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
