"use client";

import { Users, User, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useContactForm } from "./useContactForm";
import { SubmitButton, SuccessMessage, ErrorMessage } from "./MessageForm";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const BUDGET_MIN = 500;
const BUDGET_MAX = 20000;
const BUDGET_STEP = 500;
const formatUSD = (v: number) => `$${v.toLocaleString("en-US")}`;

export function ConsultingForm() {
  const { dict } = useLanguage();
  const { status, submit } = useContactForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");
  const [hasBudget, setHasBudget] = useState(false);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([500, 1500]);

  const isValid =
    name.trim() !== "" && isValidEmail(email) && message.trim() !== "";
  const isSubmitting = status === "submitting";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    await submit({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      subject: dict.contact.forms.consulting.title,
      source: "contacto-consultoria",
      metadata: {
        estimatedTime: time.trim() || null,
        url: url.trim() || null,
        hasBudget,
        budgetRange: hasBudget
          ? { min: budgetRange[0], max: budgetRange[1], currency: "USD" }
          : null,
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

      <div className="mb-6">
        <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.messageLabel}</label>
        <div className="relative">
          <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-white/40">
            <MessageCircle size={18} strokeWidth={1.5} />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder={dict.contact.forms.consulting.timePlaceholder}
            className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl px-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.consulting.urlLabel} <span className="text-white/30">{dict.contact.forms.consulting.urlOptional}</span></label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={dict.contact.forms.consulting.urlPlaceholder}
            className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl px-4 py-4 focus:outline-none focus:border-color-terciario transition-colors"
          />
        </div>
      </div>

      {/* Switch Presupuesto */}
      <div className="bg-[#1A1D21] border border-white/5 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium mb-1">{dict.contact.forms.consulting.budgetTitle}</h4>
            <p className="text-sm text-white/50">{dict.contact.forms.consulting.budgetDesc}</p>
          </div>
          <button
            type="button"
            onClick={() => setHasBudget(!hasBudget)}
            className={`shrink-0 w-12 h-6 rounded-full relative transition-colors duration-300 flex items-center ${hasBudget ? 'bg-color-terciario' : 'bg-white/10'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-300 ${hasBudget ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
          </button>
        </div>

        {hasBudget && (
          <div className="mt-8 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">{dict.contact.forms.consulting.budgetRangeLabel}</span>
              <span className="text-color-terciario font-semibold">
                {formatUSD(budgetRange[0])} - {formatUSD(budgetRange[1])} USD
              </span>
            </div>
            <p className="text-xs text-white/50 mb-6">{dict.contact.forms.consulting.budgetRangeHint}</p>
            <BudgetRangeSlider value={budgetRange} onChange={setBudgetRange} />
          </div>
        )}
      </div>

      <SubmitButton isValid={isValid} isSubmitting={isSubmitting} />

      {status === "error" && <ErrorMessage />}

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

function BudgetRangeSlider({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const [lo, hi] = value;
  const pct = (v: number) => ((v - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  return (
    <div className="relative h-5 w-full">
      {/* Track */}
      <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-full rounded-full bg-white/10" />
      {/* Filled range */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-color-terciario"
        style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
      />
      {/* Lower thumb */}
      <input
        type="range"
        min={BUDGET_MIN}
        max={BUDGET_MAX}
        step={BUDGET_STEP}
        value={lo}
        onChange={(e) => onChange([Math.min(Number(e.target.value), hi - BUDGET_STEP), hi])}
        className="range-dual"
        aria-label="Mínimo de inversión"
      />
      {/* Upper thumb */}
      <input
        type="range"
        min={BUDGET_MIN}
        max={BUDGET_MAX}
        step={BUDGET_STEP}
        value={hi}
        onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + BUDGET_STEP)])}
        className="range-dual"
        aria-label="Máximo de inversión"
      />
    </div>
  );
}
