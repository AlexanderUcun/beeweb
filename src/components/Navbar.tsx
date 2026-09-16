import React, { useState } from 'react';
import { Moon, Sun, ArrowRight, Menu, X, ShoppingBag } from 'lucide-react';
import { CURRENT_CLIENT_CONFIG } from '../config/clientConfig';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logo, contact } = CURRENT_CLIENT_CONFIG;

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hola beeWeb! Deseo información para hacer un pedido.')}`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-amber-50/80 dark:bg-slate-950/80 border-b border-amber-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-xl">🐝</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#401E01] dark:text-white">
                {logo.text}<span className="text-[#D98F07]">{logo.subtext}</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                100% Pura
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-700 dark:text-slate-200">
            <a href="#showcase" className="hover:text-[#D98F07] transition-colors">
              Nuestros Productos
            </a>
            <a href="#ventajas" className="hover:text-[#D98F07] transition-colors">
              Nuestra Cosecha
            </a>
            <a href="#precios" className="hover:text-[#D98F07] transition-colors">
              Kits & Combos
            </a>
            <a href="#contacto" className="hover:text-[#D98F07] transition-colors">
              Contacto
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#D98F07] border border-amber-200 dark:border-slate-800 transition-all duration-200"
              title={darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-amber-600" />}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-100" />
                Pedir por WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-amber-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-amber-200 dark:border-slate-800 space-y-3">
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-bold text-[#401E01] dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-900"
            >
              Nuestros Productos
            </a>
            <a
              href="#ventajas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-bold text-[#401E01] dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-900"
            >
              Nuestra Cosecha
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-bold text-[#401E01] dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-900"
            >
              Kits & Combos
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-emerald-600"
            >
              💬 Pedir por WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
