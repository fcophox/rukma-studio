/**
 * Categorías de la bandeja de Contactos, una por formulario de la web.
 * La clave se convierte en la pestaña que agrupa los envíos en Kontorōru.
 *
 * Es una lista cerrada y no un `formKey` libre del cliente: la API da de alta
 * la categoría en el primer envío, así que un valor arbitrario desde el
 * navegador crearía pestañas basura en la bandeja.
 *
 * Módulo PURO: lo comparten los formularios (cliente) y el route handler.
 */
export const CONTACT_FORM_KEYS = ["mensaje", "reunion", "consultoria"] as const;

export type ContactFormKey = (typeof CONTACT_FORM_KEYS)[number];

export function isContactFormKey(value: unknown): value is ContactFormKey {
  return (
    typeof value === "string" &&
    (CONTACT_FORM_KEYS as readonly string[]).includes(value)
  );
}
