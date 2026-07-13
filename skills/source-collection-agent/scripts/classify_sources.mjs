#!/usr/bin/env node
import fs from 'fs'

function readInput() {
  const arg = process.argv[2]
  if (arg && fs.existsSync(arg)) {
    return fs.readFileSync(arg, 'utf8')
  }
  return fs.readFileSync(0, 'utf8')
}

function asArray(value) {
  if (Array.isArray(value)) return value
  if (value && Array.isArray(value.items)) return value.items
  if (value && Array.isArray(value.sources)) return value.sources
  return []
}

function scoreText(text) {
  return String(text || '').toLowerCase()
}

function classify(item) {
  const text = scoreText([item.title, item.url, item.source, item.notes].filter(Boolean).join(' '))
  const rules = [
    ['job search / apply', ['job', 'jobs', 'career', 'intern', 'internship', 'apply', 'application', 'resume', 'cv', 'hiring', 'recruit', 'fellowship']],
    ['source scraping / collection', ['scrape', 'scraping', 'crawler', 'crawl', 'extract', 'collector', 'collect', 'feed', 'rss', 'parser', 'repo', 'github']],
    ['creative / media', ['scroll animation', 'animation', 'fish audio', 'audio', 'voice', 'media', 'creative', 'content', 'video', 'design']],
    ['infrastructure / governance', ['mcp', 'skill', 'agent', 'gateway', 'router', 'provider', 'proxy', 'governance', 'security', 'cost', 'routing', 'automation']],
  ]
  for (const [category, keywords] of rules) {
    if (keywords.some((k) => text.includes(k))) return category
  }
  return 'reference / other'
}

function normalize(item) {
  const title = String(item.title || item.name || '').trim()
  const url = String(item.url || item.link || '').trim()
  const source = String(item.source || item.origin || '').trim()
  const notes = String(item.notes || item.summary || '').trim()
  const category = classify({ title, url, source, notes })
  return { title, url, source, notes, category }
}

const raw = readInput().trim()
if (!raw) {
  console.error('No input provided')
  process.exit(1)
}

let parsed
try {
  parsed = JSON.parse(raw)
} catch (error) {
  console.error('Input must be JSON:', error.message)
  process.exit(1)
}

const items = asArray(parsed).map(normalize)
const summary = items.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1
  return acc
}, {})

const output = { summary, items }
process.stdout.write(JSON.stringify(output, null, 2) + '\n')
