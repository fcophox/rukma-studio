import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente CMS de solo lectura para consumir contenido de UltraCMS desde
 * rukma-studio. Es una copia adaptada de `@ultracms/sdk` (que no está
 * publicado en npm); mantener en paralelo con `ultra-cms/packages/sdk`.
 *
 * Usa la `anon` key de Supabase; las políticas RLS garantizan que solo se
 * vea contenido publicado y que únicamente se puedan crear contactos.
 */

export type Locale = "es" | "en";
export type ArticleStatus = "draft" | "published" | "archived";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
}

export interface Article {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  /** TipTap JSON — fuente de verdad editable. */
  content: unknown | null;
  /** HTML renderizado, listo para inyectar en el frontend. */
  content_html: string | null;
  cover_image_url: string | null;
  status: ArticleStatus;
  locale: Locale;
  translation_group: string;
  /** Contenido estructurado (p.ej. servicios). */
  data: Record<string, unknown> | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface ListArticlesOptions {
  category?: string;
  locale?: Locale;
  limit?: number;
  offset?: number;
}

const ARTICLE_FIELDS =
  "id, category_id, title, slug, excerpt, content, content_html, cover_image_url, status, locale, translation_group, data, seo_title, seo_description, published_at";

const DEFAULT_LOCALE: Locale = "es";

// ── Calendario (complemento de disponibilidad para reunión virtual) ──────────

export const CALENDAR_DEFAULT_START = "18:30";
export const CALENDAR_DEFAULT_END = "21:00";
export const CALENDAR_DEFAULT_SLOT_MINUTES = 15;

const CALENDAR_FIELDS = "weekday, full_day_blocked, blocked_slots";

export interface TimeSlot {
  /** Hora de inicio "HH:MM". */
  id: string;
  /** Etiqueta visible "18:30 - 18:45 hrs". */
  label: string;
}

export interface DayAvailability {
  /** 0 = Lunes … 6 = Domingo. */
  weekday: number;
  full_day_blocked: boolean;
  blocked_slots: string[];
}

function fmtTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Genera los bloques horarios del rango configurado. */
export function generateSlots(
  start = CALENDAR_DEFAULT_START,
  end = CALENDAR_DEFAULT_END,
  slotMinutes = CALENDAR_DEFAULT_SLOT_MINUTES,
): TimeSlot[] {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;

  const slots: TimeSlot[] = [];
  for (let t = startMin; t + slotMinutes <= endMin; t += slotMinutes) {
    slots.push({ id: fmtTime(t), label: `${fmtTime(t)} - ${fmtTime(t + slotMinutes)} hrs` });
  }
  return slots;
}

/** Índice 0 = Lunes … 6 = Domingo a partir de una fecha. */
export function weekdayIndex(date: Date | string): number {
  let d: Date;
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, day] = date.split("-").map(Number);
    d = new Date(y, m - 1, day);
  } else {
    d = typeof date === "string" ? new Date(date) : date;
  }
  return (d.getDay() + 6) % 7; // getDay: 0=Domingo…6=Sábado
}

let client: SupabaseClient | null = null;

/** Crea el cliente de Supabase de forma perezosa (en el primer uso). */
function getSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Cópialas desde Supabase → Settings → API a tu .env.local.",
    );
  }
  client = createClient(url, anonKey, { auth: { persistSession: false } });
  return client;
}

async function categoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await getSupabase()
    .from("categories")
    .select("id, slug, name, description, sort_order")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Category) ?? null;
}

export const cms = {
  categories: {
    list: async (): Promise<Category[]> => {
      const { data, error } = await getSupabase()
        .from("categories")
        .select("id, slug, name, description, sort_order")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data as Category[]) ?? [];
    },
  },

  articles: {
    list: async (options: ListArticlesOptions = {}): Promise<Article[]> => {
      let query = getSupabase()
        .from("articles")
        .select(ARTICLE_FIELDS)
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (options.category) {
        const category = await categoryBySlug(options.category);
        if (!category) return [];
        query = query.eq("category_id", category.id);
      }
      if (options.locale) {
        query = query.eq("locale", options.locale);
      }
      if (options.limit != null) {
        query = query.range(
          options.offset ?? 0,
          (options.offset ?? 0) + options.limit - 1,
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Article[];
    },

    bySlug: async (params: {
      category: string;
      slug: string;
      locale?: Locale;
    }): Promise<Article | null> => {
      const category = await categoryBySlug(params.category);
      if (!category) return null;
      const { data, error } = await getSupabase()
        .from("articles")
        .select(ARTICLE_FIELDS)
        .eq("category_id", category.id)
        .eq("slug", params.slug)
        .eq("locale", params.locale ?? DEFAULT_LOCALE)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      return (data as Article) ?? null;
    },
  },

  contacts: {
    submit: async (input: ContactInput): Promise<void> => {
      const { error } = await getSupabase().from("contacts").insert({
        name: input.name,
        email: input.email,
        message: input.message,
        phone: input.phone ?? null,
        subject: input.subject ?? null,
        source: input.source ?? null,
        metadata: input.metadata ?? null,
      });
      if (error) throw error;
    },
  },

  /** Disponibilidad del complemento Calendario (reunión virtual). */
  calendar: {
    /** Configuración de los 7 días de la semana (0 = Lunes … 6 = Domingo). */
    getWeek: async (): Promise<DayAvailability[]> => {
      const { data, error } = await getSupabase()
        .from("calendar_availability")
        .select(CALENDAR_FIELDS)
        .order("weekday");
      if (error) throw error;
      return (data ?? []) as DayAvailability[];
    },
  },
};
