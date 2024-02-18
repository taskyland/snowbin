import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import ShortUniqueId from 'short-unique-id'
import type { Bindings, GetRequest } from './core/types'
import db from './core/database'

const router = new Hono<{ Bindings: Bindings }>()
const uid = new ShortUniqueId()

router.post('/', async (c) => {
  const { url, content, key } = await c.req.json<GetRequest>()

  if (key && url && key !== c.env.key) {
    throw new HTTPException(400, {
      message: 'You are not meant for the maze.'
    })
  }

  if (typeof content !== 'string') {
    throw new HTTPException(400, { message: 'Content is not a string.' })
  }

  const textSize = new Blob([content]).size

  if (textSize < 10) {
    throw new HTTPException(400, { message: 'Content was too small.' })
  }

  if (textSize > 1024 * 1024) {
    throw new HTTPException(400, { message: 'Content was too large.' })
  }

  if (key && url) {
    const id = await db.create(c.env, { id: url, content, expirationTtl: 0 })
    return c.json({ id: id })
  }

  const id = await db.create(c.env, {
    id: uid.rnd(),
    content
  })
  return c.json({ id })
})

export default router
