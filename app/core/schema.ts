import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const paste = pgTable('paste', {
  slug: text('id').primaryKey().notNull(),
  content: text('content').notNull(),
  editKey: text('edit_key').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
    precision: 0
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
    precision: 0
  })
    .defaultNow()
    .notNull(),
  expiresAt: timestamp('expires_at', {
    mode: 'date',
    withTimezone: true,
    precision: 0
  })
});

export const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);

export const insertPasteSchema = createInsertSchema(paste);
export const selectPasteSchema = createSelectSchema(paste);

export type InsertPaste = typeof paste.$inferInsert;
export type SelectPaste = typeof paste.$inferSelect;
