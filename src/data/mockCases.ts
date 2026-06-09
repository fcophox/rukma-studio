export interface SuccessCase {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  shortDescription: string;
}

export const mockCases: SuccessCase[] = [
  {
    id: 1,
    slug: "empresa-naviera-seguridad",
    title: "Empresa naviera fortalece su gobernanza y seguridad migrando a GitHub Enterprise Cloud",
    category: "Seguridad",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    shortDescription: "Descubre cómo ayudamos a una de las navieras más grandes a asegurar su código y estandarizar sus procesos de despliegue a nivel global.",
  },
  {
    id: 2,
    slug: "tecnologia-reto-operativo",
    title: "De Reto Operativo a Plataforma Estratégica",
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Transformación digital completa para convertir un cuello de botella operativo en una ventaja competitiva tecnológica.",
  },
  {
    id: 3,
    slug: "fintech-experiencia-usuario",
    title: "Rediseño completo de la experiencia de usuario para Fintech líder",
    category: "Diseño UX/UI",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Aumentamos la retención de usuarios en un 45% a través de un rediseño centrado en la usabilidad y la confianza financiera.",
  },
  {
    id: 4,
    slug: "retail-omnicanal",
    title: "Estrategia omnicanal y modernización de e-commerce",
    category: "Negocio",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Unificamos la experiencia de compra física y digital, incrementando las ventas online en un 120% durante el primer año.",
  },
  {
    id: 5,
    slug: "salud-digitalizacion",
    title: "Digitalización de expedientes médicos y portal de pacientes",
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Implementación de un sistema seguro y escalable que mejoró la atención al paciente y optimizó los tiempos administrativos.",
  },
  {
    id: 6,
    slug: "startup-lanzamiento-mvp",
    title: "Lanzamiento exitoso de MVP en tiempo récord",
    category: "Innovación",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    shortDescription: "De la idea al mercado en 8 semanas: validamos el modelo de negocio con usuarios reales y aseguramos la primera ronda de inversión.",
  },
];
