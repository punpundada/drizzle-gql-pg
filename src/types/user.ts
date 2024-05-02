import { userSchema } from "../db/user";
import z from "Zod"
export type UserInput = typeof userSchema.$inferInsert

export type userSelect = {
    name:  typeof userSchema.$inferSelect.name
    email:typeof userSchema.$inferSelect.email
    id: typeof userSchema.$inferSelect.id
}

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string()
})
export type UserLogin = z.infer<typeof loginSchema>

