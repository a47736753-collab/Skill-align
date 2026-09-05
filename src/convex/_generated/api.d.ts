/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth_config from "../auth.config.js";
import type * as auth from "../auth.js";
import type * as compare from "../compare.js";
import type * as http from "../http.js";
import type * as schema from "../schema.js";
import type * as seed from "../seed.js";
import type * as userProfiles from "../userProfiles.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  ApiFromModules<{
    "auth.config": typeof auth_config;
    auth: typeof auth;
    compare: typeof compare;
    http: typeof http;
    schema: typeof schema;
    seed: typeof seed;
    userProfiles: typeof userProfiles;
    users: typeof users;
  }>,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  ApiFromModules<{
    "auth.config": typeof auth_config;
    auth: typeof auth;
    compare: typeof compare;
    http: typeof http;
    schema: typeof schema;
    seed: typeof seed;
    userProfiles: typeof userProfiles;
    users: typeof users;
  }>,
  FunctionReference<any, "internal">
>;
