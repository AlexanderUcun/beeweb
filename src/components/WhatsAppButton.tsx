import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CURRENT_CLIENT_CONFIG } from '../config/clientConfig';

export const WhatsAppButton: React.FC = () => {
  const { whatsapp } = CURRENT_CLIENT_CONFIG.contact;
  const { companyName } = CURRENT_CLIENT_CONFIG;

  const defaultMessage = encodeURIComponent(
    `Hola! Vi la página web de ${companyName} y me gustaría solicitar información para un proyecto.`
  );

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      title="Contactar por WhatsApp"
    >
      {/* Animated Ping Ring */}
      <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-75 animate-ping pointer-events-none" />
      
      <MessageCircle className="w-6 h-6 fill-white text-emerald-500 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Tooltip on Hover */}
      <span className="hidden md:block absolute right-16 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        ¿Hablamas por WhatsApp? 💬
      </span>
    </a>
  );
};
