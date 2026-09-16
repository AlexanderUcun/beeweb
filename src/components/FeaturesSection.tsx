import React from 'react';
import { Smartphone, Zap, ShieldCheck, Rocket, Code2, Search } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Velocidad de Carga Instantánea',
      description: 'Construido sobre tecnología Vite y React 19 para garantizar tiempos de respuesta inferiores a 1 segundo.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-indigo-500" />,
      title: 'Adaptabilidad Móvil Perfecta',
      description: 'Cada maqueta se adapta al 100% a smartphones, tablets y pantallas de escritorio 4K.',
    },
    {
      icon: <Search className="w-6 h-6 text-cyan-500" />,
      title: 'SEO Técnico Integrado',
      description: 'Estructura semántica HTML5, metadatos listos y etiquetas Open Graph instaladas para posicionar en Google.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'Seguridad & SSL de Grado Bancario',
      description: 'Protección contra vulnerabilidades XSS, headers seguros y compatibilidad con hosting de alta disponibilidad.',
    },
    {
      icon: <Code2 className="w-6 h-6 text-violet-500" />,
      title: 'Código Limpio & Escalable',
      description: 'TypeScript estricto y componentes Tailwind CSS totalmente personalizados y fáciles de modificar.',
    },
    {
      icon: <Rocket className="w-6 h-6 text-rose-500" />,
      title: 'Despliegue en 48 Horas',
      description: 'Elige tu maqueta preferida y la adaptamos con el contenido, imágenes y marca de tu empresa de inmediato.',
    },
  ];

  return (
    <section id="ventajas" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400">
            Estándares de Excelencia
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ¿Por qué nuestras maquetas marcan la diferencia?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Diseñamos experiencias web de vanguardia preparadas para convertir visitantes casuales en clientes fieles.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
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
