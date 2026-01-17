import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb, getAllSymptoms, getUserSymptoms, addUserSymptom, updateUserSymptom, deleteUserSymptom, generateSymptomReport } from "./db";
import { checkoutLeads } from "../drizzle/schema";
import { hotmartRouter } from "./hotmart.router";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  hotmart: hotmartRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  checkout: router({
    captureLead: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        source: z.enum(["home", "demo"]).default("home"),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        await db.insert(checkoutLeads).values({
          name: input.name,
          email: input.email,
          source: input.source,
          purchaseStatus: "pending",
          emailSequenceStep: 0,
        });
        
        return { success: true };
      }),
  }),

  symptoms: router({
    getAll: publicProcedure.query(async () => {
      return await getAllSymptoms();
    }),

    getUserSymptoms: protectedProcedure.query(async ({ ctx }) => {
      return await getUserSymptoms(ctx.user.id);
    }),

    addSymptom: protectedProcedure
      .input(z.object({
        symptomId: z.number(),
        severity: z.number().min(1).max(10),
        frequency: z.enum(["diaria", "varias_veces_semana", "semanal", "ocasional"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await addUserSymptom(
          ctx.user.id,
          input.symptomId,
          input.severity,
          input.frequency,
          input.notes
        );
        return { success: true };
      }),

    updateSymptom: protectedProcedure
      .input(z.object({
        userSymptomId: z.number(),
        severity: z.number().min(1).max(10),
        frequency: z.enum(["diaria", "varias_veces_semana", "semanal", "ocasional"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateUserSymptom(
          input.userSymptomId,
          input.severity,
          input.frequency,
          input.notes
        );
        return { success: true };
      }),

    deleteSymptom: protectedProcedure
      .input(z.object({
        userSymptomId: z.number(),
      }))
      .mutation(async ({ input }) => {
        await deleteUserSymptom(input.userSymptomId);
        return { success: true };
      }),

    generateReport: protectedProcedure.query(async ({ ctx }) => {
      return await generateSymptomReport(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
