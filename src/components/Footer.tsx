import React from 'react';
import { Layers, Globe, Share2, MessageCircle, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white">
                Stitch<span className="text-cyan-400">Craft</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Estudio de diseño web de vanguardia especializado en maquetas interactivas y sitios web de alta conversión para empresas.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors" title="Sitio Web">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors" title="Compartir">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors" title="Comunidad">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Sectores</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Tech & SaaS</a></li>
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Agencias Creativas</a></li>
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Consultoras & Firma Legal</a></li>
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">E-Commerce Flagship</a></li>
              <li><a href="#showcase" className="hover:text-cyan-400 transition-colors">Clínicas & Salud</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recursos</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#ventajas" className="hover:text-cyan-400 transition-colors">PageSpeed Optimization</a></li>
              <li><a href="#ventajas" className="hover:text-cyan-400 transition-colors">SEO Checklist 2026</a></li>
              <li><a href="#precios" className="hover:text-cyan-400 transition-colors">Calculadora de Tarifas</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Guía de Componentes</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contacto Directo</h4>
            <p className="text-xs text-slate-400 mb-3">
              ¿Tienes una consulta específica sobre tu proyecto?
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-300 mb-4">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>contacto@stitchcraft-studio.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            © 2026 StitchCraft Enterprise Mockups. Todos los derechos reservados.
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-1">
            <span>Creado con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>usando React, TypeScript & Tailwind CSS v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
