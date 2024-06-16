import { html } from 'hono/html'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Link } from 'honox/server'

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
        {import.meta.env.PROD ? (
          <script type='module' src='/static/sc.js' />
        ) : (
          <script type='module' src='/app/client/sc.ts' />
        )}
        {html`<script>
          (() => {
            const v = localStorage.getItem("color-scheme"),
              a = window.matchMedia("(prefers-color-scheme: dark)").matches,
              cl = document.documentElement.classList,
              setColorScheme = (v) =>
                (!v || v === "auto" ? a : v === "dark")
                  ? cl.add("dark")
                  : cl.remove("dark");

            setColorScheme(v);

            window.setColorScheme = (v) => {
              setColorScheme(v);
              localStorage.setItem("color-scheme", v);
            };

            window.toggleColorScheme = () => {
              const cl = document.documentElement.classList;
              const currentScheme = cl.contains("dark") ? "light" : "dark";
              cl.toggle("dark");
              localStorage.setItem("color-scheme", currentScheme);
            };
          })();
        </script>`}
        <Link href='/app/styles.scss' rel='stylesheet' />
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
              <button
                // @ts-expect-error
                onClick='window.toggleColorScheme()'
                type='button'
                class='px-2 underline prose dark:prose-invert dark:text-blue-dark-11 text-blue-11  decoration-dashed hover:decoration-solid focus:decoration-solid'
              >
                theme
              </button>
            </div>
          </footer>
        </main>
      </body>
    </html>
  )
})
