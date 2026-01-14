import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabla de suscripciones para control de acceso
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  email: varchar("email", { length: 320 }).notNull(),
  status: mysqlEnum("status", ["active", "cancelled", "expired"]).default("active").notNull(),
  accountType: mysqlEnum("accountType", ["paid", "demo"]).default("paid").notNull(),
  hotmartTransactionId: varchar("hotmartTransactionId", { length: 255 }),
  purchaseDate: timestamp("purchaseDate").notNull(),
  expirationDate: timestamp("expirationDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Tabla de tokens de recuperación de contraseña
 */
export const passwordResetTokens = mysqlTable("passwordResetTokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  used: int("used").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type InsertPasswordResetToken = typeof passwordResetTokens.$inferInsert;

/**
 * Tabla para capturar leads del checkout
 */
export const checkoutLeads = mysqlTable("checkoutLeads", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  purchaseStatus: mysqlEnum("purchaseStatus", ["pending", "purchased", "abandoned"]).default("pending").notNull(),
  emailSequenceStep: int("emailSequenceStep").default(0).notNull(),
  lastEmailSentAt: timestamp("lastEmailSentAt"),
  hotmartTransactionId: varchar("hotmartTransactionId", { length: 255 }),
  source: varchar("source", { length: 50 }).default("home").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CheckoutLead = typeof checkoutLeads.$inferSelect;
export type InsertCheckoutLead = typeof checkoutLeads.$inferInsert;

/**
 * Tabla para guardar progreso de herramientas principales
 */
export const toolProgress = mysqlTable("toolProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  toolType: mysqlEnum("toolType", [
    "simulador_sintomas",
    "guia_recursos",
    "ejercicios_bienestar",
    "foro_preguntas"
  ]).notNull(),
  progressData: text("progressData").notNull(),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ToolProgress = typeof toolProgress.$inferSelect;
export type InsertToolProgress = typeof toolProgress.$inferInsert;

/**
 * Tabla para guardar progreso del Pack Premium
 */
export const packPremiumProgress = mysqlTable("packPremiumProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  resourceType: mysqlEnum("resourceType", [
    "bienestar_emocional",
    "intimidad_saludable",
    "salud_largo_plazo",
    "autoestima_positiva",
    "alimentacion_consciente",
    "terapias_alternativas"
  ]).notNull(),
  progressData: text("progressData").notNull(),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PackPremiumProgress = typeof packPremiumProgress.$inferSelect;
export type InsertPackPremiumProgress = typeof packPremiumProgress.$inferInsert;

/**
 * Tabla para los síntomas disponibles en el simulador
 */
export const symptoms = mysqlTable("symptoms", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // "hormonal", "emocional", "fisico", "sexual"
  severity: int("severity").default(1).notNull(), // 1-10 escala de severidad
  commonality: int("commonality").default(50).notNull(), // % de mujeres que lo experimentan
  recommendations: text("recommendations"), // JSON con recomendaciones
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Symptom = typeof symptoms.$inferSelect;
export type InsertSymptom = typeof symptoms.$inferInsert;

/**
 * Tabla para registrar síntomas del usuario
 */
export const userSymptoms = mysqlTable("userSymptoms", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  symptomId: int("symptomId").notNull().references(() => symptoms.id),
  severity: int("severity").notNull(), // 1-10 intensidad reportada por el usuario
  frequency: varchar("frequency", { length: 50 }).notNull(), // "diaria", "varias_veces_semana", "semanal", "ocasional"
  notes: text("notes"), // Notas adicionales del usuario
  recordedAt: timestamp("recordedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserSymptom = typeof userSymptoms.$inferSelect;
export type InsertUserSymptom = typeof userSymptoms.$inferInsert;

/**
 * Tabla para análisis y reportes de síntomas
 */
export const symptomReports = mysqlTable("symptomReports", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  reportDate: timestamp("reportDate").defaultNow().notNull(),
  totalSymptoms: int("totalSymptoms").notNull(),
  averageSeverity: int("averageSeverity").notNull(), // Promedio 1-10
  mostCommonCategory: varchar("mostCommonCategory", { length: 100 }),
  recommendations: text("recommendations"), // JSON con recomendaciones personalizadas
  trend: varchar("trend", { length: 50 }), // "mejorando", "empeorando", "estable"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SymptomReport = typeof symptomReports.$inferSelect;
export type InsertSymptomReport = typeof symptomReports.$inferInsert;

// TODO: Add your tables here