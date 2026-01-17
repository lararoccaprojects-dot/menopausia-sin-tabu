/**
 * Configuración de Hotmart para el sitio web Menopausia Sin Tabú
 * 
 * INSTRUCCIONES PARA CONFIGURAR:
 * 1. Crea una cuenta en Hotmart.com
 * 2. Crea los siguientes productos:
 *    - Producto Principal: "Menopausia Sin Tabú - Acceso Completo" ($29.99)
 *    - Upsell: "Pack Premium - 6 Herramientas" ($49.99)
 *    - Downsell: "Pack Premium - 50% Descuento" ($24.99)
 * 3. Copia los URLs de checkout de cada producto
 * 4. Reemplaza los valores de abajo con tus URLs reales
 * 5. Guarda este archivo y reinicia el servidor
 */

export const HOTMART_CONFIG = {
  // Producto Principal
  MAIN_PRODUCT: {
    name: "Menopausia Sin Tabú - Acceso Completo",
    price: 29.99,
    currency: "USD",
    // Reemplaza con tu URL de Hotmart
    checkoutUrl: "https://hotmart.com/checkout/main-product-id",
    // Para desarrollo local, usa esto:
    // checkoutUrl: "https://hotmart.com/checkout/preview?product_id=YOUR_PRODUCT_ID",
  },

  // Upsell - Pack Premium
  UPSELL_PRODUCT: {
    name: "Pack Premium - 6 Herramientas Especializadas",
    price: 49.99,
    currency: "USD",
    // Reemplaza con tu URL de Hotmart
    checkoutUrl: "https://hotmart.com/checkout/upsell-product-id",
  },

  // Downsell - Oferta Especial
  DOWNSELL_PRODUCT: {
    name: "Pack Premium - 50% Descuento",
    price: 24.99,
    currency: "USD",
    // Reemplaza con tu URL de Hotmart
    checkoutUrl: "https://hotmart.com/checkout/downsell-product-id",
  },

  // Herramientas Individuales del Pack Premium
  PREMIUM_TOOLS: {
    EMOTIONAL_WELLNESS: {
      name: "El Mapa de Bienestar Emocional",
      price: 19.99,
      checkoutUrl: "https://hotmart.com/checkout/emotional-wellness-id",
    },
    INTIMACY_MANUAL: {
      name: "El Manual de Intimidad Saludable",
      price: 19.99,
      checkoutUrl: "https://hotmart.com/checkout/intimacy-manual-id",
    },
    LONG_TERM_HEALTH: {
      name: "El Plan de Salud a Largo Plazo",
      price: 19.99,
      checkoutUrl: "https://hotmart.com/checkout/long-term-health-id",
    },
    SELF_ESTEEM_KIT: {
      name: "El Kit de Autoestima Positiva",
      price: 19.99,
      checkoutUrl: "https://hotmart.com/checkout/self-esteem-kit-id",
    },
    NUTRITION_WORKSHOP: {
      name: "El Taller de Alimentación Consciente",
      price: 19.99,
      checkoutUrl: "https://hotmart.com/checkout/nutrition-workshop-id",
    },
    ALTERNATIVE_THERAPIES: {
      name: "El Compendio de Terapias Alternativas",
      price: 19.99,
      checkoutUrl: "https://hotmart.com/checkout/alternative-therapies-id",
    },
  },

  // Configuración de Webhook (para notificaciones de compra)
  WEBHOOK: {
    // URL donde Hotmart enviará notificaciones de compra
    // Reemplaza con tu dominio real
    notificationUrl: "https://tu-dominio.com/api/webhooks/hotmart",
    // Token de seguridad (genera uno en Hotmart)
    securityToken: "TU_SECURITY_TOKEN_AQUI",
  },

  // Configuración de Redirección
  REDIRECT: {
    // URL a la que redirigir después de compra exitosa
    successUrl: "https://tu-dominio.com/thank-you",
    // URL a la que redirigir si el usuario cancela
    cancelUrl: "https://tu-dominio.com/",
  },
};

/**
 * PASOS PARA OBTENER LOS URLs DE HOTMART:
 * 
 * 1. Inicia sesión en tu cuenta de Hotmart
 * 2. Ve a "Mis Productos"
 * 3. Selecciona el producto
 * 4. Ve a "Configuración" > "Acceso al Producto"
 * 5. Copia el "URL de Venta" o "URL de Checkout"
 * 6. Pega el URL en la configuración correspondiente arriba
 * 
 * EJEMPLO DE URL DE HOTMART:
 * https://hotmart.com/checkout/ABC123DEF456
 * 
 * PARA TESTING:
 * Usa URLs de preview: https://hotmart.com/checkout/preview?product_id=YOUR_ID
 */

/**
 * CONFIGURACIÓN DE WEBHOOK EN HOTMART:
 * 
 * 1. Ve a "Configuración de Cuenta" > "Webhooks"
 * 2. Haz clic en "Agregar Webhook"
 * 3. Ingresa la URL de notificación: https://tu-dominio.com/api/webhooks/hotmart
 * 4. Selecciona los eventos:
 *    - Venta completada
 *    - Reembolso procesado
 *    - Acceso revocado
 * 5. Copia el token de seguridad y pégalo arriba
 * 6. Guarda la configuración
 */
