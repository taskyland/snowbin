import type { APIEvent } from '@solidjs/start/server'
import { eq } from 'drizzle-orm'
import { paste } from '../../core/schema'
import { db } from '../../core/db'
import { json } from '@solidjs/router'

export async function GET(event: APIEvent) {
  const slug = event.params.slug
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

  if (!result)
    return new Response('Could not find that paste.', {
      status: 404
    })

  return json(result)
}
