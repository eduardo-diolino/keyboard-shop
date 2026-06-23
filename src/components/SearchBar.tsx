/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, HelpCircle, Layers, Settings, Compass, Volume2, Sparkles, CornerDownLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

// Search indexed item definition interface
interface SearchIndexedItem {
  id: string; // unique identifier
  category: "section" | "feature" | "layer" | "spec" | "faq"; // content categorization
  sectionNameEn: string;
  sectionNamePt: string;
  titleEn: string;
  titlePt: string;
  descEn: string;
  descPt: string;
  targetId: string; // HTML selector id for layout scrolling
  customEvent?: string; // event key to trigger component internal state adjustments
  eventValue?: any; // payload of the event
}

// Master index dataset of all site content to ensure we search 100% of visible presentation
const SITE_SEARCH_INDEX: SearchIndexedItem[] = [
  // 1. Dynamic Page Sections
  {
    id: "sec-design",
    category: "section",
    sectionNameEn: "Section",
    sectionNamePt: "Seção",
    titleEn: "Design Philosophy & Comfort",
    titlePt: "Filosofia de Design e Conforto",
    descEn: "Every millimeter is carefully crafted. Precision-focused typing layout with spherically-dished keycaps.",
    descPt: "Cada milímetro esculpido para perfeição. Layout avançado com revestimento fosco e teclas ergonômicas.",
    targetId: "product-showcase"
  },
  {
    id: "sec-hardware",
    category: "section",
    sectionNameEn: "Section",
    sectionNamePt: "Seção",
    titleEn: "Exploded Hardware Architecture",
    titlePt: "Estrutura e Arquitetura do Hardware",
    descEn: "Witness the multi-tier modular exploded stack inside the ultra-thin form factor.",
    descPt: "Descubra a engenharia multicamada, chassi de metal e membrana de silicone amortecedora interna.",
    targetId: "exploded-hardware"
  },
  {
    id: "sec-acoustics",
    category: "section",
    sectionNameEn: "Section",
    sectionNamePt: "Seção",
    titleEn: "PerfectStroke Typing Acoustics Studio",
    titlePt: "Estúdio de Acústica e Sons typing",
    descEn: "Interactive keyboard typing sound simulator with silent-scissor mechanics vs mechanical.",
    descPt: "Simulador de digitação em tempo real. Teste e compare as vibrações mecânicas silenciosas das teclas.",
    targetId: "sound-simulator"
  },
  {
    id: "sec-lighting",
    category: "section",
    sectionNameEn: "Section",
    sectionNamePt: "Seção",
    titleEn: "Smart Backlight Proximity Calibration",
    titlePt: "Iluminação Inteligente e Brilho",
    descEn: "Capacitive hand-proximity sensor array triggers edge glows beautifully.",
    descPt: "Detector de aproximação das mãos aciona leds brancos automaticamente com base na luz ambiente.",
    targetId: "smart-backlighting"
  },
  {
    id: "sec-specs",
    category: "section",
    sectionNameEn: "Section",
    sectionNamePt: "Seção",
    titleEn: "Specifications Sheet & Comparison Matrix",
    titlePt: "Especificações, Ficha Técnica e Comparador",
    descEn: "Explore physical dimensions, heavy-duty build weight, battery, Bluetooth & Bolt receiver specs.",
    descPt: "Consulte peso, dimensões, alcance de sinal e tabela comparativa contra chicletes tradicionais.",
    targetId: "tech-specs"
  },
  {
    id: "sec-faq",
    category: "section",
    sectionNameEn: "Section",
    sectionNamePt: "Seção",
    titleEn: "Frequently Asked Help Accordion FAQs",
    titlePt: "Central de Ajuda e Dúvidas Frequentes FAQ",
    descEn: "Dual-OS systems compatibility, custom macros mapping, Bluetooth LE vs Logi Bolt security.",
    descPt: "Respostas sobre compatibilidade de layouts Windows/macOS, conectores USB-C e software Logi Options+.",
    targetId: "faq-section"
  },

  // 2. Bento Grid Premium Features
  {
    id: "feat-keycaps",
    category: "feature",
    sectionNameEn: "Feature Detail",
    sectionNamePt: "Detalhe de Recurso",
    titleEn: "Spherically-Dished Keys Indentations",
    titlePt: "Teclas com Encaixe Esférico PerfectStroke",
    descEn: "Circular scoops match fingertip anatomy, centering every keystroke for rapid accuracy.",
    descPt: "Recortes circulares acompanham o formato dos dedos, guiando os toques para evitar digitações erradas.",
    targetId: "product-showcase"
  },
  {
    id: "feat-scissor",
    category: "feature",
    sectionNameEn: "Feature Detail",
    sectionNamePt: "Detalhe de Recurso",
    titleEn: "Tactile Low-Profile Scissor Switch",
    titlePt: "Mapeamento dos Switches Tipo Tesoura",
    descEn: "Crisp 1.8mm travel operates under strict dampening for whisper passive silent click signatures.",
    descPt: "Trabalha com curso curto e 60g de pressão, garantindo resposta rápida sem desgaste nas articulações.",
    targetId: "product-showcase"
  },
  {
    id: "feat-metal",
    category: "feature",
    sectionNameEn: "Feature Detail",
    sectionNamePt: "Detalhe de Recurso",
    titleEn: "Anodized Metal Chassis Deck-Flex Rigidity",
    titlePt: "Base de Metal Anodizado de Extrema Rigidez",
    descEn: "Sandblasted structured steel prevents keyboard from sliding, delivering reassuring luxury heft.",
    descPt: "Chapa única resistente contra torções impede o teclado de balançar ou fazer barulho oco de plástico.",
    targetId: "product-showcase"
  },

  // 3. Modular Exploded Structural Layers (Interact with ExplodedHardware component via event dispatching)
  {
    id: "lay-keycap",
    category: "layer",
    sectionNameEn: "Hardware Layer",
    sectionNamePt: "Camada de Hardware",
    titleEn: "Layer 01: Spherically-Dished Keycaps with Satin Finish",
    titlePt: "Camada 01: Teclas com Encaixe Esférico e Revestimento Fosco",
    descEn: "Laser-etched dual layout markings for macOS & Win keys coated with oil-resistant satin polymer.",
    descPt: "Gravações a laser resistentes ao desgaste que suportam óleos dos dedos após anos de escrita de código.",
    targetId: "exploded-hardware",
    customEvent: "search-highlight-layer",
    eventValue: { layerId: 1 }
  },
  {
    id: "lay-switches",
    category: "layer",
    sectionNameEn: "Hardware Layer",
    sectionNamePt: "Camada de Hardware",
    titleEn: "Layer 02: Low-Profile Tactile Scissor Switches",
    titlePt: "Camada 02: Mecanismo de Switches Tesoura de Perfil Baixo",
    descEn: "Responsive plastic scissor links provide strict vertical travel, eliminating side wobble.",
    descPt: "Hastes de precisão que guiam a descida da tecla de modo 100% plano, mesmo clicando nas pontas.",
    targetId: "exploded-hardware",
    customEvent: "search-highlight-layer",
    eventValue: { layerId: 2 }
  },
  {
    id: "lay-membrane",
    category: "layer",
    sectionNameEn: "Hardware Layer",
    sectionNamePt: "Camada de Hardware",
    titleEn: "Layer 03: Dampening Silicone Membrane Rubber",
    titlePt: "Camada 03: Membrana Amortecedora de Silicone Premium",
    descEn: "Micro-molded silicone cup sheet calibrates elastic click force, dampening sonic frequencies.",
    descPt: "Manta amortecedora calibrada em 60g de pressão para absorver o estalo do rebote metálico.",
    targetId: "exploded-hardware",
    customEvent: "search-highlight-layer",
    eventValue: { layerId: 3 }
  },
  {
    id: "lay-stabilizer",
    category: "layer",
    sectionNameEn: "Hardware Layer",
    sectionNamePt: "Camada de Hardware",
    titleEn: "Layer 04: Solid Aluminum Stabilization Backbone Plate",
    titlePt: "Camada 04: Chapa de Prato de Alumínio de Estabilização",
    descEn: "Anodized structural core locks the component stack, ensuring zero bend and rigid luxury typing.",
    descPt: "Esqueleto usinado de alta densidade que ancora as vibrações para conforto táctil ideal.",
    targetId: "exploded-hardware",
    customEvent: "search-highlight-layer",
    eventValue: { layerId: 4 }
  },
  {
    id: "lay-pcb",
    category: "layer",
    sectionNameEn: "Hardware Layer",
    sectionNamePt: "Camada de Hardware",
    titleEn: "Layer 05: Intelligent Smart PCB & Multi-Device Control Chips",
    titlePt: "Camada 05: Atuadores Inteligentes e Layout Elétrico do Circuito",
    descEn: "Houses proximity antenna arrays and high-speed Bluetooth/Bolt wireless controller modules.",
    descPt: "Placa eletrônica com antenas capacitivas integradas para acendimento das luzes por aproximação.",
    targetId: "exploded-hardware",
    customEvent: "search-highlight-layer",
    eventValue: { layerId: 5 }
  },
  {
    id: "lay-battery",
    category: "layer",
    sectionNameEn: "Hardware Layer",
    sectionNamePt: "Camada de Hardware",
    titleEn: "Layer 06: Magnesium Bottom Frame & Rechargeable Lithium Cell",
    titlePt: "Camada 06: Placa Base, Canaleta e Bateria de Lítio Li-Po",
    descEn: "Protects the fast-charging 1500mAh USB-C battery giving up to 150 days of typing on safe power.",
    descPt: "Gabinete de base robusto que abriga o conector reforçado USB Type-C e os pés de borracha antiderrapantes.",
    targetId: "exploded-hardware",
    customEvent: "search-highlight-layer",
    eventValue: { layerId: 6 }
  },

  // 4. Acoustic Audio Tuning Presets (Links to SoundSimulator component)
  {
    id: "snd-scissor",
    category: "layer",
    sectionNameEn: "Acoustic Switch Preset",
    sectionNamePt: "Ajuste Acústico de Switch",
    titleEn: "MX PerfectStroke Scissor (Tactile Quiet 28dB Profile)",
    titlePt: "MX PerfectStroke Silencioso (Perfil Táctil de 28dB)",
    descEn: "Whisper quiet, customized high-frequency suppression for high concentration at work.",
    descPt: "Som extremamente suave e amortecido de 26dB otimizado para não perturbar colegas no escritório.",
    targetId: "sound-simulator",
    customEvent: "search-highlight-sound",
    eventValue: { presetId: "silent-scissor" }
  },
  {
    id: "snd-chiclet",
    category: "layer",
    sectionNameEn: "Acoustic Switch Preset",
    sectionNamePt: "Ajuste Acústico de Switch",
    titleEn: "Standard Chiclet Dome Sound (Laptops default hollow feel)",
    titlePt: "Teclado Chiclete Comum de Laptop (Som oco de plástico)",
    descEn: "High loose feedback sound without dampening mechanics, prone to vibration clicks.",
    descPt: "Barulho agudo de impacto seco contra mesa, comum em móbiles convencionais frágeis.",
    targetId: "sound-simulator",
    customEvent: "search-highlight-sound",
    eventValue: { presetId: "classic-chiclet" }
  },
  {
    id: "snd-brown",
    category: "layer",
    sectionNameEn: "Acoustic Switch Preset",
    sectionNamePt: "Ajuste Acústico de Switch",
    titleEn: "Tactile Quiet Mechanical (Simulated Brown Switch)",
    titlePt: "Mecânico Silencioso Téctil (Simulação Switch Marrom)",
    descEn: "Deep acoustic resonance. Satisfying mechanical clack with passive sound protection.",
    descPt: "Retorno mecânico firme e encorpado para entusiastas de jogos e escrita de códigos rápidos.",
    targetId: "sound-simulator",
    customEvent: "search-highlight-sound",
    eventValue: { presetId: "tactile-brown" }
  },
  {
    id: "snd-typewriter",
    category: "layer",
    sectionNameEn: "Acoustic Switch Preset",
    sectionNamePt: "Ajuste Acústico de Switch",
    titleEn: "Vintage Typewriter Blue Switch Clack (Loud metal spring)",
    titlePt: "Máquina de Escrever Vintage (Switch Azul Metálico Alto)",
    descEn: "Crisp sounding spring click registering high 68dB pitch that usually disrupts office environments.",
    descPt: "Impacto metálico estalado barulhento clássico de máquinas antigas, altamente audível a distância.",
    targetId: "sound-simulator",
    customEvent: "search-highlight-sound",
    eventValue: { presetId: "vintage-typewriter" }
  },

  // 5. Technical Specifications sheet data details
  {
    id: "spec-weight",
    category: "spec",
    sectionNameEn: "Tech Spec Detail",
    sectionNamePt: "Especificação Técnica",
    titleEn: "Weight (810g heavy metal deck weight)",
    titlePt: "Peso (810g corpo de metal pesado estabilizador)",
    descEn: "Built using solid steel magnesium structure for maximum typing desk stability.",
    descPt: "O peso robusto de 810g serve como uma âncora natural contra trepidações e deslizamentos no escritório.",
    targetId: "tech-specs"
  },
  {
    id: "spec-dimensions",
    category: "spec",
    sectionNameEn: "Tech Spec Detail",
    sectionNamePt: "Especificação Técnica",
    titleEn: "Physical Dimensions (Height, Width, Depth)",
    titlePt: "Dimensões Físicas (Altura, Largura e Espessura)",
    descEn: "Slim height 131.63mm, spacious width 430.20mm, compact depth profiles of only 20.50mm.",
    descPt: "Design ergonômico minimalista. Espessura ultra fina de 2 centímetros com layout completo de teclado.",
    targetId: "tech-specs"
  },
  {
    id: "spec-bolt",
    category: "spec",
    sectionNameEn: "Tech Spec Detail",
    sectionNamePt: "Especificação Técnica",
    titleEn: "Logi Bolt Secure USB Wireless Receiver",
    titlePt: "Receptor Sem Fio USB Seguro Logi Bolt",
    descEn: "Coded 2.4GHz secure enterprise protocol built to block interference in crowded offices.",
    descPt: "Criptografia de nível militar contra invasões, mantendo zero atrasos e interferência de sinal rf.",
    targetId: "tech-specs"
  },
  {
    id: "spec-battery",
    category: "spec",
    sectionNameEn: "Tech Spec Detail",
    sectionNamePt: "Especificação Técnica",
    titleEn: "Battery Specs (Up to 5 months rechargeable battery)",
    titlePt: "Bateria Recarregável (Durabilidade de até 5 meses)",
    descEn: "1500mAh Lithium-Polymer cell. Up to 10 days with LEDs active or 150 days with backlight idle.",
    descPt: "Cabo de carregamento rápido USB-C incluso. Bateria continua recarregando normalmente enquanto você digita.",
    targetId: "tech-specs"
  },
  {
    id: "spec-proximity",
    category: "spec",
    sectionNameEn: "Tech Spec Detail",
    sectionNamePt: "Especificação Técnica",
    titleEn: "Lux Level Sensors & Smart Hand Proximity Backlight",
    titlePt: "Sensor de Luz Ambiente Lux e Detector de Aproximação",
    descEn: "Capacitive sensors recognize fingers at 5cm away, while photo-diodes adjust illumination intelligently.",
    descPt: "As teclas acendem sozinhas quando você aproxima as mãos do chassi e apagam após segundos de ausência.",
    targetId: "tech-specs"
  },

  // 6. FAQs Help Topics (Open details via accordion toggles inside FAQ component)
  {
    id: "faq-macwindows",
    category: "faq",
    sectionNameEn: "Frequently Asked Question",
    sectionNamePt: "Dúvida Respondida",
    titleEn: "Does the dual layout keys print windows layout and macOS layouts together?",
    titlePt: "O layout duplo funciona simultaneamente no Windows e macOS?",
    descEn: "Yes. Key legends are dual-printed directly. Layout scan matrices automatically remap command and options.",
    descPt: "Perfeitamente. Teclas impressas com start/opt e alt/cmd que se remapeiam sintonizando o sistema operacional em uso.",
    targetId: "faq-section",
    customEvent: "search-highlight-faq",
    eventValue: { faqIndex: 0 }
  },
  {
    id: "faq-bluetooth",
    category: "faq",
    sectionNameEn: "Frequently Asked Question",
    sectionNamePt: "Dúvida Respondida",
    titleEn: "What is the difference between Bluetooth LE and Logi Bolt Receiver?",
    titlePt: "Qual a diferença entre o Bluetooth LE e o Receptor Logi Bolt incluso?",
    descEn: "Bluetooth pairs quickly without dongles, while Bolt uses a closed, secure 2.4GHz enterprise channel.",
    descPt: "Bluetooth liga de forma prática em iPads e notebooks; o receptor Bolt oferece estabilidade imune contra chiados.",
    targetId: "faq-section",
    customEvent: "search-highlight-faq",
    eventValue: { faqIndex: 1 }
  },
  {
    id: "faq-recharging",
    category: "faq",
    sectionNameEn: "Frequently Asked Question",
    sectionNamePt: "Dúvida Respondida",
    titleEn: "Can I use the keyboard continuously while charging via USB-C cable?",
    titlePt: "Posso usar o teclado continuamente enquanto ele carrega via USB-C?",
    descEn: "Absolutely. Keyboard operates normally on active charging. Power fills the inside Li-Po smoothly.",
    descPt: "Funciona normalmente sem desligar. O carregamento é rápido e seguro, ligado direto no PC ou carregador de parede.",
    targetId: "faq-section",
    customEvent: "search-highlight-faq",
    eventValue: { faqIndex: 2 }
  },
  {
    id: "faq-macros",
    category: "faq",
    sectionNameEn: "Frequently Asked Question",
    sectionNamePt: "Dúvida Respondida",
    titleEn: "How do I map custom macros and Actions with Logi Options+ program?",
    titlePt: "Como mapeio macros ou Ações Inteligentes personalizadas nas teclas superiores?",
    descEn: "Setup custom macros, trigger system functions, open apps, mute microphone or open emoji board in 1 click.",
    descPt: "Através do software gratuito Logi Options+ (Win/Mac). Crie fluxos avançados automáticos com um único toque.",
    targetId: "faq-section",
    customEvent: "search-highlight-faq",
    eventValue: { faqIndex: 3 }
  }
];

