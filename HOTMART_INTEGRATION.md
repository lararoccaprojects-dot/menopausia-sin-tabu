# Integración con Hotmart - Menopausia Sin Tabú

## 📋 Resumen

Este documento describe cómo integrar completamente Hotmart con el sitio web "Menopausia Sin Tabú" para procesar pagos y gestionar transacciones.

---

## 🔧 Componentes de Integración

### 1. **Backend - Módulo Hotmart** (`server/hotmart.ts`)

El módulo `hotmart.ts` contiene todas las funciones necesarias para interactuar con Hotmart:

#### Funciones Principales:

**`generateHotmartCheckoutUrl(productType, email?, name?)`**
- Genera una URL de checkout de Hotmart con parámetros personalizados
- Parámetros:
  - `productType`: "main" | "upsell" | "downsell"
  - `email`: Email del usuario (opcional)
  - `name`: Nombre del usuario (opcional)
- Retorna: URL completa de checkout con parámetros de seguimiento

**`recordHotmartTransaction(data)`**
- Registra una transacción en la base de datos
- Parámetros:
  - `hotmartTransactionId`: ID único de la transacción
  - `productId`: ID del producto
  - `productName`: Nombre del producto
  - `price`: Precio en centavos
  - `buyerEmail`: Email del comprador
  - `buyerName`: Nombre del comprador
  - `paymentMethod`: Método de pago (opcional)
  - `rawWebhookData`: Datos raw del webhook (opcional)

**`validateHotmartWebhook(signature, payload, securityToken)`**
- Valida que un webhook proviene de Hotmart
- Retorna: true si es válido, false si no

**`processHotmartWebhook(webhookData)`**
- Procesa un webhook de Hotmart
- Valida los datos y registra la transacción
- Retorna: true si fue procesado exitosamente

**`getHotmartTransactionStatus(transactionId)`**
- Obtiene el estado de una transacción
- Retorna: Objeto de transacción o null

**`getUserHotmartTransactions(email)`**
- Obtiene todas las transacciones de un usuario
- Retorna: Array de transacciones

**`hasUserPurchased(email, productId?)`**
- Verifica si un usuario ha completado una compra
- Retorna: true si ha comprado, false si no

---

### 2. **Backend - tRPC Router** (`server/hotmart.router.ts`)

Define los procedimientos tRPC para acceso desde el frontend:

#### Procedimientos:

**`hotmart.generateCheckoutUrl`** (Público)
```typescript
Input: {
  productType: "main" | "upsell" | "downsell"
  email?: string
  name?: string
}
Output: {
  success: boolean
  checkoutUrl: string
}
```

**`hotmart.recordTransaction`** (Protegido - Admin)
```typescript
Input: {
  hotmartTransactionId: string
  productId: string
  productName: string
  price: number
  buyerEmail: string
  buyerName: string
  paymentMethod?: string
  rawWebhookData?: string
}
Output: {
  success: boolean
  message: string
}
```

**`hotmart.getTransactionStatus`** (Público)
```typescript
Input: { transactionId: string }
Output: {
  success: boolean
  transaction: HotmartTransaction | null
}
```

**`hotmart.getUserTransactions`** (Protegido)
```typescript
Output: {
  success: boolean
  transactions: HotmartTransaction[]
}
```

**`hotmart.hasUserPurchased`** (Público)
```typescript
Input: {
  email: string
  productId?: string
}
Output: {
  success: boolean
  purchased: boolean
}
```

**`hotmart.getCheckoutLink`** (Público)
```typescript
Input: {
  page: "upsell" | "downsell" | "main"
  email?: string
  name?: string
}
Output: {
  success: boolean
  checkoutUrl: string
}
```

---

### 3. **Frontend - Componente HotmartCheckoutButton** (`client/src/components/HotmartCheckoutButton.tsx`)

Componente reutilizable para botones de checkout:

#### Uso Básico:

```tsx
import { HotmartCheckoutButton } from "@/components/HotmartCheckoutButton";

export function MyPage() {
  return (
    <HotmartCheckoutButton
      page="upsell"
      label="Comprar Pack Premium"
      className="w-full"
    />
  );
}
```

