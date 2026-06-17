"use client";

import { useState } from "react";
import { cms, type ContactInput } from "@/lib/cms";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Hook compartido por los formularios de contacto. Envía a Supabase vía
 * `cms.contacts.submit` y expone el estado de la petición.
 */
export function useContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(input: ContactInput): Promise<boolean> {
    setStatus("submitting");
    setError(null);
    try {
      await cms.contacts.submit(input);
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
