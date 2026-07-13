---
name: job-search-apply-agent
description: Shortlist jobs, internships, and fellowships; rank fit; and draft tailored application notes or follow-up steps. Use when the user wants a job-search / apply workflow, a clean shortlist from saved leads, or a reusable application-prep pass.
---

# Job Search / Apply Agent

## Overview

Use this skill to turn a pile of job leads into a focused shortlist and application plan.

Typical inputs:
- internships
- roles
- fellowship leads
- saved job links
- scraped postings

Typical outputs:
- ranked shortlist
- fit notes
- tailoring cues
- next actions / follow-ups

## Workflow

1. Normalize each lead.
   - title
   - company
   - location / remote status
   - url
   - source
   - notes

2. Score by fit.
   - match to target role
   - location / remote constraints
   - seniority / experience fit
   - deadline urgency
   - sponsorship / visa constraints if known

3. Shortlist the best leads.
   - keep a small set the user can actually act on
   - separate active targets from research-only items

4. Draft the application support.
   - why it fits
   - what to emphasize
   - what to verify before applying
   - follow-up reminder

## Deterministic helper

Use the local shortlister when you want a reproducible pass over a JSON list:

```bash
node skills/job-search-apply-agent/scripts/shortlist_jobs.mjs < jobs.json
```

Input format:

```json
{
  "profile": { "target": "internship", "keywords": ["react", "supabase"] },
  "jobs": [
    {"title": "...", "company": "...", "url": "...", "matchScore": 82}
  ]
}
```

## Common pitfalls

- Do not invent experience the user did not provide.
- Do not auto-apply without explicit user approval.
- Do not overload the shortlist with low-fit leads.
- Do not hide missing data; mark it clearly.

## Verification checklist

- [ ] Leads are normalized
- [ ] Fit is scored consistently
- [ ] Shortlist is small enough to act on
- [ ] Tailoring notes are concrete
- [ ] External submission always requires approval
