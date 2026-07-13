#!/usr/bin/env node
import fs from 'fs'

function readInput() {
  const arg = process.argv[2]
  if (arg && fs.existsSync(arg)) {
    return fs.readFileSync(arg, 'utf8')
  }
  return fs.readFileSync(0, 'utf8')
}

function toArray(value) {
  if (Array.isArray(value)) return value
  if (value && Array.isArray(value.jobs)) return value.jobs
  return []
}

function toText(job) {
  return [job.title, job.company, job.location, job.url, job.source, job.notes, job.description]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function numeric(value, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function scoreJob(job, profile) {
  let score = numeric(job.matchScore, 0)
  const text = toText(job)
  const keywords = Array.isArray(profile?.keywords) ? profile.keywords : []
  for (const keyword of keywords) {
    if (String(keyword).trim() && text.includes(String(keyword).toLowerCase())) score += 4
  }
  if (profile?.target && text.includes(String(profile.target).toLowerCase())) score += 6
  if (String(job.remote || job.location || '').toLowerCase().includes('remote')) score += 2
  if (String(job.deadline || '').trim()) score += 1
  return score
}

function normalize(job, profile) {
  const title = String(job.title || job.role || '').trim()
  const company = String(job.company || '').trim()
  const url = String(job.url || job.link || '').trim()
  const location = String(job.location || '').trim()
  const source = String(job.source || '').trim()
  const notes = String(job.notes || job.description || '').trim()
  const score = scoreJob(job, profile)
  const tailoring = []
  if (profile?.target) tailoring.push(`Targeted at ${profile.target}`)
  if (Array.isArray(profile?.keywords) && profile.keywords.length) tailoring.push(`Match keywords: ${profile.keywords.join(', ')}`)
  if (location) tailoring.push(`Location: ${location}`)
  if (score < 40) tailoring.push('Low fit; keep only if the user explicitly wants broad coverage')
  return {
    title,
    company,
    url,
    location,
    source,
    notes,
    score,
    tailoring,
    nextAction: score >= 70 ? 'Draft a tailored application' : score >= 50 ? 'Verify requirements and keep in the shortlist' : 'Archive or mark research-only',
  }
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

const profile = parsed.profile || {}
const jobs = toArray(parsed).map((job) => normalize(job, profile))
  .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))

const shortlist = jobs.slice(0, Math.min(10, jobs.length))
const output = {
  profile,
  summary: { total: jobs.length, shortlisted: shortlist.length },
  shortlist,
}

process.stdout.write(JSON.stringify(output, null, 2) + '\n')
