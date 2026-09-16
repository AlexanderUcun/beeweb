import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onOpenQuoteModal: (packageName?: string) => void;
  onOpenCheckout?: (planName: string, price: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenQuoteModal, onOpenCheckout }) => {
  const [billingCycle, setBillingCycle] = useState<'one-time' | 'managed'>('one-time');

  const plans = [
    {
      name: 'Landing Page Rápida',
      tagline: 'Ideal para startups, lanzamientos o promociones puntuales.',
      priceOneTime: '$199',
      priceManaged: '$29 /mes',
      badge: '',
      popular: false,
      features: [
        '1 Página Principal de alto impacto',
        'Adaptación de contenido y marca',
        'Formulario de contacto a Email / WhatsApp',
        'Diseño 100% Responsivo Móvil',
        'Optimización Básica SEO',
        'Entrega en 48 Horas',
      ],
    },
    {
      name: 'Sitio Corporativo Pro',
      tagline: 'La opción preferida para PyMEs, consultoras y agencias.',
      priceOneTime: '$399',
      priceManaged: '$49 /mes',
      badge: 'Más Elegido',
      popular: true,
      features: [
        'Hasta 5 Secciones / Subpáginas',
        'Catálogo / Showcase de Servicios',
        'Modo Oscuro & Claro integrado',
        'SEO Avanzado + Integración Google Maps',
        'Formulario de Cotización personalizado',
        'Soporte Técnico por 6 meses',
      ],
    },
    {
      name: 'Enterprise / E-Commerce',
      tagline: 'Solución a medida para comercios, plataformas y firmas grandes.',
      priceOneTime: '$799',
      priceManaged: '$99 /mes',
      badge: 'Completo',
      popular: false,
      features: [
        'Páginas ilimitadas y E-Commerce completo',
        'Integración de Pasarela de Pagos (Stripe / MercadoPago)',
        'Panel de Administración / CMS',
        'Integración con CRM o Base de Datos',
        'Optimizaciones de velocidad exclusivas',
        'Soporte y Mantenimiento VIP 24/7',
      ],
    },
  ];

  return (
    <section id="precios" className="py-24 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400">
            Transparencia Total
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Planes & Cotización Estimada
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Elige la modalidad que mejor se adapte al presupuesto y meta de tu empresa.
          </p>

          {/* Billing Cycle Selector */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 text-xs font-bold">
            <button
              onClick={() => setBillingCycle('one-time')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                billingCycle === 'one-time'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Pago Único (Propiedad Total)
            </button>
            <button
              onClick={() => setBillingCycle('managed')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                billingCycle === 'managed'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Suscripción Gestionada (Hosting Incluido)
            </button>
          </div>
        </div>

        {/* Plans Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-white dark:bg-slate-950 border-2 border-indigo-600 dark:border-cyan-400 shadow-2xl shadow-indigo-500/15 scale-105 z-10'
                  : 'bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                    {billingCycle === 'one-time' ? plan.priceOneTime : plan.priceManaged}
                  </span>
                  <span className="ml-2 text-xs text-slate-500 font-medium">
                    {billingCycle === 'one-time' ? 'pago único USD' : 'facturación mensual'}
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
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
                    const price = billingCycle === 'one-time' ? plan.priceOneTime : plan.priceManaged;
                    if (onOpenCheckout) onOpenCheckout(plan.name, price);
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'text-white bg-gradient-to-r from-emerald-500 via-indigo-600 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40'
                      : 'text-white bg-indigo-600 hover:bg-indigo-700 shadow-md'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  Pagar Instantáneo (Nequi / PSE / Card)
                </button>

                <button
                  onClick={() => onOpenQuoteModal(plan.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Solicitar Cotización por WhatsApp / Email
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
