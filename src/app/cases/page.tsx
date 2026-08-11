import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CasesClient } from "@/components/CasesClient";
import { CasesHeader } from "@/components/CasesHeader";
import { PageBackground } from "@/components/PageBackground";
import { listCaseStudies, topicOf } from "@/lib/content";
import { getLocale } from "@/lib/server-locale";

export const metadata = {
  title: "Casos de Éxito",
  description:
    "Resultados reales para productos digitales, equipos que innovan y negocios que buscan crecer. Conoce cómo hemos ayudado a empresas a resolver problemas complejos con estrategia, diseño y tecnología.",
  openGraph: {
    title: "Casos de Éxito | Rukma Studio",
    description:
      "Resultados reales para productos digitales, equipos que innovan y negocios que buscan crecer.",
    url: "https://rukma.studio/cases",
  },
  alternates: {
    canonical: "https://rukma.studio/cases",
  },
};

export default async function CasesPage() {
  const locale = await getLocale();
  const articles = await listCaseStudies(locale);

  const casesData = articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    image: a.cover?.url ?? "",
    category: topicOf(a),
    shortDescription: a.excerpt ?? "",
  }));

  return (
    <main className="min-h-screen bg-[#0D0F12] relative overflow-hidden">
      <PageBackground />

      <div className="relative z-10">
        <Navbar />

        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">

            <CasesHeader />

            <div className="w-full h-px bg-white/10 mt-20 mb-8" />

            <CasesClient casesData={casesData} />

          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
