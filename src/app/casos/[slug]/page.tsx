import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import { mockCases } from "@/data/mockCases";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = mockCases.find((c) => c.slug === slug) || mockCases[0];

  return {
    title: caseItem.title,
    description: caseItem.shortDescription,
    openGraph: {
      title: caseItem.title,
      description: caseItem.shortDescription,
      url: `https://rukma.studio/casos/${caseItem.slug}`,
      type: "article",
      images: [
        { url: caseItem.image, width: 800, height: 600, alt: caseItem.title },
      ],
    },
    alternates: {
      canonical: `https://rukma.studio/casos/${caseItem.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseItem = mockCases.find((c) => c.slug === slug) || mockCases[0];

  // Datos simulados para mantener el mismo template visual del blog
  const author = "Equipo Rukma";
  const authorImage = "https://i.pravatar.cc/150?u=a042581f4e29026704d";
  const formattedDate = new Date("2024-05-10").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).toUpperCase();

  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white overflow-hidden">
      <PageBackground />

      <div className="relative z-10">
      <Navbar />

      <article className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Botón volver */}
          <Link href="/casos" className="inline-flex items-center text-sm text-texto-secundario hover:text-white transition-colors mb-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver a Casos de Estudio
          </Link>

          {/* Título y Subtítulo */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-white/90">
            {caseItem.title}
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light mb-12">
            {caseItem.shortDescription}
          </p>

          {/* Separador comentado para coincidir con tu ajuste */}
          {/* <div className="w-full h-px bg-white/5 mb-8"></div> */}

          {/* Información del autor (mantenida por solicitud del mismo template) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src={authorImage} alt={author} fill className="object-cover" />
              </div>
              <span className="font-medium text-white/90">{author}</span>
            </div>
            
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-texto-secundario">
              {caseItem.category} <span className="mx-2 opacity-50">/</span> {formattedDate}
            </div>
          </div>

          {/* Separador comentado para coincidir con tu ajuste */}
          {/* <div className="w-full h-px bg-white/5 mt-8 mb-16"></div> */}

          {/* Imagen principal */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-2xl">
            <Image src={caseItem.image} alt={caseItem.title} fill className="object-cover" priority />
          </div>

          {/* Contenido (Textos simulados) */}
          <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-white/70 font-light leading-relaxed">
            <p>
              En la era de la inteligencia artificial, las herramientas y metodologías han evolucionado a un ritmo sin precedentes. Sin embargo, junto con estos avances tecnológicos, las amenazas digitales también se han vuelto más sofisticadas. Los activos digitales de tu empresa, desde bases de datos de clientes hasta propiedad intelectual, están más expuestos que nunca.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-medium text-white/90 mt-16 mb-6">El desafío principal que enfrentamos</h2>
            <p>
              La inteligencia artificial no solo es una herramienta para defensores, sino también para atacantes. Algoritmos de machine learning se utilizan hoy en día para generar ataques de phishing hiper-personalizados, descubrir vulnerabilidades de día cero a velocidades récord e incluso eludir sistemas de detección biométrica.
            </p>
            <p>
              Proteger la infraestructura ya no se trataba de levantar muros estáticos, sino de implementar sistemas dinámicos que pudieran aprender y adaptarse a las nuevas técnicas de intrusión. Esto requirió un cambio de paradigma hacia la seguridad desde el diseño (Security by Design).
            </p>

            <blockquote className="border-l-4 border-color-terciario pl-6 my-10 italic text-white/80">
              "La transformación digital en este caso no fue solo tecnológica, fue cultural. Logramos adaptar los procesos internos para maximizar la eficiencia y seguridad en todas sus capas."
            </blockquote>

            <h3 className="text-xl md:text-2xl font-medium text-white/90 mt-12 mb-6">Resultados y métricas clave</h3>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li><strong>Reducción de costos:</strong> Disminución del 40% en costos operativos relacionados a infraestructura.</li>
              <li><strong>Velocidad de carga:</strong> Mejora del rendimiento en un 60%, optimizando los Core Web Vitals.</li>
              <li><strong>Seguridad:</strong> Cero incidentes de brechas de seguridad desde la implementación del cifrado de extremo a extremo (E2EE).</li>
              <li><strong>Adopción:</strong> El 95% del equipo adoptó las nuevas herramientas en el primer mes de lanzamiento.</li>
            </ul>

            <p>
              Tomar medidas proactivas para asegurar tus productos digitales es una inversión fundamental que protege la reputación de tu marca y la confianza de tus clientes. Este caso demuestra cómo una estrategia bien ejecutada no solo resuelve problemas técnicos, sino que potencia el negocio.
            </p>
          </div>
        </div>
      </article>

      <Footer />
      </div>
    </main>
  );
}
