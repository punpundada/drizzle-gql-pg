import {createInsertSchema} from 'drizzle-zod'
import { userSchema } from '../db/user'
import z from "Zod"

export const userZodSchema = createInsertSchema(userSchema,{
    email:z.string().email(),
    password:z.string().min(6,"Password should contain at least 6 charactes")
})