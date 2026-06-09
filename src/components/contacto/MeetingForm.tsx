"use client";

import { Calendar, User, Mail, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const daysOfWeek = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
const dates = [
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21]
];
const times = [
  "18:30 - 18:45 hrs", "18:45 - 19:00 hrs", "19:00 - 19:15 hrs", "19:15 - 19:30 hrs",
  "19:30 - 19:45 hrs", "19:45 - 20:00 hrs"
];
const disabledTimes = ["20:00 - 20:15 hrs", "20:15 - 20:30 hrs", "20:30 - 20:45 hrs", "20:45 - 21:00 hrs"];

export function MeetingForm() {
  const [selectedDate, setSelectedDate] = useState(9);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <form className="animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-[#1A1D21] flex items-center justify-center text-color-terciario">
          <Calendar size={24} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-white">Agendemos una reunión virtual</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Nombre</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <User size={18} strokeWidth={1.5} />
            </div>
            <input 
              type="text" 
              placeholder="Tu nombre" 
              className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Correo electrónico</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <Mail size={18} strokeWidth={1.5} />
            </div>
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-white/80 mb-4">Selecciona el día para agendar</label>
        <div className="bg-[#1A1D21] border border-white/5 rounded-xl p-6">
          <div className="grid grid-cols-7 text-center mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-[10px] font-bold text-white uppercase tracking-wider">{day}</div>
            ))}
          </div>
          <div className="space-y-4">
            {dates.map((week, weekIdx) => (
              <div key={weekIdx} className="grid grid-cols-7 text-center">
                {week.map((date) => {
                  const isSelected = date === selectedDate;
                  const isPast = date < 9 && date >= 8; // Simulación de fechas pasadas o no disponibles
                  return (
                    <div key={date} className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => !isPast && setSelectedDate(date)}
                        disabled={isPast}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          isSelected 
                            ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                            : isPast 
                              ? "text-white/20 cursor-not-allowed" 
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {date}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white/80 mb-4">Horario de reunión (15 mins)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {times.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`py-3 px-4 rounded-xl text-xs font-medium text-center transition-colors border ${
                selectedTime === time 
                  ? "bg-[#1A1D21] border-color-terciario text-white" 
                  : "bg-[#1A1D21] border-transparent text-white/70 hover:bg-[#202429] hover:text-white"
              }`}
            >
              {time}
            </button>
          ))}
          {disabledTimes.map((time) => (
            <div
              key={time}
              className="py-3 px-4 rounded-xl text-xs font-medium text-center bg-[#1A1D21]/50 border border-transparent text-white/20 cursor-not-allowed"
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-white/50 mb-8">
        Reunión de contacto por Teams o Google Meet.
      </p>

      <button 
        type="submit" 
        className="w-full bg-[#1A1D21] hover:bg-[#202429] border border-white/5 text-white/90 font-medium rounded-xl py-4 flex items-center justify-center gap-3 transition-colors mb-6 group"
      >
        Enviar 
        <Send size={18} strokeWidth={1.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="bg-[#1A1D21] rounded-xl p-4 flex items-center gap-4">
        <div className="relative w-10 h-10 shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#0D0F12]">
            <Image src="/favicon.svg" alt="Rukma" fill className="object-cover p-1" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#1A1D21] rounded-full z-10"></div>
        </div>
        <p className="text-sm text-white/80 font-medium">
          <span className="text-color-terciario font-bold">Hey, somos el Equipo Rukma,</span> nos reuniremos contigo en este espacio breve para entender tu visión y explorar cómo podemos colaborar.
        </p>
      </div>
    </form>
  );
}
