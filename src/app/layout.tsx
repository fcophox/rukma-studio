import type { Metadata } from "next";
import { Sansation, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomCursor } from "@/components/CustomCursor";

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
  title: "Rukma Studio",
  description: "Estrategia, diseño y tecnología para productos digitales que generan impacto.",
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
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
