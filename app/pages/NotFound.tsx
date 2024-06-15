import type { FC } from 'hono/jsx'

export const NotFound: FC = () => {
  return (
    <>
      <h2 class='text-center'>
        404, couldn't find that paste, maybe it was autodeleted?
      </h2>

      <a href='/'>go back to homepage</a>
    </>
  )
}
