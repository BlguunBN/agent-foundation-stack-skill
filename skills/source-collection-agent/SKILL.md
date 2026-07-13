---
name: source-collection-agent
description: Collect, de-duplicate, classify, and summarize links, feeds, repo lists, scraped pages, or other source material into usable opportunity and content ledgers. Use when the user wants a source-scraping / collection workflow, a clean classification of saved links, or a concise summary of what is worth acting on.
---

# Source Collection Agent

## Overview

Use this skill to turn messy source material into a clean ledger the rest of the stack can work from.

Typical inputs:
- saved links
- scraped pages
- repo lists
- feeds / dumps / transcripts
- mixed notes from research sessions

Typical outputs:
- normalized link table
- classification into buckets
- short value summary per item
- recommended next actions

## Workflow

1. Normalize every item.
   - keep `title`, `url`, `source`, `notes`
   - remove duplicates
   - preserve uncertain items instead of forcing a guess

2. Classify into the smallest useful set.
   - job search / apply
   - source scraping / collection
   - creative / media
   - infrastructure / governance
   - reference / other

3. Summarize each bucket.
   - what it is
   - why it matters
   - what to do next

4. Return a clean artifact.
   - markdown summary for humans
   - JSON for reuse in later automation

## Deterministic helper

Use the local classifier when you want a reproducible pass over a JSON list:

```bash
node skills/source-collection-agent/scripts/classify_sources.mjs < input.json
```

Input format:

```json
[
  {"title": "...", "url": "...", "source": "...", "notes": "..."}
]
```

## Common pitfalls

- Do not over-classify vague items.
- Do not merge unrelated sources just because they came from the same page.
- Do not promote a reference item into an active workflow without evidence.
- Do not leak private tokens or credentials from scraped content.

## Verification checklist

- [ ] Inputs are normalized
- [ ] Duplicates are removed
- [ ] Categories are defensible
- [ ] Uncertain items stay visible
- [ ] Output is usable for the next agent
