import { NextResponse } from "next/server";
import { listBlogPosts, topicOf } from "@/lib/content";
import { parseLocale } from "@/lib/lang";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = parseLocale(searchParams.get("locale"));
  const limit = parseInt(searchParams.get("limit") || "3", 10);

  try {
    const articles = await listBlogPosts(locale);

    const posts = articles.slice(0, limit).map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      image: article.cover?.url ?? "",
      category: topicOf(article),
      author: (article.customFields?.author as string) ?? "Equipo Rukma",
      authorImage: "/icon.svg",
      date: article.publishedAt,
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts from Kontorōru:", error);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}
