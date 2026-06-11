import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CasesClient } from "@/components/CasesClient";
import { CasesHeader } from "@/components/CasesHeader";
import { PageBackground } from "@/components/PageBackground";
import { mockCases } from "@/data/mockCases";

export const metadata = {
  title: "Casos de Éxito | Rukma Studio",
  description: "Resultados reales para marcas ambiciosas.",
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
