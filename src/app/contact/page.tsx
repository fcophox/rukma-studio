import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactPageClient } from "@/components/contacto/ContactPageClient";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hablemos sobre tu proyecto digital. Agenda una reunión, envía un mensaje o solicita una consultoría UX con Rukma Studio.",
  openGraph: {
    title: "Contacto | Rukma Studio",
    description:
      "Hablemos sobre tu proyecto digital. Agenda una reunión o solicita una consultoría UX.",
    url: "https://rukma.studio/contact",
  },
  alternates: {
    canonical: "https://rukma.studio/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white overflow-hidden">
      <img
        src="/bg/background-contact.svg"
        alt="Background Contact"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0F12]/50 to-[#0D0F12] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <ContactPageClient />
        <Footer />
      </div>
    </main>
  );
}
