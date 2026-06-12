import type { Metadata } from "next";
import { ServiceDetailClient } from "@/components/servicios/ServiceDetailClient";

// Static service data for metadata (server-side only)
const servicesMeta: Record<string, { title: string; description: string }> = {
  "diseno-y-estrategia-de-experiencia": {
    title: "Diseño y Estrategia de Experiencia",
    description:
      "Diseñamos experiencias digitales claras, útiles y centradas en las personas, conectando las necesidades del usuario con los objetivos del negocio.",
  },
  "prototipado-mvp-y-codificacion": {
    title: "Prototipado MVP y Codificación de Productos Digitales",
    description:
      "Convertimos ideas y diseños en prototipos funcionales o MVPs digitales para validar, aprender y avanzar más rápido hacia el mercado.",
  },
  "brand-experience-e-identidad": {
    title: "Brand Experience e Identidad",
    description:
      "Diseñamos identidades visuales y experiencias de marca coherentes para empresas, productos digitales y nuevos negocios.",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesMeta[slug];

  if (!service) {
    return {
      title: "Servicio",
      description: "Servicio de Rukma Studio.",
    };
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | Rukma Studio`,
      description: service.description,
      url: `https://rukma.studio/servicios/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://rukma.studio/servicios/${slug}`,
    },
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;

  return <ServiceDetailClient slug={slug} />;
}
