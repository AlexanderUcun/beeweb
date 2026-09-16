import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { sanitizeInput, isValidEmail, isValidPhone, checkRateLimit, isBotSubmission } from '../lib/security';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackage?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedPackage = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: 'saas',
    selectedPackage: preselectedPackage || 'Sitio Corporativo Pro',
    details: '',
    website_hp: '', // Invisible Honeypot field for bot detection
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-Bot Honeypot check
    if (isBotSubmission(formData.website_hp)) {
      console.warn('Bot submission blocked via Honeypot.');
      return; // Silently drop bot requests
    }

    // Rate limiting check (max 3 submissions per minute)
    if (!checkRateLimit('quote_form', 3, 60000)) {
      toast.error('Demasiadas solicitudes', {
        description: 'Has superado el límite de envíos por minuto. Intenta de nuevo en unos momentos.',
      });
      return;
    }

    // Security sanitization and validation
    const cleanEmail = sanitizeInput(formData.email);
    const cleanPhone = sanitizeInput(formData.phone);

    if (!isValidEmail(cleanEmail)) {
      toast.error('Correo electrónico no válido', {
        description: 'Por favor introduce una dirección de correo válida.',
      });
      return;
    }

    if (!isValidPhone(cleanPhone)) {
      toast.error('Número de teléfono no válido', {
        description: 'Por favor introduce un número telefónico válido.',
      });
      return;
    }

    setSubmitted(true);

    // Launch celebratory confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    const cleanCompany = sanitizeInput(formData.company);
    toast.success('¡Solicitud enviada con éxito!', {
      description: `Nos pondremos en contacto con ${cleanCompany} muy pronto.`,
    });

    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto p-6 sm:p-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              ¡Solicitud Recibida!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Gracias, <span className="font-semibold text-indigo-600 dark:text-cyan-400">{formData.name}</span>. Un especialista de StitchCraft te contactará en breve para preparar la maqueta de tu empresa.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400">
                Respuesta en menos de 24 Horas
              </span>
            </div>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
              Solicitar Maqueta Personalizada
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Déjanos los datos de tu empresa y prepararemos una maqueta interactiva sin compromiso.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Invisible Honeypot Field for Bot Detection */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre de Empresa / Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ej. Innova Tech S.A."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carlos@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Plan o Maqueta Preferida
                </label>
                <select
                  value={formData.selectedPackage}
                  onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Landing Page Rápida">Landing Page Rápida ($199)</option>
                  <option value="Sitio Corporativo Pro">Sitio Corporativo Pro ($399)</option>
                  <option value="Enterprise / E-Commerce">Enterprise / E-Commerce ($799)</option>
                  <option value="Maqueta Personalizada 100%">Maqueta 100% a Medida</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Detalles adicionales de tu proyecto
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Cuéntanos brevemente qué hace tu empresa o qué estilo te gusta..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                Enviar Solicitud de Maqueta
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
