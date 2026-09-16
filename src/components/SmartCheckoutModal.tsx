import React, { useState, useEffect } from 'react';
import { X, Smartphone, CreditCard, Building2, CheckCircle2, Copy, Check, ShieldCheck, Zap, ArrowRight, RefreshCw, Truck, MapPin, User, Phone, Mail, Package } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { CURRENT_CLIENT_CONFIG } from '../config/clientConfig';

interface SmartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  amount?: string;
}

type PaymentMethod = 'nequi' | 'daviplata' | 'bancolombia_pse' | 'card';
type CheckoutStep = 'shipping' | 'select_payment' | 'verifying' | 'success';

const COLOMBIAN_DEPARTMENTS = [
  'Cundinamarca',
  'Bogotá D.C.',
  'Antioquia',
  'Valle del Cauca',
  'Santander',
  'Boyacá',
  'Atlántico',
  'Bolívar',
  'Caldas',
  'Risaralda',
  'Quindío',
  'Tolima',
  'Huila',
  'Meta',
  'Norte de Santander',
  'Nariño',
];

const MAIN_CITIES: Record<string, string[]> = {
  'Cundinamarca': ['Tocancipá', 'Zipaquirá', 'Chía', 'Cajicá', 'Sopó', 'Gachancipá', 'Nemocón', 'Cota', 'Facatativá', 'Mosquera', 'Funza', 'Soacha', 'Girardot', 'Otro Municipio'],
  'Bogotá D.C.': ['Bogotá D.C.'],
  'Antioquia': ['Medellín', 'Envigado', 'Itagüí', 'Bello', 'Rionegro', 'Sabaneta', 'Otro Municipio'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Tuluá', 'Buenaventura', 'Cartago', 'Otro Municipio'],
  'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'Otro Municipio'],
  'Boyacá': ['Tunja', 'Duitama', 'Sogamoso', 'Villa de Leyva', 'Chiquinquirá', 'Otro Municipio'],
};

const COLOMBIAN_BANKS = [
  'Bancolombia',
  'Nequi',
  'Daviplata / Davivienda',
  'Banco de Bogotá',
  'BBVA Colombia',
  'Banco de Occidente',
  'Lulo Bank',
  'Nu Colombia (Cuenta Nu)',
  'RappiPay / Davivienda',
  'Scotiabank Colpatria',
  'Banco Popular',
  'Banco AV Villas',
];

export const SmartCheckoutModal: React.FC<SmartCheckoutModalProps> = ({
  isOpen,
  onClose,
  planName = 'Miel Multiflora Orgánica',
  amount = '$35.000',
}) => {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [method, setMethod] = useState<PaymentMethod>('nequi');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState('Bancolombia');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [progress, setProgress] = useState(0);

  // Customer & Shipping Form State
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    department: 'Cundinamarca',
    city: 'Tocancipá',
    customCity: '',
    address: '',
    neighborhood: '',
    notes: '',
  });

  const nequiNumber = CURRENT_CLIENT_CONFIG.payments?.nequiNumber || '3105281302';
  const daviplataNumber = CURRENT_CLIENT_CONFIG.payments?.daviplataNumber || '3105281302';

  // Simulated countdown for verification
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'verifying') {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep('success');
            confetti({
              particleCount: 130,
              spread: 85,
              origin: { y: 0.5 },
            });
            toast.success('¡Pago Confirmado Exitosamente!', {
              description: `Tu orden para ${planName} ha sido agendada para despacho.`,
            });
            return 100;
          }
          return prev + 25;
        });
      }, 700);
    }
    return () => clearInterval(timer);
  }, [step, planName]);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.info(`Copiado al portapapeles: ${fieldName}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingData.fullName.trim() || !shippingData.phone.trim() || !shippingData.address.trim()) {
      toast.error('Por favor completa los campos obligatorios de envío.');
      return;
    }
    setStep('select_payment');
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verifying');
  };

  const handleReset = () => {
    setStep('shipping');
    onClose();
  };

  const finalCityName = shippingData.city === 'Otro Municipio' && shippingData.customCity 
    ? shippingData.customCity 
    : shippingData.city;

  const isLocalDelivery = shippingData.department === 'Cundinamarca' && ['Tocancipá', 'Zipaquirá', 'Chía', 'Cajicá', 'Sopó', 'Gachancipá'].includes(finalCityName);
  const estimatedDays = isLocalDelivery ? '1 a 2 días hábiles' : '3 a 5 días hábiles (Nacional)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-slate-800 overflow-hidden my-auto p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="flex items-center space-x-3 mb-6 border-b border-amber-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 p-0.5 shadow-md flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-extrabold text-[#401E01] dark:text-white truncate">
                Checkout beeWeb
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Apicultura Tocancipá 🐝
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              Producto: <span className="font-bold text-[#401E01] dark:text-white">{planName}</span> ({amount})
            </p>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-500">
          <div className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-[#D98F07]' : 'text-emerald-600'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'shipping' ? 'bg-[#D98F07] text-white' : 'bg-emerald-600 text-white'}`}>1</span>
            <span>Datos de Envío</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-800" />
          <div className={`flex items-center gap-1.5 ${step === 'select_payment' ? 'text-[#D98F07]' : step === 'success' || step === 'verifying' ? 'text-emerald-600' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'select_payment' ? 'bg-[#D98F07] text-white' : step === 'success' || step === 'verifying' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>2</span>
            <span>Método de Pago</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-800" />
          <div className={`flex items-center gap-1.5 ${step === 'success' ? 'text-emerald-600' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>3</span>
            <span>Confirmación</span>
          </div>
        </div>

        {/* STEP 1: SHIPPING DETAILS */}
        {step === 'shipping' && (
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div className="bg-amber-50/60 dark:bg-slate-950 p-3.5 rounded-2xl border border-amber-200/80 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
              <Truck className="w-5 h-5 text-[#D98F07] flex-shrink-0" />
              <div>
                <span className="font-bold text-[#401E01] dark:text-amber-400">Envíos Nacionales & Locales:</span>
                <span className="ml-1">Servientrega, Interrapidísimo, Coordinadora y Domicilio Directo.</span>
                <div className="font-semibold text-amber-700 dark:text-amber-300 mt-0.5">
                  ⏱️ Tiempo estimado de entrega: <span className="underline">{estimatedDays}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#D98F07]" /> Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  autoComplete="shipping name"
                  value={shippingData.fullName}
                  onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#D98F07]" /> Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  autoComplete="shipping tel"
                  value={shippingData.phone}
                  onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                  placeholder="310 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D98F07]" /> Departamento *
                </label>
                <select
                  value={shippingData.department}
                  onChange={(e) => {
                    const dept = e.target.value;
                    const defaultCity = MAIN_CITIES[dept] ? MAIN_CITIES[dept][0] : 'Municipio Principal';
                    setShippingData({ ...shippingData, department: dept, city: defaultCity });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                >
                  {COLOMBIAN_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#D98F07]" /> Municipio / Ciudad *
                </label>
                <select
                  value={shippingData.city}
                  onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                >
                  {(MAIN_CITIES[shippingData.department] || ['Municipio Principal', 'Otro Municipio']).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {shippingData.city === 'Otro Municipio' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Escribe el Nombre del Municipio / Vereda *
                </label>
                <input
                  type="text"
                  required
                  value={shippingData.customCity}
                  onChange={(e) => setShippingData({ ...shippingData, customCity: e.target.value })}
                  placeholder="Ej. Sesquilé / Guatavita / Vereda Centro"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D98F07]" /> Dirección de Entrega *
                </label>
                <input
                  type="text"
                  required
                  autoComplete="shipping address-line1"
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  placeholder="Ej. Cra 8 # 12-53, Apto 201"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-[#D98F07]" /> Barrio / Vereda / Sector
                </label>
                <input
                  type="text"
                  value={shippingData.neighborhood}
                  onChange={(e) => setShippingData({ ...shippingData, neighborhood: e.target.value })}
                  placeholder="Ej. Barrio El Centro / Vereda Canavita"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#D98F07]" /> Correo Electrónico (para recibo)
                </label>
                <input
                  type="email"
                  autoComplete="shipping email"
                  value={shippingData.email}
                  onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Indicaciones para el Repartidor
                </label>
                <input
                  type="text"
                  value={shippingData.notes}
                  onChange={(e) => setShippingData({ ...shippingData, notes: e.target.value })}
                  placeholder="Ej. Dejar en portería / Llamar al llegar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#D98F07] via-amber-600 to-[#8C4E03] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
            >
              Continuar al Pago ({amount})
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION */}
        {step === 'select_payment' && (
          <div className="space-y-6">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-slate-950 border border-amber-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#401E01] dark:text-white">Envío a: {shippingData.fullName}</div>
                <div className="text-slate-600 dark:text-slate-400">{shippingData.address}, {finalCityName} ({shippingData.department})</div>
              </div>
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-[#D98F07] underline font-bold hover:text-[#8C4E03]"
              >
                Editar datos
              </button>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setMethod('nequi')}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  method === 'nequi'
                    ? 'border-[#D98F07] bg-amber-50 dark:bg-amber-950/40 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center">N</span>
                  {method === 'nequi' && <Check className="w-4 h-4 text-[#D98F07]" />}
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Nequi</div>
                  <div className="text-[10px] text-slate-500">Instantáneo</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('daviplata')}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  method === 'daviplata'
                    ? 'border-[#D98F07] bg-amber-50 dark:bg-amber-950/40 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center">D</span>
                  {method === 'daviplata' && <Check className="w-4 h-4 text-[#D98F07]" />}
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Daviplata</div>
                  <div className="text-[10px] text-slate-500">Sin comisión</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('bancolombia_pse')}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  method === 'bancolombia_pse'
                    ? 'border-[#D98F07] bg-amber-50 dark:bg-amber-950/40 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Building2 className="w-5 h-5 text-[#D98F07]" />
                  {method === 'bancolombia_pse' && <Check className="w-4 h-4 text-[#D98F07]" />}
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">PSE / Bancos</div>
                  <div className="text-[10px] text-slate-500">Cualquier banco</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  method === 'card'
                    ? 'border-[#D98F07] bg-amber-50 dark:bg-amber-950/40 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="w-5 h-5 text-[#D98F07]" />
                  {method === 'card' && <Check className="w-4 h-4 text-[#D98F07]" />}
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Tarjetas</div>
                  <div className="text-[10px] text-slate-500">Visa / MC / Amex</div>
                </div>
              </button>
            </div>

            {/* Method Details Form */}
            <form onSubmit={handleStartPayment} className="space-y-4">
              {method === 'nequi' && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-950 border border-amber-200/80 dark:border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="w-32 h-32 rounded-xl bg-white p-2 border border-amber-200 shadow-md flex flex-col items-center justify-center text-center">
                      <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center p-2 text-amber-300 text-[10px] font-mono leading-tight">
                        [QR Nequi beeWeb]
                        <br />
                        {amount}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 text-left w-full">
                      <div className="text-xs font-semibold text-slate-500">Número Nequi beeWeb:</div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                        <span className="font-mono font-bold text-[#401E01] dark:text-white text-sm">{nequiNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(nequiNumber, 'Número Nequi')}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-100 dark:bg-slate-800 text-[#D98F07] flex items-center gap-1"
                        >
                          {copiedField === 'Número Nequi' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          Copiar
                        </button>
                      </div>

                      <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-[#D98F07]" />
                        <span>Transfiere desde tu App Nequi al número arriba.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {method === 'daviplata' && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-950 border border-amber-200/80 dark:border-slate-800 space-y-4">
                  <div className="text-xs font-semibold text-slate-500">Número Daviplata beeWeb:</div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                    <span className="font-mono font-bold text-[#401E01] dark:text-white text-sm">{daviplataNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(daviplataNumber, 'Número Daviplata')}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-100 dark:bg-slate-800 text-[#D98F07] flex items-center gap-1"
                    >
                      {copiedField === 'Número Daviplata' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      Copiar
                    </button>
                  </div>
                </div>
              )}

              {method === 'bancolombia_pse' && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-950 border border-amber-200/80 dark:border-slate-800 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Selecciona tu Banco para PSE:
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D98F07]"
                  >
                    {COLOMBIAN_BANKS.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              )}

              {method === 'card' && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-950 border border-amber-200/80 dark:border-slate-800 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="4500 0000 0000 0000"
                      maxLength={19}
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Vencimiento (MM/AA)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="12/28"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        CVC
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="123"
                        maxLength={4}
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-4 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#D98F07] via-amber-600 to-[#8C4E03] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                <ShieldCheck className="w-5 h-5 text-amber-200" />
                Pagar {amount} Instantáneamente
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: VERIFICATION SIMULATION */}
        {step === 'verifying' && (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-[#D98F07] mx-auto flex items-center justify-center animate-spin">
              <RefreshCw className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Verificando Transacción en Tiempo Real
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Validando el pago de {amount} y agendando envío a {shippingData.fullName}...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-sm mx-auto bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-[#D98F07] to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION & RECEIPT */}
        {step === 'success' && (
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                Pago Confirmado & Despacho Agendado ⚡
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                ¡Gracias por tu Compra en beeWeb!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Tu pedido para <span className="font-bold text-[#401E01] dark:text-white">{planName}</span> se enviará desde nuestros apiarios de Tocancipá.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-950 border border-amber-200/80 dark:border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-amber-200/60 dark:border-slate-800 pb-2">
                <span className="text-slate-500">ID de Referencia:</span>
                <span className="font-mono font-bold text-[#401E01] dark:text-white">BEEWEB-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between border-b border-amber-200/60 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Cliente:</span>
                <span className="font-bold text-slate-900 dark:text-white">{shippingData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-amber-200/60 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Dirección de Despacho:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{shippingData.address}, {finalCityName} ({shippingData.department})</span>
              </div>
              <div className="flex justify-between border-b border-amber-200/60 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Tiempo de Entrega Estimado:</span>
                <span className="font-bold text-[#D98F07]">{estimatedDays}</span>
              </div>
              <div className="flex justify-between border-b border-amber-200/60 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Monto Abonado:</span>
                <span className="font-bold text-[#D98F07]">{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Método de Pago:</span>
                <span className="font-semibold text-[#8C4E03] dark:text-amber-400 uppercase">{method}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[#401E01] hover:bg-[#8C4E03] text-sm transition-colors"
            >
              Volver a la Tienda
            </button>
          </div>
        )}

      </div>
    </div>
  );
};


