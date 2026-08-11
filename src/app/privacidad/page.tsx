import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: "Aviso de privacidad y uso de datos de Rukma Studio.",
  openGraph: {
    title: "Aviso de Privacidad | Rukma Studio",
    description: "Conoce cómo manejamos, protegemos y utilizamos tus datos personales.",
    url: "https://rukma.studio/privacidad",
  },
  alternates: {
    canonical: "https://rukma.studio/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0F12]/50 to-[#0D0F12] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-6 py-32 md:py-48">
          <h1 className="text-4xl md:text-5xl font-light mb-12 tracking-tight">
            Aviso de Privacidad
          </h1>
          
          <div className="space-y-8 text-white/80 font-light leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-white mb-4">1. Introducción</h2>
              <p>
                En Rukma Studio valoramos su privacidad y nos comprometemos a proteger la información personal que comparte con nosotros. Este Aviso de Privacidad describe cómo recopilamos, utilizamos, compartimos y protegemos sus datos cuando visita nuestro sitio web y utiliza nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">2. Información que Recopilamos</h2>
              <p>
                Podemos recopilar información personal que usted nos proporciona voluntariamente al completar formularios de contacto, suscribirse a nuestro boletín o interactuar con nuestros servicios. Esto puede incluir, entre otros, su nombre, dirección de correo electrónico, número de teléfono y detalles de su empresa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">3. Uso de la Información</h2>
              <p>
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Proveer, mantener y mejorar nuestros servicios.</li>
                <li>Responder a sus preguntas y ofrecer atención al cliente.</li>
                <li>Enviar comunicaciones, actualizaciones y material promocional (siempre con su consentimiento).</li>
                <li>Analizar el uso del sitio web para optimizar la experiencia del usuario.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">4. Cookies y Tecnologías de Rastreo</h2>
              <p>
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Puede configurar su navegador para rechazar todas las cookies o para que le indique cuándo se envía una cookie.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">5. Compartir la Información</h2>
              <p>
                No vendemos, intercambiamos ni transferimos su información personal a terceros para fines comerciales sin su consentimiento previo, salvo para aquellos proveedores de servicios que nos asisten en la operación del sitio web y en nuestro negocio, siempre y cuando estas partes acuerden mantener esta información confidencial.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">6. Seguridad de los Datos</h2>
              <p>
                Implementamos medidas de seguridad razonables para mantener la seguridad de su información personal. Sin embargo, ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">7. Sus Derechos</h2>
              <p>
                Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de su información personal en cualquier momento. Para ejercer estos derechos, puede ponerse en contacto con nosotros a través de nuestro correo electrónico.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-4">8. Cambios en el Aviso de Privacidad</h2>
              <p>
                Nos reservamos el derecho de modificar este Aviso de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de la última actualización.
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
