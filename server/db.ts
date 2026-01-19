import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, userSymptoms, symptoms, symptomReports, resources, exercises, forumThreads, forumReplies } from "../drizzle/schema";
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


// Resources functions
export async function getResourcesByCategory(userId: number, category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(resources).where(
    and(eq(resources.userId, userId), eq(resources.category, category))
  );
}

export async function addResource(userId: number, title: string, category: string, description: string, fileUrl: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(resources).values({
    userId,
    title,
    category,
    description,
    fileUrl,
    isFavorite: false,
  });
  return result;
}

export async function toggleResourceFavorite(resourceId: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  const resource = await db.select().from(resources).where(eq(resources.id, resourceId)).limit(1);
  if (!resource.length || resource[0].userId !== userId) return null;
  
  return db.update(resources).set({
    isFavorite: !resource[0].isFavorite,
  }).where(eq(resources.id, resourceId));
}

// Exercises functions
export async function getUserExercises(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(exercises).where(eq(exercises.userId, userId));
}

export async function addExercise(userId: number, exerciseName: string, description: string, duration: number, difficulty: string) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(exercises).values({
    userId,
    exerciseName,
    description,
    duration,
    difficulty: difficulty as "fácil" | "moderado" | "difícil",
    completed: false,
  });
}

export async function completeExercise(exerciseId: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  const exercise = await db.select().from(exercises).where(eq(exercises.id, exerciseId)).limit(1);
  if (!exercise.length || exercise[0].userId !== userId) return null;
  
  return db.update(exercises).set({
    completed: true,
    completedAt: new Date(),
  }).where(eq(exercises.id, exerciseId));
}

// Forum functions
export async function createForumThread(userId: number, title: string, content: string, category: string) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(forumThreads).values({
    userId,
    title,
    content,
    category,
    views: 0,
    isAnswered: false,
  });
}

export async function getForumThreads(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(forumThreads).where(eq(forumThreads.category, category));
  }
  return db.select().from(forumThreads);
}

export async function getForumThread(threadId: number) {
  const db = await getDb();
  if (!db) return null;
  const thread = await db.select().from(forumThreads).where(eq(forumThreads.id, threadId)).limit(1);
  return thread.length ? thread[0] : null;
}

export async function addForumReply(threadId: number, userId: number, content: string) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(forumReplies).values({
    threadId,
    userId,
    content,
    likes: 0,
    isHelpful: false,
  });
}

export async function getForumReplies(threadId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(forumReplies).where(eq(forumReplies.threadId, threadId));
}

export async function likeForumReply(replyId: number) {
  const db = await getDb();
  if (!db) return null;
  const reply = await db.select().from(forumReplies).where(eq(forumReplies.id, replyId)).limit(1);
  if (!reply.length) return null;
  
  return db.update(forumReplies).set({
    likes: reply[0].likes + 1,
  }).where(eq(forumReplies.id, replyId));
}

export async function markReplyAsHelpful(replyId: number) {
  const db = await getDb();
  if (!db) return null;
  const reply = await db.select().from(forumReplies).where(eq(forumReplies.id, replyId)).limit(1);
  if (!reply.length) return null;
  
  return db.update(forumReplies).set({
    isHelpful: !reply[0].isHelpful,
  }).where(eq(forumReplies.id, replyId));
}
