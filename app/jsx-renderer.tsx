import { jsxRenderer } from 'hono/jsx-renderer'

import styles from './styles.scss'
import sc from './client/sc?client'
import theme from './client/theme?client'

export default jsxRenderer(({ children }) => {
  return (
    <html lang='en'>
      <head>
        <title>snowbin</title>
        <meta charset='UTF-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <meta
          name='description'
          content='Delightfully crafted pastebin with <3.'
        />
        <meta property='og:title' content='snowbin' />
        <meta
          property='og:description'
          content='Delightfully crafted pastebin with <3.'
        />
        <meta property='og:type' content='website' />
        <meta name='theme-color' content='#9EB1FF' />

        <script
          type='module'
          dangerouslySetInnerHTML={{ __html: Bun.escapeHTML(sc) }}
        />
        {/* <script type='module' dangerouslySetInnerHTML={{ __html: theme }} /> */}
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>

      <body>
        <main class='content'>
          <div id='root'>{children}</div>
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
                // @ts-expect-error
                // biome-ignore lint/a11y/useValidAnchor: <explanation>
                onClick='window.toggleColorScheme()'
                type='button'
                class='px-2'
              >
                theme
              </a>
            </div>
          </footer>
        </main>
      </body>
    </html>
  )
})
