/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Sparkles, Lock, RotateCcw } from "lucide-react";
import { IMAGES } from "../data";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function CTA() {
  const [selectedPack, setSelectedPack] = useState<string>("solo");
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const { theme } = useTheme();

  const handlePreOrder = () => {
    if (selectedPack === "solo") {
      addToCart({
        id: "solo",
        title: t("MX Keys S (Carbon Solo)", "MX Keys S (Carbono Solo)"),
        price: 109.99,
        desc: t(
          "Includes Advanced Wireless Keyboard, Logi Bolt USB Secure Receiver, and charging USB-C cord.",
          "Inclui teclado sem fio avançado, receptor USB de segurança Logi Bolt e cabo de carregamento USB-C."
        )
      });
    } else {
      addToCart({
        id: "combo",
        title: t("The Ultimate Creator Combo", "Combo Criador Supremo"),
        price: 189.99,
        desc: t(
          "Saves 15%. Includes MX Keys S, Logitech MX Master 3S wireless mouse, and a premium leather desk mat.",
          "Economize 15%. Inclui MX Keys S, mouse sem fio Logitech MX Master 3S e um protetor de mesa premium."
        )
      });
    }
  };

  return (
    <section
      id="cta-section"
      className={`relative py-24 md:py-32 border-t overflow-hidden transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-zinc-950 border-zinc-904 text-zinc-100" 
          : "bg-zinc-50 border-zinc-200 text-zinc-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        {/* Main CTA structure splitting into visual landscape background and order controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Upgrade Your Workspace Landscape */}
          <motion.div
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
              {t("Complete the Ecosystem", "Complete o Ecossistema")}
            </span>
            <h2 className={`mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}>
              {t("Upgrade Your", "Atualize seu")}{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent duration-300 ${
                theme === "dark" ? "from-white via-zinc-200 to-zinc-500" : "from-zinc-900 via-zinc-750 to-zinc-500"
              }`}>
                {t("Workspace", "Espaço de Trabalho")}
              </span>
            </h2>
            <p className={`mt-4 max-w-xl text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-500"
            }`}>
              {t(
                "Experience the perfect confluence of tactile satisfaction and ultimate speed. Bring fluid quietness, unbending aluminum durability, and hand-sensing smart illumination directly onto your physical desk space.",
                "Experimente a confluência perfeita entre satisfação tátil e velocidade ideal. Leve suavidade de digitação, durabilidade do chassi em alumínio e iluminação inteligente diretamente para o seu espaço de trabalho."
              )}
            </p>

            <div className={`mt-8 rounded-2xl border overflow-hidden shadow-md relative group transition-colors duration-300 ${
              theme === "dark" ? "border-zinc-805 bg-zinc-900" : "border-zinc-200 bg-white"
            }`}>
              <img
                src={IMAGES.setup}
                alt="Minimalist design desk setup with Logitech MX Keys S glow at night"
                className="w-full h-auto object-cover rounded-xl group-hover:scale-101 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none opacity-85 transition-all duration-300 ${
                theme === "dark"
                  ? "from-zinc-950 via-zinc-950/20 to-transparent"
                  : "from-white via-white/20 to-transparent"
              }`} />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase text-zinc-400 font-mono tracking-widest">
                    {t("Featured Configuration", "Configuração em Destaque")}
                  </span>
                  <span className={`text-xs font-semibold block transition-colors duration-300 ${
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}>
                    {t("The Creator Desktop Setup", "Espaço do Criador")}
                  </span>
                </div>
                <span className={`text-xs font-mono font-bold border px-3 py-1 rounded-full shadow-sm transition-all duration-300 ${
                  theme === "dark"
                    ? "text-zinc-300 bg-zinc-900/95 border-zinc-800"
                    : "text-zinc-600 bg-white/90 border border-zinc-200"
                }`}>
                  {t("Total Peace & Quiet", "Silêncio & Foco Total")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Checkout Configurator Card */}
          <motion.div
            initial={{ opacity: 0, x: 75 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`lg:col-span-5 border p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-805" : "bg-white border-zinc-200"
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className={`h-4 w-4 transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`} />
                <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  {t("Product Configurator", "Configurador do Produto")}
                </span>
              </div>

              {/* Package Selector */}
              <div id="checkout-packages" className="mt-6 space-y-3">
                {[
                  {
                    id: "solo",
                    title: t("MX Keys S (Carbon Solo)", "MX Keys S (Carbono Solo)"),
                    price: "$109.99",
                    desc: t(
                      "Includes Advanced Wireless Keyboard, Logi Bolt USB Secure Receiver, and charging USB-C cord.",
                      "Inclui teclado sem fio avançado, receptor USB de segurança Logi Bolt e cabo de carregamento USB-C."
                    ),
                    isBest: true,
                  },
                  {
                    id: "combo",
                    title: t("The Ultimate Creator Combo", "Combo Criador Supremo"),
                    price: "$189.99",
                    desc: t(
                      "Saves 15%. Includes MX Keys S, Logitech MX Master 3S wireless mouse, and a premium leather desk mat.",
                      "Economize 15%. Inclui MX Keys S, mouse sem fio Logitech MX Master 3S e um protetor de mesa premium."
                    ),
                    isBest: false,
                  },
                ].map((pack) => {
                  const isSelected = selectedPack === pack.id;
                  return (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedPack(pack.id)}
                      className={`w-full p-4 rounded-xl border text-left flex flex-col justify-between transition-all active:scale-98 cursor-pointer ${
                        isSelected
                          ? theme === "dark"
                            ? "bg-white text-zinc-950 border-white shadow-md"
                            : "bg-zinc-900 border-zinc-950 text-white shadow-md"
                          : theme === "dark"
                          ? "bg-zinc-950 border-zinc-805 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
                          : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-900"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className={`text-sm font-bold block ${
                          isSelected
                            ? theme === "dark" ? "text-zinc-950" : "text-white"
                            : theme === "dark" ? "text-zinc-200" : "text-zinc-900"
                        }`}>
                          {pack.title}
                        </span>
                        <span className={`text-sm font-extrabold ${
                          isSelected
                            ? theme === "dark" ? "text-zinc-950" : "text-white"
                            : theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                        }`}>
                          {pack.price}
                        </span>
                      </div>
                      <p className={`mt-2 text-xs leading-normal ${
                        isSelected
                          ? theme === "dark" ? "text-zinc-800" : "text-zinc-300"
                          : theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                      }`}>
                        {pack.desc}
                      </p>
                      {pack.isBest && (
                        <span className={`mt-3 inline-block self-start font-mono text-[9px] font-bold px-2 py-0.5 rounded transition-all ${
                          isSelected
                            ? theme === "dark"
                              ? "text-emerald-300 bg-emerald-950 border border-emerald-900/60"
                              : "text-emerald-400 bg-emerald-950 border border-emerald-900"
                            : theme === "dark"
                            ? "text-emerald-405 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400"
                            : "text-emerald-700 bg-emerald-50 border border-emerald-200"
                        }`}>
                          {t("Compliant High Demand Pack", "Melhor Escolha / Em Alta")}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Checkouts Buttons */}
            <div className={`mt-8 border-t pt-6 transition-colors ${theme === "dark" ? "border-zinc-800" : "border-zinc-100"}`}>
              <button
                onClick={handlePreOrder}
                className={`w-full flex items-center justify-center gap-2 rounded-full font-semibold py-4 transition text-sm cursor-pointer active:scale-98 shadow-md ${
                  theme === "dark"
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "bg-zinc-900 text-white hover:bg-zinc-850"
                }`}
              >
                {t("Pre-Order Now", "Encomendar Agora")}
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById("features-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`mt-3 w-full flex items-center justify-center gap-2 rounded-full border font-semibold py-3 transition text-sm cursor-pointer ${
                  theme === "dark"
                    ? "border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white hover:border-zinc-700"
                    : "border-zinc-200 bg-white text-zinc-650 hover:text-zinc-900 hover:border-zinc-350"
                }`}
              >
                {t("Learn More", "Saiba Mais")}
              </button>

              {/* Guarantees Badges */}
              <div className={`mt-6 grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-400 font-mono border-t pt-5 transition-colors ${
                theme === "dark" ? "border-zinc-800" : "border-zinc-100"
              }`}>
                <div className="flex flex-col items-center gap-1">
                  <Shield className="h-4.5 w-4.5 text-zinc-400" />
                  <span>{t("2-Year Warranty", "Garantia de 2 anos")}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="h-4.5 w-4.5 text-zinc-400" />
                  <span>{t("30-Day Trial", "30 dias de teste")}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Lock className="h-4.5 w-4.5 text-zinc-400" />
                  <span>{t("Secure Escrow SSL", "Segurança SSL")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
