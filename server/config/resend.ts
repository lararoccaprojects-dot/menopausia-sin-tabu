/**
 * Configuración de Resend para el sitio web Menopausia Sin Tabú
 * 
 * INSTRUCCIONES PARA CONFIGURAR:
 * 1. Crea una cuenta en Resend.com
 * 2. Crea un dominio verificado (ej: emails.menopausia-sin-tabu.com)
 * 3. Copia tu API Key de Resend
 * 4. Reemplaza los valores de abajo con tus datos reales
 * 5. Guarda este archivo y reinicia el servidor
 */

export const RESEND_CONFIG = {
  // Tu API Key de Resend (obtén en https://resend.com/api-keys)
  apiKey: process.env.RESEND_API_KEY || "re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

  // Email "from" para todos los emails
  fromEmail: "noreply@menopausia-sin-tabu.com",
  fromName: "Menopausia Sin Tabú",

  // Email de soporte
  supportEmail: "soporte@menopausia-sin-tabu.com",

  // Email del propietario para notificaciones
  ownerEmail: process.env.OWNER_EMAIL || "owner@example.com",
};

/**
 * PLANTILLAS DE EMAILS
 * 
 * Cada email tiene:
 * - subject: Asunto del email
 * - template: Nombre de la plantilla en Resend (crea estas en el dashboard)
 * - delay: Tiempo de espera antes de enviar (en milisegundos)
 */

export const EMAIL_TEMPLATES = {
  // Email de bienvenida después de compra
  WELCOME: {
    subject: "¡Bienvenida a Menopausia Sin Tabú! 🎉",
    template: "welcome",
    delay: 0, // Inmediato
  },

  // Email de recuperación de carrito abandonado #1
  ABANDONED_CART_1: {
    subject: "¿Olvidaste completar tu compra?",
    template: "abandoned_cart_1",
    delay: 10 * 60 * 1000, // 10 minutos
  },

  // Email de recuperación de carrito abandonado #2
  ABANDONED_CART_2: {
    subject: "Tu acceso a Menopausia Sin Tabú te está esperando",
    template: "abandoned_cart_2",
    delay: 24 * 60 * 60 * 1000, // 24 horas
  },

  // Email de recuperación de carrito abandonado #3
  ABANDONED_CART_3: {
    subject: "Última oportunidad: 50% de descuento en tu compra",
    template: "abandoned_cart_3",
    delay: 48 * 60 * 60 * 1000, // 48 horas
  },

  // Email de recuperación de carrito abandonado #4
  ABANDONED_CART_4: {
    subject: "¿Necesitas ayuda? Estamos aquí para ti",
    template: "abandoned_cart_4",
    delay: 72 * 60 * 60 * 1000, // 72 horas
  },

  // Email de recuperación de carrito abandonado #5
  ABANDONED_CART_5: {
    subject: "Última semana: Acceso a Menopausia Sin Tabú",
    template: "abandoned_cart_5",
    delay: 7 * 24 * 60 * 60 * 1000, // 7 días
  },

  // Email de confirmación de compra
  PURCHASE_CONFIRMATION: {
    subject: "Confirmación de tu compra - Menopausia Sin Tabú",
    template: "purchase_confirmation",
    delay: 0, // Inmediato
  },

  // Email de acceso al Pack Premium
  PREMIUM_ACCESS: {
    subject: "🎁 Tu Pack Premium está listo",
    template: "premium_access",
    delay: 0, // Inmediato
  },

  // Email de recuperación de contraseña
  PASSWORD_RESET: {
    subject: "Recupera tu contraseña - Menopausia Sin Tabú",
    template: "password_reset",
    delay: 0, // Inmediato
  },

  // Email de notificación de nueva herramienta
  NEW_TOOL_AVAILABLE: {
    subject: "🆕 Nueva herramienta disponible para ti",
    template: "new_tool_available",
    delay: 0, // Inmediato
  },

  // Email de recordatorio de uso
  USAGE_REMINDER: {
    subject: "¿Cómo va tu progreso en Menopausia Sin Tabú?",
    template: "usage_reminder",
    delay: 3 * 24 * 60 * 60 * 1000, // 3 días después de la compra
  },
};

/**
 * PLANTILLAS DE EMAIL A CREAR EN RESEND:
 * 
 * 1. welcome.html - Email de bienvenida
 * 2. abandoned_cart_1.html - Primer email de carrito abandonado (10 min)
 * 3. abandoned_cart_2.html - Segundo email (24 horas)
 * 4. abandoned_cart_3.html - Tercer email (48 horas)
 * 5. abandoned_cart_4.html - Cuarto email (72 horas)
 * 6. abandoned_cart_5.html - Quinto email (7 días)
 * 7. purchase_confirmation.html - Confirmación de compra
 * 8. premium_access.html - Acceso al Pack Premium
 * 9. password_reset.html - Recuperación de contraseña
 * 10. new_tool_available.html - Nueva herramienta disponible
 * 11. usage_reminder.html - Recordatorio de uso
 * 
 * VARIABLES DISPONIBLES EN PLANTILLAS:
 * - {{userName}} - Nombre del usuario
 * - {{userEmail}} - Email del usuario
 * - {{productName}} - Nombre del producto
 * - {{productPrice}} - Precio del producto
 * - {{checkoutUrl}} - URL de checkout
 * - {{dashboardUrl}} - URL del dashboard
 * - {{resetLink}} - Link de recuperación de contraseña
 * - {{supportEmail}} - Email de soporte
 */

/**
 * PASOS PARA CONFIGURAR RESEND:
 * 
 * 1. Crea una cuenta en https://resend.com
 * 2. Ve a "Domains" y agrega tu dominio (ej: emails.menopausia-sin-tabu.com)
 * 3. Verifica el dominio siguiendo las instrucciones de DNS
 * 4. Ve a "API Keys" y copia tu clave
 * 5. Guarda la clave en tu variable de entorno RESEND_API_KEY
 * 6. Crea las plantillas de email en el dashboard de Resend
 * 7. Copia los nombres de las plantillas y actualiza EMAIL_TEMPLATES arriba
 * 
 * EJEMPLO DE API KEY:
 * re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 */

/**
 * SECUENCIA DE EMAILS DE RECUPERACIÓN DE CARRITO:
 * 
 * Cuando un usuario abandona el carrito:
 * 1. Email 1 (10 min): "¿Olvidaste completar tu compra?"
 *    - Recordatorio amable
 *    - Link de checkout
 * 
 * 2. Email 2 (24 horas): "Tu acceso a Menopausia Sin Tabú te está esperando"
 *    - Beneficios del producto
 *    - Link de checkout
 * 
 * 3. Email 3 (48 horas): "Última oportunidad: 50% de descuento"
 *    - Oferta especial
 *    - Link de checkout con descuento
 * 
 * 4. Email 4 (72 horas): "¿Necesitas ayuda? Estamos aquí para ti"
 *    - Preguntas frecuentes
 *    - Email de soporte
 * 
 * 5. Email 5 (7 días): "Última semana: Acceso a Menopausia Sin Tabú"
 *    - Urgencia final
 *    - Link de checkout
 */
