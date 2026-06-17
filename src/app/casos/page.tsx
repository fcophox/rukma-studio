import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CasesClient } from "@/components/CasesClient";
import { CasesHeader } from "@/components/CasesHeader";
import { PageBackground } from "@/components/PageBackground";

const mockCases = [
  {
    id: "1",
    slug: "fintech-ux",
    title: "UX Research para Fintech",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    category: "UX RESEARCH",
    shortDescription: "Investigación y validación de experiencia de usuario para una plataforma fintech en etapa temprana.",
  },
  {
    id: "2",
    slug: "ecommerce-redesign",
    title: "Rediseño de Plataforma E-commerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    category: "PRODUCT DESIGN",
    shortDescription: "Rediseño completo de experiencia de compra para un e-commerce regional.",
  },
  {
    id: "3",
    slug: "saas-platform",
    title: "Plataforma SaaS para Gestión de Proyectos",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    category: "PRODUCT DESIGN",
    shortDescription: "Diseño y desarrollo de MVP para una plataforma SaaS de gestión de proyectos.",
  },
];

export const metadata = {
  title: "Casos de Éxito",
  description:
    "Resultados reales para marcas ambiciosas. Conoce cómo hemos ayudado a empresas a resolver problemas complejos con estrategia, diseño y tecnología.",
  openGraph: {
    title: "Casos de Éxito | Rukma Studio",
    description:
      "Resultados reales para marcas ambiciosas.",
    url: "https://rukma.studio/casos",
  },
  alternates: {
    canonical: "https://rukma.studio/casos",
  },
};

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#0D0F12] relative overflow-hidden">
      <PageBackground />

      <div className="relative z-10">
        <Navbar />

        {/* Cases Header */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">

            <CasesHeader />

            {/* Divider */}
            <div className="w-full h-px bg-white/10 mt-20 mb-8"></div>

            {/* Client component with search and filter */}
            <CasesClient casesData={mockCases} />

          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
