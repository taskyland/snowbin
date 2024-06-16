import type { NotFoundHandler } from 'hono'
import { render } from '../core/render'

const handler: NotFoundHandler = (c) => {
  return render(
    c,
    <>
      <h2 class='text-center'>
        404, couldn't find that paste, maybe it was autodeleted?
      </h2>

      <a href='/'>go back to homepage</a>
    </>
  )
}

export default handler
