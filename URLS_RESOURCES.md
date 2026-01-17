# URLs de Recursos - Menopausia Sin Tabú

## 🌐 URL Base del Sitio Web
```
https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer
```

---

## 📄 FASE 1: Páginas de Ventas (Públicas - Sin Login)

### Home - Página Principal de Ventas
- **URL:** `/`
- **Descripción:** Página de ventas principal con hero, problemas, soluciones, características, testimonios, FAQ y CTA
- **Acceso:** Público
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/`

### Página Upsell - Pack Premium
- **URL:** `/upsell`
- **Descripción:** Página de upsell con barra de carga animada y 6 herramientas premium
- **Precio:** $19.99 cada una
- **Acceso:** Público
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/upsell`

### Página Downsell - Oferta Especial
- **URL:** `/downsell`
- **Descripción:** Página de downsell con oferta especial a 50% de descuento
- **Precio:** $9.99
- **Acceso:** Público
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/downsell`

### Página Thank You - Agradecimiento
- **URL:** `/thank-you`
- **Descripción:** Página de agradecimiento después de la compra con instrucciones
- **Acceso:** Público
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/thank-you`

---

## 🔐 FASE 2: Herramientas Principales (Requiere Login)

### Dashboard - Panel de Control
- **URL:** `/dashboard`
- **Descripción:** Panel de bienvenida con acceso a todas las herramientas
- **Acceso:** Solo usuarios autenticados
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/dashboard`

### Simulador de Síntomas
- **URL:** `/simulador-sintomas`
- **Descripción:** Herramienta interactiva para registrar y monitorear síntomas
- **Características:**
  - Selección de síntomas por categoría
  - Seguimiento personalizado
  - Análisis automático
  - Reportes con recomendaciones
- **Acceso:** Solo usuarios autenticados
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/simulador-sintomas`

---

## 🎁 FASE 3: Pack Premium - 6 Herramientas (Requiere Login)

### Pack Premium - Página Principal
- **URL:** `/premium-pack`
- **Descripción:** Grid con las 6 herramientas del pack premium
- **Precio Total:** $119.94 → $49.99 (oferta especial)
- **Acceso:** Solo usuarios autenticados
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/premium-pack`

### 1. El Mapa de Bienestar Emocional
- **URL:** `/premium/emotional-wellness`
- **Subtítulo:** Guía paso a paso
- **Precio Individual:** $19.99
- **Módulos:** 8 módulos de aprendizaje
- **Acceso:** Solo usuarios autenticados con acceso al pack
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/premium/emotional-wellness`

### 2. El Manual de Intimidad Saludable
- **URL:** `/premium/intimacy-manual`
- **Subtítulo:** Workbook interactivo
- **Precio Individual:** $19.99
- **Módulos:** 6 capítulos especializados
- **Acceso:** Solo usuarios autenticados con acceso al pack
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/premium/intimacy-manual`

### 3. El Plan de Salud a Largo Plazo
- **URL:** `/premium/long-term-health`
- **Subtítulo:** Hoja de ruta personalizada
- **Precio Individual:** $19.99
- **Módulos:** Evaluación integral + plan personalizado
- **Acceso:** Solo usuarios autenticados con acceso al pack
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/premium/long-term-health`

### 4. El Kit de Autoestima Positiva
- **URL:** `/premium/self-esteem-kit`
- **Subtítulo:** Plan de acción
- **Precio Individual:** $19.99
- **Módulos:** 30 afirmaciones + desafíos de autoaceptación
- **Acceso:** Solo usuarios autenticados con acceso al pack
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/premium/self-esteem-kit`

### 5. El Taller de Alimentación Consciente
- **URL:** `/premium/nutrition-workshop`
- **Subtítulo:** Guía de nutrición
- **Precio Individual:** $19.99
- **Módulos:** 5 módulos + recetas especializadas
- **Acceso:** Solo usuarios autenticados con acceso al pack
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/premium/nutrition-workshop`

### 6. El Compendio de Terapias Alternativas
- **URL:** `/premium/alternative-therapies`
- **Subtítulo:** Checklist de opciones
- **Precio Individual:** $19.99
- **Módulos:** 12 terapias documentadas
- **Acceso:** Solo usuarios autenticados con acceso al pack
- **Full URL:** `https://3000-ixckhf2osy1g0t5z5mxcz-142a6056.us1.manus.computer/premium/alternative-therapies`

---

## 🔗 API Endpoints (Backend - tRPC)

