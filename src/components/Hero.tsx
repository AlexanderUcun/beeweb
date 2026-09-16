import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Heart } from 'lucide-react';
import { CURRENT_CLIENT_CONFIG } from '../config/clientConfig';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { companyName, brandTagline } = CURRENT_CLIENT_CONFIG;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-amber-50/40 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      {/* Background Decorative Honey Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-400/20 via-orange-400/20 to-yellow-300/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300/80 dark:border-amber-800 shadow-sm mb-8 text-center max-w-full">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping flex-shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300 text-center">
            🐝 100% Miel Cruda Pura & Cosecha Sostenible de Tocancipá
          </span>
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#401E01] dark:text-white max-w-5xl mx-auto leading-[1.15] text-center">
          {companyName} —{' '}
          <span className="bg-gradient-to-r from-[#D98F07] via-[#8C4E03] to-[#D98F07] bg-clip-text text-transparent">
            {brandTagline}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium text-center">
          Descubre miel pura de abejas, polen orgánico, jalea real y extractos de propóleo recolectados artesanalmente en nuestros apiarios libres de químicos.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#D98F07] via-amber-600 to-[#8C4E03] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 group"
          >
            Explorar Catálogo de Productos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={`https://wa.me/${CURRENT_CLIENT_CONFIG.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-[#401E01] dark:text-white bg-amber-100/70 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 transition-all duration-200 flex items-center justify-center gap-2"
          >
            💬 Pedir por WhatsApp Directo
          </a>
        </div>

        {/* Feature Badges Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-amber-200/60 dark:border-slate-800/80">
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-amber-200/60 dark:border-slate-800 flex items-center justify-center sm:justify-start gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-[#D98F07] flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#401E01] dark:text-white">100% Pura & Cruda</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Sin azúcares ni aditivos</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-amber-200/60 dark:border-slate-800 flex items-center justify-center sm:justify-start gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-[#D98F07] flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#401E01] dark:text-white">Origen Tocancipá</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Cundinamarca, Colombia</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-amber-200/60 dark:border-slate-800 flex items-center justify-center sm:justify-start gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-[#D98F07] flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#401E01] dark:text-white">Apicultura Ética</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Respeto a las colmenas</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-slate-900/50 backdrop-blur-sm border border-amber-200/60 dark:border-slate-800 flex items-center justify-center sm:justify-start gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-[#D98F07] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#401E01] dark:text-white">Envío a Domicilio</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Nequi / Bancolombia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

