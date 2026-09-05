import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAllColleges = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("colleges").collect();
  },
});

export const getBranchesByCollege = query({
  args: { collegeId: v.id("colleges") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("branches")
      .withIndex("by_college", (q) => q.eq("collegeId", args.collegeId))
      .collect();
  },
});

export const getAllCompanies = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("companies").collect();
  },
});

export const getRolesByCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    const roles = await ctx.db
      .query("companyRoles")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
    const company = await ctx.db.get(args.companyId);
    return roles.map((r) => ({ ...r, companyName: company?.name ?? "" }));
  },
});

export const getAllRoles = query({
  args: {},
  handler: async (ctx) => {
    const roles = await ctx.db.query("companyRoles").collect();
    const enriched = await Promise.all(
      roles.map(async (r) => {
        const company = await ctx.db.get(r.companyId);
        return { ...r, companyName: company?.name ?? "" };
      }),
    );
    return enriched;
  },
});

export const findMatchingRoles = query({
  args: { userSkills: v.array(v.string()) },
  handler: async (ctx, args) => {
    if (args.userSkills.length === 0) return [];
    const roles = await ctx.db.query("companyRoles").collect();
    const userSet = new Set(args.userSkills.map((s) => s.toLowerCase()));

    const matches = await Promise.all(
      roles.map(async (role) => {
        const company = await ctx.db.get(role.companyId);
        const matchedSkills = role.requiredSkills.filter((s: string) =>
          userSet.has(s.toLowerCase()),
        );
        const missingSkills = role.requiredSkills.filter(
          (s: string) => !userSet.has(s.toLowerCase()),
        );
        const matchPercent =
          role.requiredSkills.length > 0
            ? Math.round(
                (matchedSkills.length / role.requiredSkills.length) * 100,
              )
            : 0;

        const ageMs = Date.now() - role.lastUpdated;
        const daysSinceUpdate = Math.floor(ageMs / (1000 * 60 * 60 * 24));
        let dataConfidence: "High" | "Medium" | "Low" = "High";
        if (daysSinceUpdate > 180) dataConfidence = "Low";
        else if (daysSinceUpdate > 60) dataConfidence = "Medium";

        return {
          roleId: role._id,
          companyName: company?.name ?? "",
          location: role.location,
          title: role.title,
          requiredSkills: role.requiredSkills,
          matchedSkills,
          missingSkills,
          matchPercent,
          dataConfidence,
          source: role.source,
          daysSinceUpdate,
        };
      }),
    );

    return matches.sort((a, b) => b.matchPercent - a.matchPercent);
  },
});

export const getAllSkills = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("skills").collect();
  },
});

export const getSkillsByCategory = query({
  args: {},
  handler: async (ctx) => {
    const skills = await ctx.db.query("skills").collect();
    const grouped: Record<string, string[]> = {};
    for (const skill of skills) {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push(skill.name);
    }
    return grouped;
  },
});

export const isSeeded = query({
  args: {},
  handler: async (ctx) => {
    const colleges = await ctx.db.query("colleges").first();
    return colleges !== null;
  },
});
