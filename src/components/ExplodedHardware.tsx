/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Sparkles, HelpCircle } from "lucide-react";
import { EXPLODED_LAYERS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function ExplodedHardware() {
  const [selectedLayerId, setSelectedLayerId] = useState<number>(1);
  const [isExploded, setIsExploded] = useState<boolean>(true);
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const handleSearchHighlight = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.layerId) {
        setSelectedLayerId(customEvent.detail.layerId);
      }
    };
    window.addEventListener("search-highlight-layer", handleSearchHighlight);
    return () => window.removeEventListener("search-highlight-layer", handleSearchHighlight);
  }, []);

  const baseLayer = EXPLODED_LAYERS.find((l) => l.id === selectedLayerId) || EXPLODED_LAYERS[0];

  // Dynamically get Brazilian Portuguese translations if selected language is pt
  const getTranslatedLayer = (id: number) => {
    switch (id) {
      case 1:
        return {
          name: "Teclas com Encaixe Esférico",
          description: "Teclas retangulares com concavidades esféricas personalizadas ajustadas perfeitamente para as pontas dos dedos.",
          spec: "Legendas em layout duplo, gravação a laser, cobertura fosca acetinada resistente a óleos",
          details: [
            "Desenhado especificamente para acompanhar a curvatura natural de seus dedos",
            "Aumenta a precisão e velocidade centralizando dinamicamente os cliques",
            "Layout duplo com marcação macOS e Windows integradas nas mesmas teclas"
          ]
        };
      case 2:
        return {
          name: "Switches Tesoura de Perfil Baixo",
          description: "Mecanismo tipo tesoura extremamente silencioso e responsivo, projetado para toques curtos e nítidos.",
          spec: "Curso de 1.8mm, força de amortecimento suave, toque silencioso e estável",
          details: [
            "Hastes estabilizadoras em formato de tesoura evitam oscilação lateral",
            "Toque ágil elimina qualquer folga física para ativações 100% confiáveis",
            "Projetado para reduzir picos de alta frequência, mantendo a digitação quase inaudível"
          ]
        };
      case 3:
        return {
          name: "Membrana Amortecedora de Silicone",
          description: "Manta de silicone moldada de alta uniformidade para toque amortecido e confortável.",
          spec: "Resistência de fim de curso calibrada de 60g, barreira protetora contra poeira",
          details: [
            "Transforma a pressão dos dedos em um contato elétrico limpo",
            "Ajustada acusticamente para absorver vibrações internas do clique",
            "Garante vida útil estendida para mais de 10 milhões de toques por tecla"
          ]
        };
      case 4:
        return {
          name: "Atuadores Inteligentes e Layout Interno",
          description: "Circuito impresso flexível ultrafino que aciona e detecta os cliques com máxima precisão mecânica.",
          spec: "Matriz anti-ghosting otimizada de 10 teclas simultâneas, soldas 100% sem chumbo",
          details: [
            "Conecta os interruptores de borracha às trilhas elétricas lógicas",
            "Camada de blindagem de alto desempenho dissipa cargas de estática passiva",
            "Taxa de varredura ultrarrápida garante latência ultrabaixa para digitadores velozes"
          ]
        };
      case 5:
        return {
          name: "Chassi Superior de Alumínio Anodizado",
          description: "Placa frontal sólida usinada em alumínio de grau espacial de baixo carbono para extrema estabilidade.",
          spec: "Alumínio reciclado de alta resistência, anodização fosca de 15 mícrons",
          details: [
            "Fornece rigidez estrutural absoluta eliminando torções durante a digitação",
            "Tratamento superficial acetinado premium resistente a arranhões e marcas",
            "Base de aterramento integrada para máxima imunidade eletromagnética"
          ]
        };
      case 6:
        return {
          name: "Placa Base e Bateria Recarregável",
          description: "Gabinete inferior que abriga a bateria Li-Po e o receptor de gerenciamento inteligente de energia.",
          spec: "Bateria Li-Po de 1500mAh, até 5 meses de economia inteligente com luz desligada",
          details: [
            "O pino de segurança robusto aloja conectores de carregamento USB-C reforçados",
            "Circuito de carregamento rápido inteligente recupera bateria em minutos para dias de trabalho",
            "Pés antiderrapantes de borracha natural vulcanizada mantém o teclado firme na mesa"
          ]
        };
      default:
        return null;
    }
  };

  const ptTrans = getTranslatedLayer(baseLayer.id);
  const selectedLayer = {
    id: baseLayer.id,
    name: language === "pt" && ptTrans ? ptTrans.name : baseLayer.name,
    description: language === "pt" && ptTrans ? ptTrans.description : baseLayer.description,
    spec: language === "pt" && ptTrans ? ptTrans.spec : baseLayer.spec,
    details: language === "pt" && ptTrans ? ptTrans.details : baseLayer.details,
  };

  return (
    <section
      id="exploded-hardware"
      className={`relative py-24 md:py-32 border-t overflow-hidden transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-zinc-950 border-zinc-904 text-zinc-100" 
          : "bg-white border-zinc-200"
      }`}
    >
      {/* Dynamic glow spotlight */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full blur-[120px] transition-colors duration-300 ${
          theme === "dark" ? "bg-zinc-900/40" : "bg-zinc-100/80"
        }`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="flex flex-col items-center text-center"
        >
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${
            theme === "dark"
              ? "bg-zinc-905 bg-zinc-900 border-zinc-800 text-zinc-400"
              : "bg-zinc-50 border-zinc-200 text-zinc-500"
          }`}>
            {t("Internal Architecture", "Arquitetura Interna")}
          </span>
          <h2 className={`mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}>
            {t("Exploded Hardware Architecture", "Estrutura Modular Explodida")}
          </h2>
          <p className={`mt-4 max-w-2xl text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-500"
          }`}>
            {t(
              "Witness the multi-tier engineering inside the ultra-thin form factor. Tap any structural layer to reveal specs, materials, and unique details.",
              "Testemunhe a engenharia multicamadas dentro do corpo ultra-fino. Clique em qualquer camada para revelar dados técnicos e materiais."
            )}
          </p>
        </motion.div>

        {/* Modular Content Panel */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Panel: 3D-feel Exploded Graphic simulation Stack */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className={`lg:col-span-6 flex flex-col items-center justify-center rounded-2xl border p-6 md:p-8 min-h-[480px] shadow-sm hover:shadow-lg transition-all duration-300 ${
              theme === "dark"
                ? "border-zinc-805 bg-zinc-900/40"
                : "border-zinc-200 bg-zinc-50/50"
            }`}
          >
            {/* View Interactive Control Toggles */}
            <div className={`flex items-center gap-4 border p-1.5 rounded-xl mb-12 transition-all duration-300 ${
              theme === "dark" ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-zinc-105 bg-zinc-100"
            }`}>
              <button
                onClick={() => setIsExploded(true)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  isExploded
                    ? theme === "dark"
                      ? "bg-white text-zinc-950 font-bold shadow-sm"
                      : "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {t("Exploded State", "Visão Explodida")}
              </button>
              <button
                onClick={() => setIsExploded(false)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  !isExploded
                    ? theme === "dark"
                      ? "bg-white text-zinc-950 font-bold shadow-sm"
                      : "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {t("Assembled State", "Visão Montada")}
              </button>
            </div>

            {/* Vertical Stack Layer Playground */}
            <div className="relative h-[250px] w-full max-w-sm flex flex-col justify-center items-center">
              {EXPLODED_LAYERS.map((layer) => {
                const isActive = layer.id === selectedLayerId;
                // Calculate dynamic structural visual hover offsets based on exploded state
                const yOffset = isExploded ? layer.offsetY : 0;
                // Dark color shading for layered visuals
                const opacityVal = isActive ? 1 : 0.45;
                const scaleVal = isActive ? 1.05 : 0.95;

                const transName = language === "pt" && getTranslatedLayer(layer.id) ? getTranslatedLayer(layer.id)!.name : layer.name;

                return (
                  <motion.div
                    key={layer.id}
                    onClick={() => setSelectedLayerId(layer.id)}
                    animate={{
                      y: yOffset,
                      scale: scaleVal,
                      opacity: opacityVal,
                      zIndex: isActive ? 20 : 10 - layer.id,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 15,
                    }}
                    className={`absolute w-full h-[18px] rounded-sm cursor-pointer border shadow-md transition-all flex items-center justify-between px-4 ${
                      isActive
                        ? theme === "dark"
                          ? "bg-white text-zinc-950 border-white font-bold"
                          : "bg-zinc-900 text-white border-zinc-950 font-bold"
                        : theme === "dark"
                        ? "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850"
                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="font-mono text-[9px] shrink-0 mr-3">
                      L0{layer.id}
                    </span>
                    <span className="text-[10px] truncate max-w-[200px]">
                      {transName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-80" />
                  </motion.div>
                );
              })}

              {/* Dynamic Line indicators showing the layered system */}
              {isExploded && (
                <div className={`absolute top-[5%] bottom-[5%] w-[1px] border-l border-dashed pointer-events-none -z-10 ${
                  theme === "dark" ? "border-zinc-800" : "border-zinc-205 border-zinc-200"
                }`} />
              )}
            </div>

            {/* Micro instructions spacer */}
            <p className="mt-8 text-center text-[11px] text-zinc-400 font-mono italic">
              {t(
                "*Click on any layer above or on the list to inspect hardware specifications",
                "*Clique em qualquer camada acima ou no menu numérico para inspecionar"
              )}
            </p>
          </motion.div>

          {/* Right Panel: Selected Level Hardware Specifications Info Board */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            {/* Quick layer list index */}
            <div className={`grid grid-cols-6 gap-2 border-b pb-5 transition-colors ${
              theme === "dark" ? "border-zinc-800" : "border-zinc-100"
            }`}>
              {EXPLODED_LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`py-2 text-xs font-mono font-bold rounded-md transition cursor-pointer border ${
                    layer.id === selectedLayerId
                      ? theme === "dark"
                        ? "bg-white text-zinc-950 border-white shadow-sm"
                        : "bg-zinc-900 text-white border-zinc-950 shadow-sm"
                      : theme === "dark"
                      ? "text-zinc-500 hover:text-white border-transparent hover:border-zinc-800 bg-transparent"
                      : "text-zinc-400 bg-transparent border-transparent hover:text-zinc-900"
                  }`}
                >
                  0{layer.id}
                </button>
              ))}
            </div>

            {/* Active Layer Description */}
            <div className="mt-8 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-zinc-400">
                  {t(`LAYER MODULE 0${selectedLayer.id}`, `MÓDULO DE CAMADA 0${selectedLayer.id}`)}
                </span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span className={`rounded border px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase transition-colors ${
                  theme === "dark"
                    ? "bg-zinc-900 border-zinc-800 text-zinc-450 text-zinc-400"
                    : "bg-zinc-100 border-zinc-200 text-zinc-500"
                }`}>
                  {t("Pristine Fitment", "Ajuste Perfeito")}
                </span>
              </div>

              <h3 className={`mt-4 font-display text-2xl font-bold tracking-tight transition-colors ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}>
                {selectedLayer.name}
              </h3>

              <p className={`mt-3 text-sm leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-500"
              }`}>
                {selectedLayer.description}
              </p>

              {/* Technical Spec Box */}
              <div className={`mt-6 rounded-xl border p-4.5 transition-colors ${
                theme === "dark" ? "border-zinc-805 bg-zinc-950/60" : "border-zinc-200 bg-zinc-50"
              }`}>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  {t("Engineering Spec Data:", "Dados Tecnológicos de Engenharia:")}
                </span>
                <p className={`mt-1 text-xs font-semibold font-mono flex items-center gap-2 transition-colors ${
                  theme === "dark" ? "text-white" : "text-zinc-900"
                }`}>
                  <ArrowUpRight className="h-4.5 w-4.5 text-zinc-400 shrink-0" />
                  {selectedLayer.spec}
                </p>
              </div>

              {/* Checklist list */}
              <div className="mt-8 space-y-3.5">
                {selectedLayer.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full shadow-sm transition-colors ${
                      theme === "dark"
                        ? "bg-zinc-900 border border-zinc-800 text-white"
                        : "bg-zinc-100 border border-zinc-200 text-zinc-900"
                    }`}>
                      <Check className="h-3 w-3" />
                    </div>
                    <span className={`text-xs sm:text-sm leading-snug transition-colors duration-300 ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                    }`}>
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support notification banner */}
            <div className={`mt-8 border-t pt-6 flex items-center justify-between text-[11px] font-mono transition-all ${
              theme === "dark" ? "border-zinc-800 text-zinc-400" : "border-zinc-150 text-zinc-400"
            }`}>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                {t("Dual Windows/Mac firmware preloaded", "Firmware duplo para Win/Mac pré-instalado")}
              </span>
              <span>{t("100% recyclable aluminum", "Alumínio 100% reciclável")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
