import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  getResourcesByCategory,
  addResource,
  toggleResourceFavorite,
  getUserExercises,
  addExercise,
  completeExercise,
  createForumThread,
  getForumThreads,
  getForumThread,
  addForumReply,
  getForumReplies,
  likeForumReply,
  markReplyAsHelpful,
} from "./db";

export const toolsRouter = router({
  // Resources procedures
  resources: router({
    getByCategory: protectedProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ ctx, input }) => {
        return getResourcesByCategory(ctx.user.id, input.category);
      }),

    add: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          category: z.string().min(1),
          description: z.string().optional(),
          fileUrl: z.string().url(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return addResource(
          ctx.user.id,
          input.title,
          input.category,
          input.description || "",
          input.fileUrl
        );
      }),

    toggleFavorite: protectedProcedure
      .input(z.object({ resourceId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return toggleResourceFavorite(input.resourceId, ctx.user.id);
      }),
  }),

  // Exercises procedures
  exercises: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return getUserExercises(ctx.user.id);
    }),

    add: protectedProcedure
      .input(
        z.object({
          exerciseName: z.string().min(1),
          description: z.string(),
          duration: z.number().positive(),
          difficulty: z.enum(["fácil", "moderado", "difícil"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return addExercise(
          ctx.user.id,
          input.exerciseName,
          input.description,
          input.duration,
          input.difficulty
        );
      }),

    complete: protectedProcedure
      .input(z.object({ exerciseId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return completeExercise(input.exerciseId, ctx.user.id);
      }),
  }),

  // Forum procedures
  forum: router({
    createThread: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1),
          content: z.string().min(1),
          category: z.string().min(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return createForumThread(
          ctx.user.id,
          input.title,
          input.content,
          input.category
        );
      }),

    getThreads: protectedProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return getForumThreads(input?.category);
      }),

    getThread: protectedProcedure
      .input(z.object({ threadId: z.number() }))
      .query(async ({ input }) => {
        return getForumThread(input.threadId);
      }),

    addReply: protectedProcedure
      .input(
        z.object({
          threadId: z.number(),
          content: z.string().min(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return addForumReply(input.threadId, ctx.user.id, input.content);
      }),

    getReplies: protectedProcedure
      .input(z.object({ threadId: z.number() }))
      .query(async ({ input }) => {
        return getForumReplies(input.threadId);
      }),

    likeReply: protectedProcedure
      .input(z.object({ replyId: z.number() }))
      .mutation(async ({ input }) => {
        return likeForumReply(input.replyId);
      }),

    markHelpful: protectedProcedure
      .input(z.object({ replyId: z.number() }))
      .mutation(async ({ input }) => {
        return markReplyAsHelpful(input.replyId);
      }),
  }),
});
