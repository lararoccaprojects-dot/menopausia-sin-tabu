import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("checkout.captureLead", () => {
  it("should capture a lead with valid name and email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.checkout.captureLead({
      name: "María González",
      email: "maria@example.com",
      source: "home",
    });

    expect(result).toEqual({ success: true });
  });

  it("should reject invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.checkout.captureLead({
        name: "María González",
        email: "invalid-email",
        source: "home",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email");
    }
  });

  it("should reject empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.checkout.captureLead({
        name: "",
        email: "maria@example.com",
        source: "home",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Too small");
    }
  });

  it("should accept demo source", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.checkout.captureLead({
      name: "Laura Pérez",
      email: "laura@example.com",
      source: "demo",
    });

    expect(result).toEqual({ success: true });
  });
});
