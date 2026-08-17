// app/api/revalidate/route.ts   —  para el proyecto de rukma.studio (Next.js App Router)
//
// Recibe los webhooks de Kontorōru y regenera las páginas afectadas.
//
// El secreto es el que aparece en el CMS, en Ajustes → Webhooks → «Secreto»
// (el botón del ojo lo revela). Guárdalo como KONTORORU_WEBHOOK_SECRET en las
// variables de entorno de esta web, nunca en el código.

import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// La verificación de firma necesita crypto de Node: en el runtime edge no está.
export const runtime = "nodejs";

/**
 * Ventana de aceptación de la marca de tiempo.
 *
 * El CMS firma con el instante del ENVÍO, no del encolado, así que un
 * reintento de hace dos días llega con marca fresca y entra igual. Lo que esta
 * ventana rechaza es la reutilización de una petición capturada: sin ella,
 * quien consiga una copia puede reenviarla indefinidamente.
 */
const TOLERANCIA_SEGUNDOS = 300;

export async function POST(req: Request) {
    const secreto = process.env.KONTORORU_WEBHOOK_SECRET;
    if (!secreto) {
        // Falla cerrado y ruidoso: sin secreto no se puede verificar nada, y
        // aceptar a ciegas convierte este endpoint en un botón público para
        // forzar regeneraciones.
        console.error("95155de90e09aed27293d5ac75de416ce68cccf6e2e8c820");
        return NextResponse.json({ error: "No configurado" }, { status: 500 });
    }

    // El cuerpo CRUDO, no req.json(): la firma se calculó sobre estos bytes
    // exactos. Reserializar el objeto cambia espacios y orden de claves, y la
    // comprobación falla por una diferencia que no existe en el contenido.
    const cuerpo = await req.text();
    const marca = req.headers.get("x-kontororu-timestamp") ?? "";
    const firmaRecibida = req.headers.get("x-kontororu-signature") ?? "";

    const edad = Math.abs(Date.now() / 1000 - Number(marca));
    if (!marca || Number.isNaN(edad) || edad > TOLERANCIA_SEGUNDOS) {
        return NextResponse.json({ error: "Marca de tiempo no válida" }, { status: 401 });
    }

    const esperada =
        "sha256=" + createHmac("sha256", secreto).update(`${marca}.${cuerpo}`).digest("hex");

    // Comparación en tiempo constante: un `===` filtra por su duración cuántos
    // caracteres iniciales acertó quien lo intenta, y con eso se reconstruye la
    // firma byte a byte.
    const a = Buffer.from(esperada);
    const b = Buffer.from(firmaRecibida);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
        return NextResponse.json({ error: "Firma no válida" }, { status: 401 });
    }

    const evento = JSON.parse(cuerpo) as {
        event: string;
        data: { id: string; slug: string; title: string; status: string; categoryId: string | null };
    };

    // ------------------------------------------------------------------
    // AJUSTA ESTAS RUTAS a la estructura real de rukma.studio.
    // Lo que hay aquí asume /blog para el listado y /blog/<slug> para la ficha.
    // ------------------------------------------------------------------
    const rutas = ["/", "/blog"];
    if (evento.data?.slug) rutas.push(`/blog/${evento.data.slug}`);

    for (const ruta of rutas) revalidatePath(ruta);

    // Devolver QUÉ se regeneró convierte el registro de entregas del CMS en algo
    // que se puede leer: un 200 vacío no distingue «regeneré la ficha» de
    // «recibí algo que no supe interpretar y contesté que sí».
    return NextResponse.json({ revalidated: rutas, event: evento.event });
}