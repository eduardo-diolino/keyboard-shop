/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Check, X, ShieldCheck, ChevronRight, Laptop, HelpCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function SpecsCompare() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeSpecCategory, setActiveSpecCategory] = useState<string>("Physical Dimensions");

  // Localized Specifications structure so all terms translate seamlessly
  const localizedSpecifications = [
    {
      categoryKey: "Physical Dimensions",
      categoryTitle: t("Physical Dimensions", "Dimensões Físicas"),
      items: [
        { label: t("Height", "Altura"), value: "131.63 mm" },
        { label: t("Width", "Largura"), value: "430.20 mm" },
        { label: t("Depth", "Profundidade"), value: "20.50 mm" },
        { label: t("Weight", "Peso"), value: t("810 g (28.57 oz) - Premium solid metal plate center", "810 g - Chassi interno com placa de metal premium") }
      ]
    },
    {
      categoryKey: "Connectivity & Wireless",
      categoryTitle: t("Connectivity & Wireless", "Conectividade Sem Fio"),
      items: [
        { label: t("Bluetooth", "Bluetooth"), value: t("Bluetooth Low Energy (BLE) with multi-profile memory", "Bluetooth Low Energy (BLE) com perfis memorizados") },
        { label: t("USB Receiver", "Receptor USB"), value: t("Logi Bolt USB Secure Wireless Receiver (included)", "Receptor sem fio de segurança Logi Bolt (incluso)") },
        { label: t("Wireless Range", "Alcance Sem Fio"), value: t("Up to 10 meters (33 feet) secure pairing range", "Até 10 metros de alcance com criptografia segura") },
        { label: t("Multi-Device Sync", "Multi-Dispositivo"), value: t("Easy-Switch keys for up to 3 individual host devices", "Teclas Easy-Switch para parear até 3 dispositivos") }
      ]
    },
    {
      categoryKey: "Power & Battery Status",
      categoryTitle: t("Power & Battery Status", "Energia e Bateria"),
      items: [
        { label: t("Battery Chemistry", "Química da Bateria"), value: t("Rechargeable Lithium-Polymer (Li-Po, 1500 mAh)", "Polímero de Lítio Recarregável (Li-Po, 1500 mAh)") },
        { label: t("LED Brightness On", "Luz de Fundo Ativa"), value: t("Up to 10 days of continuous operation with smart backlight active", "Até 10 dias de uso direto com iluminação inteligente ativa") },
        { label: t("LED Brightness Off", "Luz de Fundo Desligada"), value: t("Up to 5 months (approx. 150 days) with backlight turned off", "Até 5 meses (aprox. 150 dias) com a iluminação desligada") },
        { label: t("Recharge Port", "Porta de Recarga"), value: t("USB Type-C port, supports 5W fast-charging", "Porta USB Tipo-C com suporte a recarga rápida de 5W") }
      ]
    },
    {
      categoryKey: "Smart Sensing Technologies",
      categoryTitle: t("Smart Sensing Technologies", "Sensores Inteligentes"),
      items: [
        { label: t("Proximity Sensors", "Sensores de Presença"), value: t("Dual capacitive sensors trigger backlight at 5cm hand approach", "Sensores capacitivos duplos ativam a luz a 5cm das mãos") },
        { label: t("Lux Level Sensors", "Sensor Ambient de Luz"), value: t("Ambient photodiode calibrates backlight automatically to room conditions", "Fotodiodo ambiente calibra o brilho de acordo com a sala") },
        { label: t("Status Monitors", "Indicadores de Status"), value: t("Dedicated Caps Lock state, battery monitor, and wireless channel LED indicators", "LEDs dedicados para Caps Lock, nível de bateria e canal ativo") }
      ]
    }
  ];

  const selectedSpecObj =
    localizedSpecifications.find((s) => s.categoryKey === activeSpecCategory) || localizedSpecifications[0];

  // Localized Comparisons structure
  const localizedComparisons = [
    {
      name: t("The Advanced Wireless (Our keyboard)", "O Teclado Avançado (Nosso Teclado)"),
      isMain: true,
      chassis: t("Premium Single Anodized Metal Frame", "Chassi de Alumínio Anodizado Premium"),
      keycaps: t("Spherically-dished layout matching fingertips", "Teclas côncavas sob medida para os dedos"),
      illumination: t("Automatic capacitive proximity smart LED", "Sensor automático de presença capacitivo"),
      batteryLife: t("5 months (LED off) / USB-C Rapid", "Até 5 meses (LEDs desativados) / USB-C"),
      rating: "4.9 / 5.0"
    },
    {
      name: t("Traditional Mechanical Keyboards", "Teclados Mecânicos Comuns"),
      isMain: false,
      chassis: t("Prone to flexing plastic or heavy steel casings", "Plástico flexível ou aço barulhento e pesado"),
      keycaps: t("Generic cylindrical/flat high keycaps", "Teclas cilíndricas comuns ou altas e planas"),
      illumination: t("Static RGB illumination or unlit keys", "Iluminação RGB estática ou sem iluminação"),
      batteryLife: t("3 to 7 days rechargeable average", "Média de 3 a 7 dias de recarga contínua"),
      rating: "4.4 / 5.0"
    },
    {
      name: t("Budget Chiclet Membrane", "Teclados de Membrana Simples"),
      isMain: false,
      chassis: t("Thin hollow plastic with extensive bending", "Plástico oco fino com torção constante"),
      keycaps: t("Cheap flat ABS square caps", "Teclas planas em ABS simples"),
      illumination: t("No backlight or uneven solid lighting", "Sem iluminação ou brilho fraco e desigual"),
      batteryLife: t("Requires AAA disposable batteries", "Exige pilhas AAA descartáveis"),
      rating: "3.2 / 5.0"
    }
  ];

  return (
    <section
      id="tech-specs"
      className={`relative py-24 md:py-32 border-t transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-zinc-950 border-zinc-904 text-zinc-100" 
          : "bg-zinc-50 border-zinc-200 text-zinc-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
            {t("Hardware Comparison", "Comparação de Hardware")}
          </span>
          <h2 className={`mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}>
            {t("Uncompromising Specifications", "Especificações sem Compromissos")}
          </h2>
          <p className={`mt-4 max-w-2xl text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-500"
          }`}>
            {t(
              "Every layer from the premium materials to high-tier battery cells is engineered to elevate your daily professional flow.",
              "Cada camada, desde o chassi anodizado até as células de bateria de alto desempenho, é projetada para elevar o seu dia a dia profissional."
            )}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Block: Technical Specifications Category Explorer */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`lg:col-span-7 border p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-zinc-900 border-zinc-805"
                : "bg-white border-zinc-200"
            }`}
          >
            <h3 className={`font-display text-xl font-bold tracking-tight mb-6 transition-colors ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}>
              {t("Technical Specifications", "Especificações Técnicas")}
            </h3>

            {/* Spec Category Selector Tabs */}
            <div className={`flex flex-wrap gap-2 pb-6 border-b mb-8 transition-colors ${
              theme === "dark" ? "border-zinc-800" : "border-zinc-100"
            }`}>
              {localizedSpecifications.map((spec) => (
                <button
                  key={spec.categoryKey}
                  onClick={() => setActiveSpecCategory(spec.categoryKey)}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${
                    spec.categoryKey === activeSpecCategory
                      ? theme === "dark"
                        ? "bg-white text-zinc-950 border-white font-bold shadow-sm"
                        : "bg-zinc-900 text-white border-zinc-950 font-bold shadow-sm"
                      : theme === "dark"
                      ? "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white hover:border-zinc-650"
                      : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:text-zinc-900 hover:border-zinc-350"
                  }`}
                >
                  {spec.categoryTitle}
                </button>
              ))}
            </div>

            {/* Spec Attributes Browser */}
            <div id="specs-list-group" className="space-y-4">
              {selectedSpecObj.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 h-auto sm:h-12 transition-colors ${
                    theme === "dark" ? "border-zinc-805" : "border-zinc-100"
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase shrink-0">
                    {item.label}
                  </span>
                  <span className={`text-xs sm:text-sm font-semibold sm:text-right transition-colors ${
                    theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-[11px] text-zinc-400 font-mono italic">
              <Laptop className="h-4.5 w-4.5 text-zinc-500" />
              <span>{t("Full key commands customizable via Logi Options+ (Win/Mac)", "Mapeamento completo de teclas via Logi Options+ (Win/Mac)")}</span>
            </div>
          </motion.div>

          {/* Right Block: Product Comparison Grid */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className="lg:col-span-5 flex flex-col justify-between h-auto"
          >
            <div className={`border p-6 md:p-8 rounded-2xl w-full shadow-sm hover:shadow-lg transition-all duration-305 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-805" : "bg-white border-zinc-200"
            }`}>
              <h3 className={`font-display text-xl font-bold tracking-tight mb-6 transition-colors ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}>
                {t("How It Compares", "Como Ele Se Compara")}
              </h3>

              <div id="comparison-products-stack" className="space-y-4">
                {localizedComparisons.map((product, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition ${
                      product.isMain
                        ? theme === "dark"
                          ? "bg-zinc-950 text-white border-emerald-500/30 shadow-inner"
                          : "bg-zinc-900 text-white border-zinc-950 shadow-md"
                        : theme === "dark"
                        ? "bg-zinc-900/50 border-zinc-800 text-zinc-300"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <div className={`flex justify-between items-center border-b pb-2 ${
                      product.isMain 
                        ? theme === "dark" ? "border-zinc-800" : "border-zinc-800" 
                        : theme === "dark" ? "border-zinc-800/60" : "border-zinc-150"
                    }`}>
                      <div>
                        <span className={`text-xs sm:text-sm font-bold block ${
                          product.isMain ? "text-white" : theme === "dark" ? "text-zinc-200" : "text-zinc-900"
                        }`}>
                          {product.name}
                        </span>
                        {product.isMain && (
                          <span className="inline-block mt-1 font-mono text-[8px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900 uppercase">
                            {t("THE DESIGN STANDARD", "MÁXIMA COMODIDADE")}
                          </span>
                        )}
                      </div>
                      <span className={`font-mono text-[10px] font-extrabold ${
                        product.isMain ? "text-zinc-400" : "text-zinc-500"
                      }`}>
                        {product.rating} {t("Rating", "Avaliação")}
                      </span>
                    </div>

                    {/* Compare Attributes */}
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider block text-zinc-400">
                          {t("Framework & Chassis", "Estrutura & Chassi")}
                        </span>
                        <span className={`font-medium block mt-0.5 leading-snug ${
                          product.isMain ? "text-zinc-200" : theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                        }`}>
                          {product.chassis}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider block text-zinc-400">
                          {t("Switch Keycaps", "Layout das Teclas")}
                        </span>
                        <span className={`font-medium block mt-0.5 leading-snug ${
                          product.isMain ? "text-zinc-200" : theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                        }`}>
                          {product.keycaps}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider block text-zinc-400">
                          {t("Illumination Technology", "Iluminação Traseira")}
                        </span>
                        <span className={`font-medium block mt-0.5 leading-snug ${
                          product.isMain ? "text-zinc-200" : theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                        }`}>
                          {product.illumination}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider block text-zinc-400">
                          {t("Active Battery Life", "Autonomia de Bateria")}
                        </span>
                        <span className={`font-medium block mt-0.5 leading-snug ${
                          product.isMain ? "text-zinc-200" : theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                        }`}>
                          {product.batteryLife}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
