import Image from "next/image";

/**
 * Portada de una tarjeta o artículo.
 *
 * Sin imagen pinta un bloque de color en vez de dejar el hueco transparente:
 * el agujero rompía la retícula —la tarjeta parecía a medio cargar— y el color
 * mantiene la misma silueta que las tarjetas que sí tienen foto.
 *
 * Es un color plano de la paleta y no una imagen de relleno: una foto genérica
 * de archivo miente sobre el contenido, y la que había daba a un artículo sin
 * portada el mismo peso visual que a uno cuidado.
 */
export function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src?: string | null;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        aria-hidden
        className={`absolute inset-0 bg-[#1A1D21] border border-white/5 ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${className}`}
    />
  );
}
