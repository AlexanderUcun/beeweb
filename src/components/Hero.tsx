import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Laptop } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenQuoteModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-slate-900/90 border border-indigo-200/80 dark:border-slate-800 shadow-sm mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
          <span className="text-xs sm:text-sm font-semibold text-indigo-900 dark:text-cyan-300">
            Showcase Empresarial 2026 • Maquetas Web Ultra Rápida
          </span>
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.15]">
          Páginas Web Impactantes diseñadas para{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Escalar tu Empresa
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Explora nuestro catálogo interactivo de maquetas profesionales creadas para agencias, software SaaS, 
          estudios legales, clínicas y comercios. Totalmente adaptadas para móvil y optimizadas para Google.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 group"
          >
            Ver Maquetas Interactivas
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Laptop className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
            Solicitar Maqueta a Medida
          </button>
        </div>

        {/* Feature Badges Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-left">
          <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Carga Ultra Rápida</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Puntaje +98 PageSpeed</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">SEO Optimizado</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Indexación Google 100%</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-400">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Responsive Total</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Perfecto en Móvil & Mac</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Seguridad SSL</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Dominio & Host Seguro</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
