import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

/**
 * Webhook de Kontorōru para mantener el caché al día.
 * Configura en Kontorōru → Ajustes → Webhooks este endpoint:
 * https://www.rukma.studio/api/revalidate/kontororu
 *
 * Con el `www` — es obligatorio. El ápex `rukma.studio` no llega hasta aquí:
 * responde 307 hacia `www` y la petición se pierde en el salto.
 */

export async function POST(req: Request) {
  const body = await req.text();
  const ts = req.headers.get("x-kontororu-timestamp");
  const sig = req.headers.get("x-kontororu-signature");

  /**
   * Todo rechazo deja rastro en los logs.
   *
   * El CMS registra cada entrega con 2 intentos —el primero falla y el segundo
   * funciona— y desde fuera no hay forma de saber cuál de estas puertas cierra
   * el primero: devolver texto plano sin registrar nada deja el intento fallido
   * invisible en Vercel. `evento` viene de la cabecera y no del cuerpo, porque
   * el cuerpo aún no está verificado.
   */
  const rechazar = (motivo: string, status: number, detalle?: unknown) => {
    console.warn(
      `[kontororu-webhook] rechazado: ${motivo}`,
      JSON.stringify({
        evento: req.headers.get("x-kontororu-event"),
        agente: req.headers.get("user-agent"),
        bytes: body.length,
        ...(detalle ? { detalle } : {}),
      })
    );
    return new Response(motivo, { status });
  };

  if (!ts || !sig) {
    return rechazar("Missing headers", 401, {
      timestamp: ts ? "presente" : "ausente",
      firma: sig ? "presente" : "ausente",
    });
  }

  // Verificar que el timestamp no sea muy antiguo (máximo 5 minutos)
  const desfase = Date.now() / 1000 - Number(ts);
  if (Math.abs(desfase) > 300) {
    return rechazar("Timestamp too old", 401, {
      desfaseSegundos: Math.round(desfase),
    });
  }

  const secret = process.env.KONTORORU_WEBHOOK_SECRET;
  if (!secret) {
    console.error("KONTORORU_WEBHOOK_SECRET no está configurado");
    return new Response("Configuration error", { status: 500 });
  }

  // Verificar la firma HMAC
  const expected = `sha256=${createHmac("sha256", secret)
    .update(`${ts}.${body}`)
    .digest("hex")}`;

  if (
    sig.length !== expected.length ||
    !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    // Sin volcar firmas: distinguir «longitud distinta» de «no cuadra» ya separa
    // un secreto mal configurado de un cuerpo alterado en tránsito.
    return rechazar("Bad signature", 401, {
      causa: sig.length !== expected.length ? "longitud distinta" : "no cuadra",
    });
  }

  try {
    const { event, data } = JSON.parse(body);

    // Se anota lo invalidado para devolverlo y registrarlo: un 200 vacío no
    // distingue «invalidé la etiqueta del calendario» de «recibí un evento que
    // no supe interpretar y contesté que sí» — que es exactamente cómo pasó
    // desapercibido lo de `addon.updated`.
    const invalidadas: string[] = [];
    const invalidar = (tag: string) => {
      revalidateTag(tag, { expire: 0 });
      invalidadas.push(tag);
    };

    // Revalidar según el tipo de evento
    //
    // Todos los eventos de contenido invalidan lo mismo: la ficha y el
    // listado. Un post despublicado o borrado tiene que desaparecer de la
    // lista igual que uno nuevo tiene que aparecer, así que separarlos por
    // ramas sólo deja hueco a olvidarse de uno — que es lo que pasaba con
    // `post.created` y `post.unpublished`, ausentes hasta ahora: al
    // despublicar, el artículo seguía visible en el listado durante las 24 h
    // que dura el caché de respaldo.
    if (event.startsWith("post.")) {
      invalidar(`post:${data.slug}`);
      invalidar("posts");

      // Si cambió el slug anterior, también revalidar ese
      if (data.previousSlug) {
        invalidar(`post:${data.previousSlug}`);
      }
    } else if (event === "category.updated") {
      // Categoría actualizada
      invalidar("categories");
      invalidar("posts");
    } else if (event.startsWith("addon.")) {
      // Complemento actualizado (Calendario, etc.). El aviso NO trae los datos
      // nuevos, sólo dice qué complemento cambió: la disponibilidad se relee
      // siempre de la API, así que basta con invalidar su etiqueta.
      //
      // La etiqueta es el propio nombre del complemento porque así se etiqueta
      // el fetch en `lib/kontororu.ts` (`/addons/calendar/availability` → tag
      // "calendar"). Invalidar una etiqueta que nadie usa no hace nada, así que
      // cubrimos `addon.*` entero en vez de enumerar eventos: es justo la
      // omisión que ya nos costó el caso de `post.created`/`post.unpublished`.
      if (typeof data?.addon === "string" && data.addon) {
        invalidar(data.addon);
      }
    }

    console.log(
      `[kontororu-webhook] ${event}`,
      JSON.stringify({ invalidadas })
    );

    return new Response(
      JSON.stringify({
        revalidated: invalidadas,
        timestamp: new Date().toISOString(),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return new Response("Processing error", { status: 500 });
  }
}
