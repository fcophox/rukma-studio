import { NextResponse } from "next/server";
import { listCaseStudies, topicOf } from "@/lib/content";
import { parseLocale } from "@/lib/lang";

export const dynamic = "force-dynamic";

/**
 * GET /api/cases
 *
 * Casos destacados de la portada. Existe por lo mismo que `/api/posts`: el
 * idioma vive en el cliente, así que la sección se recarga al cambiarlo y no
 * puede resolverse solo en el render del servidor.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = parseLocale(searchParams.get("locale"));
  const limit = parseInt(searchParams.get("limit") || "2", 10);

  try {
    const articles = await listCaseStudies(locale, limit);

    const cases = articles.map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      image: article.cover?.url ?? "",
      category: topicOf(article),
    }));

    return NextResponse.json({ cases });
  } catch (error) {
    console.error("GET /api/cases", error);
    return NextResponse.json({ cases: [] }, { status: 500 });
  }
}
