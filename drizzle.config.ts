import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: ['./src/db/user.ts','./src/db/book.ts','./src/db/group.ts'],
  out: './src/migrations',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    // connectionString:process.env.DB_CONNECTION_STR!
    database:process.env.DB_NAME!,
    host:process.env.DB_HOST!,
    port:Number(process.env.DB_PORT!),
    password:process.env.DB_PASSWORD,
    user:process.env.DB_USER,
  },
  verbose:true,
  strict:true
} satisfies Config;