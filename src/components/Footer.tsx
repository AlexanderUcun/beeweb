import React from 'react';
import { Mail, Heart, Phone, MapPin, Share2, Globe } from 'lucide-react';
import { CURRENT_CLIENT_CONFIG } from '../config/clientConfig';

export const Footer: React.FC = () => {
  const { logo, contact, social } = CURRENT_CLIENT_CONFIG;

  return (
    <footer id="contacto" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-base">🐝</span>
                </div>
              </div>
              <span className="text-xl font-extrabold text-white">
                {logo.text}<span className="text-[#D98F07]">{logo.subtext}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apicultura 100% artesanal y sostenible. Miel pura, polen, propóleo y jalea real cosechada directamente en Tocancipá, Cundinamarca.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 transition-colors" title="Instagram">
                  <Share2 className="w-4 h-4" />
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 transition-colors" title="Facebook">
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">Nuestros Productos</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#showcase" className="hover:text-amber-400 transition-colors">Miel Pura Multiflora</a></li>
              <li><a href="#showcase" className="hover:text-amber-400 transition-colors">Polen Orgánico de Apicultivo</a></li>
              <li><a href="#showcase" className="hover:text-amber-400 transition-colors">Extracto de Propóleo Concentrado</a></li>
              <li><a href="#showcase" className="hover:text-amber-400 transition-colors">Jalea Real Fresca 100% Pura</a></li>
              <li><a href="#showcase" className="hover:text-amber-400 transition-colors">Cera Natural de Panal</a></li>
            </ul>
          </div>

          {/* Quality */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">Garantía beeWeb</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#ventajas" className="hover:text-amber-400 transition-colors">100% Cruda sin Pasteurizar</a></li>
              <li><a href="#ventajas" className="hover:text-amber-400 transition-colors">Origen Cundinamarca</a></li>
              <li><a href="#ventajas" className="hover:text-amber-400 transition-colors">Empaque Térmico Protegido</a></li>
              <li><a href="#ventajas" className="hover:text-amber-400 transition-colors">Pago Seguro por Nequi / PSE</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">Contacto Directo</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#D98F07]" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#D98F07]" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#D98F07]" />
                <span>{contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            © 2026 beeWeb. Todos los derechos reservados. Tocancipá, Colombia.
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-1">
            <span>Diseñado con</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>para amantes de los productos naturales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
