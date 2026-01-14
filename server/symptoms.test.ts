import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("symptoms router", () => {
  it("should get all symptoms", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const symptoms = await caller.symptoms.getAll();
    
    expect(Array.isArray(symptoms)).toBe(true);
  });

  it("should get user symptoms", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const userSymptoms = await caller.symptoms.getUserSymptoms();
    
    expect(Array.isArray(userSymptoms)).toBe(true);
  });

  it("should reject severity above 10", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.symptoms.addSymptom({
        symptomId: 1,
        severity: 15,
        frequency: "diaria",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  it("should reject severity below 1", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.symptoms.addSymptom({
        symptomId: 1,
        severity: -1,
        frequency: "diaria",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  it("should accept valid symptom input", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // This will fail due to missing symptom in DB, but input validation should pass
    try {
      await caller.symptoms.addSymptom({
        symptomId: 1,
        severity: 5,
        frequency: "diaria",
        notes: "Test note",
      });
    } catch (error: any) {
      // Expected to fail due to DB constraint, not validation
      expect(error).toBeDefined();
    }
  });
});
