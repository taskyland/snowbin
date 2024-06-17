import { and, eq } from 'drizzle-orm'
import ShortUniqueId from 'short-unique-id'
import type { APIEvent } from '@solidjs/start/server'
import { insertPasteSchema, paste } from '../../core/schema'
import { db } from '../../core/db'
import { readValidatedBody } from 'vinxi/http'
import { json } from '@solidjs/router'
import { z } from 'zod'
import { getExpirationDate } from '~/core/utils'

const suid = new ShortUniqueId()

const schema = insertPasteSchema.omit({
  createdAt: true,
  updatedAt: true
})

export async function POST(event: APIEvent) {
  const result = await readValidatedBody(event.nativeEvent, (body) =>
    schema
      .partial({
        slug: true,
        editKey: true,
        expiresAt: true
      })
      .omit({ expiresAt: true })
      .extend({
        expiresAt: z
          .enum(['never', 'year', 'month', 'week', 'day', 'hour', '10m'])
          .optional()
      })
      .safeParse(body)
  )

  if (!result.success) throw result.error

  const { slug, content, editKey, expiresAt } = result.data

  if (slug) {
    const [result] = await db
      .select()
      .from(paste)
      .where(eq(paste.slug, slug))
      .limit(1)
      .execute()

    if (result && result.content) {
      return json(
        { message: `Paste on ${slug} already exists.`, success: false },
        { status: 409 }
      )
    }
  }

  const textSize = new Blob([content]).size

  if (textSize < 10) {
    return json(
      { message: 'Content is too small.', success: false },
      { status: 400 }
    )
  }

  if (textSize > 1024 * 1024) {
    return json(
      { message: 'Content is too large.', success: false },
      { status: 400 }
    )
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

  return json({ slug: id, editKey: key })
}
export async function DELETE(event: APIEvent) {
  const result = await readValidatedBody(event.nativeEvent, (body) =>
    schema.pick({ slug: true, editKey: true }).safeParse(body)
  )

  if (!result.success) throw result.error.issues

  const { slug, editKey } = result.data

  const [res] = await db
    .select({ slug: paste.slug, editKey: paste.editKey })
    .from(paste)
    .where(and(eq(paste.slug, slug), eq(paste.editKey, editKey)))
    .limit(1)
    .execute()

  if (!res) {
    return new Response('Could not find that paste.', { status: 429 })
  }

  await db.delete(paste).where(eq(paste.slug, slug)).execute()
  return json({ success: true })
}
