import { A, Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense, createEffect } from 'solid-js'
import './styles.scss'
import { useDark, useToggle } from 'solidjs-use'
import { MetaProvider, Meta, Title } from '@solidjs/meta'

export default function App() {
  const isDark = useDark()
  const [mode, toggle] = useToggle(isDark)

  createEffect(() => {
    document.documentElement.className = mode() ? 'dark' : 'light'
  })

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>snowbin</Title>
          <Meta
            name='description'
            content='Delightfully crafted pastebin with <3.'
          />
          <Meta property='og:title' content='snowbin' />
          <Meta
            property='og:description'
            content='Delightfully crafted pastebin with <3.'
          />
          <Meta property='og:type' content='website' />
          <Meta name='theme-color' content='#9EB1FF' />

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
                  onClick={() => toggle()}
                  type='button'
                  class='px-2 underline prose dark:prose-invert dark:text-blue-dark-11 text-blue-11  decoration-dashed hover:decoration-solid focus:decoration-solid'
                >
                  theme
                </button>
              </div>
            </footer>
          </main>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
