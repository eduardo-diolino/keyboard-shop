/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Target, Wind, Layers } from "lucide-react";
import { IMAGES } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Showcase() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section
      id="product-showcase"
      className={`relative py-24 md:py-32 border-t transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-zinc-950 border-zinc-900 text-zinc-100" 
          : "bg-zinc-50 border-zinc-200 text-zinc-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
            {t("Crafted Engineering", "Engenharia de Precisão")}
          </span>
          <h2 className={`mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}>
            {t("Every Detail, Made With Purpose", "Cada Detalhe, Feito com Propósito")}
          </h2>
          <p className={`mt-4 max-w-2xl text-sm sm:text-base transition-colors duration-300 leading-relaxed ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-500"
          }`}>
            {t(
              "Every millimeter of the keyboard is physically crafted to perfection. From the spherical curvature of the keycaps to the dampening acoustic foam, precision meets tactile luxury.",
              "Cada milímetro do teclado é esculpido para a perfeição física. Da curvatura esférica das teclas ao amortecimento acústico, a precisão se une ao extremo conforto."
            )}
          </p>
        </motion.div>

        {/* Bento Grid Concept */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Item 1: Large Keycap Spherically Dished with Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 70, damping: 16 }}
            className={`lg:col-span-7 overflow-hidden rounded-2xl border p-6 md:p-8 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300 ${
              theme === "dark"
                ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-100"
                : "bg-white border-zinc-200 hover:border-zinc-300 text-zinc-900"
            }`}
          >
            <div>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                  theme === "dark" ? "bg-zinc-800 border-zinc-705 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
                }`}>
                  <Target className="h-5.5 w-5.5" />
                </div>
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-500 capitalize">
                  {t("Ergonomic Interface", "Interface Ergonômica")}
                </span>
              </div>
              <h3 className={`mt-5 font-display text-2xl font-bold tracking-tight transition-colors ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}>
                {t("PerfectStroke Spherically-Dished Keys", "Teclas PerfectStroke com Encaixe Esférico")}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed max-w-lg transition-colors ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-500"
              }`}>
                {t(
                  "Notice the circular scoops. Each keycap is rectangular but holds a matching spherical indentation in the center that matches the anatomical shape of your fingers. This centers every stroke dynamically, ensuring you type naturally with fewer typos.",
                  "Note os recortes esféricos. Cada tecla é retangular, mas possui um encaixe arredondado suave que acompanha o formato anatômico das pontas das suas mãos. Isso centraliza cada toque de forma natural, aumentando a velocidade e reduzindo erros de digitação."
                )}
              </p>
            </div>

            <div className={`mt-8 overflow-hidden rounded-xl border aspect-[16/10] transition-colors ${
              theme === "dark" ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-zinc-50"
            }`}>
              <img
                src={IMAGES.keycaps}
                alt="Macro close-up details of spherically-dished keycaps and white glowing edge illumination"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Bento Column 2 */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Bento Item 2: Whisper-Quiet Switch mechanism details */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 70, damping: 16 }}
              className={`flex-1 rounded-2xl border p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  : "bg-white border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                  theme === "dark" ? "bg-zinc-800 border-zinc-705 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
                }`}>
                  <Wind className="h-5 w-5" />
                </div>
                <h3 className={`mt-5 font-display text-xl font-bold tracking-tight transition-colors ${
                  theme === "dark" ? "text-white" : "text-zinc-900"
                }`}>
                  {t("Tactile Scissor Switch Nodes", "Mecanismos de Switch Tipo Tesoura")}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed transition-colors ${
                  theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                }`}>
                  {t(
                    "Engineered with an ultra-low profile scissor switch mechanism. Each key registers with a short, responsive 1.8mm travel distance requiring exactly 60g threshold force, reducing fingertip fatigue for fast and silent typing.",
                    "Trabalha com um sistema de switches tipo tesoura de perfil ultra baixo. Cada comando registra com curso curto de 1.8 mm e força de ativação calibrada de 60g, eliminando a fadiga das articulações em sessões intensas."
                  )}
                </p>
              </div>

              <div className={`mt-6 flex items-center justify-between border-t pt-5 transition-colors ${
                theme === "dark" ? "border-zinc-800" : "border-zinc-105"
              }`}>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {t("Travel Dist", "Curso da Tecla")}
                  </span>
                  <span className={`text-sm font-semibold transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
                    {t("1.8 Millimeters", "1.8 Milímetros")}
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {t("Click Sound", "Som do Clique")}
                  </span>
                  <span className="text-sm font-semibold text-emerald-500">
                    &lt; 28 Decibels
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {t("Expected Lifespan", "Vida Útil Estimada")}
                  </span>
                  <span className={`text-sm font-semibold transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
                    {t("10M Keystrokes", "10M de Toques")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 3: Space Gray solid metal construction */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 75, damping: 14 }}
              className={`flex-1 rounded-2xl border p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  : "bg-white border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                  theme === "dark" ? "bg-zinc-800 border-zinc-705 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
                }`}>
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className={`mt-5 font-display text-xl font-bold tracking-tight transition-colors ${
                  theme === "dark" ? "text-white" : "text-zinc-900"
                }`}>
                  {t("Single Anodized Metal Framework", "Chassi Unificado de Metal Anodizado")}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed transition-colors ${
                  theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                }`}>
                  {t(
                    "The keyboard structure is built directly on a solid structural metal back plate. This robust, heavy craftsmanship provides zero frame bending or desk slipping, so your workspace remains completely stable.",
                    "Toda a carcaça do teclado é estabilizada internamente sobre uma chapa única de alumínio anodizado. Essa base rígida elimina qualquer flexão do corpo, evitando barulho oco e mantendo o conjunto firme no escritório."
                  )}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-400 font-mono">
                <span>• {t("NO PLASTIC FLEX", "SEM FLEXÃO DE PLÁSTICO")}</span>
                <span>• {t("ANODIZED COATING", "COBERTURA ANODIZADA")}</span>
                <span>• {t("OIL RESISTANT", "RESISTENTE A ÓLEO")}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Grid: Quick Specs Callout */}
        <div id="perfect-stroke" className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-16 transition-colors ${
          theme === "dark" ? "border-zinc-805" : "border-zinc-200"
        }`}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`text-left p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-805 text-zinc-100" : "bg-white border-zinc-100 text-zinc-900"
            }`}
          >
            <h4 className={`font-display text-lg font-bold transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              {t("Satin Matte Finish", "Fosco Acetinado Impecável")}
            </h4>
            <p className={`mt-2 text-xs sm:text-sm leading-relaxed transition-colors ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
              {t(
                "Every key cap features an oil-resistant, ultra-thin polymer protective layer that safeguards the legends and eliminates oily finger gloss over years of heavy professional typing.",
                "Cada tecla possui uma fina película protetora resistente a óleos corporais normais, o que blinda as gravações a laser e evita aquele brilho indesejado de desgaste plástico."
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`text-left p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-805 text-zinc-100" : "bg-white border-zinc-100 text-zinc-900"
            }`}
          >
            <h4 className={`font-display text-lg font-bold transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              {t("Symmetrical Square Grids", "Layout Perfeitamente Simétrico")}
            </h4>
            <p className={`mt-2 text-xs sm:text-sm leading-relaxed transition-colors ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
              {t(
                "Maintains standard layout spacing with 19mm pitch between key centers, giving you a comforting desktop typing feel that matches any other pro layout instantly.",
                "Mantém os espaços padrão da indústria de 19 mm entre os eixos centrais de cada switch, garantindo uma digitação familiar e confortável no primeiro instante de toque."
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className={`text-left p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-805 text-zinc-100" : "bg-white border-zinc-100 text-zinc-900"
            }`}
          >
            <h4 className={`font-display text-lg font-bold transition-colors ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              {t("Tactile Rebound Force", "Força de Retorno Otimizada")}
            </h4>
            <p className={`mt-2 text-xs sm:text-sm leading-relaxed transition-colors ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
              {t(
                "Specially calibrated scissor guide arms provide a steady vertical keystroke, ensuring that even off-center clicks register perfectly with equal feedback.",
                "As articulações angulares em formato de tesoura são balanceadas meticulosamente, garantindo que mesmo toques feitos nas bordas mais distantes de uma tecla desçam totalmente retos."
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
