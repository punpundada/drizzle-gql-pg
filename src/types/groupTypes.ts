import { groupSchema } from "../db/group";

export type GroupInput = typeof groupSchema.$inferInsert
export type GroupSelect = typeof groupSchema.$inferSelect
