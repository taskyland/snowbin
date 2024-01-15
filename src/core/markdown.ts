import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

// @ts-expect-error
import { full as emoji } from 'markdown-it-emoji'
import { fromHighlighter } from 'markdown-it-shikiji/core'
import { getHighlighterCore, loadWasm } from 'shikiji/core'

// @ts-expect-error
import wasm from 'shikiji/onig.wasm'

await loadWasm((importObject) => WebAssembly.instantiate(wasm, importObject))

const highlighter = await getHighlighterCore({
  themes: [
    import('shikiji/themes/github-light.mjs'),
    import('shikiji/themes/github-dark-dimmed.mjs')
  ],
  langs: [
    import('shikiji/langs/javascript.mjs'),
    import('shikiji/langs/typescript.mjs')
  ]
})

const md = new MarkdownIt({
  linkify: true,
  typographer: true,
  html: false
})
  .use(
    // @ts-expect-error
    fromHighlighter(highlighter, {
      themes: { dark: 'github-dark-dimmed', light: 'github-light' }
    })
  )
  .use(anchor, {
    permalink: anchor.permalink.ariaHidden({
      symbol: `<svg width="20" height="20"><use href="#radix-icons-link-2"/></svg>`
    })
  } as anchor.AnchorOptions)
  .use(emoji)

md.linkify.set({ fuzzyLink: false })

export { md }
