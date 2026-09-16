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
    city: '',
    selectedProduct: preselectedPackage || 'Kit Familiar Apícola ($85.000 COP)',
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
      return;
    }

    // Rate limiting check
    if (!checkRateLimit('quote_form', 3, 60000)) {
      toast.error('Demasiadas solicitudes', {
        description: 'Has superado el límite de envíos. Intenta en un momento.',
      });
      return;
    }

    const cleanEmail = sanitizeInput(formData.email);
    const cleanPhone = sanitizeInput(formData.phone);

    if (!isValidEmail(cleanEmail)) {
      toast.error('Correo electrónico no válido');
      return;
    }

    if (!isValidPhone(cleanPhone)) {
      toast.error('Número de teléfono no válido');
      return;
    }

    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    toast.success('¡Solicitud de pedido enviada!', {
      description: `Nos pondremos en contacto muy pronto para confirmar la entrega.`,
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
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-slate-800 overflow-hidden my-auto p-6 sm:p-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#401E01] dark:text-white">
              ¡Solicitud Recibida!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Gracias, <span className="font-semibold text-[#D98F07]">{formData.name}</span>. Un especialista de beeWeb te contactará para coordinar el despacho directo desde Tocancipá.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D98F07]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D98F07]">
                Atención Directa de Apiario
              </span>
            </div>
            <h3 className="mt-1 text-2xl font-extrabold text-[#401E01] dark:text-white">
              Pedido Especial / Venta Mayorista
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Déjanos tus datos y nos comunicaremos de inmediato para agilizar tu compra.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Invisible Honeypot Field */}
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
                    placeholder="Ej. María Rodríguez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ciudad / Municipio *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ej. Tocancipá / Bogotá"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
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
                    placeholder="maria@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
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
                    placeholder="310 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Producto o Servicio Apícola
                </label>
                <select
                  value={formData.selectedProduct}
                  onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                >
                  <option value="Miel Multiflora (500g) - $35.000 COP">Miel Multiflora (500g) - $35.000 COP</option>
                  <option value="Polen Orgánico (250g) - $28.000 COP">Polen Orgánico (250g) - $28.000 COP</option>
                  <option value="Propóleo Gotas (30ml) - $22.000 COP">Propóleo Gotas (30ml) - $22.000 COP</option>
                  <option value="Jalea Real (50g) - $65.000 COP">Jalea Real (50g) - $65.000 COP</option>
                  <option value="Combo Salud Personal ($55.000 COP)">Combo Salud Personal ($55.000 COP)</option>
                  <option value="Kit Familiar Apícola ($85.000 COP)">Kit Familiar Apícola ($85.000 COP)</option>
                  <option value="Kit Inmunidad Total ($130.000 COP)">Kit Inmunidad Total ($130.000 COP)</option>
                  <option value="Pedido al Por Mayor / Empresas">Pedido al Por Mayor / Empresas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Detalles adicionales de tu pedido
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Escribe la cantidad deseada o dirección específica de entrega..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#D98F07] via-amber-600 to-[#8C4E03] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                Enviar Solicitud a beeWeb
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

