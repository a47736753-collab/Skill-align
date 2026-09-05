/* eslint-disable */
/**
 * Generated utilities for implementing server-side Convex functions.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import {
  ActionBuilder,
  ActionCtx as GenericActionCtx,
  CustomCtx,
  DatabaseReader as GenericDatabaseReader,
  DatabaseWriter as GenericDatabaseWriter,
  MutationBuilder,
  MutationCtx as GenericMutationCtx,
  QueryBuilder,
  QueryCtx as GenericQueryCtx,
} from "convex/server";
import { DataModel } from "./dataModel.js";

/**
 * Define a query in this Convex app's database.
 *
 * @param func - The query function.
 * @returns The wrapped query.
 */
export declare const query: QueryBuilder<DataModel, "public">;

/**
 * Define a query that is only accessible inside this Convex app (not from the client).
 *
 * @param func - The query function.
 * @returns The wrapped query.
 */
export declare const internalQuery: QueryBuilder<DataModel, "internal">;

/**
 * Define a mutation in this Convex app's database.
 *
 * @param func - The mutation function.
 * @returns The wrapped mutation.
 */
export declare const mutation: MutationBuilder<DataModel, "public">;

/**
 * Define a mutation that is only accessible inside this Convex app (not from the client).
 *
 * @param func - The mutation function.
 * @returns The wrapped mutation.
 */
export declare const internalMutation: MutationBuilder<DataModel, "internal">;

/**
 * Define an action in this Convex app's database.
 *
 * @param func - The action function.
 * @returns The wrapped action.
 */
export declare const action: ActionBuilder<DataModel, "public">;

/**
 * Define an action that is only accessible inside this Convex app (not from the client).
 *
 * @param func - The action function.
 * @returns The wrapped action.
 */
export declare const internalAction: ActionBuilder<DataModel, "internal">;

/**
 * A utility for database operations in Convex functions.
 *
 * Read operations only.
 */
export type DatabaseReader = GenericDatabaseReader<DataModel>;

/**
 * A utility for database operations in Convex functions.
 *
 * Read and write operations.
 */
export type DatabaseWriter = GenericDatabaseWriter<DataModel>;

/**
 * A set of data querying functionality passed to Convex functions.
 */
export type QueryCtx = GenericQueryCtx<DataModel>;

/**
 * A set of data mutating functionality passed to Convex functions.
 */
export type MutationCtx = GenericMutationCtx<DataModel>;

/**
 * A set of action functionality passed to Convex functions.
 */
export type ActionCtx = GenericActionCtx<DataModel>;
