"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageCircle, Users, Calendar } from "lucide-react";
import { ContactForms } from "@/components/contacto/ContactForms";

export default function ContactPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
      // Desplazar un poco hacia abajo para ver el formulario si es en móvil
      setTimeout(() => {
        window.scrollBy({ top: 400, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0F12] relative text-white">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6 text-white/90">
              ¿Cómo prefieres que hablemos?
            </h1>
            <p className="text-lg text-white/60 font-light">
              Selecciona la opción que mejor se adapte a tus necesidades para comenzar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Card 1 */}
            <button 
              onClick={() => handleSelect("mensaje")}
              className={`group text-left block border transition-all duration-300 rounded-[2rem] p-10 relative ${
                selectedOption === "mensaje" 
                  ? "bg-[#1A1D21] border-color-terciario/50" 
                  : "bg-[#16181C] hover:bg-[#1A1D21] border-transparent hover:border-white/5"
              }`}
            >
              <div className="flex justify-between items-start mb-16">
                <div className={`${selectedOption === "mensaje" ? "text-color-terciario" : "text-white/60 group-hover:text-white"} transition-colors`}>
                  <MessageCircle size={32} strokeWidth={1.5} />
                </div>
                <div className={`w-7 h-7 rounded-full border transition-colors flex items-center justify-center ${
                  selectedOption === "mensaje" ? "border-color-terciario" : "border-white/10 group-hover:border-color-terciario"
                }`}>
                  {selectedOption === "mensaje" && <div className="w-3 h-3 rounded-full bg-color-terciario" />}
                </div>
              </div>
              <h3 className={`text-2xl font-medium mb-6 transition-colors ${
                selectedOption === "mensaje" ? "text-color-terciario" : "text-white/90 group-hover:text-color-terciario"
              }`}>
                Hablemos por<br />mensaje
              </h3>
              <p className="text-white/50 font-light leading-relaxed">
                Cuéntame en qué estás trabajando hoy, en que puedo apoyarte o qué necesitas potenciar.
              </p>
            </button>

            {/* Card 2 */}
            <button 
              onClick={() => handleSelect("consultoria")}
              className={`group text-left block border transition-all duration-300 rounded-[2rem] p-10 relative ${
                selectedOption === "consultoria" 
                  ? "bg-[#1A1D21] border-color-terciario/50" 
                  : "bg-[#16181C] hover:bg-[#1A1D21] border-transparent hover:border-white/5"
              }`}
            >
              <div className="flex justify-between items-start mb-16">
                <div className={`${selectedOption === "consultoria" ? "text-color-terciario" : "text-white/60 group-hover:text-white"} transition-colors`}>
                  <Users size={32} strokeWidth={1.5} />
                </div>
                <div className={`w-7 h-7 rounded-full border transition-colors flex items-center justify-center ${
                  selectedOption === "consultoria" ? "border-color-terciario" : "border-white/10 group-hover:border-color-terciario"
                }`}>
                  {selectedOption === "consultoria" && <div className="w-3 h-3 rounded-full bg-color-terciario" />}
                </div>
              </div>
              <h3 className={`text-2xl font-medium mb-6 transition-colors ${
                selectedOption === "consultoria" ? "text-color-terciario" : "text-white/90 group-hover:text-color-terciario"
              }`}>
                Generemos una<br />consultoría UX
              </h3>
              <p className="text-white/50 font-light leading-relaxed">
                Revisemos tu producto digital y generemos una Roadmaps para optimizar tu negocio.
              </p>
            </button>

            {/* Card 3 */}
            <button 
              onClick={() => handleSelect("reunion")}
              className={`group text-left block border transition-all duration-300 rounded-[2rem] p-10 relative ${
                selectedOption === "reunion" 
                  ? "bg-[#1A1D21] border-color-terciario/50" 
                  : "bg-[#16181C] hover:bg-[#1A1D21] border-transparent hover:border-white/5"
              }`}
            >
              <div className="flex justify-between items-start mb-16">
                <div className={`${selectedOption === "reunion" ? "text-color-terciario" : "text-white/60 group-hover:text-white"} transition-colors`}>
                  <Calendar size={32} strokeWidth={1.5} />
                </div>
                <div className={`w-7 h-7 rounded-full border transition-colors flex items-center justify-center ${
                  selectedOption === "reunion" ? "border-color-terciario" : "border-white/10 group-hover:border-color-terciario"
                }`}>
                  {selectedOption === "reunion" && <div className="w-3 h-3 rounded-full bg-color-terciario" />}
                </div>
              </div>
              <h3 className={`text-2xl font-medium mb-6 transition-colors ${
                selectedOption === "reunion" ? "text-color-terciario" : "text-white/90 group-hover:text-color-terciario"
              }`}>
                Agendemos una<br />reunión virtual
              </h3>
              <p className="text-white/50 font-light leading-relaxed">
                Un cafe virtual, agenda un horario disponible y hablemos con calma sobre lo que necesitas.
              </p>
            </button>

          </div>

          <ContactForms selectedOption={selectedOption} onClose={() => setSelectedOption(null)} />

        </div>
      </section>

      <Footer />
    </main>
  );
}
