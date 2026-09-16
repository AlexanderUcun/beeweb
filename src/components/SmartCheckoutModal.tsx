import React, { useState, useEffect } from 'react';
import { X, Smartphone, CreditCard, Building2, CheckCircle2, Copy, Check, ShieldCheck, Zap, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface SmartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  amount?: string;
}

type PaymentMethod = 'nequi' | 'daviplata' | 'bancolombia_pse' | 'card';

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
  planName = 'Sitio Corporativo Pro',
  amount = '$399',
}) => {
  const [method, setMethod] = useState<PaymentMethod>('nequi');
  const [step, setStep] = useState<'select' | 'verifying' | 'success'>('select');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState('Bancolombia');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [progress, setProgress] = useState(0);

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
              particleCount: 120,
              spread: 80,
              origin: { y: 0.5 },
            });
            toast.success('¡Pago Confirmado Instantáneamente!', {
              description: `Tu orden para ${planName} ha sido procesada con éxito.`,
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

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verifying');
  };

  const handleReset = () => {
    setStep('select');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-indigo-600 to-cyan-400 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Smart Instant Checkout
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                Colombia ⚡
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pago seguro e inmediato para <span className="font-bold text-slate-700 dark:text-slate-200">{planName}</span> ({amount})
            </p>
          </div>
        </div>

        {/* Step 1: Payment Method Selection */}
        {step === 'select' && (
          <div className="space-y-6">

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setMethod('nequi')}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  method === 'nequi'
                    ? 'border-indigo-600 dark:border-cyan-400 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center">N</span>
                  {method === 'nequi' && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />}
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
                    ? 'border-indigo-600 dark:border-cyan-400 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center">D</span>
                  {method === 'daviplata' && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />}
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
                    ? 'border-indigo-600 dark:border-cyan-400 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Building2 className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                  {method === 'bancolombia_pse' && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />}
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
                    ? 'border-indigo-600 dark:border-cyan-400 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-md scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                  {method === 'card' && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />}
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
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Simulated QR */}
                    <div className="w-32 h-32 rounded-xl bg-white p-2 border border-slate-200 shadow-md flex flex-col items-center justify-center text-center">
                      <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center p-2 text-white text-[10px] font-mono leading-tight">
                        [QR Nequi Dinámico]
                        <br />
                        {amount}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 text-left w-full">
                      <div className="text-xs font-semibold text-slate-500">Número de Cuenta Nequi:</div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">300 123 4567</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('3001234567', 'Número Nequi')}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-cyan-400 flex items-center gap-1"
                        >
                          {copiedField === 'Número Nequi' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          Copiar
                        </button>
                      </div>

                      <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
                        <span>En celular: Abre tu App Nequi y envía el pago al número arriba.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {method === 'daviplata' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="text-xs font-semibold text-slate-500">Número Daviplata de la Empresa:</div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">315 987 6543</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('3159876543', 'Número Daviplata')}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-cyan-400 flex items-center gap-1"
                    >
                      {copiedField === 'Número Daviplata' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      Copiar
                    </button>
                  </div>
                </div>
              )}

              {method === 'bancolombia_pse' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Selecciona tu Banco o Entidad Financiera (PSE / Botón):
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {COLOMBIAN_BANKS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {method === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        CVC / CWW
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="123"
                        maxLength={4}
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-4 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 via-indigo-600 to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-200" />
                Pagar {amount} Instantáneamente
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Verification Simulation */}
        {step === 'verifying' && (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-cyan-400 mx-auto flex items-center justify-center animate-spin">
              <RefreshCw className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Verificando Transacción en Tiempo Real
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Conectando con la red de pagos colombiana para validar la recepción de {amount}...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-sm mx-auto bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation & Receipt */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                Aprobado ⚡
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">
                ¡Pago Recibido con Éxito!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Tu pedido para <span className="font-bold text-slate-700 dark:text-slate-200">{planName}</span> ha sido procesado. Se ha enviado el comprobante a tu dirección de correo.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">ID de Referencia:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">STITCH-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Monto Abonado:</span>
                <span className="font-bold text-slate-900 dark:text-white">{amount} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Método de Pago:</span>
                <span className="font-semibold text-indigo-600 dark:text-cyan-400 uppercase">{method}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-sm transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
