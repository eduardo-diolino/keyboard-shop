/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

interface FAQItem {
  questionEn: string;
  questionPt: string;
  answerEn: string;
  answerPt: string;
  categoryEn: string;
  categoryPt: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    categoryEn: "OS Compatibility",
    categoryPt: "Compatibilidade de S.O.",
    questionEn: "Does the dual-layouts design work simultaneously on Windows and macOS?",
    questionPt: "O layout duplo funciona simultaneamente no Windows e macOS?",
    answerEn: "Yes, perfectly. The keycaps feature dual Windows and macOS legend symbols (like start/opt and alt/cmd) printed directly on the identical keys. When paired with multiple host devices, the keyboard automatically remap its internal scan-code matrix depending on the system currently in focus.",
    answerPt: "Sim, perfeitamente. As teclas apresentam legendas duplas para Windows e macOS (como start/opt e alt/cmd) impressas nos mesmos botões. Ao alternar entre múltiplos dispositivos, o teclado remapeia automaticamente sua matriz interna dependendo do sistema ativo.",
  },
  {
    categoryEn: "Connectivity",
    categoryPt: "Conectividade",
    questionEn: "What is the difference between Bluetooth LE and the included Logi Bolt Receiver?",
    questionPt: "Qual a diferença entre o Bluetooth LE e o Receptor Logi Bolt incluso?",
    answerEn: "Bluetooth Low Energy allows you to quickly pair with laptops, iPads, or smartphones without inserting any dongle. The Logi Bolt USB Receiver uses a closed 2.4GHz protocol designed for professional enterprise security with extreme immunity to signal noise and virtually zero latency.",
    answerPt: "O Bluetooth Low Energy (LE) permite que você emparelhe rapidamente com notebooks, iPads ou celulares sem precisar de dongles. O receptor USB Logi Bolt usa protocolo fechado de 2,4GHz feito para segurança corporativa profissional, imunidade a ruídos de sinal e latência praticamente nula.",
  },
  {
    categoryEn: "Battery",
    categoryPt: "Bateria",
    questionEn: "Can I use the keyboard continuously while it charges over USB-C?",
    questionPt: "Posso usar o teclado continuamente enquanto ele carrega via USB-C?",
    answerEn: "Absolutely. You can plug the included USB-C cable directly into your host computer or any wall adapter. The keyboard will continue working over wireless or USB protocols uninterrupted while charge-current actively fills the inside lithium-polymer battery.",
    answerPt: "Com certeza. Você pode conectar o cabo USB-C incluído direto no seu computador ou carregador de parede. O teclado funciona via conexões sem fio sem interrupção enquanto a corrente carrega a bateria interna de polímero de lítio.",
  },
  {
    categoryEn: "Smart Actions",
    categoryPt: "Ações Inteligentes",
    questionEn: "How do I map custom macros or Smart Actions to the top row keys?",
    questionPt: "Como mapeio macros ou Ações Inteligentes personalizadas nas teclas superiores?",
    answerEn: "By using the complimentary Logi Options+ software (fully compatible with macOS 12+ and Windows 10+). You can reassign any function key to trigger system-wide commands, macro shortcuts, app opening, mic muting, or emoji panel overlays.",
    answerPt: "Utilizando o software Logi Options+ (totalmente compatível com macOS 12+ e Windows 10+). É possível reconfigurar qualquer tecla de atalho para comandos do sistema, macros avançadas, abrir aplicativos específicos, silenciar o microfone ou abrir o painel de emojis.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const handleSearchHighlight = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (typeof customEvent.detail?.faqIndex === "number") {
        setOpenIndex(customEvent.detail.faqIndex);
      }
    };
    window.addEventListener("search-highlight-faq", handleSearchHighlight);
    return () => window.removeEventListener("search-highlight-faq", handleSearchHighlight);
  }, []);

  return (
    <section id="faq-section" className={`relative py-24 border-t transition-colors duration-300 ${
      theme === "dark" ? "bg-zinc-950 border-zinc-904" : "bg-white border-zinc-200"
    }`}>
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <HelpCircle className="h-8 w-8 text-zinc-400 mb-3" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
            {t("Assistance Desk", "Central de Ajuda")}
          </span>
          <h2 className={`mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}>
            {t("Frequently Asked Queries", "Perguntas Frequentes")}
          </h2>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const category = t(faq.categoryEn, faq.categoryPt);
            const question = t(faq.questionEn, faq.questionPt);
            const answer = t(faq.answerEn, faq.answerPt);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 70, damping: 14, delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? theme === "dark"
                      ? "bg-zinc-900 border-zinc-700 shadow-sm"
                      : "bg-zinc-50 border-zinc-300 shadow-sm"
                    : theme === "dark"
                    ? "bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900/80 hover:border-zinc-700"
                    : "bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-250"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer outline-none group animate-ease-out"
                >
                  <div className="flex flex-col gap-1.5 pr-4">
                    <span className="font-mono text-[9px] font-bold text-zinc-405 uppercase tracking-widest">
                      {category}
                    </span>
                    <span className={`text-sm md:text-base font-bold transition-colors ${
                      theme === "dark" ? "text-white group-hover:text-zinc-200" : "text-zinc-900 group-hover:text-black"
                    }`}>
                      {question}
                    </span>
                  </div>
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center border transition-all ${
                      isOpen
                        ? theme === "dark"
                          ? "rotate-180 bg-zinc-800 border-zinc-700 text-white"
                          : "rotate-180 bg-zinc-150 border-zinc-300 text-zinc-900"
                        : theme === "dark"
                        ? "border-zinc-850 bg-zinc-900 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700"
                        : "border-zinc-200 bg-white text-zinc-500 group-hover:text-zinc-905 group-hover:border-zinc-350"
                    }`}
                  >
                    <ChevronDown className="h-4.5 w-4.5" />
                  </div>
                </button>

                {/* Animated Collapse body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className={`overflow-hidden border-t ${
                        theme === "dark" ? "border-zinc-800 bg-zinc-900/30" : "border-zinc-200 bg-zinc-50/50"
                      }`}
                    >
                      <div className={`px-5 pb-6 md:px-6 md:pb-7 text-xs md:text-sm leading-relaxed pt-4 ${
                        theme === "dark" ? "text-zinc-350" : "text-zinc-650"
                      }`}>
                        <p className="max-w-3xl">{answer}</p>
                        {/* Tick tags */}
                        <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-zinc-500 font-mono">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            {t("Verified Spec", "Especificação Verificada")}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            {t("Compliant firmware preloaded", "Firmware duplo pré-instalado")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Call to bottom options */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="mt-12 text-center text-xs sm:text-sm text-zinc-500 font-mono flex items-center justify-center gap-2"
        >
          <span>{t("Still need assistance customizing?", "Ainda precisa de ajuda para escolher?")}</span>
          <a
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("cta-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            href="#cta-section"
            className={`font-semibold flex items-center gap-1 cursor-pointer hover:underline transition-colors ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            {t("Review Specs Matrix", "Fazer Encomenda")}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
