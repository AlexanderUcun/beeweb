/**
 * CONFIGURACIÓN MAESTRA DEL CLIENTE (MASTER STARTER KIT)
 * 
 * Modifica los datos de este archivo para adaptar toda la página web
 * al negocio de un nuevo cliente en menos de 2 minutos.
 */

export interface ClientConfig {
  companyName: string;
  brandTagline: string;
  nicheCategory: string;
  logo: {
    text: string;
    subtext: string;
    accentColor: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  payments: {
    nequiNumber: string;
    daviplataNumber: string;
    bancolombiaAccount: string;
    currency: string;
  };
  features: {
    enableSmartCheckout: boolean;
    enableDarkModeToggle: boolean;
    enableQuoteModal: boolean;
  };
}

export const CURRENT_CLIENT_CONFIG: ClientConfig = {
  companyName: 'StitchCraft Studio',
  brandTagline: 'Páginas Web Impactantes diseñadas para Escalar tu Empresa',
  nicheCategory: 'Agencia de Diseño & Desarrollo Web',
  logo: {
    text: 'Stitch',
    subtext: 'Craft',
    accentColor: 'indigo',
  },
  contact: {
    email: 'contacto@stitchcraft-studio.com',
    phone: '+57 300 123 4567',
    whatsapp: '573001234567',
    address: 'Bogotá, Colombia',
  },
  social: {
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  },
  payments: {
    nequiNumber: '300 123 4567',
    daviplataNumber: '315 987 6543',
    bancolombiaAccount: 'Ahorros # 123-456789-00',
    currency: 'USD',
  },
  features: {
    enableSmartCheckout: true,
    enableDarkModeToggle: true,
    enableQuoteModal: true,
  },
};
