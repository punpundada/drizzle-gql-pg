import { integer, serial, text, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { BookSchema } from "./book";
import {userToGroupSchema } from "./group";

export const userSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  books: many(BookSchema),
  usersToGroups:many(userToGroupSchema)
}));
