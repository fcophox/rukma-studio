export interface BlogPost {
  id: number;
  title: string;
  category: string;
  author: string;
  authorImage: string;
  image: string;
  date: string;
}

const defaultAuthorImage = "https://i.pravatar.cc/150?u=a042581f4e29026704d";

export const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "Protegiendo tus activos digitales en la era de la IA",
    category: "SEGURIDAD",
    author: "Equipo Rukma",
    authorImage: defaultAuthorImage,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "La Seguridad en Software: Un Pilar Irrenunciable del Desarrollo Moderno",
    category: "SEGURIDAD",
    author: "Equipo Rukma",
    authorImage: defaultAuthorImage,
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800",
    date: "2024-01-20",
  },
  {
    id: 3,
    title: "La importancia de la diversidad y la inclusión en el entorno laboral actual",
    category: "NEGOCIO",
    author: "Equipo Rukma",
    authorImage: defaultAuthorImage,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    date: "2024-02-05",
  },
  {
    id: 4,
    title: "5 tendencias de UX/UI que transformarán tus productos en 2024",
    category: "DISEÑO",
    author: "Andrea Vega",
    authorImage: "https://i.pravatar.cc/150?u=b042581f4e29026704e",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    date: "2024-02-12",
  },
  {
    id: 5,
    title: "Cómo la automatización reduce costos operativos en empresas B2B",
    category: "NEGOCIO",
    author: "Carlos Ruiz",
    authorImage: "https://i.pravatar.cc/150?u=c042581f4e29026704f",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-01",
  },
  {
    id: 6,
    title: "Arquitectura Serverless: Ventajas y casos de uso prácticos",
    category: "TECNOLOGÍA",
    author: "Equipo Rukma",
    authorImage: defaultAuthorImage,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-15",
  },
  {
    id: 7,
    title: "Estrategias de crecimiento basadas en datos para startups",
    category: "NEGOCIO",
    author: "Andrea Vega",
    authorImage: "https://i.pravatar.cc/150?u=b042581f4e29026704e",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "2024-04-02",
  },
  {
    id: 8,
    title: "Implementando buenas prácticas de accesibilidad web (a11y)",
    category: "DISEÑO",
    author: "Carlos Ruiz",
    authorImage: "https://i.pravatar.cc/150?u=c042581f4e29026704f",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
    date: "2024-04-10",
  },
  {
    id: 9,
    title: "El futuro del desarrollo Frontend: WebAssembly y Rust",
    category: "TECNOLOGÍA",
    author: "Equipo Rukma",
    authorImage: defaultAuthorImage,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    date: "2024-04-20",
  },
  {
    id: 10,
    title: "Construyendo sistemas de diseño escalables y mantenibles",
    category: "DISEÑO",
    author: "Andrea Vega",
    authorImage: "https://i.pravatar.cc/150?u=b042581f4e29026704e",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-05",
  },
  {
    id: 11,
    title: "Migrando de infraestructuras monolíticas a microservicios",
    category: "TECNOLOGÍA",
    author: "Carlos Ruiz",
    authorImage: "https://i.pravatar.cc/150?u=c042581f4e29026704f",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    date: "2024-05-18",
  },
  {
    id: 12,
    title: "Cómo la Inteligencia Artificial está cambiando la creación de contenido",
    category: "INNOVACIÓN",
    author: "Equipo Rukma",
    authorImage: defaultAuthorImage,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    date: "2024-06-01",
  },
];
