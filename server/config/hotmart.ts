/**
 * Configuración de Hotmart para el sitio web Menopausia Sin Tabú
 * 
 * INSTRUCCIONES PARA CONFIGURAR:
 * 1. Crea una cuenta en Hotmart.com
 * 2. Crea los siguientes productos:
 *    - Producto Principal: "Menopausia Sin Tabú - Acceso Completo" ($19.99)
 *    - Upsell: "Pack Premium - 6 Herramientas" ($39.99)
 *    - Downsell: "Pack Premium - Oferta Especial" ($27.99)
 * 3. Copia los URLs de checkout de cada producto
 * 4. Reemplaza los valores de abajo con tus URLs reales
 * 5. Guarda este archivo y reinicia el servidor
 */

export const HOTMART_CONFIG = {
  // Producto Principal
  MAIN_PRODUCT: {
    name: "Menopausia Sin Tabú - Acceso Completo",
    price: 19.99,
    currency: "USD",
    description: "Acceso completo a 4 herramientas principales: Simulador de Síntomas interactivo para monitorear tu estado, Guía de Recursos con información médica verificada, Ejercicios de Bienestar diseñados por especialistas, y Foro de Preguntas para conectar con otras mujeres. Todo lo que necesitas para entender y manejar tu menopausia con confianza y sin tabúes.",
    // Reemplaza con tu URL de Hotmart
    checkoutUrl: "https://hotmart.com/checkout/main-product-id",
    // Para desarrollo local, usa esto:
    // checkoutUrl: "https://hotmart.com/checkout/preview?product_id=YOUR_PRODUCT_ID",
  },

  // Upsell - Pack Premium
  UPSELL_PRODUCT: {
    name: "Pack Premium - 6 Herramientas Especializadas",
    price: 39.99,
    currency: "USD",
    description: "Desbloquea 6 herramientas premium diseñadas para profundizar en cada aspecto de tu bienestar: Mapa de Bienestar Emocional con estrategias psicológicas, Manual de Intimidad Saludable para recuperar tu vida sexual, Plan de Salud a Largo Plazo personalizado, Kit de Autoestima Positiva con 30 afirmaciones diarias, Taller de Alimentación Consciente con recetas, y Compendio de Terapias Alternativas. Invierte en tu futuro y vive la menopausia como una oportunidad de transformación.",
    // Reemplaza con tu URL de Hotmart
    checkoutUrl: "https://hotmart.com/checkout/upsell-product-id",
  },

  // Downsell - Oferta Especial
  DOWNSELL_PRODUCT: {
    name: "Pack Premium - Oferta Especial",
    price: 27.99,
    currency: "USD",
    description: "¿El precio fue un obstáculo? Te entendemos. Esta es una oferta única disponible solo en esta página: acceso a todas las 6 herramientas premium a un precio especial. No dejes pasar esta oportunidad de invertir en tu bienestar a un costo accesible. Garantía de 7 días sin preguntas si no estás satisfecha.",
    // Reemplaza con tu URL de Hotmart
    checkoutUrl: "https://hotmart.com/checkout/downsell-product-id",
  },

  // Herramientas Individuales del Pack Premium
  PREMIUM_TOOLS: {
    EMOTIONAL_WELLNESS: {
      name: "El Mapa de Bienestar Emocional",
      price: 9.99,
      description: "Guía paso a paso con 8 módulos que te enseñan a identificar y gestionar las emociones complejas de la menopausia. Incluye técnicas de psicología positiva, ejercicios de mindfulness y estrategias de manejo del estrés. Recupera tu equilibrio emocional y vuelve a sentirte como tú misma.",
      checkoutUrl: "https://hotmart.com/checkout/emotional-wellness-id",
    },
    INTIMACY_MANUAL: {
      name: "El Manual de Intimidad Saludable",
      price: 9.99,
      description: "Workbook completo con 6 capítulos especializados que abordan la sequedad vaginal, cambios en el deseo sexual, y cómo mantener una vida íntima satisfactoria durante la menopausia. Ejercicios prácticos, comunicación con tu pareja, y soluciones naturales. Recupera la confianza en tu sexualidad.",
      checkoutUrl: "https://hotmart.com/checkout/intimacy-manual-id",
    },
    LONG_TERM_HEALTH: {
      name: "El Plan de Salud a Largo Plazo",
      price: 9.99,
      description: "Hoja de ruta personalizada que evalúa tu salud integral y te proporciona un plan de acción para los próximos 5-10 años. Prevención de osteoporosis, salud cardiovascular, cuidado de la piel y cabello. Toma decisiones informadas sobre tu salud futura con confianza.",
      checkoutUrl: "https://hotmart.com/checkout/long-term-health-id",
    },
    SELF_ESTEEM_KIT: {
      name: "El Kit de Autoestima Positiva",
      price: 9.99,
      description: "Plan de acción de 30 días con afirmaciones diarias, ejercicios de autoaceptación y estrategias para combatir la inseguridad. Aprende a valorar los cambios en tu cuerpo como signos de sabiduría y experiencia. Reconstruye tu confianza y brilla en esta nueva etapa de tu vida.",
      checkoutUrl: "https://hotmart.com/checkout/self-esteem-kit-id",
    },
    NUTRITION_WORKSHOP: {
      name: "El Taller de Alimentación Consciente",
      price: 9.99,
      description: "Guía completa con 5 módulos sobre nutrición durante la menopausia: alimentos que alivian síntomas, recetas deliciosas y fáciles, suplementos recomendados, y cómo mantener un peso saludable. Incluye plan de comidas de 2 semanas. Come bien y siéntete mejor.",
      checkoutUrl: "https://hotmart.com/checkout/nutrition-workshop-id",
    },
    ALTERNATIVE_THERAPIES: {
      name: "El Compendio de Terapias Alternativas",
      price: 9.99,
      description: "Checklist documentado de 12 terapias alternativas: acupuntura, homeopatía, fitoenergética, yoga, meditación y más. Para cada terapia: qué es, cómo funciona, beneficios científicamente comprobados, y dónde encontrar especialistas. Explora opciones naturales y complementarias para tu bienestar.",
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
