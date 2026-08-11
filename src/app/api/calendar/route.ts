import { NextResponse } from "next/server";
import { kontororu } from "@/lib/kontororu";

export const dynamic = "force-dynamic";

/**
 * GET /api/calendar
 *
 * Disponibilidad del formulario de reunión. Igual que `/api/contact`, existe
 * porque la API Key de Kontorōru solo puede vivir en el servidor.
 *
 * Si el complemento Calendario está apagado devuelve la semana cerrada en vez
 * de un error: el formulario ya sabe mostrar "sin horarios disponibles" y una
 * excepción ahí solo dejaría la agenda cargando para siempre.
 */
export async function GET() {
  try {
    const { data } = await kontororu.calendar.availability();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/calendar", error);
    return NextResponse.json(
      { timezone: "UTC", startTime: "00:00", endTime: "00:00", slotMinutes: 30, slots: [], week: [] },
      { status: 200 }
    );
  }
}
