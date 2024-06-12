import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

// @ts-expect-error No types
import { full as emoji } from 'markdown-it-emoji';
import { fromHighlighter } from '@shikijs/markdown-it/core';
import { getHighlighterCore, loadWasm } from 'shiki/core';
import { transformerNotationDiff } from '@shikijs/transformers';

// @ts-expect-error We are importing wasm here
import wasm from 'shiki/onig.wasm';

await loadWasm((importObject) => WebAssembly.instantiate(wasm, importObject));

const highlighter = await getHighlighterCore({
  themes: [
    import('shiki/themes/github-light.mjs'),
    import('shiki/themes/github-dark-dimmed.mjs')
  ],
  langs: [
    import('shiki/langs/asm.mjs'),
    import('shiki/langs/astro.mjs'),
    import('shiki/langs/c.mjs'),
    import('shiki/langs/clojure.mjs'),
    import('shiki/langs/coffee.mjs'),
    import('shiki/langs/cpp.mjs'),
    import('shiki/langs/crystal.mjs'),
    import('shiki/langs/csharp.mjs'),
    import('shiki/langs/css.mjs'),
    import('shiki/langs/csv.mjs'),
    import('shiki/langs/dart.mjs'),
    import('shiki/langs/diff.mjs'),
    import('shiki/langs/docker.mjs'),
    import('shiki/langs/elixir.mjs'),
    import('shiki/langs/elm.mjs'),
    import('shiki/langs/erb.mjs'),
    import('shiki/langs/erlang.mjs'),
    import('shiki/langs/fish.mjs'),
    import('shiki/langs/fsharp.mjs'),
    import('shiki/langs/gdresource.mjs'),
    import('shiki/langs/gdscript.mjs'),
    import('shiki/langs/gdshader.mjs'),
    import('shiki/langs/go.mjs'),
    import('shiki/langs/graphql.mjs'),
    import('shiki/langs/hack.mjs'),
    import('shiki/langs/haml.mjs'),
    import('shiki/langs/haskell.mjs'),
    import('shiki/langs/html.mjs'),
    import('shiki/langs/java.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/jsx.mjs'),
    import('shiki/langs/julia.mjs'),
    import('shiki/langs/kotlin.mjs'),
    import('shiki/langs/latex.mjs'),
    import('shiki/langs/less.mjs'),
    import('shiki/langs/lua.mjs'),
    import('shiki/langs/make.mjs'),
    import('shiki/langs/nim.mjs'),
    import('shiki/langs/nix.mjs'),
    import('shiki/langs/nushell.mjs'),
    import('shiki/langs/ocaml.mjs'),
    import('shiki/langs/php.mjs'),
    import('shiki/langs/plsql.mjs'),
    import('shiki/langs/python.mjs'),
    import('shiki/langs/ruby.mjs'),
    import('shiki/langs/rust.mjs'),
    import('shiki/langs/sass.mjs'),
    import('shiki/langs/scala.mjs'),
    import('shiki/langs/scss.mjs'),
    import('shiki/langs/sql.mjs'),
    import('shiki/langs/stata.mjs'),
    import('shiki/langs/stylus.mjs'),
    import('shiki/langs/svelte.mjs'),
    import('shiki/langs/swift.mjs'),
    import('shiki/langs/toml.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/typescript.mjs'),
    import('shiki/langs/vue.mjs'),
    import('shiki/langs/vue-html.mjs'),
    import('shiki/langs/yaml.mjs'),
    import('shiki/langs/zig.mjs')
  ]
});

const md = new MarkdownIt({
  linkify: true,
  typographer: true,
  html: false
})
  .use(
    fromHighlighter(highlighter, {
      transformers: [transformerNotationDiff()],
      themes: { dark: 'github-dark-dimmed', light: 'github-light' }
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
