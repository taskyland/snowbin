import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

// @ts-expect-error No types
import { full as emoji } from 'markdown-it-emoji'
import { fromHighlighter } from '@shikijs/markdown-it/core'
import { getHighlighterCore, loadWasm } from 'shiki/core'
import { transformerNotationDiff } from '@shikijs/transformers'

// @ts-expect-error We are importing wasm here
import wasm from 'shiki/onig.wasm'

await loadWasm((importObject) => WebAssembly.instantiate(wasm, importObject))

const highlighter = await getHighlighterCore({
  themes: [
    import('shiki/themes/github-light.mjs'),
    import('shiki/themes/github-dark-dimmed.mjs')
  ],
  langs: [
    import('shiki/langs/abap.mjs'),
    import('shiki/langs/actionscript-3.mjs'),
    import('shiki/langs/ada.mjs'),
    import('shiki/langs/apache.mjs'),
    import('shiki/langs/apex.mjs'),
    import('shiki/langs/apl.mjs'),
    import('shiki/langs/applescript.mjs'),
    import('shiki/langs/ara.mjs'),
    import('shiki/langs/asm.mjs'),
    import('shiki/langs/astro.mjs'),
    import('shiki/langs/awk.mjs'),
    import('shiki/langs/ballerina.mjs'),
    import('shiki/langs/bat.mjs'),
    import('shiki/langs/beancount.mjs'),
    import('shiki/langs/berry.mjs'),
    import('shiki/langs/bibtex.mjs'),
    import('shiki/langs/bicep.mjs'),
    import('shiki/langs/blade.mjs'),
    import('shiki/langs/c.mjs'),
    import('shiki/langs/cadence.mjs'),
    import('shiki/langs/clarity.mjs'),
    import('shiki/langs/clojure.mjs'),
    import('shiki/langs/cmake.mjs'),
    import('shiki/langs/codeql.mjs'),
    import('shiki/langs/coffee.mjs'),
    import('shiki/langs/cpp.mjs'),
    import('shiki/langs/crystal.mjs'),
    import('shiki/langs/csharp.mjs'),
    import('shiki/langs/css.mjs'),
    import('shiki/langs/csv.mjs'),
    import('shiki/langs/cue.mjs'),
    import('shiki/langs/dart.mjs'),
    import('shiki/langs/dax.mjs'),
    import('shiki/langs/diff.mjs'),
    import('shiki/langs/docker.mjs'),
    import('shiki/langs/dream-maker.mjs'),
    import('shiki/langs/elixir.mjs'),
    import('shiki/langs/elm.mjs'),
    import('shiki/langs/erb.mjs'),
    import('shiki/langs/erlang.mjs'),
    import('shiki/langs/fish.mjs'),
    import('shiki/langs/fsharp.mjs'),
    import('shiki/langs/gdresource.mjs'),
    import('shiki/langs/gdscript.mjs'),
    import('shiki/langs/gdshader.mjs'),
    import('shiki/langs/gherkin.mjs'),
    import('shiki/langs/git-commit.mjs'),
    import('shiki/langs/git-rebase.mjs'),
    import('shiki/langs/glimmer-js.mjs'),
    import('shiki/langs/glimmer-ts.mjs'),
    import('shiki/langs/glsl.mjs'),
    import('shiki/langs/gnuplot.mjs'),
    import('shiki/langs/go.mjs'),
    import('shiki/langs/graphql.mjs'),
    import('shiki/langs/groovy.mjs'),
    import('shiki/langs/hack.mjs'),
    import('shiki/langs/haml.mjs'),
    import('shiki/langs/handlebars.mjs'),
    import('shiki/langs/haskell.mjs'),
    import('shiki/langs/hcl.mjs'),
    import('shiki/langs/hjson.mjs'),
    import('shiki/langs/hlsl.mjs'),
    import('shiki/langs/html.mjs'),
    import('shiki/langs/imba.mjs'),
    import('shiki/langs/ini.mjs'),
    import('shiki/langs/java.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/jinja.mjs'),
    import('shiki/langs/jison.mjs'),
    import('shiki/langs/json.mjs'),
    import('shiki/langs/json5.mjs'),
    import('shiki/langs/jsonc.mjs'),
    import('shiki/langs/jsx.mjs'),
    import('shiki/langs/julia.mjs'),
    import('shiki/langs/kotlin.mjs'),
    import('shiki/langs/kusto.mjs'),
    import('shiki/langs/latex.mjs'),
    import('shiki/langs/less.mjs'),
    import('shiki/langs/liquid.mjs'),
    import('shiki/langs/lisp.mjs'),
    import('shiki/langs/logo.mjs'),
    import('shiki/langs/lua.mjs'),
    import('shiki/langs/make.mjs'),
    import('shiki/langs/markdown.mjs'),
    import('shiki/langs/marko.mjs'),
    import('shiki/langs/matlab.mjs'),
    import('shiki/langs/narrat.mjs'),
    import('shiki/langs/nextflow.mjs'),
    import('shiki/langs/nginx.mjs'),
    import('shiki/langs/nim.mjs'),
    import('shiki/langs/nix.mjs'),
    import('shiki/langs/nushell.mjs'),
    import('shiki/langs/ocaml.mjs'),
    import('shiki/langs/pascal.mjs'),
    import('shiki/langs/php.mjs'),
    import('shiki/langs/plsql.mjs'),
    import('shiki/langs/postcss.mjs'),
    import('shiki/langs/powerquery.mjs'),
    import('shiki/langs/powershell.mjs'),
    import('shiki/langs/prisma.mjs'),
    import('shiki/langs/prolog.mjs'),
    import('shiki/langs/proto.mjs'),
    import('shiki/langs/pug.mjs'),
    import('shiki/langs/puppet.mjs'),
    import('shiki/langs/purescript.mjs'),
    import('shiki/langs/python.mjs'),
    import('shiki/langs/r.mjs'),
    import('shiki/langs/raku.mjs'),
    import('shiki/langs/razor.mjs'),
    import('shiki/langs/reg.mjs'),
    import('shiki/langs/rel.mjs'),
    import('shiki/langs/riscv.mjs'),
    import('shiki/langs/rst.mjs'),
    import('shiki/langs/ruby.mjs'),
    import('shiki/langs/rust.mjs'),
    import('shiki/langs/sass.mjs'),
    import('shiki/langs/scala.mjs'),
    import('shiki/langs/scheme.mjs'),
    import('shiki/langs/scss.mjs'),
    import('shiki/langs/sparql.mjs'),
    import('shiki/langs/splunk.mjs'),
    import('shiki/langs/sql.mjs'),
    import('shiki/langs/stata.mjs'),
    import('shiki/langs/stylus.mjs'),
    import('shiki/langs/svelte.mjs'),
    import('shiki/langs/swift.mjs'),
    import('shiki/langs/system-verilog.mjs'),
    import('shiki/langs/tasl.mjs'),
    import('shiki/langs/tcl.mjs'),
    import('shiki/langs/tex.mjs'),
    import('shiki/langs/toml.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/turtle.mjs'),
    import('shiki/langs/twig.mjs'),
    import('shiki/langs/typescript.mjs'),
    import('shiki/langs/v.mjs'),
    import('shiki/langs/vb.mjs'),
    import('shiki/langs/verilog.mjs'),
    import('shiki/langs/vhdl.mjs'),
    import('shiki/langs/viml.mjs'),
    import('shiki/langs/vue.mjs'),
    import('shiki/langs/vue-html.mjs'),
    import('shiki/langs/vyper.mjs'),
    import('shiki/langs/yaml.mjs'),
    import('shiki/langs/zig.mjs')
  ]
})

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
  .use(emoji)

md.linkify.set({ fuzzyLink: false })

export { md }
