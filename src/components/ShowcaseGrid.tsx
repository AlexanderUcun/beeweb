import React, { useState } from 'react';
import { MOCKUP_CATEGORIES, MOCKUP_ITEMS } from '../data/mockups';
import type { MockupItem } from '../data/mockups';
import { Eye, Star, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ShowcaseGridProps {
  onSelectMockup: (mockup: MockupItem) => void;
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({ onSelectMockup }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredMockups = activeCategory === 'all'
    ? MOCKUP_ITEMS
    : MOCKUP_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="showcase" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Catálogo de Maquetas Empresariales
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Explora nuestros diseños pre-configurados. Selecciona una maqueta para visualizar la experiencia interactiva completa o adaptarla a tu negocio.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {MOCKUP_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Mockups Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMockups.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 flex flex-col"
            >
              {/* Image & Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10 shadow-sm">
                    {item.badge}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-600/90 text-white backdrop-blur-md">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={() => onSelectMockup(item)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-lg flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                  >
                    <Eye className="w-4 h-4 text-indigo-600" />
                    Vista Previa Interactiva
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{item.rating}</span>
                      <span>({item.reviewsCount} reseñas)</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="mt-4 space-y-1.5">
                    {item.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectMockup(item)}
                    className="p-2 rounded-lg text-indigo-600 dark:text-cyan-400 hover:bg-indigo-50 dark:hover:bg-slate-900 transition-colors"
                    title="Ver detalles"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
