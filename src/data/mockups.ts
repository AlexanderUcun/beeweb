export interface MockupItem {
  id: string;
  title: string;
  category: 'saas' | 'agency' | 'corporate' | 'ecommerce' | 'health';
  categoryLabel: string;
  description: string;
  thumbnail: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  features: string[];
  techStack: string[];
  livePreviewUrl?: string;
  desktopPreviewImage: string;
  mobilePreviewImage: string;
  highlights: { title: string; desc: string }[];
}

export const MOCKUP_CATEGORIES = [
  { id: 'all', label: 'Todas las Maquetas' },
  { id: 'saas', label: 'Tech & SaaS' },
  { id: 'agency', label: 'Agencias Creativas' },
  { id: 'corporate', label: 'Corporativo & Legal' },
  { id: 'ecommerce', label: 'E-Commerce & Retail' },
  { id: 'health', label: 'Salud & Bienestar' },
];

export const MOCKUP_ITEMS: MockupItem[] = [
  {
    id: 'nova-saas',
    title: 'NovaAI - Platform & Cloud SaaS',
    category: 'saas',
    categoryLabel: 'Tech & SaaS',
    description: 'Landing page ultra moderna con gradientes fluídos, métricas interactivas y cuadro de precios dinámico.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    badge: 'Más Popular',
    rating: 4.9,
    reviewsCount: 38,
    features: ['Dashboard Mockup', 'Calculadora de Precios', 'Soporte Dark Mode Native', 'Sección de Integraciones API'],
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Conversión Optimizada', desc: 'Diseñado específicamente para aumentar suscripciones y demos.' },
      { title: 'Velocidad de Carga', desc: 'Puntuación de 99/100 en Google PageSpeed Insights.' },
    ],
  },
  {
    id: 'nexus-agency',
    title: 'Vanguard - Agencia de Diseño & Studio',
    category: 'agency',
    categoryLabel: 'Agencias Creativas',
    description: 'Estética minimalista con tipografía audaz, portafolios interactivos de proyectos y animaciones sutiles.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    badge: 'Tendencia 2026',
    rating: 5.0,
    reviewsCount: 42,
    features: ['Showcase de Proyectos con Filtros', 'Sección de Equipo Interactiva', 'Formulario de Brief Rápido'],
    techStack: ['React', 'Tailwind CSS', 'Lucide Icons'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Visualmente Impactante', desc: 'Efectos de vidrio y gradientes adaptativos para impresionar clientes.' },
      { title: 'Portafolio Filtro Dinámico', desc: 'Organiza proyectos por categoría instantáneamente.' },
    ],
  },
  {
    id: 'apex-legal',
    title: 'Aegis - Firma Consultora & Legal',
    category: 'corporate',
    categoryLabel: 'Corporativo & Legal',
    description: 'Diseño sobrio, elegante y de máxima confianza con reserva de citas integradas y perfiles de socios.',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    badge: 'Empresarial',
    rating: 4.8,
    reviewsCount: 29,
    features: ['Agendamiento de Citas Directo', 'Testimonios Verificados', 'Directorio de Especialistas'],
    techStack: ['React', 'Tailwind CSS', 'Form Validation'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Alta Máxima Confianza', desc: 'Tipografía refinada y esquema de colores corporativos premium.' },
      { title: 'Generador de Leed', desc: 'Formulario de consulta inicial optimizado para conversión.' },
    ],
  },
  {
    id: 'lumina-retail',
    title: 'Lumina - Moda & E-Commerce Flagship',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce & Retail',
    description: 'Experiencia de compra fluida con catálogo de productos dinámico, vista previa rápida y carrito lateral.',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    badge: 'Ventas Pro',
    rating: 4.9,
    reviewsCount: 54,
    features: ['Quick View Modal', 'Filtro por Tallas y Colores', 'Checkout Optimizado para Móvil'],
    techStack: ['React', 'Tailwind CSS', 'State Management'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Efecto Galería 360°', desc: 'Demostración de productos de alta fidelidad visual.' },
      { title: 'Carrito Inteligente', desc: 'Manejo de variaciones de producto en tiempo real.' },
    ],
  },
  {
    id: 'zenith-health',
    title: 'Vitalis - Centro Médico & Salud Integral',
    category: 'health',
    categoryLabel: 'Salud & Bienestar',
    description: 'Plataforma limpia y accesible para clínicas, spas y especialistas de la salud con telemedicina.',
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    badge: 'Salud & Relax',
    rating: 4.9,
    reviewsCount: 22,
    features: ['Reserva de Turnos en Línea', 'Listado de Tratamientos', 'Módulo de Ubicación & Horarios'],
    techStack: ['React', 'Tailwind CSS', 'Responsive Grid'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Accesibilidad AA+', desc: 'Navegación clara y contrastada para todo público.' },
      { title: 'Integración WhatsApp', desc: 'Botón flotante directo para emergencias y consultas.' },
    ],
  },
];
