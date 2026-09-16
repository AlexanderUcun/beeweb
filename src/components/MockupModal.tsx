import React from 'react';
import type { MockupItem } from '../data/mockups';
import { X, CheckCircle, Sparkles, Star, ShoppingBag } from 'lucide-react';
import { CURRENT_CLIENT_CONFIG } from '../config/clientConfig';

interface MockupModalProps {
  mockup: MockupItem | null;
  onClose: () => void;
  onSelectForQuote: (mockup: MockupItem) => void;
}

export const MockupModal: React.FC<MockupModalProps> = ({
  mockup,
  onClose,
  onSelectForQuote,
}) => {
  const { whatsapp } = CURRENT_CLIENT_CONFIG.contact;

  if (!mockup) return null;

  const whatsappOrderUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Hola beeWeb! Deseo comprar el producto: ${mockup.title} por valor de ${mockup.priceCOP}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">

        {/* Modal Topbar */}
        <div className="px-6 py-4 border-b border-amber-200/80 dark:border-slate-800 flex items-center justify-between bg-amber-50/60 dark:bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#D98F07] text-white">
              {mockup.categoryLabel}
            </span>
            <h3 className="text-lg font-bold text-[#401E01] dark:text-white truncate max-w-xs sm:max-w-md">
              {mockup.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Image Container */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-amber-50/50 dark:bg-slate-950 rounded-2xl p-4 border border-amber-200/60 dark:border-slate-800">
            <div className="w-full rounded-xl overflow-hidden shadow-lg border border-amber-200/60">
              <img
                src={mockup.thumbnail}
                alt={mockup.title}
                className="w-full h-auto max-h-[380px] object-cover"
              />
            </div>
            
            <div className="mt-4 w-full grid grid-cols-2 gap-2 text-center text-xs font-bold text-[#401E01] dark:text-amber-300">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                🌱 100% Cosecha Cruda
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                🐝 Apiario Tocancipá
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{mockup.rating} / 5.0</span>
                  <span className="text-slate-400 font-normal">({mockup.reviewsCount} opiniones)</span>
                </div>
                <span className="text-2xl font-black text-[#D98F07]">
                  {mockup.priceCOP}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-extrabold text-[#401E01] dark:text-white">
                {mockup.title}
              </h2>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {mockup.description}
              </p>

              {/* Highlights */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D98F07]">
                  Beneficios y Recomendación de Uso
                </h4>
                {mockup.highlights.map((h, i) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-50/60 dark:bg-slate-950 border border-amber-200/60 dark:border-slate-800">
                    <div className="text-sm font-bold text-[#8C4E03] dark:text-amber-400">{h.title}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{h.desc}</div>
                  </div>
                ))}
              </div>

              {/* Included Features */}
              <div className="mt-6">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D98F07] mb-3">
                  Garantías de Calidad
                </h4>
                <div className="space-y-2">
                  {mockup.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-amber-200/80 dark:border-slate-800 space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  onSelectForQuote(mockup);
                }}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#D98F07] via-amber-600 to-[#8C4E03] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                Pagar {mockup.priceCOP} por Nequi / PSE
              </button>

              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#401E01] dark:text-slate-200 bg-amber-100 dark:bg-slate-800 hover:bg-amber-200 flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                Comprar directamente por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
