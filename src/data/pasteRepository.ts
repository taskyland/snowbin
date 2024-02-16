import ShortUniqueId from 'short-unique-id'
import { getDb } from './db'
import { Paste, pasteSchema } from './pasteSchema'
import { eq } from 'drizzle-orm'

export async function create(newPaste: Pick<Paste, 'content'>) {
  try {
    const db = getDb({
      D1: {} as any
    })

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

export async function findById(id: string): Promise<Paste | undefined> {
  const db = getDb({
    D1: {} as any
  })

  const result = await db
    .select()
    .from(pasteSchema)
    .where(eq(pasteSchema.id, id))
    .all()

  if (result && result[0].content) {
    return result[0]
  }
  return undefined
}

export async function deleteById(id: string) {
  const db = getDb({
    D1: {} as any
  })
  try {
    await db.delete(pasteSchema).where(eq(pasteSchema.id, id)).run()
  } catch (error) {
    console.error(`Error deleting paste: ${error}`)
  }
}
