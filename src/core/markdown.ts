import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'

// @ts-expect-error No types
import { full as emoji } from 'markdown-it-emoji'

const centeredContent = (line: string): string | undefined => {
  const trimmed = line.trim()

  if (!trimmed.startsWith('->') || !trimmed.endsWith('<-')) return

  return trimmed.slice(2, -2).trim()
}

const centeredText: MarkdownIt.PluginSimple = (markdown) => {
  markdown.block.ruler.before(
    'heading',
    'centered_heading',
    (state, startLine, _endLine, silent) => {
      const start = state.bMarks[startLine] + state.tShift[startLine]
      const end = state.skipSpacesBack(state.eMarks[startLine], start)

      if (state.sCount[startLine] - state.blkIndent >= 4) return false

      const heading = /^(#{1,6})[\t ]+(.+)$/.exec(state.src.slice(start, end))
      if (!heading) return false

      const markup = heading[1]
      const rawContent = heading[2].replace(/[\t ]+#+[\t ]*$/, '')
      const content = centeredContent(rawContent)

      if (content === undefined) return false
      if (silent) return true

      state.line = startLine + 1

      const open = state.push('heading_open', `h${markup.length}`, 1)
      open.attrSet('class', 'text-center')
      open.attrJoin('class', 'justify-center')
      open.map = [startLine, state.line]
      open.markup = markup

      const inline = state.push('inline', '', 0)
      inline.content = content
      inline.map = [startLine, state.line]
      inline.children = []

      const close = state.push('heading_close', `h${markup.length}`, -1)
      close.markup = markup

      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote'] }
  )

  markdown.block.ruler.before(
    'paragraph',
    'centered_text',
    (state, startLine, _endLine, silent) => {
      const start = state.bMarks[startLine] + state.tShift[startLine]
      const end = state.skipSpacesBack(state.eMarks[startLine], start)
      const line = state.src.slice(start, end)

      if (state.sCount[startLine] - state.blkIndent >= 4) return false

      const content = centeredContent(line)
      if (content === undefined) return false

      if (silent) return true

      state.line = startLine + 1

      const open = state.push('centered_text_open', 'p', 1)
      open.attrSet('class', 'text-center')
      open.map = [startLine, state.line]
      open.markup = '->'

      const inline = state.push('inline', '', 0)
      inline.content = content
      inline.map = [startLine, state.line]
      inline.children = []

      const close = state.push('centered_text_close', 'p', -1)
      close.markup = '<-'

      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote'] }
  )
}

const md = new MarkdownIt({
  linkify: true,
  typographer: true,
  html: false
})
  .use(emoji)
  .use(toc, { placeholder: '\\[TOC2?\\]', listType: 'ul' })
  .use(anchor, {
    permalink: anchor.permalink.ariaHidden({
      symbol: `<svg width="20" height="20"><use href="#radix-icons-link-2"/></svg>`
    })
  } as anchor.AnchorOptions)
  .use(centeredText)

md.linkify.set({ fuzzyLink: false })

export { md }
