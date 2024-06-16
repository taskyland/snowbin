import { A } from '@solidjs/router'

export default function NotFound() {
  return (
    <main>
      <h2 class='text-center'>
        404, couldn't find that paste, maybe it was autodeleted?
      </h2>

      <A href='/'>go back to homepage</A>
    </main>
  )
}
