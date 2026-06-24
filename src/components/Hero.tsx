/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  ChevronDown,
  Cpu, 
  Sparkles
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import heroVideo from "../assets/images/firefly.mp4.mp4";
import heroPoster from "../assets/images/mx_keys_hero_1781635602955.jpg";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Play immediately and ensure loop and muted states are enforced
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const startPlayback = async () => {
      video.muted = true;
      try {
        await video.play();
      } catch (err) {
        console.info("Autoplay unavailable for the hero video:", err);
      }
    };

    startPlayback();
  }, []);

  const handlePreOrder = () => {
    const btn = document.getElementById("btn-nav-order");
    if (btn) btn.click();
  };

  return (
    <section
      id="hero-section"
      className={`relative w-full h-screen flex flex-col justify-between items-center overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      {/* 1. IMMERSIVE FULL-BLEED VIDEO BACKDROP (Covers the entire screen, styled for light/dark mode) */}
      <div className={`absolute inset-0 z-0 transition-colors duration-300 ${theme === "dark" ? "bg-zinc-950" : "bg-zinc-100"}`}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroPoster}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            theme === "dark"
              ? "opacity-[0.55] filter contrast-110 saturate-[0.90] brightness-[0.85]"
              : "opacity-[0.62] mix-blend-multiply filter contrast-112 saturate-[0.85] brightness-[1.01]"
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-typing-on-a-computer-keyboard-43085-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Cinematic Sleek Gradient Overlays for High Text Contrast */}
        <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none transition-all duration-300 ${
          theme === "dark"
            ? "from-zinc-950 via-zinc-950/30 to-zinc-950/15"
            : "from-zinc-50 via-zinc-50/10 to-zinc-50/50"
        }`} />
        <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
          theme === "dark" ? "bg-black/15" : "bg-white/20"
        }`} />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.06] pointer-events-none" />
      </div>

      {/* 2. TOP HUD NAVIGATION RAIL */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 pt-8 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase">
          <Cpu className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
          <span className={theme === "dark" ? "text-zinc-400" : "text-zinc-500"}>
            {t("MX Series / Structural Anatomy", "Séries MX / Anatomia Estrutural")}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className={theme === "dark" ? "text-zinc-400" : "text-zinc-500"}>
            {t("Active Loop: Deconstruction", "Loop Ativo: Desconstrução")}
          </span>
        </div>
      </div>

      {/* 3. CENTER FLOATING CONTENT CORE */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Elegant Badge Tag */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-md shadow-sm transition-colors duration-300 ${
            theme === "dark" ? "border-zinc-805 bg-zinc-900/60" : "border-zinc-200 bg-white/80"
          }`}
        >
          <Sparkles className="h-3 w-3 text-emerald-600" />
          <span className={`font-mono text-[9px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-700"
          }`}>
            {t("Precision Re-engineered", "Precisão Reengenheirada")}
          </span>
        </motion.div>

        {/* Cinematic Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className={`mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] select-none transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-zinc-950"
          }`}
        >
          {t("Precision Meets", "A Precisão Encontra a Performance")} <br />
          <span className={`bg-gradient-to-r bg-clip-text text-transparent duration-300 ${
            theme === "dark" ? "from-white via-zinc-100 to-zinc-500" : "from-zinc-900 via-zinc-800 to-zinc-600"
          }`}>
            {t("Performance")}
          </span>
        </motion.h1>

        {/* Descriptive Pitch */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mt-5 text-sm sm:text-base leading-relaxed max-w-xl font-normal select-none drop-shadow-sm transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {t(
            "Designed for professionals who demand speed, comfort, and reliability. Handcrafted with low-profile dished keycaps on a solid, unbending magnesium steel core.",
            "Projetado para criativos de elite que exigem velocidade, conforto e confiabilidade máxima. Chassi reforçado com teclas côncavas de perfil baixo em um corpo firme de magnésio."
          )}
        </motion.p>

        {/* Premium CTA Order Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          <button
            onClick={handlePreOrder}
            className={`flex items-center justify-center gap-2.5 rounded-full font-semibold px-8 py-3.5 transition active:scale-97 text-xs sm:text-sm cursor-pointer shadow-lg duration-300 ${
              theme === "dark" ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 hover:bg-zinc-850 text-white"
            }`}
          >
            {t("Order Premium Keyboard", "Comprar Teclado Premium")}
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <a
            href="#perfect-stroke"
            className={`flex items-center justify-center gap-1.5 transition text-xs font-mono tracking-widest uppercase py-2 cursor-pointer duration-300 ${
              theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            {t("Explore Specs", "Explorar Ficha Técnica")}
          </a>
        </motion.div>

      </div>

      {/* 4. FOOTER STATS STRIP & SCROLL GUIDE */}
      <div className={`relative z-10 w-full max-w-7xl px-6 md:px-12 pb-8 flex justify-between items-end border-t pt-4 transition-all duration-300 ${
        theme === "dark"
          ? "border-zinc-800 bg-gradient-to-t from-zinc-950 to-transparent"
          : "border-zinc-200/60 bg-gradient-to-t from-zinc-50 to-transparent"
      }`}>
        <div className="flex flex-col gap-1 font-mono text-[8px] uppercase tracking-wider text-zinc-500">
          <span className={`text-[9px] font-semibold transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-700"
          }`}>
            {t("CHASSIS CORE", "NÚCLEO DO CHASSI")}
          </span>
          <span>{t("ELEVATION: 8.5° PREMIUM", "INCLINAÇÃO: 8.5° PREMIUM")}</span>
        </div>
        
        {/* Beautiful Scroll Down indicator */}
        <div className="flex flex-col items-center gap-1.5 animate-bounce">
          <span className="text-[8px] font-mono text-zinc-500 tracking-[0.25em] uppercase">{t("Scroll to Discover", "Role para Descobrir")}</span>
          <ChevronDown className="h-4 w-4 text-emerald-600" />
        </div>

        <div className="text-right flex flex-col gap-1 font-mono text-[8px] uppercase tracking-wider text-zinc-500">
          <span className={`text-[9px] font-semibold transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-700"
          }`}>
            {t("HARDWARE GRAPHICS", "GRÁFICOS DE REALIDADE")}
          </span>
          <span>{t("RENDER LOCK: SOURCE", "ESTATURAS: REALISTA")}</span>
        </div>
      </div>
    </section>
  );
}
