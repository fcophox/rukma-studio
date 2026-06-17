"use client";

import { Calendar, User, Mail, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useContactForm } from "./useContactForm";
import { SubmitButton, SuccessMessage, ErrorMessage } from "./MessageForm";
import {
  cms,
  generateSlots,
  weekdayIndex,
  type DayAvailability,
} from "@/lib/cms";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const WEEKS_TO_SHOW = 2;
const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

interface DayCell {
  iso: string;
  dayNumber: number;
  disabled: boolean;
}

export function MeetingForm() {
  const { dict, lang } = useLanguage();
  const { status, submit } = useContactForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [availability, setAvailability] = useState<DayAvailability[] | null>(null);
  const [loadingCal, setLoadingCal] = useState(true);

  // Cargar disponibilidad del CMS
  useEffect(() => {
    let active = true;
    setLoadingCal(true);
    cms.calendar
      .getWeek()
      .then((week) => {
        if (active) setAvailability(week);
      })
      .catch(() => {
        if (active) setAvailability([]);
      })
      .finally(() => {
        if (active) setLoadingCal(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const byWeekday = useMemo(() => {
    const map = new Map<number, DayAvailability>();
    (availability ?? []).forEach((d) => map.set(d.weekday, d));
    return map;
  }, [availability]);

  // Construye la grilla de fechas reales (Lunes-primero), bloqueando días pasados
  // o con el día de la semana marcado como no disponible.
  const weeks = useMemo<DayCell[][]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monday = new Date(today);
    monday.setDate(today.getDate() - weekdayIndex(today));

    const grid: DayCell[][] = [];
    for (let w = 0; w < WEEKS_TO_SHOW; w++) {
      const row: DayCell[] = [];
      for (let wd = 0; wd < 7; wd++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + w * 7 + wd);
        const isPast = date < today;
        const dayCfg = byWeekday.get(wd);
        const blocked = dayCfg?.full_day_blocked ?? true;
        row.push({
          iso: toISO(date),
          dayNumber: date.getDate(),
          disabled: isPast || blocked,
        });
      }
      grid.push(row);
    }
    return grid;
  }, [byWeekday]);

  // Selecciona automáticamente la primera fecha disponible
  useEffect(() => {
    if (selectedDate || loadingCal) return;
    const first = weeks.flat().find((c) => !c.disabled);
    if (first) setSelectedDate(first.iso);
  }, [weeks, loadingCal, selectedDate]);

  // Slots para la fecha seleccionada: todos los del rango, marcando bloqueados.
  const slots = useMemo(() => {
    if (!selectedDate) return [];
    const dayCfg = byWeekday.get(weekdayIndex(selectedDate));
    if (dayCfg?.full_day_blocked) return [];
    const blocked = new Set(dayCfg?.blocked_slots ?? []);
    return generateSlots().map((s) => ({ ...s, disabled: blocked.has(s.id) }));
  }, [selectedDate, byWeekday]);

  // Reinicia el horario si deja de estar disponible al cambiar de día
  useEffect(() => {
    if (selectedTime && !slots.some((s) => s.id === selectedTime && !s.disabled)) {
      setSelectedTime(null);
    }
  }, [slots, selectedTime]);

  const monthLabel = useMemo(() => {
    if (!weeks.length) return "";
    const [y, m, d] = weeks[0][0].iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(lang === "en" ? "en-US" : "es-ES", {
      month: "long",
      year: "numeric",
    });
  }, [weeks, lang]);

  const isValid =
    name.trim() !== "" && isValidEmail(email) && selectedDate !== null && selectedTime !== null;
  const isSubmitting = status === "submitting";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    await submit({
      name: name.trim(),
      email: email.trim(),
      message: `Solicitud de reunión: ${selectedDate}, ${selectedTime} hrs`,
      subject: dict.contact.forms.meeting.title,
      source: "contacto-reunion",
      metadata: {
        date: selectedDate,
        time: selectedTime,
      },
    });
  }

  if (status === "success") {
    return <SuccessMessage />;
  }

  return (
    <form className="animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-[#1A1D21] flex items-center justify-center text-color-terciario">
          <Calendar size={24} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-white">{dict.contact.forms.meeting.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.nameLabel}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <User size={18} strokeWidth={1.5} />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={dict.contact.forms.namePlaceholder}
              className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.emailLabel}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <Mail size={18} strokeWidth={1.5} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.contact.forms.emailPlaceholder}
              className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-white/80">{dict.contact.forms.meeting.dayLabel}</label>
          {monthLabel && (
            <span className="text-xs font-medium text-white/40 capitalize">{monthLabel}</span>
          )}
        </div>
        <div className="bg-[#1A1D21] border border-white/5 rounded-xl p-6">
          {loadingCal ? (
            <div className="flex items-center justify-center py-10 text-white/40 gap-3">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm">{dict.contact.forms.sending}</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 text-center mb-4">
                {dict.contact.forms.meeting.days.map((day: string) => (
                  <div key={day} className="text-[10px] font-bold text-white uppercase tracking-wider">{day}</div>
                ))}
              </div>
              <div className="space-y-4">
                {weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="grid grid-cols-7 text-center">
                    {week.map((cell) => {
                      const isSelected = cell.iso === selectedDate;
                      return (
                        <div key={cell.iso} className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => !cell.disabled && setSelectedDate(cell.iso)}
                            disabled={cell.disabled}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                              isSelected
                                ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                : cell.disabled
                                  ? "text-white/20 cursor-not-allowed"
                                  : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {cell.dayNumber}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white/80 mb-4">{dict.contact.forms.meeting.timeLabel}</label>
        {slots.length === 0 ? (
          <p className="text-sm text-white/40 py-4">{dict.contact.forms.meeting.noSlots}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slots.map((slot) =>
              slot.disabled ? (
                <div
                  key={slot.id}
                  className="py-3 px-4 rounded-xl text-xs font-medium text-center bg-[#1A1D21]/50 border border-transparent text-white/20 cursor-not-allowed"
                >
                  {slot.label}
                </div>
              ) : (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedTime(slot.id)}
                  className={`py-3 px-4 rounded-xl text-xs font-medium text-center transition-colors border ${
                    selectedTime === slot.id
                      ? "bg-[#1A1D21] border-color-terciario text-white"
                      : "bg-[#1A1D21] border-transparent text-white/70 hover:bg-[#202429] hover:text-white"
                  }`}
                >
                  {slot.label}
                </button>
              )
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-white/50 mb-8 mt-4">
        {dict.contact.forms.meeting.meetNote}
      </p>

      <SubmitButton isValid={isValid} isSubmitting={isSubmitting} />

      {status === "error" && <ErrorMessage />}

      <div className="bg-[#1A1D21] rounded-xl p-4 flex items-center gap-4">
        <div className="relative w-10 h-10 shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#0D0F12]">
            <Image src="/icon.svg" alt="Rukma" fill className="object-cover p-1" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#1A1D21] rounded-full z-10"></div>
        </div>
        <p className="text-sm text-white/80 font-medium">
          <span className="text-color-terciario font-bold">{dict.contact.forms.teamRukma}</span> {dict.contact.forms.meeting.footer}
        </p>
      </div>
    </form>
  );
}
