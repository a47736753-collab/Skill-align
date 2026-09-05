/* eslint-disable */
/**
 * Generated data model types.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { DataModelFromSchema, DocumentByName, TableNamesInDataModel } from "convex/server";
import type { GenericId } from "convex/values";
import type schema from "../schema.js";

/**
 * The type of a data model defined by the project schema.
 */
export type DataModel = DataModelFromSchema<typeof schema>;

/**
 * A type describing a database document in your Convex schema.
 */
export type Doc<TableName extends TableNamesInDataModel<DataModel>> =
  DocumentByName<DataModel, TableName>;

/**
 * An identifier for a document of type `TableName` in your Convex schema.
 */
export type Id<TableName extends TableNamesInDataModel<DataModel>> =
  GenericId<TableName>;
