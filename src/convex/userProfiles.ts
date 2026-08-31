import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getMyProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();
    if (!profile) return null;
    const college = profile.collegeId
      ? await ctx.db.get(profile.collegeId)
      : null;
    const branch = profile.branchId
      ? await ctx.db.get(profile.branchId)
      : null;
    return { ...profile, college, branch };
  },
});

export const upsertProfile = mutation({
  args: {
    skills: v.array(v.string()),
    collegeId: v.optional(v.id("colleges")),
    branchId: v.optional(v.id("branches")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        skills: args.skills,
        collegeId: args.collegeId,
        branchId: args.branchId,
      });
      return existing._id;
    }

    return await ctx.db.insert("userProfiles", {
      userId: identity.subject,
      skills: args.skills,
      collegeId: args.collegeId,
      branchId: args.branchId,
    });
  },
});
