import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { mockPosts } from "@/data/mockPosts";
import Link from "next/link";
import Image from "next/image";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = mockPosts.find((p) => p.id === parseInt(params.id)) || mockPosts[0];

  // Formatear la fecha en estilo "20 DE ABRIL DE 2026"
  const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).toUpperCase();

  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white">
      <Navbar />

      <article className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Botón volver */}
          <Link href="/blog" className="inline-flex items-center text-sm text-texto-secundario hover:text-white transition-colors mb-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver al blog
          </Link>

          {/* Título y Subtítulo */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-white/90">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light mb-12">
            La IA eleva amenazas digitales: protege tu infraestructura con buenas prácticas
          </p>

          {/* Separador */}
          {/* <div className="w-full h-px bg-white/5 mb-8"></div> */}

          {/* Información del autor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
              </div>
              <span className="font-medium text-white/90">{post.author}</span>
            </div>

            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-texto-secundario">
              {post.category} <span className="mx-2 opacity-50">/</span> {formattedDate}
            </div>
          </div>

          {/* Separador */}
          {/* <div className="w-full h-px bg-white/5 mt-8 mb-16"></div> */}

          {/* Imagen principal */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Contenido (Textos simulados) */}
          <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-white/70 font-light leading-relaxed">
            <p>
              En la era de la inteligencia artificial, las herramientas y metodologías han evolucionado a un ritmo sin precedentes. Sin embargo, junto con estos avances tecnológicos, las amenazas digitales también se han vuelto más sofisticadas. Los activos digitales de tu empresa, desde bases de datos de clientes hasta propiedad intelectual, están más expuestos que nunca.
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-white/90 mt-16 mb-6">El impacto de la inteligencia artificial en la ciberseguridad</h2>
            <p>
              La inteligencia artificial no solo es una herramienta para defensores, sino también para atacantes. Algoritmos de machine learning se utilizan hoy en día para generar ataques de phishing hiper-personalizados, descubrir vulnerabilidades de día cero a velocidades récord e incluso eludir sistemas de detección biométrica.
            </p>
            <p>
              Proteger tu infraestructura ya no se trata de levantar muros estáticos, sino de implementar sistemas dinámicos que puedan aprender y adaptarse a las nuevas técnicas de intrusión. Esto requiere un cambio de paradigma hacia la seguridad desde el diseño (Security by Design).
            </p>

            <blockquote className="border-l-4 border-color-terciario pl-6 my-10 italic text-white/80">
              "La seguridad digital en la actualidad no es un estado que se alcanza, es un proceso continuo de adaptación e innovación tecnológica constante."
            </blockquote>

            <h3 className="text-xl md:text-2xl font-medium text-white/90 mt-12 mb-6">Mejores prácticas de seguridad para proteger tus activos</h3>
            <ul className="list-disc pl-6 space-y-4 mb-8">
              <li><strong>Implementar arquitecturas Zero Trust:</strong> Nunca confíes, siempre verifica. Todos los usuarios y dispositivos deben ser autenticados continuamente, independientemente de su ubicación en la red.</li>
              <li><strong>Auditorías asistidas por IA:</strong> Utiliza modelos de inteligencia artificial para auditar el código y la red en tiempo real, detectando anomalías que pasarían desapercibidas para un humano.</li>
              <li><strong>Cifrado de extremo a extremo (E2EE):</strong> Asegura que los datos estén cifrados no solo en tránsito, sino también en reposo, minimizando el impacto en caso de una brecha de seguridad.</li>
              <li><strong>Capacitación constante del equipo:</strong> El factor humano sigue siendo el eslabón más débil. Entrenar al equipo con simulaciones de phishing generadas por IA prepara a la organización ante amenazas modernas.</li>
            </ul>

            <p>
              Tomar medidas proactivas para asegurar tus productos digitales es una inversión fundamental que protege la reputación de tu marca y la confianza de tus clientes. A medida que la IA continúa evolucionando, también debe hacerlo nuestra aproximación hacia la seguridad integral de la información.
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
