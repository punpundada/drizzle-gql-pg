import { integer, serial, text, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userSchema } from "./user";

export const groupSchema =pgTable('groups',{
    id:serial('id').primaryKey(),
    name:text('name').notNull()
})

export const groupRelations = relations(groupSchema,({many})=>({
    usersToGroups:many(userToGroupSchema)
}))


export const userToGroupSchema = pgTable('user_to_group',{
    userId:integer('user_id').notNull().references(()=>userSchema.id),
    groupId:integer('group_id').notNull().references(()=>groupSchema.id),
},(t)=>({
    pk:primaryKey({ columns: [t.userId, t.groupId] })
}))

export const userToGroupRelations = relations(userToGroupSchema,({one})=>({
    group:one(groupSchema,{fields:[userToGroupSchema.groupId],references:[groupSchema.id]}),
    user:one(userSchema,{fields:[userToGroupSchema.userId],references:[userSchema.id]})
}))
