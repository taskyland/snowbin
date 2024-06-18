import { and, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'
import { insertPasteSchema, paste } from './schema'
import { getExpirationDate } from './utils'

export const queryClient = postgres(process.env.DATABASE_URL!)
export const db = drizzle(queryClient)

const suid = new ShortUniqueId()

const schema = insertPasteSchema.omit({
  createdAt: true,
  updatedAt: true
})

const createPasteSchema = schema
  .omit({ expiresAt: true })
  .extend({
    expiresAt: z
      .enum(['never', 'year', 'month', 'week', 'day', 'hour', '10m'])
      .optional()
  })
  .partial({
    slug: true,
    editKey: true,
    expiresAt: true
  })

const deletePasteSchema = schema.pick({ slug: true, editKey: true })

export async function createPaste<T extends z.infer<typeof createPasteSchema>>({
  slug,
  editKey,
  expiresAt,
  content
}: T): Promise<string | { slug: string; editKey: string }> {
  if (slug) {
    const [result] = await db
      .select()
      .from(paste)
      .where(eq(paste.slug, slug))
      .limit(1)
      .execute()

    if (result && result.content) {
      return `Paste on ${slug} already exists.`
    }
  }

  const textSize = new Blob([content]).size

  if (textSize < 10) {
    return 'Content is too small.'
  }

  if (textSize > 1024 * 1024) {
    return 'Content is too large.'
  }

  const id = slug ?? suid.rnd()
  const key = editKey ?? suid.rnd()
  await db
    .insert(paste)
    .values({
      slug: id,
      content: content,
      editKey: key,
      expiresAt: getExpirationDate(expiresAt)
    })
    .execute()

  return { slug: id, editKey: key }
}

export async function getPaste(slug: string): Promise<
  | {
      slug: string
      content: string
      createdAt: Date
      updatedAt: Date
      expiresAt: Date | null
    }
  | 'Could not find that paste.'
> {
  const [result] = await db
    .select({
      slug: paste.slug,
      content: paste.content,
      createdAt: paste.createdAt,
      updatedAt: paste.updatedAt,
      expiresAt: paste.expiresAt
    })
    .from(paste)
    .where(eq(paste.slug, slug))
    .limit(1)
    .execute()

  if (!result) return 'Could not find that paste.'

  return result
}

export async function deletePaste<T extends z.infer<typeof deletePasteSchema>>({
  editKey,
  slug
}: T): Promise<'Could not find that paste.' | { success: boolean }> {
  const [res] = await db
    .select({ slug: paste.slug, editKey: paste.editKey })
    .from(paste)
    .where(and(eq(paste.slug, slug), eq(paste.editKey, editKey)))
    .limit(1)
    .execute()

  if (!res) {
    return 'Could not find that paste.'
  }

  await db.delete(paste).where(eq(paste.slug, slug)).execute()
  return { success: true }
}
