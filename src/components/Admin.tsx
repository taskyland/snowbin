import { Layout } from '../components/Layout'

export const Admin = () => {
  return (
    <Layout>
      <script defer={true} src="/static/create.js" />
      <h2>snowbin</h2>
      <p>Delightfully crafted pastebin with {'<3'}.</p>
      <div class="w-full max-w-2xl space-y-4 p-4">
        <div class="relative">
          <textarea
            class="ring-offset-background focus-visible:ring-ring flex h-96 min-h-[80px] w-full rounded-md bg-neutral-3 p-4 text-sm text-neutral-5 placeholder:text-neutral-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-dark-3 dark:text-neutral-5"
            placeholder="Enter your text here. ✨️"
            spellcheck={false}
            id="input"
          />
          <div class="absolute bottom-2 left-2 bg-neutral-dark-6 text-xs text-neutral-dark-5 dark:text-neutral-5">
            <span id="size">0 KB / 1024 KB</span>
          </div>
        </div>
        <button
          class="ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full items-center justify-center rounded-md bg-neutral-dark-5 px-4 py-2 text-sm font-medium text-primary-1 transition-colors hover:bg-neutral-dark-3/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          id="submit"
        >
          Submit
        </button>
      </div>

      <input id="key" placeholder="admin key" />
      <input id="url" placeholder="custom url" />
    </Layout>
  )
}
