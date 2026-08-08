import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import ShortUniqueId from 'short-unique-id'
import type {
  Bindings,
  DeleteRequest,
  GetRequest,
  UpdateRequest
} from './core/types'

const router = new Hono<{ Bindings: Bindings }>()
const suid = new ShortUniqueId()
const TTL = 7 * 24 * 60 * 60 // 7 days

const requireAdmin = (key: unknown, expectedKey: string) => {
  if (key !== expectedKey) {
    throw new HTTPException(401, {
      message: 'You are not meant for the maze.'
    })
  }
}

const validateContent = (content: unknown): asserts content is string => {
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
}

router.post('/', async (c) => {
  const { url, content, key } = await c.req.json<GetRequest>()

  if (key && url && key !== c.env.key) {
    throw new HTTPException(400, {
      message: 'You are not meant for the maze.'
    })
  }

  validateContent(content)

  if (key && url) {
    await c.env.pastes.put(url, content)
    return c.json({ id: url })
  }

  const id = suid.rnd()
  await c.env.pastes.put(id, content, { expirationTtl: TTL })
  return c.json({ id })
})

router.put('/:id', async (c) => {
  const { content, key } = await c.req.json<UpdateRequest>()
  requireAdmin(key, c.env.key)
  validateContent(content)

  const { id } = c.req.param()
  const paste = await c.env.pastes.get(id)

  if (!paste) {
    throw new HTTPException(404, { message: 'Could not find that paste.' })
  }

  await c.env.pastes.put(id, content)
  return c.json({ id })
})

router.delete('/:id', async (c) => {
  const { key } = await c.req.json<DeleteRequest>()
  requireAdmin(key, c.env.key)

  const { id } = c.req.param()
  const paste = await c.env.pastes.get(id)

  if (!paste) {
    throw new HTTPException(404, { message: 'Could not find that paste.' })
  }

  await c.env.pastes.delete(id)
  return c.json({ id })
})

export default router
