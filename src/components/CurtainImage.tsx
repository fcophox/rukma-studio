"use client";

import { useState } from "react";
import Image from "next/image";
import { COVER_BLUR_DATA_URL } from "@/lib/image-placeholder";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

/**
 * Portada con efecto cortina: dos bloques sólidos cubren la imagen y se abren
 * a los lados en `onLoad`. La transición dura lo mismo cargue rápido o lento,
 * así que disimula el delay real (cache fría del optimizador, CMS) detrás de
 * un reveal consistente en vez de un pop-in brusco.
 */
export function CurtainImage({ src, alt, sizes, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#1A1D21] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        preload
        placeholder="blur"
        blurDataURL={COVER_BLUR_DATA_URL}
        onLoad={() => setLoaded(true)}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[#1A1D21] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          loaded ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[#1A1D21] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          loaded ? "translate-x-full" : "translate-x-0"
        }`}
      />
    </div>
  );
}