#### Props:

- `page`: "upsell" | "downsell" | "main" (requerido)
- `email`: string (opcional)
- `name`: string (opcional)
- `label`: string (por defecto: "Comprar Ahora")
- `showLoader`: boolean (por defecto: true)
- Todos los props estándar de Button

#### Hooks Disponibles:

**`useHotmartCheckoutUrl(page, email?, name?)`**
```tsx
const { checkoutUrl, isLoading, error } = useHotmartCheckoutUrl("upsell");
```

**`useHasUserPurchased(email, productId?)`**
```tsx
const { purchased, isLoading, error } = useHasUserPurchased("user@example.com");
```

---

## 🔐 Base de Datos

### Tabla: `hotmart_transactions`

Almacena todas las transacciones de Hotmart:

```sql
CREATE TABLE hotmart_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  hotmartTransactionId VARCHAR(255) UNIQUE,
  productId VARCHAR(255),
  productName VARCHAR(255),
  price INT,
  currency VARCHAR(10),
  status ENUM('pending', 'completed', 'refunded', 'failed'),
  buyerName VARCHAR(255),
  buyerEmail VARCHAR(320),
  paymentMethod VARCHAR(100),
  rawWebhookData TEXT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

---

## 🚀 Configuración Paso a Paso

### Paso 1: Crear Productos en Hotmart

1. Inicia sesión en tu cuenta de Hotmart (https://hotmart.com)
2. Ve a "Mis Productos"
3. Crea los siguientes productos:

| Producto | Precio | Descripción |
|----------|--------|-------------|
| Menopausia Sin Tabú - Acceso Completo | $29.99 | Acceso a 4 herramientas principales |
| Pack Premium - 6 Herramientas | $49.99 | Acceso a todas las 6 herramientas premium |
| Pack Premium - 50% Descuento | $24.99 | Oferta especial para carrito abandonado |

### Paso 2: Obtener URLs de Checkout

Para cada producto:
1. Ve a "Configuración" > "Acceso al Producto"
2. Copia el "URL de Venta" o "URL de Checkout"
3. Ejemplo: `https://hotmart.com/checkout/ABC123DEF456`

### Paso 3: Actualizar Configuración

Edita `/server/config/hotmart.ts` y reemplaza los URLs:

```typescript
export const HOTMART_CONFIG = {
  MAIN_PRODUCT: {
    checkoutUrl: "https://hotmart.com/checkout/YOUR_MAIN_PRODUCT_ID",
  },
  UPSELL_PRODUCT: {
    checkoutUrl: "https://hotmart.com/checkout/YOUR_UPSELL_PRODUCT_ID",
  },
  DOWNSELL_PRODUCT: {
    checkoutUrl: "https://hotmart.com/checkout/YOUR_DOWNSELL_PRODUCT_ID",
  },
};
```

### Paso 4: Configurar Webhooks

Los webhooks permiten que Hotmart notifique a tu servidor cuando ocurre una compra:

1. En Hotmart, ve a "Configuración de Cuenta" > "Webhooks"
2. Haz clic en "Agregar Webhook"
3. Ingresa la URL: `https://tu-dominio.com/api/webhooks/hotmart`
4. Selecciona los eventos:
   - Venta completada
   - Reembolso procesado
   - Acceso revocado
5. Copia el "Token de Seguridad"
6. Actualiza `/server/config/hotmart.ts`:

```typescript
WEBHOOK: {
  notificationUrl: "https://tu-dominio.com/api/webhooks/hotmart",
  securityToken: "TU_SECURITY_TOKEN_AQUI",
}
```

### Paso 5: Crear Endpoint de Webhook

Crea un archivo `/server/webhooks/hotmart.ts`:

```typescript
import { processHotmartWebhook, validateHotmartWebhook } from "../hotmart";
import { HOTMART_CONFIG } from "../config/hotmart";
import { Express } from "express";

export function setupHotmartWebhook(app: Express) {
  app.post("/api/webhooks/hotmart", async (req, res) => {
    const signature = req.headers["x-hotmart-signature"] as string;
    const payload = JSON.stringify(req.body);

    // Validar webhook
    if (!validateHotmartWebhook(signature, payload, HOTMART_CONFIG.WEBHOOK.securityToken)) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Procesar webhook
    const success = await processHotmartWebhook(req.body);

    if (success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to process webhook" });
    }
  });
}
```

