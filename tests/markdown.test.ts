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

  test('centers headings and removes their markers', () => {
    const rendered = md.render('### -> **General Terms** <-')

    expect(rendered).toContain(
      '<h3 class="text-center justify-center" id="general-terms" tabindex="-1"><strong>General Terms</strong>'
    )
    expect(rendered).not.toContain('-&gt;')
    expect(rendered).not.toContain('&lt;-')
  })

  test('leaves unmatched markers as regular text', () => {
    expect(md.render('-> Text')).toBe('<p>-&gt; Text</p>\n')
  })
})

describe('table of contents', () => {
  test('renders nested links to every heading level', () => {
    const rendered = md.render(`
[TOC]

# Introduction

## Getting started

### Installation

## Usage
`)

    expect(rendered).toContain(
      '<nav class="table-of-contents"><ul><li><a href="#introduction">Introduction</a><ul><li><a href="#getting-started">Getting started</a><ul><li><a href="#installation">Installation</a></li></ul></li><li><a href="#usage">Usage</a></li></ul></li></ul></nav>'
    )
  })

  test('matches duplicate heading anchors', () => {
    const rendered = md.render('[TOC]\n\n# Repeat\n\n# Repeat')

    expect(rendered).toContain('<a href="#repeat">Repeat</a>')
    expect(rendered).toContain('<a href="#repeat-1">Repeat</a>')
    expect(rendered).toContain('<h1 id="repeat-1"')
  })

  test('accepts the legacy [TOC2] marker', () => {
    expect(md.render('[TOC2]\n\n# Glossary')).toContain(
      '<nav class="table-of-contents"><ul><li><a href="#glossary">Glossary</a></li></ul></nav>'
    )
  })

  test('uses centered heading text without markers', () => {
    const rendered = md.render('[TOC]\n\n### -> General Terms <-')

    expect(rendered).toContain(
      '<nav class="table-of-contents"><ul><li><a href="#general-terms">General Terms</a></li></ul></nav>'
    )
  })

  test('leaves inline markers as regular text', () => {
    expect(md.render('Read the [TOC] marker.')).toBe(
      '<p>Read the [TOC] marker.</p>\n'
    )
  })
})
