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

const app = new Hono<{ Bindings: Bindings }>()

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
  if (!entry) {
    return c.html(<NotFound />)
  }
  return c.html(<Paste content={entry} />)
})

app.route('/api', api)

export default app
