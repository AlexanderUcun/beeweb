/**
 * CONFIGURACIÓN OFICIAL DE beeWeb
 * Apicultura & Productos Naturales de Tocancipá, Cundinamarca
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
  companyName: 'beeWeb',
  brandTagline: 'Productos puros de apicultivos directo a tu hogar',
  nicheCategory: 'Apicultura y Productos Naturales',
  logo: {
    text: 'bee',
    subtext: 'Web',
    accentColor: '#D98F07',
  },
  contact: {
    email: 'contacto@beeweb.com',
    phone: '+57 310 528 1302',
    whatsapp: '573105281302',
    address: 'Cra 8 # 12-53, Tocancipá, Colombia',
  },
  social: {
    instagram: 'https://instagram.com/beeweb_col',
    facebook: 'https://facebook.com/beewebcolombia',
  },
  payments: {
    nequiNumber: '3105281302',
    daviplataNumber: '3105281302',
    bancolombiaAccount: 'Ahorros Bancolombia # 310-528130-02',
    currency: 'COP',
  },
  features: {
    enableSmartCheckout: true,
    enableDarkModeToggle: true,
    enableQuoteModal: false,
  },
};
