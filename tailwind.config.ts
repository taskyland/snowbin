// @ts-nocheck
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'
import * as radixColors from '@radix-ui/colors'

const colors = {}

Object.entries(radixColors).forEach(([key, value]) => {
  const [baseColor, ...prefixes] = key
    .split(/(?=[A-Z])/)
    .map((word) => word.toLowerCase())
  colors[baseColor] ??= {}
  Object.entries(value).forEach(([colorKey, colorValue]) => {
    colors[baseColor][[...prefixes, colorKey.replace(/\D+/, '')].join('-')] =
      colorValue
  })
})

const brand = 'violet' as const

const gray = (
  {
    tomato: 'mauve',
    red: 'mauve',
    crimson: 'mauve',
    pink: 'mauve',
    plum: 'mauve',
    purple: 'mauve',
    violet: 'mauve',

    indigo: 'slate',
    blue: 'slate',
    sky: 'slate',
    cyan: 'slate',

    teal: 'sage',
    mint: 'sage',
    green: 'sage',

    grass: 'olive',
    lime: 'olive',

    yellow: 'sand',
    amber: 'sand',
    orange: 'sand',
    brown: 'sand'
  } as const
)[brand]

colors['primary'] = colors[brand]
colors['neutral'] = colors[gray]
colors['white'].DEFAULT = 'white'
colors['black'].DEFAULT = 'black'

const prose = {
  body: '11',
  headings: '12',
  lead: '11',
  links: 'blue.11',
  bold: '12',
  counters: '11',
  bullets: '12',
  hr: '6',
  quotes: '12',
  'quote-borders': '6',
  captions: '11',
  code: '12',
  'pre-code': '12',
  'pre-bg': '3',
  'th-borders': '7',
  'td-borders': '6'
}

const getProse = (theme: (key: string) => string) => {
  const res = {}
  Object.keys(prose).forEach((key) => {
    const value = `colors.${prose[key].replace(/^\d/, 'gray.$&')}`
    res[`--tw-prose-${key}`] = theme(value)
    res[`--tw-prose-invert-${key}`] = theme(value.replace(/\d+$/, 'dark-$&'))
  })
  return res
}

export default {
  darkMode: 'class',
  content: [
    'src/**/*.{ts,tsx,mdx}',
    'src/routes/**/*.{ts,tsx,mdx}',
    'src/components/**/*.{ts,tsx}'
  ],
  theme: {
    colors,
    extend: {
      typography: ({ theme }) => ({ DEFAULT: { css: getProse(theme) } })
    }
  },
  plugins: [typography, animate]
} satisfies Config

/*[
  'amber',  'black',  'blue',
  'bronze', 'brown',  'crimson',
  'cyan',   'gold',   'grass',
  'gray',   'green',  'indigo',
  'lime',   'mauve',  'mint',
  'olive',  'orange', 'pink',
  'plum',   'purple', 'red',
  'sage',   'sand',   'sky',
  'slate',  'teal',   'tomato',
  'violet', 'white',  'yellow'
]*/
