import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { SuccessCases } from "@/components/SuccessCases";
import { BannerDivider } from "@/components/BannerDivider";
import { BlogSection } from "@/components/BlogSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "Rukma Studio — Estrategia, Diseño y Tecnología Digital",
  },
  description:
    "Desde la idea hasta el delivery, ayudamos a empresas a transformar visión en productos reales, escalables y centrados en las personas. UX, Product Design, MVP e identidad de marca.",
  alternates: {
    canonical: "https://rukma.studio",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-fondo-oscuro relative">
      <Navbar />
      <Hero />
      <Services />
      <SuccessCases />
      <BannerDivider />
      <BlogSection />
      <FAQ />
      <Footer />
    </main>
  );
}
