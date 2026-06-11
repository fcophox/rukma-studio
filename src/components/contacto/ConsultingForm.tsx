"use client";

import { Users, User, Mail, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function ConsultingForm() {
  const [hasBudget, setHasBudget] = useState(false);
  const { dict } = useLanguage();

  return (
    <form className="animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-[#1A1D21] flex items-center justify-center text-color-terciario">
          <Users size={24} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-white">{dict.contact.forms.consulting.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.nameLabel}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <User size={18} strokeWidth={1.5} />
            </div>
            <input
              type="text"
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
              placeholder={dict.contact.forms.emailPlaceholder}
              className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.messageLabel}</label>
        <div className="relative">
          <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-white/40">
            <MessageCircle size={18} strokeWidth={1.5} />
          </div>
          <textarea
            placeholder={dict.contact.forms.consulting.placeholder}
            rows={4}
            className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-color-terciario transition-colors resize-none"
          ></textarea>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.consulting.timeLabel}</label>
          <input
            type="text"
            placeholder={dict.contact.forms.consulting.timePlaceholder}
            className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl px-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.consulting.urlLabel} <span className="text-white/30">{dict.contact.forms.consulting.urlOptional}</span></label>
          <input
            type="text"
            placeholder={dict.contact.forms.consulting.urlPlaceholder}
            className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl px-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
          />
        </div>
      </div>

      {/* Switch Presupuesto */}
      <div className="bg-[#1A1D21] border border-white/5 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium mb-1">{dict.contact.forms.consulting.budgetTitle}</h4>
          <p className="text-sm text-white/50">{dict.contact.forms.consulting.budgetDesc}</p>
        </div>
        <button
          type="button"
          onClick={() => setHasBudget(!hasBudget)}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 flex items-center ${hasBudget ? 'bg-color-terciario' : 'bg-white/10'}`}
        >
          <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-300 ${hasBudget ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#1A1D21] hover:bg-[#202429] border border-white/5 text-white/90 font-medium rounded-xl py-4 flex items-center justify-center gap-3 transition-colors mb-6 group"
      >
        {dict.contact.forms.send}
        <Send size={18} strokeWidth={1.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="bg-[#1A1D21] rounded-xl p-4 flex items-center gap-4">
        <div className="relative w-10 h-10 shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#0D0F12]">
            <Image src="/icon.svg" alt="Rukma" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#1A1D21] rounded-full z-10"></div>
        </div>
        <p className="text-sm text-white/80 font-medium">
          <span className="text-color-terciario font-bold">{dict.contact.forms.teamRukma}</span> {dict.contact.forms.consulting.footer}
        </p>
      </div>
    </form>
  );
}
