import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { logger } from 'hono/logger'
import { Create } from './components/Create'
import api from './api'
import { Paste } from './components/Paste'
import { NotFound } from './components/NotFound'
import type { Bindings } from './core/types'
import { Admin } from './components/Admin'
import { What } from './components/What'
import { md } from './core/markdown'

const app = new Hono<{ Bindings: Bindings }>()
const CACHE_DURATION = 60 * 60 * 24 // 1 day

app.use('/static/*', serveStatic({ root: './' }))
app.use('*', logger())

app.get('/', (c) => {
  return c.html(<Create />)
})

app.get('/what', (c) => {
  return c.html(<What />)
})

app.get('/admin', (c) => {
  return c.html(<Admin />)
})

app.get('/:id', async (c) => {
  const { id } = c.req.param()
  const entry = await c.env.pastes.get(id)
  if (!entry) return c.html(<NotFound />)

  return c.html(<Paste content={md.render(entry)} />, 200, {
    'Cache-Control': `max-age=${CACHE_DURATION}`
  })
})

app.get('/:id/raw', async (c) => {
  const { id } = c.req.param()
  const entry = await c.env.pastes.get(id)
  if (!entry) return c.text('Could not find that paste.')

  return c.text(entry)
})

app.route('/api', api)

export default app
