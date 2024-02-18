import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import type { Bindings } from './types'
import { paste } from './schema'
import type { SelectPaste, InsertPaste } from './schema'

async function create(
  env: Bindings,
  entry: Pick<InsertPaste, 'id' | 'content' | 'expirationTtl'>
) {
  try {
    await drizzle(env.DB)
      .insert(paste)
      .values({
        id: entry.id,
        content: entry.content,
        expirationTtl: entry.expirationTtl // 0 for no expiration
      })
      .run()
    return entry.id
  } catch (error) {
    console.error(`Error inserting new paste: ${error}`)
  }
}

async function findById(
  env: Bindings,
  id: string
): Promise<SelectPaste | undefined> {
  const result = await drizzle(env.DB)
    .select()
    .from(paste)
    .where(eq(paste.id, id))
    .all()

  if (result && result[0].content) {
    return result[0]
  }
  return undefined
}

async function deleteById(env: Bindings, id: string): Promise<void> {
  try {
    await drizzle(env.DB).delete(paste).where(eq(paste.id, id)).run()
  } catch (error) {
    console.error(`Error deleting paste: ${error}`)
  }
}

export default {
  create,
  findById,
  deleteById
}
