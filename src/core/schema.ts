import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const paste = sqliteTable('pastes', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  expirationTtl: integer('expiration_ttl')
    .notNull()
    .default(7 * 24 * 60 * 60), // 7 days
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`CURRENT_TIMESTAMP`
  )
})

export type InsertPaste = typeof paste._.inferInsert
export type SelectPaste = typeof paste._.inferSelect
