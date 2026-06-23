/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import { Keyboard, ShoppingCart, ShieldCheck, Globe, Sun, Moon } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, setIsCartOpen, addToCart } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showOrderToast, setShowOrderToast] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePreOrder = () => {
    addToCart({
      id: "solo",
      title: t("MX Keys S (Carbon Solo)", "MX Keys S (Grafite Solo)"),
      price: 109.99,
      desc: t(
        "Includes Advanced Wireless Keyboard, Logi Bolt USB Secure Receiver, and charging USB-C cord.",
        "Inclui Teclado Sem Fio Avançado, Receptor Seguro USB Logi Bolt e cabo carregador USB-C."
      )
    });
    setShowOrderToast(true);
    setTimeout(() => {
      setShowOrderToast(false);
    }, 4000);
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? theme === "dark"
              ? "border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md py-3 shadow-md"
              : "border-b border-zinc-200/80 bg-white/95 backdrop-blur-md py-3 shadow-sm"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo Brand */}
          <a
            id="brand-logo-link"
            href="#"
            className="flex items-center gap-2.5 focus:outline-none"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg shadow transition-colors duration-300 ${
              theme === "dark" ? "bg-white text-zinc-950" : "bg-zinc-950 text-white"
            }`}>
              <Keyboard className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}>
                logi
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-300 ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-500"
              }`}>
                MX KEYS S
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav id="nav-links" className="hidden md:flex items-center gap-8">
            <a
              id="link-design"
              href="#perfect-stroke"
              className={`text-sm font-medium transition-colors duration-300 ${
                theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {t("Design Philosophy", "Design")}
            </a>
            <a
              id="link-hardware"
              href="#exploded-hardware"
              className={`text-sm font-medium transition-colors duration-300 ${
                theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {t("Hardware Build", "Estrutura")}
            </a>
            <a
              id="link-sound"
              href="#sound-simulator"
              className={`text-sm font-medium transition-colors duration-300 ${
                theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {t("Acoustics", "Acústica")}
            </a>
            <a
              id="link-backlighting"
              href="#smart-backlighting"
              className={`text-sm font-medium transition-colors duration-300 ${
                theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {t("Smart Lighting", "Iluminação")}
            </a>
            <a
              id="link-specifications"
              href="#tech-specs"
              className={`text-sm font-medium transition-colors duration-300 ${
                theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {t("Specifications", "Especificações")}
            </a>
          </nav>

          {/* Action Buttons */}
          <div id="nav-actions" className="flex items-center gap-4">
            {/* Real-time Spotlight Search Engine */}
            <SearchBar onFocusChange={setIsSearchFocused} />
            
            {/* Elegant Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`${isSearchFocused ? "hidden md:flex" : "flex"} h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 shadow-sm cursor-pointer ${
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-900 text-yellow-400 hover:text-yellow-300 hover:bg-zinc-800"
                  : "border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 hover:border-zinc-350"
              }`}
              aria-label={theme === "dark" ? t("Switch to light mode", "Mudar para modo claro") : t("Switch to dark mode", "Mudar para modo escuro")}
            >
              {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Elegant Language Pill Switcher */}
            <div className={`${isSearchFocused ? "hidden lg:flex" : "flex"} items-center gap-1 border p-0.5 rounded-full text-[11px] font-mono select-none transition-colors duration-300 ${
              theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100/80 border-zinc-200"
            }`}>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  language === "en"
                    ? theme === "dark"
                      ? "bg-white text-zinc-950 font-bold shadow-sm"
                      : "bg-zinc-900 text-white font-bold shadow-sm"
                    : "text-zinc-505 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("pt")}
                className={`px-2 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  language === "pt"
                    ? theme === "dark"
                      ? "bg-white text-zinc-950 font-bold shadow-sm"
                      : "bg-zinc-900 text-white font-bold shadow-sm"
                    : "text-zinc-550 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
                aria-label="Mudar para Português"
              >
                PT
              </button>
            </div>

            <button
              id="btn-cart-indicator"
              onClick={() => setIsCartOpen(true)}
              className={`relative ${isSearchFocused ? "hidden sm:flex" : "flex"} h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 shadow-sm cursor-pointer ${
                theme === "dark"
                  ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700"
                  : "border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 hover:border-zinc-350"
              }`}
              aria-label="View shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <div
                  id="checkout-badge"
                  className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold animate-bounce ${
                     theme === "dark" ? "bg-white text-zinc-950" : "bg-zinc-950 text-white"
                  }`}
                >
                  {cartCount}
                </div>
              )}
            </button>

            <button
              id="btn-nav-order"
              onClick={handlePreOrder}
              className={`${isSearchFocused ? "hidden sm:block" : "block"} rounded-full px-5 py-2 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer ${
                theme === "dark"
                  ? "bg-white text-zinc-950 hover:bg-zinc-100"
                  : "bg-zinc-950 text-white hover:bg-zinc-800"
              }`}
            >
              {t("Pre-Order", "Comprar")}
            </button>
          </div>
        </div>

        {/* Apple-style thin active page scroll progress bar */}
        <motion.div
          id="scroll-progress-indicator"
          className={`absolute bottom-0 left-0 h-[2px] opacity-90 transition-colors duration-300 ${
            theme === "dark" ? "bg-white" : "bg-zinc-900"
          }`}
          style={{ width: scrollYProgress }}
        />
      </header>

      {/* Floating alert toast when item combined into cart */}
      {showOrderToast && (
        <div
          id="preorder-notification-toast"
          className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3.5 rounded-xl border p-4 shadow-2xl animate-slide-up animate-duration-300 transition-colors duration-300 ${
            theme === "dark" ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50/10 text-white">
            <ShieldCheck className="h-5.5 w-5.5 text-emerald-555" />
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              {t("Successfully Added to Workstation!", "Adicionado aos Itens de Trabalho!")}
            </h4>
            <p className={`mt-1 text-xs leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
              {t(
                "Logitech MX Keys S Premium Edition has been added. Enjoy complimentary premium priority shipping and a lifetime warranty.",
                "O teclado Logitech MX Keys S Edição Premium foi adicionado. Aproveite o frete prioritário grátis e a garantia vitalícia."
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
