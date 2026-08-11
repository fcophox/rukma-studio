/**
 * Reglas de contenido del sitio, encima del cliente de Kontorōru.
 *
 * Aquí vive qué es una entrada de blog y qué es un caso de estudio; en
 * `kontororu.ts` solo vive cómo se habla con la API.
 */

import { kontororu, type Post } from "@/lib/kontororu";
import type { Locale } from "@/dictionaries";

/**
 * Tope de una página de listado. La API acepta 100 como máximo y el sitio no
 * pagina: pedir el máximo de una vez evita encadenar cursores para un blog que
 * cabe entero en una pantalla de scroll.
 */
const MAX_POSTS = 100;

/** El blog es todo lo que no es un caso de estudio ni una ficha de servicio. */
const NOT_BLOG: ReadonlySet<string> = new Set(["CASE_STUDY", "SERVICE"]);

/**
 * Se filtra por `kind` y no por slug de categoría a propósito: las categorías
 * son por idioma —`blog` existe en inglés y `casos-de-estudio` en español—, así
 * que filtrar por slug obliga a mantener un mapa idioma→slug que se rompe en
 * cuanto se renombra una categoría en el panel.
 */
export const isCaseStudy = (post: Post) => post.category?.kind === "CASE_STUDY";

/**
 * Un post sin categoría cuenta como blog: al traducir, la categoría se pierde
 * si el idioma destino no tiene una equivalente, y esas entradas son artículos
 * igualmente. Excluirlas vaciaría el blog en español.
 */
export const isBlogPost = (post: Post) =>
  !post.category || !NOT_BLOG.has(post.category.kind);

/** Etiqueta de la tarjeta: el topic propio del artículo, si no la categoría. */
export const topicOf = (post: Post) =>
  (post.customFields?.topic as string) ?? post.category?.name ?? "";

/*
 * Un fallo del CMS devuelve lista vacía en vez de romper la página: una caída
 * de Kontorōru no debe tumbar el sitio entero. Pero se REGISTRA — sin el log,
 * una clave mal configurada en producción es indistinguible de "aún no hay
 * artículos", y eso cuesta horas de buscar en el sitio equivocado.
 */
async function listPosts(locale: Locale): Promise<Post[]> {
  try {
    const { data } = await kontororu.posts.list({ locale, limit: MAX_POSTS });
    return data;
  } catch (error) {
    console.error(`No se pudo leer el contenido de Kontorōru (locale=${locale})`, error);
    return [];
  }
}

export async function listBlogPosts(locale: Locale): Promise<Post[]> {
  return (await listPosts(locale)).filter(isBlogPost);
}

export async function listCaseStudies(
  locale: Locale,
  limit?: number
): Promise<Post[]> {
  const cases = (await listPosts(locale)).filter(isCaseStudy);
  return limit ? cases.slice(0, limit) : cases;
}
