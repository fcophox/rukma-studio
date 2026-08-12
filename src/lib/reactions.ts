/**
 * Cliente del complemento Reacciones de Kontorōru.
 *
 * A diferencia del resto de la API, este endpoint lo llama el navegador del
 * lector: es público (sin API Key), tiene CORS abierto a `*` y limita a 60
 * peticiones. Ese límite va por IP, así que pasar por un route handler propio
 * metería a todos los lectores en el mismo cupo y la web daría 429 con poco
 * tráfico. Por eso aquí no hay proxy.
 *
 * La URL viaja en el bundle a propósito: es pública por diseño y la API Key
 * nunca sale del servidor porque este endpoint no la usa.
 */

const BASE =
  process.env.NEXT_PUBLIC_KONTORORU_URL ||
  "https://kontororu-cms-production.up.railway.app/api/v1";

/** Espacio en Kontorōru. El endpoint lo exige junto al slug. */
const TENANT = process.env.NEXT_PUBLIC_KONTORORU_TENANT || "rukma";

// ── Tipos ───────────────────────────────────────────────────────────────

export interface ReactionTotals {
  slug: string;
  /** `{ like: 12 }`. Un contenido sin reacciones llega como `{}`. */
  totals: Record<string, number>;
}

export interface ReactionResult {
  slug: string;
  reaction: string;
  total: number;
}

export interface ReactionError {
  code: string;
  message: string;
}

// ── GET — leer contadores ───────────────────────────────────────────────

export type FetchReactionsResult =
  | { ok: true; data: ReactionTotals }
  | { ok: false; status: number };

/**
 * Lee los contadores de reacciones de un contenido.
 *
 * Un slug sin reacciones devuelve `totals: {}` con un 200.
 * Un 404 significa que el complemento está desactivado o el tenant no existe
 * — el componente debe esconderse.
 */
export async function fetchReactions(
  slug: string
): Promise<FetchReactionsResult> {
  try {
    const query = new URLSearchParams({ tenant: TENANT, slug });
    const res = await fetch(`${BASE}/reactions?${query}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, status: res.status };
    }

    const json = await res.json();
    return { ok: true, data: json.data as ReactionTotals };
  } catch {
    return { ok: false, status: 0 };
  }
}

// ── POST — sumar una reacción ───────────────────────────────────────────

/**
 * Suma una reacción. Devuelve el total ya incrementado.
 *
 * En caso de error devuelve `{ error, status }` para que el componente decida
 * si revertir (429, 500, red) o resignarse (404).
 */
export async function postReaction(
  slug: string,
  reaction: string = "like"
): Promise<
  | { ok: true; data: ReactionResult }
  | { ok: false; status: number; error: ReactionError }
> {
  try {
    const res = await fetch(`${BASE}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenant: TENANT, slug, reaction }),
    });

    const json = await res.json().catch(() => ({}));

    if (res.ok) {
      return { ok: true, data: json.data as ReactionResult };
    }

    return {
      ok: false,
      status: res.status,
      error: (json.error as ReactionError) ?? {
        code: "unknown_error",
        message: "Fallo desconocido",
      },
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: { code: "network_error", message: "Network request failed" },
    };
  }
}
