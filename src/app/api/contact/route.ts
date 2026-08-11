import { NextResponse } from "next/server";
import { kontororu } from "@/lib/kontororu";
import { isContactFormKey } from "@/lib/contact-forms";

export const dynamic = "force-dynamic";

const MAX_MESSAGE = 20_000;
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * POST /api/contact
 *
 * Puente entre los formularios y el complemento Contactos de Kontorōru. Existe
 * porque el envío exige una API Key con permiso `forms:write` y esa clave solo
 * puede vivir en el servidor.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "El cuerpo debe ser JSON." }, { status: 400 });
  }

  const { formKey, name, email, message, payload } = (body ?? {}) as {
    formKey?: string;
    name?: string;
    email?: string;
    message?: string;
    payload?: Record<string, unknown>;
  };

  if (!isContactFormKey(formKey)) {
    return NextResponse.json({ error: "Formulario no reconocido." }, { status: 400 });
  }

  const cleanName = typeof name === "string" ? name.trim().slice(0, 200) : "";
  const cleanEmail = typeof email === "string" ? email.trim().slice(0, 320) : "";
  const cleanMessage = typeof message === "string" ? message.trim().slice(0, MAX_MESSAGE) : "";

  if (!cleanName || !isValidEmail(cleanEmail) || !cleanMessage) {
    return NextResponse.json(
      { error: "Faltan el nombre, el correo o el mensaje." },
      { status: 400 }
    );
  }

  try {
    await kontororu.forms.submit(formKey, {
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      // La página desde la que se envió, para poder distinguir el formulario
      // de /contact del que se abra desde una landing.
      sourceUrl: request.headers.get("referer") ?? undefined,
      payload: payload && typeof payload === "object" ? payload : {},
    });
  } catch (error) {
    console.error("POST /api/contact", error);
    return NextResponse.json({ error: "No se pudo registrar el envío." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
