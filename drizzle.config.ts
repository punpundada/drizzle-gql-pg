import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: ['./src/db/user.ts','./src/db/book.ts'],
  out: './src/migrations',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString:process.env.DB_CONNECTION_STR!
  },
  verbose:true,
  strict:true
} satisfies Config;