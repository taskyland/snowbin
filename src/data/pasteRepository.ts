import ShortUniqueId from 'short-unique-id'
import { db } from './db'
import { Paste, pasteSchema } from './pasteSchema'
import { eq } from 'drizzle-orm'

export async function create(newPaste: Pick<Paste, 'content'>) {
  try {
    const suid = new ShortUniqueId()
    const id = suid.rnd()
    await db
      .insert(pasteSchema)
      .values({
        id,
        content: newPaste.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        expirationTtl: 7 * 24 * 60 * 60 // 7 days
      })
      .run()
    return id
  } catch (error) {
    console.error(`Error inserting new paste: ${error}`)
  }
}

export function findById(id: string): Paste | undefined {
  const result = db
    .select()
    .from(pasteSchema)
    .where(eq(pasteSchema.id, id))
    .all()[0]

  if (result && result.content) {
    return result
  }
  return undefined
}

export function deleteById(id: string) {
  try {
    db.delete(pasteSchema).where(eq(pasteSchema.id, id)).run()
  } catch (error) {
    console.error(`Error deleting paste: ${error}`)
  }
}