Luego registra el webhook en `/server/_core/index.ts`:

```typescript
import { setupHotmartWebhook } from "../webhooks/hotmart";

// ... en tu función de inicialización del servidor
setupHotmartWebhook(app);
```

---

## 📱 Integración en Páginas

### Página Upsell

```tsx
import { HotmartCheckoutButton } from "@/components/HotmartCheckoutButton";

export function UpsellPage() {
  return (
    <div>
      <h1>Pack Premium - 6 Herramientas</h1>
      <p>Precio: $49.99</p>
      <HotmartCheckoutButton
        page="upsell"
        label="Comprar Pack Premium"
        className="w-full bg-pink-500 hover:bg-pink-600"
      />
    </div>
  );
}
```

### Página Downsell

```tsx
import { HotmartCheckoutButton } from "@/components/HotmartCheckoutButton";

export function DownsellPage() {
  return (
    <div>
      <h1>Oferta Especial - 50% Descuento</h1>
      <p>Precio: $24.99 (antes $49.99)</p>
      <HotmartCheckoutButton
        page="downsell"
        label="Aprovechar Oferta"
        className="w-full bg-green-500 hover:bg-green-600"
      />
    </div>
  );
}
```

---

## 🧪 Testing

### Test de Integración

```typescript
import { describe, it, expect } from "vitest";
import { generateHotmartCheckoutUrl, hasUserPurchased } from "./hotmart";

describe("Hotmart Integration", () => {
  it("should generate checkout URL with parameters", () => {
    const url = generateHotmartCheckoutUrl("upsell", "test@example.com", "John");
    expect(url).toContain("hotmart.com");
    expect(url).toContain("email=test@example.com");
    expect(url).toContain("name=John");
  });

  it("should check if user has purchased", async () => {
    const purchased = await hasUserPurchased("test@example.com");
    expect(typeof purchased).toBe("boolean");
  });
});
```

---

## 🔍 Debugging

### Logs Importantes

Todos los logs de Hotmart usan el prefijo `[Hotmart]`:

```
[Hotmart] Cannot record transaction: database not available
[Hotmart] Invalid webhook data: {...}
[Hotmart] Failed to process webhook: error message
```

### Verificar Transacciones

```typescript
// En el dashboard o admin panel
const transactions = await getUserHotmartTransactions("user@example.com");
console.log(transactions);
```

---

## 📊 Flujo Completo

```
Usuario en Home
    ↓
Click en "Comprar Ahora"
    ↓
Modal de Checkout (captura email/nombre)
    ↓
Click en botón de pago
    ↓
Redirige a Hotmart
    ↓
Usuario completa pago
    ↓
Hotmart envía webhook
    ↓
Servidor registra transacción
    ↓
Hotmart redirige a Thank You page
    ↓
Usuario recibe email de confirmación
```

---

## 🆘 Troubleshooting

### El botón no redirige a Hotmart

- Verifica que los URLs en `/server/config/hotmart.ts` sean correctos
- Asegúrate de que el procedimiento tRPC `hotmart.getCheckoutLink` esté registrado
- Revisa la consola del navegador para errores

### Webhook no se procesa

- Verifica que el endpoint `/api/webhooks/hotmart` esté registrado
- Comprueba que el token de seguridad coincida
- Revisa los logs del servidor

### Transacciones no se guardan

- Verifica que la tabla `hotmart_transactions` exista
- Asegúrate de que la base de datos esté disponible
- Revisa los logs de error en `[Hotmart]`

---

## 📚 Referencias

- [Documentación de Hotmart](https://hotmart.com/docs)
- [API de Hotmart](https://api.hotmart.com)
- [Webhooks de Hotmart](https://hotmart.com/webhooks)

---

**Última actualización:** 17 de Enero de 2026
**Versión:** 1.0.0
