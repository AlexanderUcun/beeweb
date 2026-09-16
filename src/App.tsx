import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowcaseGrid } from './components/ShowcaseGrid';
import { MockupModal } from './components/MockupModal';
import { FeaturesSection } from './components/FeaturesSection';
import { PricingSection } from './components/PricingSection';
import { QuoteModal } from './components/QuoteModal';
import { SmartCheckoutModal } from './components/SmartCheckoutModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import type { MockupItem } from './data/mockups';
import { Toaster } from 'sonner';

export function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMockup, setSelectedMockup] = useState<MockupItem | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preselectedPackage, setPreselectedPackage] = useState('');
  
  // Smart Checkout State
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState('Sitio Corporativo Pro');
  const [checkoutPrice, setCheckoutPrice] = useState('$399');

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenQuoteModal = (packageName?: string) => {
    if (packageName) {
      setPreselectedPackage(packageName);
    } else {
      setPreselectedPackage('');
    }
    setQuoteModalOpen(true);
  };

  const handleOpenCheckout = (planName: string, price: string) => {
    setCheckoutPlan(planName);
    setCheckoutPrice(price);
    setCheckoutOpen(true);
  };

  const handleSelectMockupForQuote = (mockup: MockupItem) => {
    setPreselectedPackage(`Maqueta: ${mockup.title}`);
    setQuoteModalOpen(true);
  };

  const scrollToShowcase = () => {
    const el = document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Content */}
      <main>
        <Hero
          onExploreClick={scrollToShowcase}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
        />

        <ShowcaseGrid
          onSelectMockup={(mockup) => setSelectedMockup(mockup)}
        />

        <FeaturesSection />

        <PricingSection
          onOpenQuoteModal={(packageName) => handleOpenQuoteModal(packageName)}
          onOpenCheckout={(planName, price) => handleOpenCheckout(planName, price)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <MockupModal
        mockup={selectedMockup}
        onClose={() => setSelectedMockup(null)}
        onSelectForQuote={handleSelectMockupForQuote}
      />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedPackage={preselectedPackage}
      />

      <SmartCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        planName={checkoutPlan}
        amount={checkoutPrice}
      />

      <WhatsAppButton />

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