### Autenticación
- **GET /api/trpc/auth.me** - Obtener usuario actual
- **POST /api/trpc/auth.logout** - Cerrar sesión

### Síntomas
- **GET /api/trpc/symptoms.getAll** - Obtener todos los síntomas disponibles
- **GET /api/trpc/symptoms.getUserSymptoms** - Obtener síntomas del usuario
- **POST /api/trpc/symptoms.addSymptom** - Agregar síntoma
- **POST /api/trpc/symptoms.updateSymptom** - Actualizar síntoma
- **POST /api/trpc/symptoms.deleteSymptom** - Eliminar síntoma
- **GET /api/trpc/symptoms.generateReport** - Generar reporte personalizado

### Checkout
- **POST /api/trpc/checkout.captureLead** - Capturar lead con nombre y email

### Sistema
- **POST /api/trpc/system.notifyOwner** - Enviar notificación al propietario

---

## 🔐 Rutas Protegidas vs Públicas

### Públicas (Sin Login Requerido)
- `/` - Home
- `/upsell` - Página Upsell
- `/downsell` - Página Downsell
- `/thank-you` - Página Thank You
- `/404` - Página No Encontrada

### Protegidas (Login Requerido)
- `/dashboard` - Dashboard
- `/simulador-sintomas` - Simulador de Síntomas
- `/premium-pack` - Pack Premium
- `/premium/emotional-wellness` - Herramienta 1
- `/premium/intimacy-manual` - Herramienta 2
- `/premium/long-term-health` - Herramienta 3
- `/premium/self-esteem-kit` - Herramienta 4
- `/premium/nutrition-workshop` - Herramienta 5
- `/premium/alternative-therapies` - Herramienta 6

---

## 💳 Integración con Hotmart

### Productos en Hotmart
1. **Producto Principal** - Acceso completo ($29.99)
   - Incluye: 4 herramientas principales + acceso a comunidad
   - URL de checkout: `[REEMPLAZAR CON URL DE HOTMART]`

2. **Pack Premium** - 6 herramientas especializadas ($49.99)
   - Incluye: Todas las 6 herramientas premium
   - URL de checkout: `[REEMPLAZAR CON URL DE HOTMART]`

3. **Downsell** - Pack Premium con 50% descuento ($24.99)
   - Incluye: Todas las 6 herramientas premium
   - URL de checkout: `[REEMPLAZAR CON URL DE HOTMART]`

### Configuración de Hotmart
- Archivo de configuración: `/server/config/hotmart.ts`
- Instrucciones: Ver comentarios en el archivo

---

## 📧 Integración con Resend

### Plantillas de Email
1. **Welcome** - Email de bienvenida
2. **Abandoned Cart 1-5** - Secuencia de recuperación de carrito
3. **Purchase Confirmation** - Confirmación de compra
4. **Premium Access** - Acceso al Pack Premium
5. **Password Reset** - Recuperación de contraseña
6. **New Tool Available** - Nueva herramienta disponible
7. **Usage Reminder** - Recordatorio de uso

### Configuración de Resend
- Archivo de configuración: `/server/config/resend.ts`
- Instrucciones: Ver comentarios en el archivo

---

## 📊 Estadísticas y Monitoreo

### Dashboard Admin (Próximamente)
- URL: `/admin/dashboard`
- Estadísticas de leads
- Tabla de usuarios
- Reportes de ventas
- Análisis de síntomas

---

## 🚀 Próximos Pasos

1. **Conectar Hotmart**
   - Obtener URLs de checkout
   - Actualizar `/server/config/hotmart.ts`
   - Configurar webhooks

2. **Conectar Resend**
   - Crear cuenta en Resend
   - Crear plantillas de email
   - Actualizar `/server/config/resend.ts`

3. **Crear Dominio Personalizado**
   - Registrar dominio (ej: menopausia-sin-tabu.com)
   - Configurar DNS en Manus
   - Actualizar URLs de redirección

4. **Agregar más herramientas**
   - Guía de Recursos
   - Ejercicios de Bienestar
   - Foro de Comunidad

---

## 📝 Notas

- Todas las URLs están basadas en el dominio de desarrollo actual
- Cuando tengas un dominio personalizado, reemplaza el dominio base
- Los endpoints de API están disponibles en `/api/trpc`
- La autenticación se maneja automáticamente con Manus OAuth
- Los datos se guardan en la base de datos MySQL integrada

---

**Última actualización:** 17 de Enero de 2026
**Versión:** 0b7d4092
