export interface MockupItem {
  id: string;
  title: string;
  category: 'miel' | 'polen' | 'propoleo' | 'jalea' | 'kits';
  categoryLabel: string;
  description: string;
  thumbnail: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  priceCOP: string;
  features: string[];
  techStack: string[];
  desktopPreviewImage: string;
  mobilePreviewImage: string;
  highlights: { title: string; desc: string }[];
}

export const MOCKUP_CATEGORIES = [
  { id: 'all', label: 'Todos los Productos' },
  { id: 'miel', label: 'Mieles Puras' },
  { id: 'polen', label: 'Polen & Cera' },
  { id: 'propoleo', label: 'Propóleo & Gotas' },
  { id: 'jalea', label: 'Jalea Real' },
  { id: 'kits', label: 'Kits & Regalos' },
];

export const MOCKUP_ITEMS: MockupItem[] = [
  {
    id: 'miel-multiflora-500g',
    title: 'Miel Pura de Abejas Multiflora (500g)',
    category: 'miel',
    categoryLabel: 'Mieles Puras',
    description: 'Miel 100% pura y cruda recolectada en apiarios orgánicos de Tocancipá. Sin azúcares ni mezclas procesadas.',
    thumbnail: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1200&q=80',
    badge: 'Más Vendido 🍯',
    rating: 5.0,
    reviewsCount: 64,
    priceCOP: '$35.000 COP',
    features: ['100% Cosecha Artesanal', 'Sin Pasteurizar', 'Origen Cundinamarca', 'Envío a Domicilio'],
    techStack: ['Pura', 'Orgánica', 'Tocancipá'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Cosecha Fono-Sostenible', desc: 'Respetamos el ciclo natural de las colmenas sin sobre-explotación.' },
      { title: 'Sabor Silvestre Intenso', desc: 'Notas florales de bosques andinos nativos de la sabana de Bogotá.' },
    ],
  },
  {
    id: 'polen-organico-250g',
    title: 'Polen Orgánico de Apicultivo (250g)',
    category: 'polen',
    categoryLabel: 'Polen & Cera',
    description: 'Superalimento natural cargado de proteínas, aminoácidos y vitaminas. Excelente energizante natural.',
    thumbnail: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80',
    badge: 'Superalimento',
    rating: 4.9,
    reviewsCount: 41,
    priceCOP: '$28.000 COP',
    features: ['Rico en Vitaminas B y C', 'Refuerza Sistema Inmune', '100% Grano Natural', 'Sin Aditivos'],
    techStack: ['Energía', 'Proteína', 'Salud'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Energía 100% Natural', desc: 'Ideal para consumir en desayunos, smoothies o yogur por las mañanas.' },
      { title: 'Secado Lento', desc: 'Procesado a baja temperatura para preservar todas sus enzimas activas.' },
    ],
  },
  {
    id: 'propoleo-concentrado-30ml',
    title: 'Extracto de Propóleo Concentrado (30ml)',
    category: 'propoleo',
    categoryLabel: 'Propóleo & Gotas',
    description: 'Gotas de propóleo puro antibiótico y antiviral natural. Excelente defensa contra afecciones respiratorias.',
    thumbnail: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80',
    badge: 'Salud Respiratoria',
    rating: 4.9,
    reviewsCount: 52,
    priceCOP: '$22.000 COP',
    features: ['Antiviral & Antibacteriano', 'Gotero Fácil Dosificación', 'Concentración Garantizada', 'Alivio de Garganta'],
    techStack: ['Defensas', 'Gotas', 'Antiviral'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Protección para Garganta', desc: 'Recomendado para cambios de clima y prevención de resfriados.' },
      { title: '100% Concentrado', desc: 'Sin colorantes ni conservantes artificiales.' },
    ],
  },
  {
    id: 'jalea-real-fresca-50g',
    title: 'Jalea Real Fresca 100% Pura (50g)',
    category: 'jalea',
    categoryLabel: 'Jalea Real',
    description: 'El alimento exclusivo de la abeja reina. Potente regenerador celular, rejuvenecedor y tónico del sistema nervioso.',
    thumbnail: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=80',
    badge: 'Calidad Premium 👑',
    rating: 5.0,
    reviewsCount: 29,
    priceCOP: '$45.000 COP',
    features: ['Mantener Refrigerada', 'Rica en Ácido 10-HDA', 'Regenerador Celular', 'Máxima Frescura'],
    techStack: ['Reina', 'Vitalidad', 'Lujo'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Vitalidad Inmediata', desc: 'Aumenta el rendimiento físico y mental de forma progresiva.' },
      { title: 'Conservación en Frío', desc: 'Entregada en empaque térmico especial para mantener su frescura viva.' },
    ],
  },
  {
    id: 'cera-abejas-panal-1kg',
    title: 'Cera Natural de Panal Virgen (1kg)',
    category: 'polen',
    categoryLabel: 'Polen & Cera',
    description: 'Cera 100% pura de abejas para cosmética natural, velas artesanales o envoltorios ecológicos.',
    thumbnail: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1200&q=80',
    badge: 'Artesanal',
    rating: 4.8,
    reviewsCount: 18,
    priceCOP: '$50.000 COP',
    features: ['Cera Virgen Filtrada', 'Aroma Dulce a Miel', 'Uso Cosmético y Velas', 'Biodegradable'],
    techStack: ['Cosmética', 'Velas', 'Eco'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'Aroma Natural de Panal', desc: 'Fragancia característica a miel y propóleo de bosque.' },
      { title: 'Sin Tratamientos Químicos', desc: 'Simplemente derretida y filtrada para quitar impurezas.' },
    ],
  },
  {
    id: 'kit-salud-inmunidad',
    title: 'Kit Apícola Salud & Inmunidad Total',
    category: 'kits',
    categoryLabel: 'Kits & Regalos',
    description: 'Combina Miel Pura (500g), Polen (250g) y Gotas de Propóleo (30ml) en una hermosa caja regalo de madera.',
    thumbnail: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80',
    badge: 'Ahorra 15% 🎁',
    rating: 5.0,
    reviewsCount: 37,
    priceCOP: '$85.000 COP',
    features: ['Incluye 3 Productos Top', 'Empaque de Madera de Pino', 'Envío Gratis a Tocancipá', 'Ideal para Regalar'],
    techStack: ['Regalo', 'Ahorro', 'Completo'],
    desktopPreviewImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1400&q=80',
    mobilePreviewImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    highlights: [
      { title: 'El Regalo de la Naturaleza', desc: 'Ideal para cuidar la salud de la familia en cualquier temporada.' },
      { title: 'Presentación Lujosa', desc: 'Empaque de pino artesanal reutilizable.' },
    ],
  },
];
