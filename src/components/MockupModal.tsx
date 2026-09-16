import React, { useState } from 'react';
import type { MockupItem } from '../data/mockups';
import { X, Monitor, Smartphone, CheckCircle, Sparkles, Star } from 'lucide-react';

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
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  if (!mockup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">

        {/* Modal Topbar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-600 text-white">
              {mockup.categoryLabel}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
              {mockup.title}
            </h3>
          </div>

          {/* Viewport Selector */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-xs font-semibold">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  deviceView === 'desktop'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Monitor className="w-4 h-4" /> Escritorio
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  deviceView === 'mobile'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Smartphone className="w-4 h-4" /> Móvil
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Preview Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950 rounded-xl p-4 sm:p-6 border border-slate-800 min-h-[350px]">
            {deviceView === 'desktop' ? (
              <div className="w-full rounded-lg overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                <div className="h-7 bg-slate-800 px-3 flex items-center gap-2 border-b border-slate-700/60">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-4 text-[11px] text-slate-400 font-mono truncate">
                    https://demo.{mockup.id}.stitchcraft.com
                  </span>
                </div>
                <img
                  src={mockup.desktopPreviewImage}
                  alt={mockup.title}
                  className="w-full h-auto max-h-[420px] object-cover object-top"
                />
              </div>
            ) : (
              <div className="w-[280px] rounded-[36px] p-3 bg-slate-800 border-4 border-slate-700 shadow-2xl">
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />
                <div className="rounded-[24px] overflow-hidden bg-slate-900">
                  <img
                    src={mockup.mobilePreviewImage}
                    alt={mockup.title}
                    className="w-full h-[400px] object-cover object-top"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-amber-500 font-bold mb-2">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{mockup.rating} / 5.0</span>
                <span className="text-slate-400 font-normal">({mockup.reviewsCount} empresas satisfechas)</span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {mockup.title}
              </h2>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {mockup.description}
              </p>

              {/* Highlights */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Aspectos Clave de la Maqueta
                </h4>
                {mockup.highlights.map((h, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                    <div className="text-sm font-bold text-indigo-600 dark:text-cyan-400">{h.title}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{h.desc}</div>
                  </div>
                ))}
              </div>

              {/* Included Features */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Funcionalidades Incluidas
                </h4>
                <div className="space-y-2">
                  {mockup.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onSelectForQuote(mockup);
                }}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                Usar esta Maqueta para mi Empresa
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-center transition-colors"
              >
                Cerrar vista previa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
