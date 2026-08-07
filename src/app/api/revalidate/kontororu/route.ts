import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

/**
 * Webhook de Kontorōru para mantener el caché al día.
 * Configura en Kontorōru → Ajustes → Webhooks este endpoint:
 * https://rukma.studio/api/revalidate/kontororu
 */

export async function POST(req: Request) {
  const body = await req.text();
  const ts = req.headers.get("x-kontororu-timestamp");
  const sig = req.headers.get("x-kontororu-signature");

  if (!ts || !sig) {
    return new Response("Missing headers", { status: 401 });
  }

  // Verificar que el timestamp no sea muy antiguo (máximo 5 minutos)
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) {
    return new Response("Timestamp too old", { status: 401 });
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
    return new Response("Bad signature", { status: 401 });
  }

  try {
    const { event, data } = JSON.parse(body);

    // Revalidar según el tipo de evento
    if (event === "post.published" || event === "post.updated") {
      // Revalidar el post específico y la lista
      revalidateTag(`post:${data.slug}`);
      revalidateTag("posts");

      // Si cambió el slug anterior, también revalidar ese
      if (data.previousSlug) {
        revalidateTag(`post:${data.previousSlug}`);
      }
    } else if (event === "post.deleted") {
      // Post eliminado
      revalidateTag(`post:${data.slug}`);
      revalidateTag("posts");
    } else if (event === "category.updated") {
      // Categoría actualizada
      revalidateTag("categories");
      revalidateTag("posts");
    }

    return new Response(
      JSON.stringify({
        revalidated: true,
        timestamp: new Date().toISOString(),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return new Response("Processing error", { status: 500 });
  }
}
