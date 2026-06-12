export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rukma Studio",
    url: "https://rukma.studio",
    logo: "https://rukma.studio/brand/logotipo-rukma-horizontal.svg",
    description:
      "Ayudamos a empresas, startups y equipos digitales a diseñar, validar y construir productos digitales que generan impacto.",
    foundingDate: "2024",
    areaServed: "Worldwide",
    knowsAbout: [
      "UX Design",
      "Product Design",
      "Diseño de experiencia de usuario",
      "Prototipado MVP",
      "Brand Experience",
      "Identidad de marca",
      "Consultoría UX",
      "Desarrollo Frontend",
    ],
    sameAs: [
      "https://www.linkedin.com/in/fcophox/",
      "https://github.com/fcophox",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rukma Studio",
    url: "https://rukma.studio",
    description:
      "Estrategia, diseño y tecnología para productos digitales que generan impacto.",
    inLanguage: "es",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
