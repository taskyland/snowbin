import { A, Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { type Signal, Suspense, createEffect } from 'solid-js'
import './styles.scss'
import { useColorMode, useCycleList } from 'solidjs-use'

export default function App() {
  const { mode, setMode } = useColorMode({
    emitAuto: false
  })

  const { next } = useCycleList(['dark', 'light'], {
    initialValue: [mode, setMode] as Signal<any>
  })

  createEffect(() => {
    document.documentElement.className = mode()
  })

  return (
    <Router
      root={(props) => (
        <>
          <main class='content'>
            <Suspense>{props.children}</Suspense>
            <hr />
            <footer class='mt-4 w-full max-w-2xl p-4 text-center text-neutral-dark-6 dark:text-neutral-6'>
              <div class='flex justify-center space-x-2'>
                <a href='https://github.com/fmhy/snowbin' class='px-2'>
                  source
                </a>
                <span>•</span>
                <A href='/what' class='px-2'>
                  what
                </A>
                <span>•</span>
                <a href='https://discord.gg/Stz6y6NgNg' class='px-2'>
                  discord
                </a>
                <span>•</span>
                <button
                  onClick={() => next()}
                  type='button'
                  class='px-2 underline prose dark:prose-invert dark:text-blue-dark-11 text-blue-11  decoration-dashed hover:decoration-solid focus:decoration-solid'
                >
                  theme
                </button>
              </div>
            </footer>
          </main>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