interface SearchBarProps {
  onFocusChange?: (focused: boolean) => void;
}

export default function SearchBar({ onFocusChange }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<SearchIndexedItem[]>([]);
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Notify parent component about search bar focus changes
  useEffect(() => {
    if (onFocusChange) {
      onFocusChange(isFocused);
    }
  }, [isFocused, onFocusChange]);

  // Filter site index dataset matching the alphanumeric query in real-time
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const cleanQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const filtered = SITE_SEARCH_INDEX.filter((item) => {
      // Create readable searchable strings combining titles and descriptions in both OS languages
      const textPool = `
        ${item.titleEn} ${item.titlePt} 
        ${item.descEn} ${item.descPt} 
        ${item.category} 
        ${item.sectionNameEn} ${item.sectionNamePt}
      `.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      return textPool.includes(cleanQuery);
    });

    setResults(filtered);
  }, [query]);

  // Handle outside clicking to collapse search dropdown panel gracefully
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Listen to visual keyboard triggers (Ctrl+K or Cmd+K) to focus instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsFocused(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Trigger search actions: smooth scrolling, state dispatch highlights, and overlay collapse
  const handleItemSelect = (item: SearchIndexedItem) => {
    setIsFocused(false);
    setQuery("");

    // Find physical element on page
    const targetElement = document.getElementById(item.targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });

      // Dispatch dynamic developer event so component details toggle on
      if (item.customEvent && item.eventValue) {
        window.dispatchEvent(
          new CustomEvent(item.customEvent, { detail: item.eventValue })
        );
      }

      // Briefly apply visual highlight rings directly on the scrolled element container to guide users
      targetElement.classList.add("ring-2", "ring-emerald-500", "scale-[1.005]", "transition-all", "duration-500");
      setTimeout(() => {
        targetElement.classList.remove("ring-2", "ring-emerald-500", "scale-[1.005]");
      }, 2500);
    }
  };

  // Helper utility function to construct beautiful text string split highlighting matching patterns
  const renderHighlightedText = (text: string, searchWord: string) => {
    if (!searchWord.trim()) return <span>{text}</span>;
    
    // Normalize string comparisons to match accents safely
    const cleanWord = searchWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const cleanText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const index = cleanText.indexOf(cleanWord);
    if (index === -1) return <span>{text}</span>;

    const segments: React.ReactNode[] = [];
    let currentIdx = 0;

    // Iterate matches and inject custom markup
    while (currentIdx < text.length) {
      const matchIdx = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(cleanWord, currentIdx);
      if (matchIdx === -1) {
        segments.push(<span key={currentIdx}>{text.substring(currentIdx)}</span>);
        break;
      }

      if (matchIdx > currentIdx) {
        segments.push(<span key={currentIdx}>{text.substring(currentIdx, matchIdx)}</span>);
      }

      const matchText = text.substring(matchIdx, matchIdx + searchWord.length);
      segments.push(
        <mark
          key={`mark-${matchIdx}`}
          className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold px-0.5 rounded"
        >
          {matchText}
        </mark>
      );

      currentIdx = matchIdx + searchWord.length;
    }

    return <>{segments}</>;
  };

  // Return specific icon type matching indexed category nodes
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "section":
        return <Compass className="h-4 w-4 text-purple-500" />;
      case "feature":
        return <Sparkles className="h-4 w-4 text-amber-500" />;
      case "layer":
        return <Layers className="h-4 w-4 text-emerald-500" />;
      case "spec":
        return <Settings className="h-4 w-4 text-blue-500" />;
      case "faq":
        return <HelpCircle className="h-4 w-4 text-pink-500" />;
      default:
        return <Search className="h-4 w-4 text-zinc-405" />;
    }
  };

  return (
    <div
      ref={containerRef}
      id="site-search-wrapper"
      className="relative z-40 max-w-full"
    >
      <div
        className={`relative flex items-center h-10 transition-all duration-300 rounded-full border shadow-sm ${
          isFocused
            ? "w-64 md:w-80 lg:w-96 border-emerald-500 ring-2 ring-emerald-500/20 " +
              (theme === "dark" ? "bg-zinc-950 text-white" : "bg-white text-zinc-900 shadow-md")
            : "w-36 md:w-48 lg:w-56 " +
              (theme === "dark"
                ? "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-900"
                : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 shadow-sm")
        }`}
      >
        <Search className={`absolute left-3.5 h-4 w-4 pointer-events-none transition-colors duration-300 ${
          theme === "dark" ? "text-zinc-500" : "text-zinc-400"
        }`} />
        
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={t("Search visible content...", "Buscar no site...")}
          className={`w-full h-full pl-10 pr-9 bg-transparent focus:outline-none placeholder-zinc-400 text-xs sm:text-[13px] font-sans transition-colors ${
            theme === "dark" ? "text-white" : "text-zinc-900 font-medium"
          }`}
        />

        {/* Dynamic accessory layout - Clear search string or show K-shortcut badge */}
        <div className="absolute right-2.5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {query ? (
              <motion.button
                key="clear"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  setQuery("");
                  searchInputRef.current?.focus();
                }}
                className="h-5 w-5 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                title={t("Clear search", "Limpar busca")}
              >
                <X className="h-3 w-3" />
              </motion.button>
            ) : (
              <motion.div
                key="shortcut"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-[9px] text-zinc-430 text-zinc-400 pointer-events-none"
              >
                <span>⌘</span>
                <span>K</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Active Dropdown search results dropdown panel */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            id="search-results-panel"
            className={`absolute top-12 right-0 w-[310px] sm:w-[380px] md:w-[460px] max-h-[460px] overflow-y-auto rounded-2xl border shadow-xl p-3 md:p-4 backdrop-blur-md transition-colors ${
              theme === "dark"
                ? "bg-zinc-950/98 border-zinc-800 text-zinc-200"
                : "bg-white/98 border-zinc-200 text-zinc-800"
            }`}
          >
            {/* Header statistics info */}
            <div className={`flex items-center justify-between font-mono text-[10px] pb-3 mb-2 border-b select-none ${
              theme === "dark" ? "border-zinc-850 text-zinc-500" : "border-zinc-100 text-zinc-400"
            }`}>
              <span>
                {query ? t(`Matches: ${results.length}`, `Resultados: ${results.length}`) : t("Quick suggestions", "Sugestões de busca")}
              </span>
              <span>
                {t("Click result to navigate", "Clique no item para navegar")}
              </span>
            </div>

            {/* Results Grid / List stack */}
            <div className="space-y-1.5">
              {query.trim() === "" ? (
                // Elegant suggestions list shown when box is empty but focused
                <div className="py-2.5 px-2">
                  <span className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest font-mono mb-2">
                    {t("Search shortcuts:", "Experimente buscar:")}
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { key: "peso", label: t("Alumínio (Peso)", "Peso / Metal") },
                      { key: "acústica", label: t("Acoustics simulation", "Acústica / Sons") },
                      { key: "bateria", label: t("Battery USB-C specs", "Bateria recarregável") },
                      { key: "bluetooth", label: "Bluetooth & Bolt" },
                      { key: "macros", label: t("Macros actions", "Macros Inteligentes") },
                      { key: "FAQ", label: "Perguntas FAQ" }
                    ].map((sugg, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(sugg.key);
                          searchInputRef.current?.focus();
                        }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium cursor-pointer transition-all ${
                          theme === "dark"
                            ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-330"
                            : "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-700 hover:border-zinc-300"
                        }`}
                      >
                        {sugg.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                results.map((item) => {
                  const itemTitle = language === "pt" ? item.titlePt : item.titleEn;
                  const itemDesc = language === "pt" ? item.descPt : item.descEn;
                  const itemCat = language === "pt" ? item.sectionNamePt : item.sectionNameEn;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className={`w-full text-left p-2.5 rounded-xl border flex gap-3 transition-colors cursor-pointer select-none ${
                        theme === "dark"
                          ? "bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700"
                          : "bg-zinc-50/50 border-zinc-100 hover:bg-zinc-50 hover:border-zinc-250 cursor-pointer"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                        theme === "dark" ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-205 border-zinc-200"
                      }`}>
                        {getCategoryIcon(item.category)}
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                            theme === "dark"
                              ? "bg-zinc-950 text-zinc-400 border border-zinc-850"
                              : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                          }`}>
                            {itemCat}
                          </span>
                        </div>
                        <h4 className={`text-xs sm:text-[13px] font-bold mt-1.5 truncate leading-snug ${
                          theme === "dark" ? "text-white" : "text-zinc-900"
                        }`}>
                          {renderHighlightedText(itemTitle, query)}
                        </h4>
                        <p className={`text-[11px] leading-relaxed mt-1 truncate ${
                          theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                        }`}>
                          {renderHighlightedText(itemDesc, query)}
                        </p>
                      </div>

                      <div className="self-center hidden sm:flex h-5 w-5 rounded border border-zinc-200 dark:border-zinc-800 items-center justify-center text-zinc-400">
                        <CornerDownLeft className="h-3 w-3" />
                      </div>
                    </button>
                  );
                })
              ) : (
                // Friendly empty state display when no results correspond to input
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 px-4 flex flex-col items-center justify-center text-center select-none"
                >
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center mb-4 border ${
                    theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-zinc-100 border-zinc-200 text-zinc-500"
                  }`}>
                    <Search className="h-5 w-5" />
                  </div>
                  <h4 className={`text-xs sm:text-sm font-bold ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
                    {t("No compatible specifications found", "Nenhum resultado encontrado")}
                  </h4>
                  <p className={`text-[11px] max-w-xs mt-1.5 leading-relaxed ${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                  }`}>
                    {t(
                      "No details found for \"{query}\". Try searching parameters like \"switch\", \"battery\", \"aluminum\", or \"Bluetooth\"...",
                      "Não encontramos nada relacionado a \"{query}\". Experimente buscar por termos como \"switch\", \"bateria\", \"alumínio\" ou \"Bluetooth\"..."
                    ).replace("{query}", query)}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
