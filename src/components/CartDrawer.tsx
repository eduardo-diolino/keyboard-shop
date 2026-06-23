/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  FileText,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  User,
  Mail,
  MapPin,
  CheckCircle,
  Truck
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    clearCart
  } = useCart();

  // Checkout multi-step state: "cart" | "shipping" | "payment" | "success"
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "success">("cart");

  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    address: "",
    zipCode: "",
    city: "",
    notes: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | "slip">("card");
  const [cardForm, setCardForm] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: ""
  });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  // Simulated Order Details on Success
  const [confirmedOrder, setConfirmedOrder] = useState<{
    id: string;
    date: string;
    total: number;
    deliveryDate: string;
  } | null>(null);

  // Validate Shipping
  const validateShipping = () => {
    const errors: Record<string, string> = {};
    if (!shippingForm.fullName.trim()) errors.fullName = "Nome completo é obrigatório.";
    if (!shippingForm.email.trim()) {
      errors.email = "E-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingForm.email)) {
      errors.email = "Insira um e-mail válido.";
    }
    if (!shippingForm.address.trim()) errors.address = "Endereço completo é obrigatório.";
    if (!shippingForm.zipCode.trim()) {
      errors.zipCode = "CEP é obrigatório.";
    } else if (!/^\d{5}-\d{3}$/.test(shippingForm.zipCode) && !/^\d{8}$/.test(shippingForm.zipCode)) {
      errors.zipCode = "CEP deve ter 8 dígitos (ex: 01234-567).";
    }
    if (!shippingForm.city.trim()) errors.city = "Cidade/Estado é obrigatório.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Card Details
  const validateCard = () => {
    const errors: Record<string, string> = {};
    if (paymentMethod === "card") {
      const sanitizedNumber = cardForm.number.replace(/\s/g, "");
      if (!sanitizedNumber) {
        errors.number = "Número do cartão é obrigatório.";
      } else if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
        errors.number = "Número do cartão inválido.";
      }

      if (!cardForm.holder.trim()) errors.holder = "Nome impresso é obrigatório.";

      if (!cardForm.expiry.trim()) {
        errors.expiry = "Validade (MM/AA) é obrigatória.";
      } else if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry)) {
        errors.expiry = "Formato MM/AA está incorreto.";
      }

      if (!cardForm.cvv.trim()) {
        errors.cvv = "CVV é obrigatório.";
      } else if (cardForm.cvv.length < 3 || cardForm.cvv.length > 4) {
        errors.cvv = "CVV inválido.";
      }
    }

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToPayment = (e: FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep("payment");
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const formatZipCode = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length > 5) {
      return `${v.slice(0, 5)}-${v.slice(5, 8)}`;
    }
    return v;
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "card" && !validateCard()) {
      return;
    }

    // Generate random mock order data
    const orderId = `LMX-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    
    // Arrival estimated in 4 business days
    const delivery = new Date();
    delivery.setDate(today.getDate() + 4);
    const formattedDelivery = delivery.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    setConfirmedOrder({
      id: orderId,
      date: formattedDate,
      total: cartSubtotal,
      deliveryDate: formattedDelivery
    });

    setStep("success");
  };

  const handleReset = () => {
    clearCart();
    setStep("cart");
    setIsCartOpen(false);
    setShippingForm({
      fullName: "",
      email: "",
      address: "",
      zipCode: "",
      city: "",
      notes: ""
    });
    setCardForm({
      number: "",
      holder: "",
      expiry: "",
      cvv: ""
    });
    setFormErrors({});
    setCardErrors({});
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Mesh */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (step !== "success") {
                setIsCartOpen(false);
              }
            }}
            className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full max-w-md flex-col bg-white border-l border-zinc-200 shadow-2xl overflow-hidden font-sans text-zinc-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 p-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-zinc-950" />
                <span className="font-display text-lg font-bold tracking-tight">
                  {step === "success" ? "Order Confirmed" : "Your Desk Cargo"}
                </span>
                {cartItems.length > 0 && step !== "success" && (
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-zinc-650">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </div>
              
              {step !== "success" && (
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Stepper Progress bar */}
            {step !== "success" && cartItems.length > 0 && (
              <div className="bg-zinc-50 border-b border-zinc-100 px-6 py-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-550">
                <button
                  onClick={() => setStep("cart")}
                  className={`cursor-pointer ${step === "cart" ? "text-zinc-950 font-bold" : "hover:text-zinc-900"}`}
                >
                  1. Bag
                </button>
                <ChevronRight className="h-3 w-3 text-zinc-300" />
                <button
                  onClick={() => {
                    if (step === "payment") setStep("shipping");
                  }}
                  disabled={step === "cart"}
                  className={`disabled:opacity-50 ${
                    step === "shipping" ? "text-zinc-950 font-bold" : "hover:text-zinc-900"
                  }`}
                >
                  2. Shipping
                </button>
                <ChevronRight className="h-3 w-3 text-zinc-300" />
                <span className={step === "payment" ? "text-zinc-950 font-bold" : ""}>
                  3. Payment
                </span>
              </div>
            )}

            {/* Drawer Body (Scrollable contents) */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 && step !== "success" ? (
                /* Empty Cart State */
                <div className="flex h-full flex-col items-center justify-center text-center gap-4">
                  <div className="rounded-full bg-zinc-50 p-6 border border-zinc-100 text-zinc-400">
                    <ShoppingBag className="h-10 w-10 stroke-[1.25]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-base">Your Cart is Empty</h3>
                    <p className="mt-1 max-w-[240px] text-xs text-zinc-500 leading-relaxed mx-auto">
                      Enhance your space with spherically-shaped silent custom key tactile precision.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Quick add default item
                      updateQuantity("solo", 1);
                      removeFromCart("solo"); // trigger simple state set override to prevent duplications
                      useCart().addToCart({
                        id: "solo",
                        title: "MX Keys S (Carbon Solo)",
                        price: 109.99,
                        desc: "Includes Advanced Wireless Keyboard, Logi Bolt USB Secure Receiver, and charging USB-C cord."
                      });
                    }}
                    className="mt-2 rounded-full border border-zinc-200 bg-white px-5 py-2 text-xs font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 transition cursor-pointer"
                  >
                    Add MX Keys S Solo
                  </button>
                </div>
              ) : (
                /* Dynamic Checkout Steps */
                <>
                  {step === "cart" && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-4">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 rounded-xl border border-zinc-150 bg-zinc-50/50 p-4 transition hover:border-zinc-200"
                          >
                            <div className="flex-1 text-left">
                              <h4 className="text-sm font-bold text-zinc-900 leading-tight">
                                {item.title}
                              </h4>
                              <p className="mt-1 line-clamp-2 text-[11px] text-zinc-500 leading-snug">
                                {item.desc}
                              </p>
                              
                              <div className="mt-3 flex items-center justify-between">
                                {/* Quantity Toggles */}
                                <div className="flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 mr-4 shadow-sm">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="rounded p-1 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-8 text-center text-xs font-mono font-bold text-zinc-800">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="rounded p-1 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-xs font-bold text-zinc-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition"
                                    title="Remover item"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Ecosystem Upsell */}
                      <div className="mt-6 rounded-xl border border-zinc-150 bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 text-left">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
                          <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                            Ecosystem Recommendation
                          </span>
                        </div>
                        <h5 className="mt-1 text-xs font-bold text-zinc-900">
                          Complement with the ultimate workstation tools
                        </h5>
                        <p className="mt-0.5 text-[11px] text-zinc-550 leading-relaxed">
                          Get 15% discount when swapping to the Ultimate Creator Bundle package in the configurator below!
                        </p>
                      </div>
                    </div>
                  )}

                  {step === "shipping" && (
                    <form onSubmit={handleNextToPayment} className="space-y-4 text-left">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Truck className="h-4 w-4 text-zinc-900" />
                        <h3 className="font-semibold text-sm">Dados de Entrega</h3>
                      </div>

                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                          Nome Completo *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="text"
                            value={shippingForm.fullName}
                            onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                            placeholder="John Doe"
                            className={`w-full rounded-lg border bg-zinc-50 py-2.5 pl-10 pr-4 text-xs font-medium placeholder-zinc-400 outline-none transition focus:border-zinc-900 focus:bg-white ${
                              formErrors.fullName ? "border-red-400 focus:border-red-500" : "border-zinc-200"
                            }`}
                          />
                        </div>
                        {formErrors.fullName && (
                          <span className="font-mono text-[9px] text-red-500">{formErrors.fullName}</span>
                        )}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                          E-mail Corporativo ou Pessoal *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                          <input
                            type="text"
                            value={shippingForm.email}
                            onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                            placeholder="exemplo@workstation.com"
                            className={`w-full rounded-lg border bg-zinc-50 py-2.5 pl-10 pr-4 text-xs font-medium placeholder-zinc-400 outline-none transition focus:border-zinc-900 focus:bg-white ${
                              formErrors.email ? "border-red-400 focus:border-red-500" : "border-zinc-200"
                            }`}
                          />
                        </div>
                        {formErrors.email && (
                          <span className="font-mono text-[9px] text-red-500">{formErrors.email}</span>
                        )}
                      </div>

                      {/* Address */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                          Endereço de Entrega *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-zinc-400" />
                          <textarea
                            value={shippingForm.address}
                            onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                            placeholder="Rua, número, complemento e bairro"
                            rows={2}
                            className={`w-full rounded-lg border bg-zinc-50 py-2.5 pl-10 pr-4 text-xs font-medium placeholder-zinc-400 outline-none transition focus:border-zinc-900 focus:bg-white ${
                              formErrors.address ? "border-red-400 focus:border-red-500" : "border-zinc-200"
                            }`}
                          />
                        </div>
                        {formErrors.address && (
                          <span className="font-mono text-[9px] text-red-500">{formErrors.address}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* CEP */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                            CEP *
                          </label>
                          <input
                            type="text"
                            maxLength={9}
                            value={shippingForm.zipCode}
                            onChange={(e) => setShippingForm({ ...shippingForm, zipCode: formatZipCode(e.target.value) })}
                            placeholder="01234-567"
                            className={`w-full rounded-lg border bg-zinc-50 px-3 py-2.5 text-xs font-medium placeholder-zinc-400 outline-none transition focus:border-zinc-900 focus:bg-white ${
                              formErrors.zipCode ? "border-red-400 focus:border-red-500" : "border-zinc-200"
                            }`}
                          />
                          {formErrors.zipCode && (
                            <span className="font-mono text-[9px] text-red-500">{formErrors.zipCode}</span>
                          )}
                        </div>

                        {/* City / State */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                            Cidade / UF *
                          </label>
                          <input
                            type="text"
                            value={shippingForm.city}
                            onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                            placeholder="São Paulo - SP"
                            className={`w-full rounded-lg border bg-zinc-50 px-3 py-2.5 text-xs font-medium placeholder-zinc-400 outline-none transition focus:border-zinc-900 focus:bg-white ${
                              formErrors.city ? "border-red-400 focus:border-red-500" : "border-zinc-200"
                            }`}
                          />
                          {formErrors.city && (
                            <span className="font-mono text-[9px] text-red-500">{formErrors.city}</span>
                          )}
                        </div>
                      </div>

                      {/* Observations */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                          Observações de Entrega (Opcional)
                        </label>
                        <input
                          type="text"
                          value={shippingForm.notes}
                          onChange={(e) => setShippingForm({ ...shippingForm, notes: e.target.value })}
                          placeholder="Ex: Entregar na recepção comercial"
                          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs font-medium placeholder-zinc-400 outline-none transition focus:border-zinc-900 focus:bg-white"
                        />
                      </div>

                      <button type="submit" className="hidden" id="submit-shipping-form" />
                    </form>
                  )}

                  {step === "payment" && (
                    <div className="space-y-5 text-left">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4 text-zinc-900" />
                        <h3 className="font-semibold text-sm">Método de Pagamento</h3>
                      </div>

                      {/* Payment Method Selector Grid */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "card", title: "Cartão de Crédito", icon: CreditCard },
                          { id: "pix", title: "PIX", icon: QrCode },
                          { id: "slip", title: "Boleto Desk", icon: FileText }
                        ].map((method) => {
                          const Icon = method.icon;
                          const active = paymentMethod === method.id;
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => setPaymentMethod(method.id as any)}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition gap-1.5 cursor-pointer hover:border-zinc-300 ${
                                active
                                  ? "bg-zinc-900 border-zinc-950 text-white shadow"
                                  : "bg-zinc-50 border-zinc-200 text-zinc-600"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span className="text-[10px] font-bold font-mono tracking-wide leading-tight">
                                {method.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Dynamic Options Containers */}
                      {paymentMethod === "card" && (
                        <div className="space-y-3 p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                          {/* Credit card graphic layout mockup */}
                          <div className="rounded-xl bg-gradient-to-br from-zinc-850 via-zinc-900 to-zinc-950 p-4 text-white shadow relative overflow-hidden aspect-[1.8/1] flex flex-col justify-between mb-4">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400">
                                LOGI PREMIUM WORKSTATION
                              </span>
                              <div className="h-6 w-8 rounded bg-zinc-800/80 border border-zinc-750 flex items-center justify-center font-mono font-bold text-[9px]">
                                MC
                              </div>
                            </div>

                            <div className="my-2">
                              <span className="font-mono text-sm sm:text-base tracking-[0.2em] font-semibold text-zinc-200 block truncate">
                                {cardForm.number || "•••• •••• •••• ••••"}
                              </span>
                            </div>

                            <div className="flex justify-between items-end">
                              <div className="text-left">
                                <span className="text-[8px] text-zinc-400 block uppercase font-mono tracking-wider">
                                  Cardholder Key
                                </span>
                                <span className="font-mono text-[10px] text-zinc-100 font-bold block truncate max-w-[150px] uppercase">
                                  {cardForm.holder || "YOUR FULL NAME"}
                                </span>
                              </div>

                              <div className="text-right">
                                <span className="text-[8px] text-zinc-400 block uppercase font-mono tracking-wider">
                                  Expires
                                </span>
                                <span className="font-mono text-[10px] text-zinc-100 font-bold block">
                                  {cardForm.expiry || "MM/AA"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Inputs */}
                          <div className="space-y-3.5">
                            {/* Card Number */}
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                                Número do Cartão *
                              </label>
                              <input
                                type="text"
                                maxLength={19}
                                value={cardForm.number}
                                onChange={(e) => setCardForm({ ...cardForm, number: formatCardNumber(e.target.value) })}
                                placeholder="4321 0987 6543 2109"
                                className={`w-full rounded-lg border bg-white px-3 py-2 text-xs font-semibold placeholder-zinc-401 outline-none transition focus:border-zinc-900 ${
                                  cardErrors.number ? "border-red-400" : "border-zinc-200"
                                }`}
                              />
                              {cardErrors.number && (
                                <span className="font-mono text-[9px] text-red-500">{cardErrors.number}</span>
                              )}
                            </div>

                            {/* Holder */}
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                                Nome impresso no Cartão *
                              </label>
                              <input
                                type="text"
                                value={cardForm.holder}
                                onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value })}
                                placeholder="JOHN H DOE"
                                className={`w-full rounded-lg border bg-white px-3 py-2 text-xs font-semibold placeholder-zinc-400 outline-none transition focus:border-zinc-900 ${
                                  cardErrors.holder ? "border-red-400" : "border-zinc-200"
                                }`}
                              />
                              {cardErrors.holder && (
                                <span className="font-mono text-[9px] text-red-500">{cardErrors.holder}</span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Expiry */}
                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                                  Validade (MM/AA) *
                                </label>
                                <input
                                  type="text"
                                  maxLength={5}
                                  value={cardForm.expiry}
                                  onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                                  placeholder="12/29"
                                  className={`w-full rounded-lg border bg-white px-3 py-2 text-xs font-semibold placeholder-zinc-411 outline-none transition focus:border-zinc-900 ${
                                    cardErrors.expiry ? "border-red-400" : "border-zinc-200"
                                  }`}
                                />
                                {cardErrors.expiry && (
                                  <span className="font-mono text-[9px] text-red-500">{cardErrors.expiry}</span>
                                )}
                              </div>

                              {/* CVV */}
                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                                  Código CVV *
                                </label>
                                <input
                                  type="password"
                                  maxLength={4}
                                  value={cardForm.cvv}
                                  onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, "") })}
                                  placeholder="•••"
                                  className={`w-full rounded-lg border bg-white px-3 py-2 text-xs font-semibold placeholder-zinc-411 outline-none transition focus:border-zinc-900 ${
                                    cardErrors.cvv ? "border-red-400" : "border-zinc-200"
                                  }`}
                                />
                                {cardErrors.cvv && (
                                  <span className="font-mono text-[9px] text-red-500">{cardErrors.cvv}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "pix" && (
                        <div className="space-y-4 p-5 rounded-xl border border-zinc-200 bg-zinc-50 text-center flex flex-col items-center">
                          <span className="rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase">
                            Chave Pix Elegível para desconto instantâneo
                          </span>
                          <div className="bg-white p-3.5 rounded-lg border border-zinc-200 shadow-sm">
                            {/* Simple simulated vector QR Code patterns */}
                            <div className="h-32 w-32 bg-zinc-200 flex flex-col items-center justify-center relative overflow-hidden">
                              <QrCode className="h-24 w-24 text-zinc-900" />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/10 to-transparent" />
                            </div>
                          </div>
                          <div className="w-full text-left">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 font-mono block mb-1 text-center">
                              Chave Pix de Cópia e Cola
                            </span>
                            <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg p-2 text-xs font-mono select-all select-none">
                              <span className="text-[10px] text-zinc-550 break-all truncate flex-1">
                                00020126580014BR.GOV.BCB.PIX0136logitechkeyscheck12349080-mxkeys-s
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136logitechkeyscheck12349080-mxkeys-s");
                                  alert("Chave Copiada para a área de transferência!");
                                }}
                                className="bg-zinc-900 text-white rounded px-2 py-1 text-[9px] font-bold hover:bg-zinc-850 active:scale-95 transition whitespace-nowrap cursor-pointer"
                              >
                                Copiar
                              </button>
                            </div>
                          </div>
                          <p className="text-[10px] text-zinc-500 leading-relaxed text-center">
                            Leia o QR Code ou utilize a chave acima no seu aplicativo de pagamento preferido. O processamento ocorrerá instantaneamente.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "slip" && (
                        <div className="space-y-4 p-5 rounded-xl border border-zinc-200 bg-zinc-50 text-center flex flex-col items-center">
                          <span className="rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase">
                            Boleto Faturamento Bancário
                          </span>
                          <div className="bg-white p-4 rounded-xl border border-zinc-150 w-full text-left">
                            <span className="font-mono text-[9px] text-zinc-400 block mb-1 uppercase tracking-wider">
                              Linha Digitável de Compensação
                            </span>
                            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-mono">
                              <span className="text-[10px] text-zinc-700 flex-1 break-all tracking-wider line-clamp-1 truncate">
                                34191.79001 01043.513184 91020.150008 7 90550000018999
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText("34191.79001 01043.513184 91020.150008 7 90550000018999");
                                  alert("Linha Digitável Copiada!");
                                }}
                                className="bg-zinc-900 text-white rounded px-21 py-1 text-[9px] font-bold hover:bg-zinc-850 active:scale-95 transition cursor-pointer"
                              >
                                Copiar
                              </button>
                            </div>
                            <ul className="mt-3.5 list-disc pl-4 text-[10px] text-zinc-500 space-y-1 leading-relaxed">
                              <li>Prazo de compensação: até 24 horas úteis.</li>
                              <li>A confirmação do envio ocorre imediatamente após a compensação bancária.</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === "success" && confirmedOrder && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-6 flex flex-col items-center gap-5"
                    >
                      {/* Ticket graphics header */}
                      <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle className="h-8 w-8 stroke-[1.5]" />
                      </div>

                      <div className="text-center">
                        <h3 className="font-display text-lg font-bold tracking-tight text-zinc-900">
                          Pre-Order Placed Successfully!
                        </h3>
                        <p className="mt-1.5 text-xs text-zinc-550 max-w-sm mx-auto leading-relaxed">
                          Your premium equipment block has been successfully pre-allocated on our inventory grid and reserved in full secure escrow.
                        </p>
                      </div>

                      {/* Receipt Board */}
                      <div className="w-full border border-zinc-150 rounded-2xl bg-zinc-50/50 p-5 text-left font-mono text-[11px] space-y-3.5 shadow-sm">
                        <div className="border-b border-zinc-200/80 pb-3 flex justify-between items-center text-zinc-500">
                          <span>TRANSACTION RECEIPT</span>
                          <span className="font-bold text-zinc-800">{confirmedOrder.id}</span>
                        </div>

                        <div className="space-y-1.5 text-zinc-700">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Date</span>
                            <span>{confirmedOrder.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Client</span>
                            <span className="font-sans font-bold text-zinc-800">{shippingForm.fullName || "Corporate Guest"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Destination</span>
                            <span className="font-sans text-zinc-800 truncate max-w-[180px]">{shippingForm.city || "São Paulo - SP"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Shipment Class</span>
                            <span className="text-emerald-600 font-bold">Compliant Priority Priority</span>
                          </div>
                        </div>

                        <div className="border-t border-dashed border-zinc-200 pt-3.5">
                          <label className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-2">
                            PRE-ORDERED BLOCKITEMS
                          </label>
                          <div className="space-y-1.5 text-zinc-700">
                            {cartItems.map((item) => (
                              <div key={item.id} className="flex justify-between font-sans text-xs">
                                <span className="text-zinc-650 max-w-[180px] truncate">
                                  {item.title} <span className="font-mono text-[10px] text-zinc-400">x{item.quantity}</span>
                                </span>
                                <span className="font-mono text-xs font-bold text-zinc-800">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-zinc-150 pt-3 flex justify-between items-center text-sm font-bold text-zinc-900 border-b border-zinc-150 pb-3">
                          <span>Total Amount Paid</span>
                          <span>${confirmedOrder.total.toFixed(2)}</span>
                        </div>

                        {/* Estimated Arrival tracking */}
                        <div className="pt-1.5 flex items-start gap-2 text-zinc-600 font-sans leading-relaxed text-xs">
                          <Truck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-zinc-900 block">
                              Estimated Workspace Arrival
                            </span>
                            <span className="text-[11px] text-zinc-550 font-mono block">
                              {confirmedOrder.deliveryDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full space-y-2 mt-2">
                        <button
                          onClick={handleReset}
                          className="w-full rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 text-xs shadow transition cursor-pointer"
                        >
                          Concluir e Voltar
                        </button>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          A confirmation transaction log secure receipt has been emailed to {shippingForm.email || "your provided address"}.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Footer Calculator / Summary (Static at drawer bottom if items are present and not on checkout success) */}
            {cartItems.length > 0 && step !== "success" && (
              <div className="border-t border-zinc-100 bg-zinc-50 p-6 space-y-4">
                <div className="space-y-2 text-xs font-mono text-zinc-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-zinc-800 font-bold">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliant Shipping</span>
                    <span className="font-bold text-emerald-600 uppercase text-[10px]">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Escrow Tax Allocation</span>
                    <span className="text-zinc-800 font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-zinc-200 mt-2 pt-2 flex justify-between text-sm font-bold text-zinc-900 font-sans">
                    <span>Total workspace cost</span>
                    <span className="font-mono text-base">${cartSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Main Interactive Button Grid */}
                <div>
                  {step === "cart" && (
                    <button
                      onClick={() => setStep("shipping")}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-white font-semibold py-3.5 hover:bg-zinc-800 transition text-xs shadow cursor-pointer active:scale-98"
                    >
                      Prossigar para Entrega
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  )}

                  {step === "shipping" && (
                    <button
                      onClick={() => {
                        const trigger = document.getElementById("submit-shipping-form");
                        if (trigger) trigger.click();
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 text-white font-semibold py-3.5 hover:bg-zinc-800 transition text-xs shadow cursor-pointer active:scale-98"
                    >
                      Escolher Forma de Pagamento
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  )}

                  {step === "payment" && (
                    <div className="space-y-2">
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-white font-semibold py-3.5 hover:bg-emerald-700 transition text-xs shadow cursor-pointer active:scale-98"
                      >
                        {paymentMethod === "card" ? "Executar Pagamento Seguro" : "Confirmar e Reservar"}
                        <ShieldCheck className="h-4.5 w-4.5" />
                      </button>
                      <button
                        onClick={() => setStep("shipping")}
                        className="w-full text-center text-[11px] font-mono font-bold hover:underline text-zinc-500 py-1 cursor-pointer hover:text-zinc-800"
                      >
                        Voltar para Dados de Entrega
                      </button>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-mono">
                    <ShieldCheck className="h-4 w-4 text-zinc-400" />
                    <span>Calculated with SSL Corporate Security Protocols</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
