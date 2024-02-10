import type { Config } from 'drizzle-kit'

export default {
  schema: './src/core/database.ts',
  out: './migrations',
  driver: 'd1'
} satisfies Config
