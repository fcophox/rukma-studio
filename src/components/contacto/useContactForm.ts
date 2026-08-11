"use client";

import { useState } from "react";
import type { ContactFormKey } from "@/lib/contact-forms";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export interface ContactInput {
  /** Categoría con la que la bandeja de Contactos agrupa el envío. */
  formKey: ContactFormKey;
  name: string;
  email: string;
  message: string;
  /** Campos propios del formulario; se ven en el detalle del contacto. */
  payload?: Record<string, unknown>;
}

/**
 * Hook compartido por los formularios de contacto. Envía a `/api/contact`, que
 * a su vez registra el envío en el complemento Contactos de Kontorōru — la API
 * Key no puede salir del servidor.
 */
export function useContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(input: ContactInput): Promise<boolean> {
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No se pudo enviar el formulario.");
      }
      setStatus("success");
      return true;
    } catch (e) {
      setError((e as Error).message);
      setStatus("error");
      return false;
    }
  }

  return { status, error, submit };
}
