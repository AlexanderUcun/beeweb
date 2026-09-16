import React from 'react';
import { Check, Sparkles, ShoppingBag } from 'lucide-react';
import { CURRENT_CLIENT_CONFIG } from '../config/clientConfig';

interface PricingSectionProps {
  onOpenQuoteModal: (packageName?: string) => void;
  onOpenCheckout?: (planName: string, price: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenCheckout }) => {
  const { whatsapp } = CURRENT_CLIENT_CONFIG.contact;

  const plans = [
    {
      name: 'Combo Salud Personal',
      tagline: 'Ideal para incorporar energía pura y defensas en tu rutina diaria.',
      price: '$55.000',
      badge: '',
      popular: false,
      features: [
        '1 Miel Pura Multiflora (500g)',
        '1 Gotas de Propóleo Concentrado (30ml)',
        'Cosecha Fresca de Tocancipá',
        'Empaque de vidrio protegido',
        'Envío rápido a domicilio',
      ],
    },
    {
      name: 'Kit Familiar Apícola',
      tagline: 'El paquete más completo para la nutrición y salud de toda la familia.',
      price: '$85.000',
      badge: 'Más Vendido 🏆',
      popular: true,
      features: [
        '1 Miel Pura Multiflora (500g)',
        '1 Polen Orgánico de Apicultivo (250g)',
        '1 Gotas de Propóleo Concentrado (30ml)',
        '1 Caja Regalo de Madera de Pino',
        'Ahorro del 15% respecto a individual',
        'Envío Gratis a Tocancipá',
      ],
    },
    {
      name: 'Kit Inmunidad Total + Jalea',
      tagline: 'Regenerador completo con Jalea Real Fresca para máxima vitalidad.',
      price: '$130.000',
      badge: 'Máxima Potencia 👑',
      popular: false,
      features: [
        '1 Jalea Real Fresca 100% Pura (50g)',
        '1 Miel Pura Multiflora (500g)',
        '1 Polen Orgánico (250g)',
        '1 Extracto de Propóleo (30ml)',
        'Empaque Térmico con Frío Garantizado',
        'Asesoría de consumo incluida',
      ],
    },
  ];

  return (
    <section id="precios" className="py-24 bg-amber-50/40 dark:bg-slate-900/30 border-t border-amber-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#D98F07]">
            Promociones Especiales de Cosecha
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#401E01] dark:text-white tracking-tight">
            Kits & Combos Saludables
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-400 font-medium">
            Lleva nuestros mejores productos apícolas combinados con descuento directo.
          </p>
        </div>

        {/* Plans Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-white dark:bg-slate-950 border-2 border-[#D98F07] shadow-2xl shadow-amber-500/15 scale-105 z-10'
                  : 'bg-white dark:bg-slate-900/60 border border-amber-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D98F07] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black text-[#401E01] dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 min-h-[32px]">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-black text-[#401E01] dark:text-white">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-xs font-bold text-[#D98F07]">
                    COP
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 space-y-2.5">
                <button
                  onClick={() => {
                    if (onOpenCheckout) onOpenCheckout(plan.name, plan.price);
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'text-white bg-gradient-to-r from-[#D98F07] via-amber-600 to-[#8C4E03] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40'
                      : 'text-white bg-[#D98F07] hover:bg-[#8C4E03] shadow-md'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  Pagar por Nequi / PSE / Bancolombia
                </button>

                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hola beeWeb! Deseo pedir el ${plan.name} por valor de ${plan.price} COP.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#401E01] dark:text-slate-200 bg-amber-100/70 dark:bg-slate-800 hover:bg-amber-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Pedir por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
