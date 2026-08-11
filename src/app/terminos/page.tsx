import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web de Rukma Studio.",
  openGraph: {
    title: "Términos y Condiciones | Rukma Studio",
    description: "Normas y pautas de uso para los servicios y sitio web de Rukma Studio.",
    url: "https://rukma.studio/terminos",
  },
  alternates: {
    canonical: "https://rukma.studio/terminos",
  },
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0F12]/50 to-[#0D0F12] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-6 py-32 md:py-48">
          <h1 className="text-4xl md:text-5xl font-light mb-12 tracking-tight">
            Términos y Condiciones
          </h1>
          
          <div className="space-y-8 text-white/80 font-light leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-white mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de Rukma Studio, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web ni nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">2. Uso del Sitio Web</h2>
              <p>
                Usted acepta utilizar este sitio web únicamente con fines legales y de una manera que no infrinja los derechos de, ni restrinja o inhiba el uso y disfrute de este sitio por parte de cualquier tercero. El contenido de las páginas de este sitio es para su información general y uso exclusivo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido, marcas registradas, logotipos, imágenes, textos y diseños mostrados en este sitio son propiedad de Rukma Studio o de sus respectivos dueños, y están protegidos por leyes de propiedad intelectual y derechos de autor. Queda prohibida la reproducción, distribución o modificación sin nuestro consentimiento previo por escrito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">4. Limitación de Responsabilidad</h2>
              <p>
                Rukma Studio no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar nuestro sitio web o servicios. Tampoco garantizamos que el sitio esté libre de errores, interrupciones o virus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">5. Enlaces a Sitios de Terceros</h2>
              <p>
                Nuestro sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente para su conveniencia. Rukma Studio no tiene control sobre el contenido de dichos sitios y no asume ninguna responsabilidad por ellos ni por cualquier pérdida o daño que pueda surgir de su uso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">6. Modificaciones de los Términos</h2>
              <p>
                Rukma Studio se reserva el derecho de revisar y modificar estos Términos y Condiciones en cualquier momento. Al continuar utilizando el sitio web después de que se hayan publicado los cambios, usted acepta estar sujeto a la versión actualizada de estos términos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">7. Ley Aplicable</h2>
              <p>
                Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes correspondientes a nuestra jurisdicción comercial. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales competentes.
              </p>
            </section>

            <section className="pt-8">
              <p className="text-sm">Última actualización: Agosto 2026</p>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
