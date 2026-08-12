"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import { fetchReactions, postReaction } from "@/lib/reactions";

// ── localStorage helpers ────────────────────────────────────────────────

const GESTURE = "like";

/** Clave por contenido — sin idioma para evitar doble reacción. */
function storageKey(slug: string): string {
  return `reaction:${slug}:${GESTURE}`;
}

function hasReacted(slug: string): boolean {
  try {
    return localStorage.getItem(storageKey(slug)) === "1";
  } catch {
    return false;
  }
}

function markReacted(slug: string): void {
  try {
    localStorage.setItem(storageKey(slug), "1");
  } catch {
    /* localStorage lleno o deshabilitado — best effort */
  }
  notify();
}

function unmarkReacted(slug: string): void {
  try {
    localStorage.removeItem(storageKey(slug));
  } catch {
    /* best effort */
  }
  notify();
}

/**
 * `localStorage` es estado externo a React: se lee con `useSyncExternalStore`
 * en vez de con un efecto para no provocar un render en cascada al montar, y
 * para que el snapshot del servidor (`false`) no rompa la hidratación.
 *
 * `storage` solo avisa de cambios de *otras* pestañas, así que las escrituras
 * propias emiten su propio evento.
 */
const CHANGED = "reaction:changed";

function notify(): void {
  window.dispatchEvent(new Event(CHANGED));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGED, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGED, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// ── Thumbs-up icon ──────────────────────────────────────────────────────

function ThumbsUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 22V11L2 13V22H7Z" />
      <path d="M7 11L11 2C11.93 2 12.82 2.37 13.48 3.02C14.14 3.68 14.5 4.57 14.5 5.5V8H19.74C20.09 7.99 20.44 8.06 20.76 8.2C21.08 8.33 21.37 8.53 21.6 8.78C21.83 9.03 22.01 9.33 22.11 9.65C22.22 9.98 22.25 10.32 22.2 10.66L21.08 18.66C21.01 19.22 20.73 19.73 20.31 20.1C19.88 20.47 19.34 20.67 18.78 20.67H7" />
    </svg>
  );
}

// ── Check icon (for pressed state) ──────────────────────────────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17L4 12" />
    </svg>
  );
}

// ── Props ───────────────────────────────────────────────────────────────

interface ReactionButtonProps {
  /** Slug del contenido en el CMS */
  slug: string;
  /** Contadores iniciales (del servidor, para evitar el parpadeo) */
  initialTotals?: Record<string, number>;
  /** "es" | "en" — para los textos */
  locale?: string;
}

// ── Textos por idioma ───────────────────────────────────────────────────

const COPY = {
  es: {
    heading: "¿Te resultó interesante este contenido?",
    subtitle:
      "Si este artículo te aportó valor, házmelo saber con un me gusta. Me ayuda a crear mejor contenido.",
    cta: "Sí, me pareció útil",
    ctaPressed: "¡Gracias por tu feedback!",
  },
  en: {
    heading: "Did you find this content interesting?",
    subtitle:
      "If this article added value, let me know with a like. It helps me create better content.",
    cta: "Yes, I found it useful",
    ctaPressed: "Thanks for your feedback!",
  },
} as const;

// ── Componente ──────────────────────────────────────────────────────────

export function ReactionButton({
  slug,
  initialTotals,
  locale = "es",
}: ReactionButtonProps) {
  const copy = locale === "en" ? COPY.en : COPY.es;

  // El componente arranca oculto para evitar desajuste de hidratación
  // (el estado "ya reaccionó" solo se conoce en el cliente). Se muestra
  // cuando el GET confirma que el addon está activo (200).
  const [visible, setVisible] = useState(!!initialTotals);

  // Contador del gesto "like"
  const [count, setCount] = useState<number>(initialTotals?.like ?? 0);

  // Estado "ya reaccionó" — vive en localStorage, solo existe en el cliente
  const pressed = useSyncExternalStore(
    subscribe,
    () => hasReacted(slug),
    () => false
  );

  // Petición en vuelo
  const [inflight, setInflight] = useState(false);

  // Ref para detectar desmontaje
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // ── Después de montar: leer localStorage y fetch
  useEffect(() => {
    fetchReactions(slug).then((result) => {
      if (!mountedRef.current) return;

      if (result.ok) {
        setCount(result.data.totals[GESTURE] ?? 0);
        setVisible(true);
      } else if (result.status === 404) {
        // Addon desactivado o tenant inexistente — esconder silenciosamente
        setVisible(false);
      }
      // Otros errores (red, 500): dejar el estado actual, no esconder
      // por un fallo transitorio. Si tenía initialTotals se ve; si no, no.
    });
  }, [slug]);

  // ── Handler de clic ───────────────────────────────────────────────────
  const handleReact = useCallback(async () => {
    if (pressed || inflight) return;

    // Optimista: pinta ya
    const prevCount = count;
    setCount((c) => c + 1);
    markReacted(slug);
    setInflight(true);

    const result = await postReaction(slug, GESTURE);

    if (!mountedRef.current) return;

    setInflight(false);

    if (result.ok) {
      setCount(result.data.total);
    } else if (result.status === 404) {
      // 404 — dejar como "ya reaccionado", no reintentar
    } else {
      // 429, 500, red — revertir
      setCount(prevCount);
      unmarkReacted(slug);
    }
  }, [slug, count, pressed, inflight]);

  // ── Aria ──────────────────────────────────────────────────────────────
  const countLabel =
    count > 0
      ? locale === "en"
        ? `${count} reaction${count !== 1 ? "s" : ""}`
        : `${count} reacci${count !== 1 ? "ones" : "ón"}`
      : "";
  const ariaLabel = pressed
    ? `${copy.ctaPressed} ${countLabel}`.trim()
    : `${copy.cta}. ${countLabel}`.trim();

  // ── Render ────────────────────────────────────────────────────────────

  if (!visible) return null;

  return (
    <section className="reaction-section" aria-label={locale === "en" ? "Reactions" : "Reacciones"}>
      <h2 className="reaction-heading">{copy.heading}</h2>
      <p className="reaction-subtitle">{copy.subtitle}</p>

      <button
        type="button"
        className={`reaction-btn${pressed ? " reaction-btn--pressed" : ""}`}
        aria-label={ariaLabel}
        aria-pressed={pressed}
        disabled={inflight || pressed}
        onClick={handleReact}
      >
        {pressed ? (
          <CheckIcon className="reaction-icon" />
        ) : (
          <ThumbsUpIcon className="reaction-icon" />
        )}
        <span>{pressed ? copy.ctaPressed : copy.cta}</span>
      </button>

      {count > 0 && (
        <p className="reaction-count" aria-live="polite">
          {locale === "en"
            ? `${count} ${count === 1 ? "person" : "people"} found this useful`
            : `A ${count} ${count === 1 ? "persona le" : "personas les"} pareció útil`}
        </p>
      )}
    </section>
  );
}
