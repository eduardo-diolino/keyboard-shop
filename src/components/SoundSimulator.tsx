/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Volume2, Keyboard, Sparkles, Music4, ToggleLeft, ArrowRight, CornerDownLeft } from "lucide-react";
import { SOUND_PRESETS } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function SoundSimulator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("silent-scissor");
  const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({});
  const [typedCount, setTypedCount] = useState<number>(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const handleSearchHighlight = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.presetId) {
        setSelectedPresetId(customEvent.detail.presetId);
      }
    };
    window.addEventListener("search-highlight-sound", handleSearchHighlight);
    return () => window.removeEventListener("search-highlight-sound", handleSearchHighlight);
  }, []);

  const getTranslatedPreset = (id: string, name: string, desc: string) => {
    if (language !== "pt") return { name, desc };
    switch (id) {
      case "silent-scissor":
        return {
          name: "Switches Tesoura MX (Nosso)",
          desc: "Cliques super-suaves de 26dB otimizados acusticamente para máxima concentração."
        };
      case "classic-chiclet":
        return {
          name: "Teclado Chiclete Comum",
          desc: "Som de clique oco de plástico de laptops comuns, com vibração e sem amortecedores."
        };
      case "loud-mechanical":
        return {
          name: "Switch Azul Mecânico",
          desc: "Cliques metálicos estridentes e barulhentos de 68dB que costumam incomodar ao redor."
        };
      default:
        return { name, desc };
    }
  };

  // Initialize Audio Context on demand (lazy loading to prevent startup crashes or block restrictions)
  const getAudioContext = (): AudioContext | null => {
    if (!isAudioEnabled) return null;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }
      return audioContextRef.current;
    } catch (e) {
      console.warn("AudioContext not supported or blocked in this frame environment", e);
      return null;
    }
  };

  // Keystroke Synthesizer Engine
  const synthesizeKeystrokeSound = (presetId: string, customPitchOffset = 1.0) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Direct user action might have happened. Resume if suspended (browser security constraint)
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const { currentTime } = ctx;

    // 1. HIGH-FREQUENCY TRANSIENT SNAP (Scissor hinge or metal casing release)
    const noiseLength = ctx.sampleRate * 0.012; // 12 milliseconds
    const noiseBuffer = ctx.createBuffer(1, noiseLength, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    // Populate white noise
    for (let i = 0; i < noiseLength; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";

    const noiseGain = ctx.createGain();

    // 2. LOW-FREQUENCY RESONATING HUM (Silicone dome rebound click + rigid aluminum deck plate resonance)
    const osc = ctx.createOscillator();
    const oscFilter = ctx.createBiquadFilter();
    const oscGain = ctx.createGain();

    // Configure click parameters according to premium acoustic signatures
    if (presetId === "silent-scissor") {
      // Very quiet, tight high-frequency scissor click, ultra low low-mid resonance
      noiseFilter.frequency.setValueAtTime(5800 * customPitchOffset, currentTime);
      noiseFilter.Q.setValueAtTime(5.0, currentTime);
      noiseGain.gain.setValueAtTime(0.04, currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.008);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(145 * customPitchOffset, currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, currentTime + 0.03);
      oscFilter.type = "lowpass";
      oscFilter.frequency.setValueAtTime(320, currentTime);
      oscGain.gain.setValueAtTime(0.06, currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.024);

    } else if (presetId === "classic-chiclet") {
      // Loose plastic slap high-freq, mid-level hollow volume rebound
      noiseFilter.frequency.setValueAtTime(3800 * customPitchOffset, currentTime);
      noiseFilter.Q.setValueAtTime(1.5, currentTime);
      noiseGain.gain.setValueAtTime(0.18, currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.015);

      osc.type = "sine";
      osc.frequency.setValueAtTime(185 * customPitchOffset, currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, currentTime + 0.04);
      oscFilter.type = "bandpass";
      oscFilter.frequency.setValueAtTime(550, currentTime);
      oscGain.gain.setValueAtTime(0.25, currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.045);

    } else {
      // High pitched piercing metal contact blue switch clack (68dB)
      noiseFilter.frequency.setValueAtTime(8500 * customPitchOffset, currentTime);
      noiseFilter.Q.setValueAtTime(8.0, currentTime);
      noiseGain.gain.setValueAtTime(0.38, currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.018);

      // Extra secondary transient clack
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "sawtooth";
      clickOsc.frequency.setValueAtTime(1200 * customPitchOffset, currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime(800, currentTime + 0.01);
      clickGain.gain.setValueAtTime(0.2, currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.008);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(currentTime);
      clickOsc.stop(currentTime + 0.01);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260 * customPitchOffset, currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, currentTime + 0.06);
      oscFilter.type = "lowpass";
      oscFilter.frequency.setValueAtTime(950, currentTime);
      oscGain.gain.setValueAtTime(0.32, currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.065);
    }

    // Connect nodes
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.connect(oscFilter);
    oscFilter.connect(oscGain);
    oscGain.connect(ctx.destination);

    // Playback
    noiseNode.start(currentTime);
    noiseNode.stop(currentTime + 0.03);

    osc.start(currentTime);
    osc.stop(currentTime + 0.08);
  };

  const handleKeyPress = (key: string, pitchOffset = 1.0) => {
    const token = key.toLowerCase();
    setActiveKeys((prev) => ({ ...prev, [token]: true }));
    setTypedCount((c) => c + 1);

    // Synthesize physical sound waves on feedback loop
    synthesizeKeystrokeSound(selectedPresetId, pitchOffset);

    setTimeout(() => {
      setActiveKeys((prev) => ({ ...prev, [token]: false }));
    }, 180);
  };

  // Capture user typing on physical Sandbox input to map virtual keys highlights
  const handleSandboxKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Basic alphanumeric keycap mapping
    const key = e.key;
    let targetKey = key.toUpperCase();
    let pitchOffset = 1.0;

    if (key === " ") {
      targetKey = "space";
      pitchOffset = 0.75;
    } else if (key === "Enter") {
      targetKey = "enter";
      pitchOffset = 0.85;
    } else if (key === "Backspace") {
      targetKey = "backspace";
      pitchOffset = 0.9;
    } else {
      // Add a tiny bit of random human swing jitter (0.95 to 1.05)
      pitchOffset = 0.95 + Math.random() * 0.1;
    }

    handleKeyPress(targetKey, pitchOffset);
  };

  return (
    <section
      id="sound-simulator"
      className={`relative py-24 md:py-32 border-t transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-zinc-950 border-zinc-904 text-zinc-100" 
          : "bg-zinc-50 border-zinc-200 text-zinc-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
            {t("Acoustic Tuning", "Calibração Acústica")}
          </span>
          <h2 className={`mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}>
            {t("PerfectStroke Keystroke Studio", "Estúdio Acústico PerfectStroke")}
          </h2>
          <p className={`mt-4 max-w-2xl text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-500"
          }`}>
            {t(
              "Standard high switches are loud and unstable. Test our custom whisper-passive scissor mechanism on the virtual board below.",
              "Teclados mecânicos altos comuns são barulhentos e instáveis. Teste nossos switches tipo tesoura silenciosos na placa virtual abaixo."
            )}
          </p>
        </motion.div>

        {/* Studio Setup Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Preset Selector Panel */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`lg:col-span-4 flex flex-col justify-between border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-350 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-805" : "border-zinc-200 bg-white"
            }`}
          >
            <div>
              <div className="flex items-center gap-3">
                <Volume2 className={`h-5 w-5 transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`} />
                <span className="font-mono text-xs font-bold text-zinc-500 uppercase">
                  {t("Acoustic Profiles", "Perfis Acústicos")}
                </span>
              </div>

              <div id="sound-profiles-container" className="mt-6 space-y-3.5">
                {SOUND_PRESETS.map((preset) => {
                  const info = getTranslatedPreset(preset.id, preset.name, preset.description);
                  const isSelected = preset.id === selectedPresetId;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`w-full p-4 rounded-xl border text-left cursor-pointer transition active:scale-98 ${
                        isSelected
                          ? theme === "dark"
                            ? "bg-white text-zinc-950 border-white shadow-lg font-bold"
                            : "bg-zinc-900 border-zinc-950 text-white shadow-lg"
                          : theme === "dark"
                          ? "bg-zinc-950 border-zinc-805 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
                          : "bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-bold ${
                          isSelected
                            ? theme === "dark" ? "text-zinc-950 font-bold" : "text-white"
                            : theme === "dark" ? "text-zinc-100" : "text-zinc-850"
                        }`}>
                          {info.name.replace(" (Our keyboard)", "")}
                        </span>
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        )}
                      </div>
                      <p className={`mt-2 text-xs leading-relaxed ${
                        isSelected
                          ? theme === "dark" ? "text-zinc-800 font-medium" : "text-zinc-300"
                          : theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                      }`}>
                        {info.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audio Toggle Indicator */}
            <div className={`mt-8 border-t pt-6 flex items-center justify-between transition-colors ${
              theme === "dark" ? "border-zinc-805" : "border-zinc-100"
            }`}>
              <span className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                <Music4 className="h-4 w-4" />
                {t("Dampened Sound dampening", "Amortecimento de Ruído")}
              </span>

              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition cursor-pointer ${
                  isAudioEnabled
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : theme === "dark"
                    ? "border-zinc-805 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                    : "border-zinc-200 bg-zinc-100 text-zinc-500"
                }`}
              >
                {isAudioEnabled ? t("Acoustic Synthesizer Active", "Sintetizador Ativo") : t("Keystroke Audio Muted", "Sons Emudecidos")}
              </button>
            </div>
          </motion.div>

          {/* Interactive Keyboard Plate */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`lg:col-span-8 flex flex-col justify-between rounded-2xl border p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-350 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-805" : "border-zinc-200 bg-white"
            }`}
          >
            {/* The Virtual Key Cap Mockups */}
            <div>
              <div className={`flex items-center justify-between text-zinc-400 font-mono text-xs border-b pb-4 mb-6 transition-colors ${
                theme === "dark" ? "border-zinc-800" : "border-zinc-100"
              }`}>
                <span className="flex items-center gap-1.5">
                  <Keyboard className="h-4 w-4" />
                  {t("Tactile Interactive Keyboard Plate", "Placa de Teclas Interativa Táctil")}
                </span>
                <span>{t("CHASSIS: ANODIZED PURE PLATINUM", "CHASSIS: PLATINA PURA ANODIZADA")}</span>
              </div>

              {/* Rows */}
              <div className="space-y-2 max-w-2xl mx-auto">
                {/* Row 1 */}
                <div className="flex gap-2">
                  {["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", t("Mute", "Mudo")].map((key) => {
                    const isFKey = key !== "ESC" && key !== t("Mute", "Mudo");
                    const isActive = activeKeys[key.toLowerCase()];
                    return (
                      <button
                        key={key}
                        onClick={() => handleKeyPress(key, 1.2)}
                        className={`flex flex-1 select-none h-11 items-center justify-center text-[10px] sm:text-xs font-mono font-semibold rounded-lg border cursor-pointer active:scale-95 transition-all outline-none ${
                          isActive
                            ? theme === "dark"
                              ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-bold"
                              : "bg-zinc-950 text-white border-zinc-950 shadow-md"
                            : theme === "dark"
                            ? isFKey
                              ? "bg-zinc-950/40 text-zinc-400 border-zinc-805 hover:bg-zinc-850 hover:text-white"
                              : "bg-zinc-950 border-zinc-805 text-zinc-300 hover:border-zinc-750 hover:bg-zinc-900"
                            : isFKey
                            ? "bg-zinc-50/50 text-zinc-500 border-zinc-200/80 hover:border-zinc-300 hover:text-zinc-900"
                            : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
                        }`}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>

                {/* Row 2 (QWERTY mockup) */}
                <div className="flex gap-2 pl-3">
                  {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => {
                    const isActive = activeKeys[key.toLowerCase()];
                    return (
                      <button
                        key={key}
                        onClick={() => handleKeyPress(key, 1.0 + Math.random() * 0.1)}
                        className={`flex flex-1 h-12 select-none items-center justify-center font-display text-sm font-bold rounded-lg border cursor-pointer active:scale-95 transition-all outline-none ${
                          isActive
                            ? theme === "dark"
                              ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-bold"
                              : "bg-zinc-950 text-white border-zinc-950 shadow-md"
                            : theme === "dark"
                            ? "bg-zinc-950 border-zinc-805 text-zinc-300 hover:border-zinc-750 hover:bg-zinc-900"
                            : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-350 hover:text-zinc-900"
                        }`}
                      >
                        {key}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleKeyPress("backspace", 0.9)}
                    className={`flex-[1.5] flex h-12 items-center justify-center text-[10px] sm:text-xs font-mono rounded-lg border transition ${
                      activeKeys["backspace"]
                        ? theme === "dark"
                          ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-bold"
                          : "bg-zinc-950 text-white border-zinc-950 shadow-md"
                        : theme === "dark"
                        ? "border-zinc-805 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white"
                        : "border-zinc-200 text-zinc-550 bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    {t("Delete", "Apagar")}
                  </button>
                </div>

                {/* Row 3 (ASDF mockup with focus) */}
                <div className="flex gap-2 pl-6">
                  {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => {
                    const isActive = activeKeys[key.toLowerCase()];
                    return (
                      <button
                        key={key}
                        onClick={() => handleKeyPress(key, 1.0 + Math.random() * 0.1)}
                        className={`flex flex-1 h-12 select-none items-center justify-center font-display text-sm font-bold rounded-lg border cursor-pointer active:scale-95 transition-all outline-none ${
                          isActive
                            ? theme === "dark"
                              ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-bold"
                              : "bg-zinc-950 text-white border-zinc-950 shadow-md"
                            : theme === "dark"
                            ? "bg-zinc-950 border-zinc-805 text-zinc-300 hover:border-zinc-750 hover:bg-zinc-900"
                            : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-350 hover:text-zinc-900"
                        }`}
                      >
                        {key}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleKeyPress("enter", 0.85)}
                    className={`flex-[1.8] flex h-12 select-none items-center justify-between px-3.5 font-mono text-[10px] sm:text-xs rounded-lg border transition ${
                      activeKeys["enter"]
                        ? theme === "dark"
                          ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-bold"
                          : "bg-zinc-950 text-white border-zinc-950 shadow-md"
                        : theme === "dark"
                        ? "border-zinc-805 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white"
                        : "border-zinc-200 text-zinc-550 bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    <span>Enter</span>
                    <CornerDownLeft className="h-4 w-4 text-zinc-400" />
                  </button>
                </div>

                {/* Row 4 (Space bar and commands) */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleKeyPress("shift", 0.92)}
                    className={`flex-[1.5] flex h-12 select-none items-center justify-center text-[10px] sm:text-xs font-mono rounded-lg border transition ${
                      activeKeys["shift"]
                        ? theme === "dark"
                          ? "bg-emerald-500 text-zinc-950 border-emerald-400 font-bold"
                          : "bg-zinc-950 text-white border-zinc-950"
                        : theme === "dark"
                        ? "border-zinc-805 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white"
                        : "border-zinc-200 text-zinc-550 bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    Shift
                  </button>
                  <button
                    onClick={() => handleKeyPress("opt/start", 0.95)}
                    className={`flex-1 flex h-12 select-none items-center justify-center text-[10px] sm:text-xs font-mono rounded-lg border transition ${
                      activeKeys["opt/start"]
                        ? theme === "dark"
                          ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                          : "bg-zinc-950 text-white border-zinc-950"
                        : theme === "dark"
                        ? "border-zinc-805 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white"
                        : "border-zinc-200 text-zinc-550 bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    opt
                  </button>
                  <button
                    onClick={() => handleKeyPress("cmd/alt", 0.95)}
                    className={`flex-1 flex h-12 select-none items-center justify-center text-[10px] sm:text-xs font-mono rounded-lg border transition ${
                      activeKeys["cmd/alt"]
                        ? theme === "dark"
                          ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                          : "bg-zinc-950 text-white border-zinc-950"
                        : theme === "dark"
                        ? "border-zinc-805 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white"
                        : "border-zinc-200 text-zinc-550 bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    cmd
                  </button>
                  {/* Space bar */}
                  <button
                    onClick={() => handleKeyPress("space", 0.73)}
                    className={`flex-[5] h-12 select-none rounded-lg border cursor-pointer active:scale-98 transition-all outline-none ${
                      activeKeys["space"]
                        ? theme === "dark"
                          ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md font-bold"
                          : "bg-zinc-950 text-white border-zinc-950 shadow-md"
                        : theme === "dark"
                        ? "bg-zinc-950 border-zinc-805 hover:bg-zinc-900 hover:border-zinc-700"
                        : "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300"
                    }`}
                    aria-label="Space bar"
                  />
                  <button
                    onClick={() => handleKeyPress("cmd/alt", 0.95)}
                    className={`flex-1 flex h-12 select-none items-center justify-center text-[10px] sm:text-xs font-mono rounded-lg border transition ${
                      activeKeys["cmd/alt"]
                        ? theme === "dark"
                          ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                          : "bg-zinc-950 text-white border-zinc-950"
                        : theme === "dark"
                        ? "border-zinc-805 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white"
                        : "border-zinc-200 text-zinc-550 bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    cmd
                  </button>
                  <button
                    onClick={() => handleKeyPress("opt/start", 0.95)}
                    className={`flex-1 flex h-12 select-none items-center justify-center text-[10px] sm:text-xs font-mono rounded-lg border transition ${
                      activeKeys["opt/start"]
                        ? theme === "dark"
                          ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                          : "bg-zinc-950 text-white border-zinc-950"
                        : theme === "dark"
                        ? "border-zinc-805 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white"
                        : "border-zinc-200 text-zinc-550 bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    opt
                  </button>
                </div>
              </div>
            </div>

            {/* Live Sandbox Typing Test Area */}
            <div className={`mt-8 pt-6 border-t text-left transition-colors ${
              theme === "dark" ? "border-zinc-800" : "border-zinc-100"
            }`}>
              <label
                htmlFor="keyboard-sound-sandbox"
                className="block font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider"
              >
                {t(
                  "Keystroke Acoustics Sandbox ({typedCount} keystrokes registered)",
                  "Área de Teste Acústico ({typedCount} toques registrados)"
                ).replace("{typedCount}", typedCount.toString())}
              </label>
              <div className="mt-3 relative">
                <textarea
                  id="keyboard-sound-sandbox"
                  onKeyDown={handleSandboxKeyDown}
                  placeholder={t(
                    "Click inside here and start typing details with your actual laptop keyboard to generate physical scissor tactility click feedback...",
                    "Clique aqui e digite utilizando o seu próprio teclado físico para emular os níveis de ruído suave de digitação em tempo real..."
                  )}
                  rows={2}
                  className={`w-full text-xs sm:text-sm p-4 rounded-xl border outline-none resize-none transition-all ${
                    theme === "dark"
                      ? "bg-zinc-950 border-zinc-805 text-zinc-200 focus:border-zinc-700"
                      : "bg-zinc-50 text-zinc-800 border-zinc-200 focus:border-zinc-400"
                  }`}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                  <span>{t("SANDBOX", "ÁREA DE TESTES")}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
