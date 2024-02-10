import { text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const pastes = sqliteTable('pastes', {
  id: text('id').unique().notNull(),
  content: text('content').notNull(),
  customUrl: text('url')
})
