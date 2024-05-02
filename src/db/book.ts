import { integer, serial, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userSchema } from './user';


export const BookSchema = pgTable("books",{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    author:integer('author').notNull().references(()=>userSchema.id)
})

export const booksRelations = relations(BookSchema,({one})=>({
    author:one(userSchema,{fields:[BookSchema.author],references:[userSchema.id]})
}))

