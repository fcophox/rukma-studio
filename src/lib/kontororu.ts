/**
 * Cliente de Kontorōru para consumir contenido publicado.
 * La API Key se usa solo desde el servidor (Server Components, Route Handlers).
 */

const BASE = process.env.KONTORORU_URL || "https://tu-instalacion.kontororu.app/api/v1";
const KEY = process.env.KONTORORU_API_KEY;

if (!KEY) {
  throw new Error(
    "Falta KONTORORU_API_KEY. Configúrala en .env.local\n" +
    "Obtén tu clave en Kontorōru → Ajustes → API Keys"
  );
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seo: {
    title: string;
    description: string;
  };
  customFields: Record<string, unknown>;
  category: {
    id: string;
    slug: string;
    name: string;
    kind: string;
  };
  cover: {
    id: string;
    url: string;
    alt: string | null;
    width: number;
    height: number;
  } | null;
  tags: Array<{
    id: string;
    slug: string;
    name: string;
  }>;
  locale?: string;
  translations?: Record<string, string>;
}

export interface PostDetail extends Post {
  content: {
    html: string;
    json: unknown;
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  kind: string;
  description: string | null;
  postCount: number;
}

interface ListResponse<T> {
  data: T[];
  pagination?: {
    hasMore: boolean;
    nextCursor: string | null;
  };
}

async function get<T>(
  path: string,
  tags: string[] = []
): Promise<T> {
  const url = `${BASE}${path}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
    next: { tags, revalidate: 60 },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      `Kontorōru ${res.status}: ${path}\n${error.error?.message || ""}`
    );
  }

  return res.json();
}

export const kontororu = {
  posts: {
    /**
     * Listado de posts publicados, del más reciente al más antiguo.
     */
    list: async (params?: {
      limit?: number;
      cursor?: string;
      locale?: string;
      category?: string;
      tag?: string;
      q?: string;
    }): Promise<ListResponse<Post>> => {
      const query = new URLSearchParams();
      if (params?.limit) query.append("limit", params.limit.toString());
      if (params?.cursor) query.append("cursor", params.cursor);
      if (params?.locale) query.append("locale", params.locale);
      if (params?.category) query.append("category", params.category);
      if (params?.tag) query.append("tag", params.tag);
      if (params?.q) query.append("q", params.q);

      const path = `/posts${query.toString() ? `?${query}` : ""}`;
      return get<ListResponse<Post>>(path, ["posts"]);
    },

    /**
     * Detalle de un post por slug, incluyendo el contenido.
     */
    bySlug: async (slug: string): Promise<{ data: PostDetail } | null> => {
      try {
        return await get<{ data: PostDetail }>(`/posts/${slug}`, [
          "posts",
          `post:${slug}`,
        ]);
      } catch (error) {
        if (error instanceof Error && error.message.includes("404")) {
          return null;
        }
        throw error;
      }
    },
  },

  categories: {
    /**
     * Listado de categorías.
     */
    list: async (params?: {
      kind?: "BLOG" | "CASE_STUDY" | "SERVICE" | "CUSTOM";
    }): Promise<{ data: Category[] }> => {
      const query = new URLSearchParams();
      if (params?.kind) query.append("kind", params.kind);

      const path = `/categories${query.toString() ? `?${query}` : ""}`;
      return get<{ data: Category[] }>(path, ["categories"]);
    },
  },

  media: {
    /**
     * Obtener firma fresca de una imagen.
     */
    getById: async (id: string): Promise<{ data: any }> => {
      return get<{ data: any }>(`/media/${id}`, ["media", `media:${id}`]);
    },
  },
};
