import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

// @ts-expect-error No types
import { full as emoji } from 'markdown-it-emoji'

const md = new MarkdownIt({
  linkify: true,
  typographer: true,
  html: false
})
  .use(anchor, {
    permalink: anchor.permalink.ariaHidden({
      symbol: `<svg width="20" height="20"><use href="#radix-icons-link-2"/></svg>`
    })
  } as anchor.AnchorOptions)
  .use(emoji)

md.linkify.set({ fuzzyLink: false })

export { md }
