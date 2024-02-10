import { text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const pastes = sqliteTable('pastes', {
  id: text('id').primaryKey().unique().notNull(),
  content: text('content').notNull(),
  customUrl: text('url'),
  expiresAt: text('expiresAt')
})
