import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
    }).index("email", ["email"]),

    // Master list of skills
    skills: defineTable({
      name: v.string(),
      category: v.string(),
    }).index("by_name", ["name"]).index("by_category", ["category"]),

    // Colleges
    colleges: defineTable({
      name: v.string(),
    }),

    // Branches within colleges
    branches: defineTable({
      collegeId: v.id("colleges"),
      campus: v.string(),
      branchName: v.string(),
      skills: v.array(v.string()),
    }).index("by_college", ["collegeId"]),

    // Companies
    companies: defineTable({
      name: v.string(),
    }),

    // Job roles at companies
    companyRoles: defineTable({
      companyId: v.id("companies"),
      location: v.string(),
      title: v.string(),
      requiredSkills: v.array(v.string()),
      lastUpdated: v.number(),
      source: v.string(),
    }).index("by_company", ["companyId"]),

    // Student / user profile with current skills
    userProfiles: defineTable({
      userId: v.string(),
      skills: v.array(v.string()),
      collegeId: v.optional(v.id("colleges")),
      branchId: v.optional(v.id("branches")),
    }).index("by_user", ["userId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
