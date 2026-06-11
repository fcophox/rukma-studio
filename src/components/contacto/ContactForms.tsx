"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageForm } from "./MessageForm";
import { ConsultingForm } from "./ConsultingForm";
import { MeetingForm } from "./MeetingForm";

import { useLanguage } from "@/context/LanguageContext";

interface ContactFormsProps {
  selectedOption: string | null;
  onClose: () => void;
}

export function ContactForms({ selectedOption, onClose }: ContactFormsProps) {
  const { dict } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      {selectedOption && (
        <motion.div
          key={selectedOption}
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="relative pt-8">
            
            {/* Ocultar botón general */}
            <button 
              onClick={onClose}
              className="absolute top-0 right-0 px-4 py-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              {dict.contact.forms.hide}
            </button>

            <div className="max-w-3xl mx-auto mt-4">
              {selectedOption === "mensaje" && <MessageForm />}
              {selectedOption === "consultoria" && <ConsultingForm />}
              {selectedOption === "reunion" && <MeetingForm />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
