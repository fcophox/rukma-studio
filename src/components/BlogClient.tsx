"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  date: string;
}

interface BlogClientProps {
  posts: BlogPost[];
}

const ITEMS_PER_PAGE = 6;

export function BlogClient({ posts }: BlogClientProps) {
  const { dict } = useLanguage();
  const blogDict = dict?.blog || {
    searchPlaceholder: "Buscar artículos...",
    categoryAll: "TODOS",
    noResults: "No se encontraron artículos que coincidan con tu búsqueda."
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(blogDict.categoryAll);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Extract unique categories for dropdown
  const categories = useMemo(() => {
    const cats = new Set(posts.map((post) => post.category));
    return [blogDict.categoryAll, ...Array.from(cats)];
  }, [posts, blogDict.categoryAll]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === blogDict.categoryAll || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory, blogDict.categoryAll]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
    setIsDropdownOpen(false);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 relative z-20">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={blogDict.searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-[#1A1D21] border border-white/10 text-white text-sm rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full sm:w-64">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-[#1A1D21] border border-white/10 text-white text-sm font-bold uppercase tracking-widest rounded-xl px-6 py-4 flex items-center justify-between hover:border-white/20 transition-colors"
          >
            {selectedCategory}
            <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1D21] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-30">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full text-left px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${
                    selectedCategory === category ? "text-color-terciario bg-white/5" : "text-white/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        /* Empty state: no articles in DB */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} aria-hidden>
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center">
                <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                  <div className="h-2 w-24 rounded-full bg-white/5" />
                </div>
                <div className="h-2 w-16 rounded-full bg-white/5" />
              </div>
              {i === 0 && <p className="text-sm text-white/40">{blogDict.emptyState || "Pronto publicaremos nuevos artículos."}</p>}
              {i !== 0 && <div className="h-2 w-40 rounded-full bg-white/5" />}
            </div>
          ))}
        </div>
      ) : paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block" data-cursor="card">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
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
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-white/60">
          {blogDict.noResults}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-20 flex justify-center items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Página anterior"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-color-terciario text-[#0D0F12]"
                    : "border border-white/10 text-white/80 hover:bg-white/5"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Página siguiente"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
