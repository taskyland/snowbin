import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
// @ts-expect-error No types
import { full as emoji } from 'markdown-it-emoji';
import Shiki from '@shikijs/markdown-it';
import { transformerNotationDiff } from '@shikijs/transformers';

const md = MarkdownIt({
  linkify: true,
  typographer: true,
  html: false
});

md.use(
  await Shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    transformers: [transformerNotationDiff()]
  })
)
  .use(anchor, {
    permalink: anchor.permalink.ariaHidden({
      symbol: `<svg width="20" height="20"><use href="#radix-icons-link-2"/></svg>`
    })
  } as anchor.AnchorOptions)
  .use(emoji);

md.linkify.set({ fuzzyLink: false });

export { md };
