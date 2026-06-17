"use client";

import { MessageCircle, User, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useContactForm } from "./useContactForm";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function MessageForm() {
  const { dict } = useLanguage();
  const { status, submit } = useContactForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
      subject: dict.contact.forms.message.title,
      source: "contacto-mensaje",
    });
  }

  if (status === "success") {
    return <SuccessMessage />;
  }

  return (
    <form className="animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-[#1A1D21] flex items-center justify-center text-color-terciario">
          <MessageCircle size={24} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-white">{dict.contact.forms.message.title}</h2>
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

      <div className="mb-8">
        <label className="block text-sm font-medium text-white/80 mb-2">{dict.contact.forms.messageLabel}</label>
        <div className="relative">
          <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-white/40">
            <MessageCircle size={18} strokeWidth={1.5} />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={dict.contact.forms.message.placeholder}
            rows={5}
            className="w-full bg-[#1A1D21] border border-white/5 text-white placeholder:text-white/30 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-color-terciario transition-colors resize-none"
          ></textarea>
        </div>
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
          <span className="text-color-terciario font-bold">{dict.contact.forms.teamRukma}</span> {dict.contact.forms.message.footer}
        </p>
      </div>
    </form>
  );
}

export function SubmitButton({ isValid, isSubmitting }: { isValid: boolean; isSubmitting: boolean }) {
  const { dict } = useLanguage();
  const disabled = !isValid || isSubmitting;
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full font-medium rounded-xl py-4 flex items-center justify-center gap-3 transition-all mb-6 group ${
        disabled
          ? "bg-[#1A1D21] border border-white/5 text-white/40 cursor-not-allowed"
          : "bg-color-terciario text-[#0D0F12] hover:opacity-90"
      }`}
    >
      {isSubmitting ? (
        <>
          {dict.contact.forms.sending}
          <Loader2 size={18} strokeWidth={2} className="animate-spin" />
        </>
      ) : (
        <>
          {dict.contact.forms.send}
          <Send size={18} strokeWidth={1.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </>
      )}
    </button>
  );
}

export function SuccessMessage() {
  const { dict } = useLanguage();
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 bg-[#1A1D21] border border-color-terciario/30 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-color-terciario/15 flex items-center justify-center text-color-terciario">
        <CheckCircle2 size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-medium text-white">{dict.contact.forms.successTitle}</h3>
      <p className="text-white/60 max-w-sm">{dict.contact.forms.successDesc}</p>
    </div>
  );
}

export function ErrorMessage() {
  const { dict } = useLanguage();
  return (
    <p className="text-sm text-red-400 text-center -mt-2 mb-6">
      {dict.contact.forms.errorDesc}
    </p>
  );
}
