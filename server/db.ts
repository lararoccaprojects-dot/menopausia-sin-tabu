import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, userSymptoms, symptoms, symptomReports } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ Symptom Management ============

export async function getAllSymptoms() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(symptoms);
}

export async function getUserSymptoms(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select({
      id: userSymptoms.id,
      symptomId: userSymptoms.symptomId,
      symptomName: symptoms.name,
      symptomCategory: symptoms.category,
      severity: userSymptoms.severity,
      frequency: userSymptoms.frequency,
      notes: userSymptoms.notes,
      recordedAt: userSymptoms.recordedAt,
    })
    .from(userSymptoms)
    .innerJoin(symptoms, eq(userSymptoms.symptomId, symptoms.id))
    .where(eq(userSymptoms.userId, userId));
}

export async function addUserSymptom(
  userId: number,
  symptomId: number,
  severity: number,
  frequency: string,
  notes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(userSymptoms).values({
    userId,
    symptomId,
    severity,
    frequency,
    notes,
  });
}

export async function updateUserSymptom(
  userSymptomId: number,
  severity: number,
  frequency: string,
  notes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(userSymptoms)
    .set({
      severity,
      frequency,
      notes,
      recordedAt: new Date(),
    })
    .where(eq(userSymptoms.id, userSymptomId));
}

export async function deleteUserSymptom(userSymptomId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(userSymptoms).where(eq(userSymptoms.id, userSymptomId));
}

export async function generateSymptomReport(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const userSymptomsList = await getUserSymptoms(userId);
  
  if (userSymptomsList.length === 0) {
    return null;
  }
  
  const totalSymptoms = userSymptomsList.length;
  const averageSeverity = Math.round(
    userSymptomsList.reduce((sum, s) => sum + s.severity, 0) / totalSymptoms
  );
  
  const categoryCount: Record<string, number> = {};
  userSymptomsList.forEach(s => {
    categoryCount[s.symptomCategory] = (categoryCount[s.symptomCategory] || 0) + 1;
  });
  
  const mostCommonCategory = Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0]?.[0];
  
  // Generar recomendaciones basadas en síntomas
  const recommendations = generateRecommendations(userSymptomsList);
  
  const report = await db.insert(symptomReports).values({
    userId,
    totalSymptoms,
    averageSeverity,
    mostCommonCategory,
    recommendations: JSON.stringify(recommendations),
    trend: "estable", // TODO: Calcular tendencia comparando con reportes anteriores
  });
  
  return report;
}

function generateRecommendations(userSymptomsList: any[]): string[] {
  const recommendations: string[] = [];
  
  // Recomendaciones basadas en categoría
  const hasHormonal = userSymptomsList.some(s => s.symptomCategory === "hormonal");
  const hasEmocional = userSymptomsList.some(s => s.symptomCategory === "emocional");
  const hasFisico = userSymptomsList.some(s => s.symptomCategory === "fisico");
  const hasSexual = userSymptomsList.some(s => s.symptomCategory === "sexual");
  
  if (hasHormonal) {
    recommendations.push("Considera consultar con un endocrinólogo para evaluar opciones de tratamiento hormonal");
  }
  
  if (hasEmocional) {
    recommendations.push("Los ejercicios de mindfulness y meditación pueden ayudarte a manejar síntomas emocionales");
  }
  
  if (hasFisico) {
    recommendations.push("Aumenta tu actividad física con ejercicios de bajo impacto como yoga o caminatas");
  }
  
  if (hasSexual) {
    recommendations.push("Habla con tu pareja sobre cómo te sientes y considera consultar con un especialista");
  }
  
  return recommendations;
}

// TODO: add feature queries here as your schema grows.
