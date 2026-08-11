import { NextResponse } from "next/server";
import { kontororu } from "@/lib/kontororu";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "es";
  const limit = parseInt(searchParams.get("limit") || "3", 10);

  try {
    const { data: articles } = await kontororu.posts.list({ limit, locale });
    
    const posts = articles.map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      image: article.cover?.url ?? "",
      category: (article.customFields?.topic as string) ?? article.category.name,
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
