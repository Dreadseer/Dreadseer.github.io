#!/usr/bin/env node
/**
 * Contact form diagnostic.
 *
 * Walks the exact chain the contact form depends on and reports where it breaks:
 *
 *   1. Environment variables present and well-formed
 *   2. Supabase project reachable with the anon key
 *   3. The `messages` table exists and is exposed through PostgREST
 *   4. The table's columns match what the form sends
 *   5. An anonymous INSERT is actually permitted (RLS + GRANTs)
 *
 * Steps 3–5 are the ones that fail silently in the browser, because the app
 * reports "Something went wrong" without the underlying PostgREST error.
 *
 * Usage:  node scripts/diagnose-contact.mjs [--keep]
 *   --keep   do not attempt to remove the inserted probe row
 */

import { readFileSync, existsSync } from 'node:fs'

const KEEP = process.argv.includes('--keep')

const c = {
  reset: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m',
}
const pass = (m) => console.log(`${c.green}  PASS${c.reset}  ${m}`)
const fail = (m) => console.log(`${c.red}  FAIL${c.reset}  ${m}`)
const warn = (m) => console.log(`${c.yellow}  WARN${c.reset}  ${m}`)
const info = (m) => console.log(`${c.dim}        ${m}${c.reset}`)
const step = (n, m) => console.log(`\n${c.bold}${c.cyan}[${n}]${c.reset} ${c.bold}${m}${c.reset}`)

// ── Load .env without adding a dependency ────────────────────────────────
function loadEnv() {
  const out = {}
  for (const file of ['.env', '.env.local']) {
    if (!existsSync(file)) continue
    for (const raw of readFileSync(file, 'utf8').split('\n')) {
      const line = raw.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq === -1) continue
      const key = line.slice(0, eq).trim()
      let val = line.slice(eq + 1).trim()
      // Strip matching surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      out[key] = val
    }
  }
  return out
}

const env = { ...loadEnv(), ...process.env }
const URL_ = env.VITE_SUPABASE_URL
const KEY = env.VITE_SUPABASE_ANON_KEY

let failed = false
const finding = (msg) => { failed = true; fail(msg) }

console.log(`${c.bold}Contact form diagnostic${c.reset}`)

/* ── 1. Environment ──────────────────────────────────────────────────── */
step(1, 'Environment variables')

if (!URL_ || !KEY) {
  if (!URL_) finding('VITE_SUPABASE_URL is not set')
  if (!KEY) finding('VITE_SUPABASE_ANON_KEY is not set')
  info('Create a .env in the project root:')
  info('  VITE_SUPABASE_URL=https://<project-ref>.supabase.co')
  info('  VITE_SUPABASE_ANON_KEY=<anon public key>')
  info('Both come from Supabase Dashboard -> Settings -> API.')
  console.log(`\n${c.red}${c.bold}Cannot continue without credentials.${c.reset}\n`)
  process.exit(1)
}

pass(`VITE_SUPABASE_URL = ${URL_}`)
pass(`VITE_SUPABASE_ANON_KEY = ${KEY.slice(0, 12)}… (${KEY.length} chars)`)

if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/.test(URL_.replace(/\/$/, ''))) {
  warn('URL does not look like a standard Supabase project URL')
}

// The anon key is a JWT; decoding it locally catches a wrong-key paste fast.
try {
  const payload = JSON.parse(Buffer.from(KEY.split('.')[1], 'base64').toString())
  if (payload.role !== 'anon') {
    finding(`Key role is "${payload.role}", expected "anon"`)
    if (payload.role === 'service_role') {
      info('This is the SERVICE ROLE key — it must never ship to a browser. Use the anon key.')
    }
  } else {
    pass('Key decodes as a JWT with role "anon"')
  }
  if (payload.exp && payload.exp * 1000 < Date.now()) finding('Key is expired')
} catch {
  warn('Key is not a decodable JWT (may be a newer publishable key format)')
}

const base = URL_.replace(/\/$/, '')
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

const req = async (path, init = {}) => {
  const res = await fetch(`${base}${path}`, { ...init, headers: { ...headers, ...init.headers } })
  const text = await res.text()
  let json = null
  try { json = text ? JSON.parse(text) : null } catch { /* non-JSON body */ }
  return { res, text, json }
}

