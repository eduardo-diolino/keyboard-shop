/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Sun, Eye, ShieldAlert, Cpu } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function LightingDemo() {
  const [luxLevel, setLuxLevel] = useState<number>(30); // 0 (pitch back) to 100 (sunlight)
  const [lightingMode, setLightingMode] = useState<string>("proximity");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Calculate backlighting brightness based on relative sensor guidelines:
  // Pitch black (0 lux) -> Needs strong backlight (100% brightness)
  // Moderate dim (30 lux) -> Medium backlighting (70% brightness)
  // Office spotlight (100 lux) -> LED automatically turns off (0% brightness) to save battery energy!
  const calculateBacklightLevel = (): number => {
    if (lightingMode === "off") return 0;
    if (lightingMode === "steady") return 80;
    
    // Proximity modes adjust to lux level
    const baseBrightness = Math.max(0, 100 - luxLevel);
    // If proximity mode is on, it only glows when hands hover
    if (lightingMode === "proximity") {
      return isHovered ? baseBrightness : 5; // Ambient standby faint glow
    }
    return baseBrightness;
  };

  const currentBrightness = calculateBacklightLevel();

  return (
    <section
      id="smart-backlighting"
      className={`relative py-24 md:py-32 border-t transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-zinc-950 border-zinc-904 text-zinc-100" 
          : "bg-white border-zinc-200"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
            {t("Smart Backlighting", "Retroiluminação Inteligente")}
          </span>
          <h2 className={`mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}>
            {t("Intellectually Illuminated", "Iluminado Constantemente")}
          </h2>
          <p className={`mt-4 max-w-2xl text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-500"
          }`}>
            {t(
              "The dual-proximity sensors detect your hands to turn on backlighting the microsecond you approach. The ambient photodiode calibrates light strength dynamically.",
              "Os sensores avançados de aproximação detectam o calor das suas mãos para acender as luzes no microssegundo das digitadas. O fotodiodo calibra a intensidade dinamicamente."
            )}
          </p>
        </motion.div>

        {/* Board Simulation */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Simulation Viewport */}
          <motion.div
            id="lighting-viewport-frame"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`lg:col-span-8 flex flex-col justify-between rounded-3xl border p-6 md:p-8 relative overflow-hidden transition-all duration-500 shadow-md ${
              theme === "dark" ? "border-zinc-800" : "border-zinc-200"
            }`}
            style={{
              // Darken environment depending on simulated lux level
              backgroundColor: `rgba(24, 24, 27, ${0.85 + (100 - luxLevel) / 250})`,
              boxShadow: isHovered
                ? `0 0 45px rgba(255, 255, 255, ${currentBrightness / 1100})`
                : "none",
            }}
          >
            {/* Background glowing sphere simulating the LED glow underneath */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] blur-[80px] pointer-events-none transition-all duration-500 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(255, 255, 255, ${
                  (currentBrightness / 100) * 0.12
                }) 0%, transparent 60%)`,
              }}
            />

            {/* Simulated Hand Proximity Warning Header */}
            <div className="relative z-10 flex flex-wrap gap-4 items-center justify-between text-xs font-mono text-zinc-300 border-b border-zinc-800 pb-5">
              <span className="flex items-center gap-1.5 font-bold">
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-305 ${
                    isHovered ? "bg-emerald-400" : "bg-orange-400 animate-pulse"
                  }`}
                />
                {isHovered 
                  ? t("HANDS REGISTERED (ACTIVATED)", "MÃOS DETECTADAS (ATIVADO)") 
                  : t("STANDBY (HOVER TO ACTIVATE)", "PROXIMIDADE AGUARDANDO (APROXIME A MÃO)")
                }
              </span>

              <div className="flex gap-4">
                <span>{t("BACKLIGHT LEVEL:", "LUZ DE FUNDO:")} {currentBrightness.toFixed(0)}%</span>
                <span>
                  {t("AMBIENT:", "AMBIENTE:")}{" "}
                  {luxLevel === 0 
                    ? t("TOTAL DARK", "ESCURIDÃO TOTAL") 
                    : luxLevel < 40 
                    ? t("DIM ROOM", "MEIA LUZ") 
                    : t("BRIGHT SHINE", "CLARIDADE")
                  }
                </span>
              </div>
            </div>

            {/* Keyboard Frame Visual Mockup under ambient control */}
            <div className="my-16 flex items-center justify-center relative">
              <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl relative transition-all">
                {/* Embedded Keyboard layout representation */}
                <div className="space-y-2.5">
                  {[1, 2, 3, 4].map((rowIdx) => (
                    <div key={rowIdx} className="flex gap-2">
                      {Array.from({ length: rowIdx === 4 ? 6 : 10 }).map((_, keyIdx) => {
                        const isSpaceVal = rowIdx === 4 && keyIdx === 2;
                        return (
                          <div
                            key={keyIdx}
                            className="h-6 rounded-md border border-zinc-900 bg-zinc-900 flex-1 relative transition-all duration-500 shadow-sm"
                            style={{
                              flexGrow: isSpaceVal ? 6 : 1,
                              // Render clean edge leakage highlights
                              boxShadow:
                                currentBrightness > 10
                                  ? `0 0 8px rgba(255, 255, 255, ${
                                      (currentBrightness / 100) * 0.25
                                    }), inset 0 0 3px rgba(255, 255, 255, ${
                                      (currentBrightness / 100) * 0.45
                                    })`
                                  : "none",
                              borderColor:
                                currentBrightness > 30
                                  ? `rgba(255, 255, 255, ${(currentBrightness / 100) * 0.3})`
                                  : "#18181b",
                            }}
                          >
                            {/* Inner soft letters */}
                            <div
                              className="absolute inset-0 flex items-center justify-center font-mono text-[6px] text-zinc-500 font-bold transition-all duration-300"
                              style={{
                                color:
                                  currentBrightness > 40
                                    ? `rgba(255, 255, 255, ${(currentBrightness / 100) * 0.95})`
                                    : "#52525b",
                                textShadow:
                                  currentBrightness > 50
                                    ? "0 0 3px rgba(255, 255, 255, 0.4)"
                                    : "none",
                              }}
                            >
                              •
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Hand helper overlay */}
              <AnimatePresence>
                {!isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white"
                  >
                    <Eye className="h-8 w-8 text-white mb-2 animate-pulse" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider">{t("Hover mouse to simulate hands", "Passe o cursor aqui para simular as mãos")}</span>
                    <span className="text-[10px] text-zinc-300 mt-1">{t("Watch how smart presence registers presence", "Observe como os LEDs reagem instantaneamente")}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Warning alerts during low energy thresholds */}
            <div className="relative z-10">
              {CalculateEnergyAlert(luxLevel, currentBrightness) ? (
                <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 text-[11px] text-amber-200 font-mono">
                  <ShieldAlert className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-amber-300 uppercase">{t("OPTIMAL EFFICIENCY MODE", "EFICIÊNCIA ENERGÉTICA ALTA")}</span>
                    <span>{t("Bright room detected. Backlight automatically remaps to low or zero levels to expand structural battery runtime.", "Ambiente claro detectado. O brilho diminui ao máximo para estender a durabilidade da bateria.")}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-[11px] text-emerald-250 font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold block text-emerald-300 uppercase">{t("LOW LIGHT OPTIMIZATION ACTIVE", "OTIMIZAÇÃO EM MEIA-LUZ ATIVA")}</span>
                    <span>{t("Dim room photodiode values lock backplates into highly legible contrast ratios automatically.", "A leitura de baixa luminosidade ativa o contraste traseiro garantindo legibilidade perfeita.")}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Controller Interface Block */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`lg:col-span-4 flex flex-col justify-between border p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-350 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-805 text-zinc-100" : "border-zinc-200 bg-white"
            }`}
          >
            {/* Brightness Adjustment Container */}
            <div>
              <div className="flex items-center gap-2">
                <Sun className={`h-5 w-5 transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`} />
                <span className="font-mono text-xs font-bold text-zinc-500 uppercase">
                  {t("Lux Environment Sensor", "Sensor de Claridade Lux")}
                </span>
              </div>

              {/* Lux Range Control Slider */}
              <div className={`mt-6 border p-4 rounded-2xl transition-all ${
                theme === "dark" ? "border-zinc-800 bg-zinc-950/60" : "border-zinc-200 bg-zinc-50"
              }`}>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-500">{t("Simulation Ambient Level:", "Claridade Ambiente:")}</span>
                  <span className={`font-bold ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>{luxLevel} Lux</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={luxLevel}
                  onChange={(e) => setLuxLevel(Number(e.target.value))}
                  className={`mt-4 w-full h-1 rounded-lg appearance-none cursor-pointer ${
                    theme === "dark" ? "bg-zinc-800 accent-emerald-500" : "bg-zinc-200 accent-zinc-900"
                  }`}
                />

                <div className="mt-3 flex justify-between text-[10px] text-zinc-405 text-zinc-400 font-mono">
                  <span>{t("Midnight Black (0)", "Escuridão (0)")}</span>
                  <span>{t("Office Spot (100)", "Claridade (100)")}</span>
                </div>
              </div>

              {/* Mode Selection Grid */}
              <div id="lighting-modes-grid" className="mt-8">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  {t("Select Backlighting Mode:", "Modo de Iluminação:")}
                </span>
                <div className="mt-3.5 space-y-2.5">
                  {[
                    {
                      id: "proximity",
                      titleEn: "Smart Capacitive Proximity",
                      titlePt: "Sensor de Aproximação Inteligente",
                      descEn: "Lights only when fingers hover. Fades dynamically after 3 seconds of idle.",
                      descPt: "Acende ao aproximar os dedos. Apaga dinamicamente após 3 segundos ocioso.",
                    },
                    {
                      id: "steady",
                      titleEn: "Steady Illuminator Mode",
                      titlePt: "Nível Estático Sempre Ativo",
                      descEn: "Locks at beautiful static 80% strength. Auto-sensor override disabled.",
                      descPt: "Trava em excelentes 80% de brilho constante. Os sensores de presença são ignorados.",
                    },
                    {
                      id: "off",
                      titleEn: "Disabled (Energy Saver)",
                      titlePt: "Apagado (Economia Extrema)",
                      descEn: "LED illumination set to absolute zero. Increases working battery longevity.",
                      descPt: "Iluminação totalmente apagada. Economiza energia para a bateria durar meses.",
                    },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setLightingMode(mode.id)}
                      className={`w-full p-4 rounded-xl border text-left cursor-pointer transition active:scale-98 ${
                        lightingMode === mode.id
                          ? theme === "dark"
                            ? "bg-white text-zinc-950 border-white shadow-lg"
                            : "bg-zinc-900 border-zinc-950 text-white shadow-lg"
                          : theme === "dark"
                          ? "bg-zinc-950 border-zinc-805 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
                          : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${
                          lightingMode === mode.id 
                            ? theme === "dark" ? "text-zinc-950" : "text-white" 
                            : theme === "dark" ? "text-zinc-200" : "text-zinc-850"
                        }`}>
                          {t(mode.titleEn, mode.titlePt)}
                        </span>
                        {lightingMode === mode.id && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                      </div>
                      <p className={`mt-1 text-[11px] leading-snug ${
                        lightingMode === mode.id 
                          ? theme === "dark" ? "text-zinc-800 font-medium" : "text-zinc-300" 
                          : theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                      }`}>
                        {t(mode.descEn, mode.descPt)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart Chips Badge Footer */}
            <div className={`mt-8 border-t pt-5 flex items-center gap-3 text-[11px] text-zinc-400 transition-colors ${
              theme === "dark" ? "border-zinc-800" : "border-zinc-150"
            }`}>
              <Cpu className="h-4.5 w-4.5 animate-pulse text-zinc-500" />
              <span>{t("Embedded micro-photodiode sensor controller", "Controlador com chip de fotodiodo ambiente")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CalculateEnergyAlert(lux: number, led: number): boolean {
  // Return true if high-tier sensor detected daylight and dimmed the keys
  return lux > 60 && led < 40;
}
