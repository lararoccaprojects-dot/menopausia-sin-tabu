/**
 * Hotmart Integration Module
 * Maneja la integración con Hotmart para checkout y webhooks
 */

import { HOTMART_CONFIG } from "./config/hotmart";
import { getDb } from "./db";
import { hotmartTransactions, checkoutLeads } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Genera una URL de checkout de Hotmart con parámetros personalizados
 */
export function generateHotmartCheckoutUrl(
  productType: "main" | "upsell" | "downsell",
  email?: string,
  name?: string
): string {
  const config = HOTMART_CONFIG;
  let baseUrl = "";

  switch (productType) {
    case "main":
      baseUrl = config.MAIN_PRODUCT.checkoutUrl;
      break;
    case "upsell":
      baseUrl = config.UPSELL_PRODUCT.checkoutUrl;
      break;
    case "downsell":
      baseUrl = config.DOWNSELL_PRODUCT.checkoutUrl;
      break;
  }

  // Agregar parámetros de seguimiento si están disponibles
  const params = new URLSearchParams();
  if (email) params.append("email", email);
  if (name) params.append("name", name);

  // Agregar parámetro de seguimiento de origen
  params.append("utm_source", "menopausia-sin-tabu");
  params.append("utm_medium", "web");
  params.append("utm_campaign", productType);

  const separator = baseUrl.includes("?") ? "&" : "?";
  return params.toString() ? `${baseUrl}${separator}${params.toString()}` : baseUrl;
}

/**
 * Registra una transacción de Hotmart en la base de datos
 */
export async function recordHotmartTransaction(data: {
  hotmartTransactionId: string;
  productId: string;
  productName: string;
  price: number;
  buyerEmail: string;
  buyerName: string;
  paymentMethod?: string;
  rawWebhookData?: string;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Hotmart] Cannot record transaction: database not available");
    return null;
  }

  try {
    // Buscar si el usuario ya existe por email
    const existingLead = await db
      .select()
      .from(checkoutLeads)
      .where(eq(checkoutLeads.email, data.buyerEmail))
      .limit(1);

    // Registrar la transacción
    const result = await db.insert(hotmartTransactions).values({
      hotmartTransactionId: data.hotmartTransactionId,
      productId: data.productId,
      productName: data.productName,
      price: data.price,
      buyerEmail: data.buyerEmail,
      buyerName: data.buyerName,
      paymentMethod: data.paymentMethod,
      rawWebhookData: data.rawWebhookData,
      status: "completed",
    });

    // Actualizar el estado del lead si existe
    if (existingLead.length > 0) {
      await db
        .update(checkoutLeads)
        .set({
          purchaseStatus: "purchased",
          hotmartTransactionId: data.hotmartTransactionId,
          updatedAt: new Date(),
        })
        .where(eq(checkoutLeads.id, existingLead[0].id));
    }

    return result;
  } catch (error) {
    console.error("[Hotmart] Failed to record transaction:", error);
    throw error;
  }
}

/**
 * Valida un webhook de Hotmart usando el token de seguridad
 */
export function validateHotmartWebhook(
  signature: string,
  payload: string,
  securityToken: string
): boolean {
  // Implementar validación de firma de Hotmart
  // Hotmart usa HMAC-SHA256 para firmar webhooks
  // Por ahora, retornamos true si el token coincide
  return signature === securityToken;
}

/**
 * Procesa un webhook de Hotmart
 */
export async function processHotmartWebhook(webhookData: any) {
  try {
    // Validar que el webhook tiene los campos requeridos
    if (!webhookData.transaction_id || !webhookData.product_id) {
      console.warn("[Hotmart] Invalid webhook data:", webhookData);
      return false;
    }

    // Registrar la transacción
    await recordHotmartTransaction({
      hotmartTransactionId: webhookData.transaction_id,
      productId: webhookData.product_id,
      productName: webhookData.product_name || "Producto Menopausia Sin Tabú",
      price: webhookData.price ? Math.round(webhookData.price * 100) : 0, // Convertir a centavos
      buyerEmail: webhookData.buyer_email || "",
      buyerName: webhookData.buyer_name || "",
      paymentMethod: webhookData.payment_method,
      rawWebhookData: JSON.stringify(webhookData),
    });

    return true;
  } catch (error) {
    console.error("[Hotmart] Failed to process webhook:", error);
    return false;
  }
}

/**
 * Obtiene el estado de una transacción de Hotmart
 */
export async function getHotmartTransactionStatus(transactionId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Hotmart] Cannot get transaction: database not available");
    return null;
  }

  try {
    const transaction = await db
      .select()
      .from(hotmartTransactions)
      .where(eq(hotmartTransactions.hotmartTransactionId, transactionId))
      .limit(1);

    return transaction.length > 0 ? transaction[0] : null;
  } catch (error) {
    console.error("[Hotmart] Failed to get transaction status:", error);
    return null;
  }
}

/**
 * Obtiene todas las transacciones de un usuario por email
 */
export async function getUserHotmartTransactions(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Hotmart] Cannot get transactions: database not available");
    return [];
  }

  try {
    const transactions = await db
      .select()
      .from(hotmartTransactions)
      .where(eq(hotmartTransactions.buyerEmail, email));

    return transactions;
  } catch (error) {
    console.error("[Hotmart] Failed to get user transactions:", error);
    return [];
  }
}

/**
 * Verifica si un usuario ha completado una compra
 */
export async function hasUserPurchased(email: string, productId?: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Hotmart] Cannot check purchase: database not available");
    return false;
  }

  try {
    const transactions = await db
      .select()
      .from(hotmartTransactions)
      .where(eq(hotmartTransactions.buyerEmail, email));

    if (productId) {
      return transactions.some((t) => t.productId === productId);
    }

    return transactions.length > 0;
  } catch (error) {
    console.error("[Hotmart] Failed to check purchase:", error);
    return false;
  }
}