/* ── 2. Reachability ─────────────────────────────────────────────────── */
step(2, 'Project reachable and key accepted')
try {
  const { res } = await req('/rest/v1/')
  if (res.status === 401 || res.status === 403) {
    finding(`REST root returned ${res.status} — the anon key is being rejected`)
    info('The key likely belongs to a different project, or was rotated.')
  } else {
    pass(`REST endpoint responded ${res.status}`)
  }
} catch (e) {
  finding(`Network error: ${e.message}`)
  info('Check the project ref in the URL, and that the project is not paused.')
  console.log()
  process.exit(1)
}

/* ── 3. Table exposed ────────────────────────────────────────────────── */
step(3, 'The `messages` table')
const probe = await req('/rest/v1/messages?select=*&limit=1')

if (probe.res.status === 404 || probe.json?.code === '42P01') {
  finding('Table `messages` does not exist, or is not exposed through the API')
  info("Supabase -> Table Editor: confirm the table exists in the `public` schema.")
} else if (probe.res.status === 401 || probe.res.status === 403) {
  warn(`SELECT is blocked (${probe.res.status}) — expected if there is no anon SELECT policy`)
  info('Not a problem for the contact form: it only needs INSERT.')
} else if (probe.res.ok) {
  pass(`Table reachable (SELECT returned ${probe.res.status})`)
  if (Array.isArray(probe.json) && probe.json.length) {
    info(`Columns: ${Object.keys(probe.json[0]).join(', ')}`)
  }
} else {
  warn(`Unexpected status ${probe.res.status}: ${probe.text.slice(0, 200)}`)
}

/* ── 4 & 5. The INSERT the form actually performs ────────────────────── */
step(4, 'Anonymous INSERT (exactly what the form sends)')

const marker = `diagnostic-${Date.now()}`
const payload = {
  name: 'Contact form diagnostic',
  email: 'diagnostic@example.com',
  message: `Automated probe — safe to delete. [${marker}]`,
}
info(`POST /rest/v1/messages  ${JSON.stringify(payload)}`)

const ins = await req('/rest/v1/messages', {
  method: 'POST',
  headers: { Prefer: 'return=representation' },
  body: JSON.stringify(payload),
})

if (ins.res.ok) {
  pass(`INSERT succeeded (${ins.res.status}) — the database side is working`)
  const row = Array.isArray(ins.json) ? ins.json[0] : ins.json
  if (row) info(`Row id: ${row.id ?? '(no id column returned)'}`)

  if (!KEEP) {
    step(5, 'Cleaning up the probe row')
    const del = await req(`/rest/v1/messages?message=like.*${marker}*`, { method: 'DELETE' })
    if (del.res.ok) pass('Probe row deleted')
    else {
      warn(`Could not delete probe row (${del.res.status}) — anon DELETE is correctly restricted`)
      info(`Remove it manually from the back office. Marker: ${marker}`)
    }
  } else {
    info(`Probe row kept. Marker: ${marker}`)
  }
} else {
  const code = ins.json?.code
  finding(`INSERT failed — HTTP ${ins.res.status}${code ? ` (Postgres ${code})` : ''}`)
  if (ins.json?.message) info(`message: ${ins.json.message}`)
  if (ins.json?.details) info(`details: ${ins.json.details}`)
  if (ins.json?.hint) info(`hint:    ${ins.json.hint}`)

  console.log()
  if (ins.res.status === 401 || ins.res.status === 403 || code === '42501') {
    console.log(`${c.yellow}  Row Level Security is blocking the anon INSERT.${c.reset}`)
    info('Two separate layers must both allow it. Run in the Supabase SQL editor:')
    console.log(`${c.dim}
    grant insert on public.messages to anon;

    create policy "anon_insert_messages"
      on public.messages as permissive
      for insert to anon with check (true);

    -- verify:
    select * from pg_policies where tablename = 'messages';${c.reset}`)
  } else if (code === 'PGRST204' || code === '42703') {
    console.log(`${c.yellow}  Column mismatch — the table does not have the columns the form sends.${c.reset}`)
    info('The form sends: name, email, message')
  } else if (code === '23502') {
    console.log(`${c.yellow}  A NOT NULL column has no default and is not being sent.${c.reset}`)
    info('Give it a default, or make it nullable.')
  } else if (ins.res.status === 404) {
    console.log(`${c.yellow}  Table not found at /rest/v1/messages.${c.reset}`)
  }
}

/* ── Summary ─────────────────────────────────────────────────────────── */
console.log(
  failed
    ? `\n${c.red}${c.bold}Diagnostic found blocking problems (see FAIL lines above).${c.reset}\n`
    : `\n${c.green}${c.bold}All checks passed — the contact form's backend works.${c.reset}\n`
)
process.exit(failed ? 1 : 0)
