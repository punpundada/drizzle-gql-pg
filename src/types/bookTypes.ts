import { BookSchema } from "../db/book";

export type BookInput = typeof BookSchema.$inferInsert;

export type BookSelect = typeof BookSchema.$inferSelect;