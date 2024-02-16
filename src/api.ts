import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { Bindings, GetRequest } from './core/types'
import pasteRepository from './data/pasteRepository'

const router = new Hono<{ Bindings: Bindings }>()
const TTL = 7 * 24 * 60 * 60 // 7 days

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
    const id = await pasteRepository.create({ content, expirationTtl: 0 })
    const url = `${c.req.url}/${id}`
    return c.json({ id: url })
  }

  const id = await pasteRepository.create({ content, expirationTtl: TTL })
  return c.json({ id })
})

export default router
