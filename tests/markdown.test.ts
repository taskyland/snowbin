import { describe, expect, test } from 'bun:test'
import { md } from '../src/core/markdown'

describe('centered text', () => {
  test('centers a marked line', () => {
    expect(md.render('-> Text <-')).toBe('<p class="text-center">Text</p>\n')
  })

  test('renders inline markdown inside centered text', () => {
    expect(md.render('-> **Bold** and [linked](/docs) <-')).toBe(
      '<p class="text-center"><strong>Bold</strong> and <a href="/docs">linked</a></p>\n'
    )
  })

  test('leaves unmatched markers as regular text', () => {
    expect(md.render('-> Text')).toBe('<p>-&gt; Text</p>\n')
  })
})
