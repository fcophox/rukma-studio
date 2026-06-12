import type { Metadata } from "next";
import { Sansation, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomCursor } from "@/components/CustomCursor";
import { JsonLd } from "@/components/JsonLd";

const sansation = Sansation({
  weight: ["300", "400", "700"],
  variable: "--font-sansation",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rukma.studio"),
  title: {
    default: "Rukma Studio — Estrategia, Diseño y Tecnología Digital",
    template: "%s | Rukma Studio",
  },
  description:
    "Ayudamos a empresas, startups y equipos digitales a diseñar, validar y construir productos digitales que generan impacto. UX, Product Design, MVP, identidad de marca.",
  keywords: [
    "UX Design",
    "Product Design",
    "Diseño de experiencia",
    "Productos digitales",
    "MVP",
    "Prototipado",
    "Identidad de marca",
    "Brand Experience",
    "Consultoría UX",
    "Diseño UI",
    "Rukma Studio",
  ],
  authors: [{ name: "Rukma Studio", url: "https://rukma.studio" }],
  creator: "Rukma Studio",
  publisher: "Rukma Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://rukma.studio",
    siteName: "Rukma Studio",
    title: "Rukma Studio — Estrategia, Diseño y Tecnología Digital",
    description:
      "Ayudamos a empresas, startups y equipos digitales a diseñar, validar y construir productos digitales que generan impacto.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rukma Studio — Estrategia, Diseño y Tecnología Digital",
    description:
      "Estrategia, diseño y tecnología para productos digitales que generan impacto.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rukma.studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sansation.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <JsonLd />
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
