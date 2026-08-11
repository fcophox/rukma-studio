/**
 * Cliente de Kontorōru para consumir contenido publicado.
 * La API Key se usa solo desde el servidor (Server Components, Route Handlers).
 */

/**
 * Se leen en cada llamada, no al importar el módulo: capturarlas a nivel de
 * módulo deja la clave vieja en memoria después de editar `.env.local`, y el
 * síntoma —un 403 con una clave que en el archivo ya es correcta— cuesta horas.
 */
const base = () =>
  process.env.KONTORORU_URL || "https://tu-instalacion.kontororu.app/api/v1";

function apiKey(): string {
  const key = process.env.KONTORORU_API_KEY;
  if (!key) {
    throw new Error(
      "Falta KONTORORU_API_KEY. Configúrala en .env.local\n" +
      "Obtén tu clave en Kontorōru → Ajustes → API Keys"
    );
  }
  return key;
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
  const url = `${base()}${path}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey()}`,
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

/**
 * Envío de formulario. `name`/`email`/`message` tienen columna propia en la
 * bandeja; el resto de campos viaja en `payload` y se muestra en el detalle.
 */
export interface FormSubmission {
  name?: string;
  email?: string;
  message?: string;
  sourceUrl?: string;
  payload?: Record<string, unknown>;
}

/** Tramo horario de la rejilla del día. */
export interface CalendarSlot {
  start: string;
  end: string;
}

/** Un día de la semana. `weekday` usa el índice de `Date#getDay()`: 0 = domingo. */
export interface CalendarDay {
  weekday: number;
  label: string;
  isClosed: boolean;
  available: CalendarSlot[];
}

export interface CalendarAvailability {
  timezone: string;
  startTime: string;
  endTime: string;
  slotMinutes: number;
  slots: CalendarSlot[];
  week: CalendarDay[];
}

export const kontororu = {
  calendar: {
    /**
     * Disponibilidad semanal configurada en el complemento Calendario.
     *
     * Es un patrón semanal, no fechas concretas: quien lo consume ya sabe qué
     * día de la semana cae cada fecha.
     */
    availability: async (): Promise<{ data: CalendarAvailability }> =>
      get<{ data: CalendarAvailability }>("/addons/calendar/availability", [
        "calendar",
      ]),
  },

  forms: {
    /**
     * Registra un envío en el complemento Contactos.
     *
     * `formKey` es la categoría con la que la bandeja agrupa los envíos en
     * pestañas. No hay que declararla antes: el primer envío la da de alta.
     *
     * Solo desde el servidor: exige una API Key con el permiso `forms:write`,
     * y una clave en el bundle la usaría cualquiera para llenar la bandeja.
     */
    submit: async (
      formKey: string,
      input: FormSubmission
    ): Promise<{ data: { id: string; formKey: string; createdAt: string } }> => {
      const res = await fetch(`${base()}/forms/${formKey}/submissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...input, payload: input.payload ?? {} }),
        cache: "no-store",
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(
          `Kontorōru ${res.status}: /forms/${formKey}/submissions\n${error.error?.message || ""}`
        );
      }

      return res.json();
    },
  },

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
    bySlug: async (slug: string, locale?: string): Promise<{ data: PostDetail } | null> => {
      try {
        const query = locale ? `?locale=${locale}` : "";
        return await get<{ data: PostDetail }>(`/posts/${slug}${query}`, [
          "posts",
          `post:${slug}`,
        ]);
      } catch (error) {
        if (error instanceof Error && error.message.includes("404")) {
          // If no locale was explicitly specified, try fallback to "en"
          if (!locale) {
            try {
              return await get<{ data: PostDetail }>(`/posts/${slug}?locale=en`, [
                "posts",
                `post:${slug}`,
              ]);
            } catch (fallbackError) {
              if (fallbackError instanceof Error && fallbackError.message.includes("404")) {
                return null;
              }
              throw fallbackError;
            }
          }
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
