import { A, Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './styles.scss'
import { MetaProvider, Meta, Title } from '@solidjs/meta'
import ModeToggle from './components/ModeToggle'

export default function App() {
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
            <div class='top-4 right-4 absolute'>
              <ModeToggle />
            </div>

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
