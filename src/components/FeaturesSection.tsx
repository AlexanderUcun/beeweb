import React from 'react';
import { ShieldCheck, Zap, Heart, Award, Sparkles, Truck } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#D98F07]" />,
      title: 'Miel 100% Cruda y Pura',
      description: 'Cosechada a mano en Tocancipá. Sin pasteurización, procesos térmicos ni azúcares añadidos.',
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: 'Apicultura Ética y Sostenible',
      description: 'Respetamos los ciclos biológicos de las abejas. Cuidamos nuestras colmenas sin explotación extensiva.',
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      title: 'Floración Andina Nativa',
      description: 'Origen botánico único de la Sabana de Bogotá que aporta un aroma, textura y sabor inigualables.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Propiedades Medicinales Vivas',
      description: 'Preserva intactos sus enzimas activas, antioxidantes, polen natural y compuestos antivirales.',
    },
    {
      icon: <Truck className="w-6 h-6 text-cyan-600" />,
      title: 'Envío Seguro a Domicilio',
      description: 'Despachos garantizados a Cundinamarca y Bogotá en empaques de vidrio protegidos anti-rotura.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
      title: 'Garantía de Satisfacción 100%',
      description: 'Si no percibes la textura y aroma de la miel pura real, te devolvemos el 100% de tu dinero.',
    },
  ];

  return (
    <section id="ventajas" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#D98F07]">
            Calidad de Origen Tocancipá
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#401E01] dark:text-white tracking-tight">
            ¿Por qué la Miel de beeWeb es Diferente?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-400 font-medium">
            De la colmena a tu mesa sin intermediarios ni alteraciones industriales.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-amber-50/40 dark:bg-slate-900/60 border border-amber-200/60 dark:border-slate-800 hover:border-amber-400 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-amber-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#401E01] dark:text-white">
                {feat.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
