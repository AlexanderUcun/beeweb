# 🚀 Starter Kit Maestro: Plantilla Web Empresarial Pro (React 19 + TS + Tailwind v4)

Este repositorio es una **Plantilla Maestra (Boilerplate / Starter Kit)** optimizada para desarrollar y vender páginas web profesionales para empresas y clientes en tiempo récord (< 24 Horas).

---

## ✨ Características Integradas en la Plantilla

- **Stack Tecnológico Moderno**: React 19, TypeScript estricto, Vite 8, Tailwind CSS v4 con `@tailwindcss/vite`.
- **Nequi, Daviplata & PSE Checkout (Colombia ⚡)**: Componente `SmartCheckoutModal.tsx` con simulación instantánea de pago, QR dinámico y comprobante descargable.
- **Seguridad Industrial**:
  - Sanitización XSS con `DOMPurify`.
  - Aislando de fallos con `ErrorBoundary.tsx`.
  - Protección Anti-Bot Honeypot y Throttling/Rate Limiting.
  - Cabeceras HTTP avanzadas y reglas `.gitignore` anti-fugas.
- **Librerías Visuales**: `framer-motion` (animaciones), `sonner` (notificaciones Toast), `canvas-confetti` (efectos de celebración), `lucide-react` (íconos).
- **Configuración de Cliente en 2 Minutos**: Todos los datos de marca, contacto y números de pago se alimentan dinámicamente de [`src/config/clientConfig.ts`](file:///c:/Users/AlekeyG11/Documents/VsCode/idea/mi-aplicacion-web/src/config/clientConfig.ts).

---

## ⚡ Guía de Adaptación Rápida para un Cliente Nuevo

### Paso 1: Duplicar / Clonar la Plantilla
```bash
git clone https://github.com/AlexanderUcun/mi-aplicacion-web.git mi-nuevo-cliente
cd mi-nuevo-cliente
npm install
```

### Paso 2: Personalizar [`src/config/clientConfig.ts`](file:///c:/Users/AlekeyG11/Documents/VsCode/idea/mi-aplicacion-web/src/config/clientConfig.ts)
Edita el archivo `src/config/clientConfig.ts` con los datos del nuevo cliente:
```typescript
export const CURRENT_CLIENT_CONFIG: ClientConfig = {
  companyName: 'Nombre de la Empresa Cliente',
  brandTagline: 'Eslogan del Negocio',
  contact: {
    email: 'contacto@cliente.com',
    phone: '+57 300 000 0000',
    whatsapp: '573000000000',
  },
  payments: {
    nequiNumber: '300 000 0000',
    daviplataNumber: '315 000 0000',
  },
  // ...
};
```

### Paso 3: Probar en Local y Desplegar
```bash
npm run dev     # Iniciar servidor local (http://localhost:5173)
npm run build   # Compilar para producción
```

---

## 🛠️ Comandos Disponibles

- `npm run dev` - Arranca el servidor de desarrollo Vite.
- `npm run build` - Verifica TypeScript y compila los archivos para producción en `/dist`.
- `npm run preview` - Previsualiza la compilación de producción en local.

---

## 🔒 Licencia y Uso Comercial

Esta plantilla está optimizada para su uso libre en proyectos comerciales y venta de sitios web a clientes.
