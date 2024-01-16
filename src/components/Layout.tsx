import type { FC } from 'hono/jsx'

export const Layout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <title>snowbin</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="Delightfully crafted pastebin with <3."
        />
        <meta property="og:title" content="snowbin" />
        <meta
          property="og:description"
          content="Delightfully crafted pastebin with <3."
        />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#9EB1FF" />
        <script src="/static/theme.js" />
        <link rel="stylesheet" href="/static/out.css" />
      </head>

      <body>
        <main class="content">
          {props.children}
          <hr />
          <footer class="mt-4 w-full max-w-2xl p-4 text-center text-neutral-dark-6 dark:text-neutral-6">
            <div class="flex justify-center space-x-2">
              <a href="https://github.com/fmhy/snowbin" class="px-2">
                source
              </a>
              <span>•</span>
              <a href="/what" class="px-2">
                what
              </a>
              <span>•</span>
              <a href="https://discord.gg/Stz6y6NgNg" class="px-2">
                discord
              </a>
            </div>
          </footer>
        </main>
      </body>
    </html>
  )
}
