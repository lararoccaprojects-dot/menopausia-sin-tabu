/**
 * Hotmart tRPC Router
 * Procedimientos para integración con Hotmart
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  generateHotmartCheckoutUrl,
  recordHotmartTransaction,
  getHotmartTransactionStatus,
  getUserHotmartTransactions,
  hasUserPurchased,
} from "./hotmart";

export const hotmartRouter = router({
  /**
   * Genera una URL de checkout de Hotmart
   * Disponible públicamente para que los usuarios puedan acceder al checkout
   */
  generateCheckoutUrl: publicProcedure
    .input(
      z.object({
        productType: z.enum(["main", "upsell", "downsell"]),
        email: z.string().email().optional(),
        name: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const url = generateHotmartCheckoutUrl(input.productType, input.email, input.name);
      return {
        success: true,
        checkoutUrl: url,
      };
    }),

  /**
   * Registra una transacción de Hotmart (llamado por webhook)
   * Protegido para evitar abuso
   */
  recordTransaction: protectedProcedure
    .input(
      z.object({
        hotmartTransactionId: z.string(),
        productId: z.string(),
        productName: z.string(),
        price: z.number(),
        buyerEmail: z.string().email(),
        buyerName: z.string(),
        paymentMethod: z.string().optional(),
        rawWebhookData: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Solo el propietario puede registrar transacciones
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }

      try {
        await recordHotmartTransaction(input);
        return {
          success: true,
          message: "Transaction recorded successfully",
        };
      } catch (error) {
        console.error("Error recording transaction:", error);
        return {
          success: false,
          error: "Failed to record transaction",
        };
      }
    }),

  /**
   * Obtiene el estado de una transacción
   */
  getTransactionStatus: publicProcedure
    .input(z.object({ transactionId: z.string() }))
    .query(async ({ input }) => {
      const transaction = await getHotmartTransactionStatus(input.transactionId);
      return {
        success: !!transaction,
        transaction,
      };
    }),

  /**
   * Obtiene todas las transacciones de un usuario (protegido)
   */
  getUserTransactions: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.email) {
      return {
        success: false,
        transactions: [],
      };
    }

    const transactions = await getUserHotmartTransactions(ctx.user.email);
    return {
      success: true,
      transactions,
    };
  }),

  /**
   * Verifica si un usuario ha completado una compra
   */
  hasUserPurchased: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        productId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const purchased = await hasUserPurchased(input.email, input.productId);
      return {
        success: true,
        purchased,
      };
    }),

  /**
   * Obtiene la URL de checkout para una página específica
   * Simplifica el acceso desde el frontend
   */
  getCheckoutLink: publicProcedure
    .input(
      z.object({
        page: z.enum(["upsell", "downsell", "main"]),
        email: z.string().email().optional(),
        name: z.string().optional(),
      })
    )
    .query(({ input }) => {
      const url = generateHotmartCheckoutUrl(input.page, input.email, input.name);
      return {
        success: true,
        checkoutUrl: url,
      };
    }),
});
