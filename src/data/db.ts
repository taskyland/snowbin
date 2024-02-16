import { drizzle } from 'drizzle-orm/d1'

export interface Env {
  D1: D1Database
}

export function getDb(env: Env) {
  const db = drizzle(env.D1)
  return db
}
