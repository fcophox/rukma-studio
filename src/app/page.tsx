import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { SuccessCases } from "@/components/SuccessCases";
import { BannerDivider } from "@/components/BannerDivider";
import { BlogSection } from "@/components/BlogSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-fondo-oscuro relative">
      <Navbar />
      <Hero />
      <Services />
      <SuccessCases />
      <BannerDivider />
      <BlogSection />
      <FAQ />
      <Footer />
    </main>
  );
}
