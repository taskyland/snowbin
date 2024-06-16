import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './styles.scss'

export default function App() {
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
                <a href='/what' class='px-2'>
                  what
                </a>
                <span>•</span>
                <a href='https://discord.gg/Stz6y6NgNg' class='px-2'>
                  discord
                </a>
                <span>•</span>
                <a
                  onClick='window.toggleColorScheme()'
                  type='button'
                  class='px-2'
                >
                  theme
                </a>
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
