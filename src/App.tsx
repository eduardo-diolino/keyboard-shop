/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import ExplodedHardware from "./components/ExplodedHardware";
import SoundSimulator from "./components/SoundSimulator";
import LightingDemo from "./components/LightingDemo";
import SpecsCompare from "./components/SpecsCompare";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import { Laptop, Cpu, ShieldCheck } from "lucide-react";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

function AppContent() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark"
        ? "bg-zinc-950 text-zinc-100 selection:bg-white selection:text-zinc-950"
        : "bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white"
    } font-sans antialiased`}>
      {/* 1. Translucent Navigation Bar */}
      <Navbar />

      {/* 2. Full-screen Cinematic Hero */}
      <Hero />

      {/* 3. Product Showcase - Bento Grid */}
      <Showcase />

      {/* 4. Interactive Exploded Hardware Stack */}
      <ExplodedHardware />

      {/* 5. Sound Acoustics Simulator Studio */}
      <SoundSimulator />

      {/* 6. Smart Backlight Proximity and Brightness Calibration */}
      <LightingDemo />

      {/* 7. Technical Specifications Brower & Competitors Comparison */}
      <SpecsCompare />

      {/* 8. Help Accordion FAQ Desk */}
      <FAQ />

      {/* 9. Final Upgrade Call-to-Action Setup */}
      <CTA />

      {/* 10. Sleek Premium Footer */}
      <footer
        id="main-footer"
        className={`border-t py-16 text-xs transition-colors duration-300 font-mono ${
          theme === "dark"
            ? "bg-zinc-900/60 border-zinc-800 text-zinc-400"
            : "bg-white border-zinc-200 text-zinc-500"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-8 border-b pb-12 mb-12 ${
            theme === "dark" ? "border-zinc-800" : "border-zinc-100"
          }`}>
            <div className="flex flex-col gap-2">
              <div className={`text-sm font-extrabold tracking-tight ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}>logi</div>
              <p className={`text-[11px] max-w-sm leading-relaxed ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-500"
              }`}>
                {t(
                  "Logitech MX Keys S represents the pinnacle of advanced wireless typing craftsmanship. Spherically-dished keycaps matched with a zero-backbending magnesium plate chassis.",
                  "O Logitech MX Keys S representa o ápice do design avançado de digitação sem fio. Teclas com encaixe esférico combinadas com um chassi de placa metálica rígida contra flexões."
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <a href="#perfect-stroke" className={`transition font-medium ${
                theme === "dark" ? "text-zinc-300 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}>
                {t("Design Philosophy", "Filosofia de Design")}
              </a>
              <a href="#exploded-hardware" className={`transition ${
                theme === "dark" ? "text-zinc-300 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}>
                {t("Hardware Stack", "Estrutura do Hardware")}
              </a>
              <a href="#sound-simulator" className={`transition ${
                theme === "dark" ? "text-zinc-300 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}>
                {t("Typing Studio", "Estúdio de Som")}
              </a>
              <a href="#smart-backlighting" className={`transition ${
                theme === "dark" ? "text-zinc-300 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}>
                {t("Smart Sensor", "Sensor Inteligente")}
              </a>
              <a href="#tech-specs" className={`transition ${
                theme === "dark" ? "text-zinc-300 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}>
                {t("Specs Sheet", "Ficha Técnica")}
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1 text-left">
              <span>
                © {new Date().getFullYear()} Logitech Inc. {t("All rights reserved. Built for professional workstations.", "Todos os direitos reservados. Projetado para estações de trabalho de elite.")}
              </span>
              <span className={`text-[10px] mt-1 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {t(
                  "Portions of this presentation depict the exact physical properties, keys, and materials of the MX Keys S. Dual OS (macOS/Win) is fully preloaded.",
                  "Partes desta apresentação retratam as propriedades físicas, teclas e materiais reais do MX Keys S. Sistema duplo (macOS/Win) totalmente pré-programado."
                )}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[10px]">
              <span className={`flex items-center gap-1.5 border px-2.5 py-1 rounded transition-colors ${
                theme === "dark"
                  ? "border-zinc-805 bg-zinc-900/50 text-zinc-400"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500"
              }`}>
                <ShieldCheck className={`h-3.5 w-3.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`} />
                {t("FCC Standard COMPLIANT", "CONFORME PADRÕES FCC")}
              </span>
              <span className={`flex items-center gap-1.5 border px-2.5 py-1 rounded transition-colors ${
                theme === "dark"
                  ? "border-zinc-805 bg-zinc-900/50 text-zinc-400"
                  : "border-zinc-200 bg-zinc-50 text-zinc-500"
              }`}>
                <Cpu className={`h-3.5 w-3.5 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`} />
                {t("CE ENCRYPTION CERTIFIED", "CERTIFICAÇÃO CE DE SEGURANÇA")}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Static, high-performance slide cart drawer */}
      <CartDrawer />
    </div>
  );
}
