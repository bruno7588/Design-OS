// pnpm session-messages [sessionId] [--since <ISO date>] [--context <chars>] [--max <chars>]
// Prints Bruno's typed messages from a Claude Code session in this project, in order, each with
// its time and the end of Claude's reply before it, so a correction keeps its context. Used by
// the learnings skill. Reads ~/.claude/projects/<this project>/<session>.jsonl; the newest
// session by default. Tool output, summaries and system messages are left out.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '')
const projectDir = join(homedir(), '.claude/projects', root.replace(/[^a-zA-Z0-9]/g, '-'))

const args = process.argv.slice(2)
const flag = (name: string) => {
  const i = args.indexOf(name)
  return i >= 0 ? args.splice(i, 2)[1] : undefined
}
const since = flag('--since')
const contextChars = Number(flag('--context') ?? 300)
// Long messages are usually pasted prompts or specs; keep their start so the rule-finding stays focused.
const maxChars = Number(flag('--max') ?? 1200)
const sessionArg = args[0]

if (!existsSync(projectDir)) {
  console.error(`No Claude Code sessions found in ${projectDir}`)
  process.exit(1)
}
const sessions = readdirSync(projectDir)
  .filter((f) => f.endsWith('.jsonl'))
  .map((f) => ({ id: f.replace('.jsonl', ''), mtime: statSync(join(projectDir, f)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime)
const session = sessionArg ? sessions.find((s) => s.id.startsWith(sessionArg)) : sessions[0]
if (!session) {
  console.error(`Session not found. Sessions: ${sessions.map((s) => s.id).join(', ')}`)
  process.exit(1)
}

interface Line {
  type?: string
  timestamp?: string
  origin?: { kind?: string }
  isMeta?: boolean
  isCompactSummary?: boolean
  message?: { role?: string; content?: string | { type: string; text?: string }[] }
}

const textOf = (content: Line['message'] extends infer M ? (M extends { content?: infer C } ? C : never) : never) => {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content.filter((b) => b.type === 'text' && b.text).map((b) => b.text).join('\n')
}
// Drop harness wrappers (system reminders, command tags, pasted-content markers).
const clean = (s: string) =>
  s
    .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '')
    .replace(/<(command-[a-z]+|local-command-[a-z]+)>[\s\S]*?<\/\1>/g, '')
    .replace(/<\/?pasted_content[^>]*>/g, '')
    .trim()

const lines = readFileSync(join(projectDir, `${session.id}.jsonl`), 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((l) => {
    try {
      return JSON.parse(l) as Line
    } catch {
      return {} as Line
    }
  })

let lastReply = ''
const out: string[] = []
let count = 0
for (const l of lines) {
  if (l.type === 'assistant') {
    const t = textOf(l.message?.content as never)
    if (t.trim()) lastReply = t.trim()
    continue
  }
  if (l.type !== 'user' || l.origin?.kind !== 'human' || l.isMeta || l.isCompactSummary) continue
  const full = clean(textOf(l.message?.content as never))
  if (!full) continue
  const text = full.length > maxChars ? `${full.slice(0, maxChars)}\n[… ${full.length - maxChars} more characters, pasted text]` : full
  if (since && l.timestamp && l.timestamp <= since) {
    lastReply = ''
    continue
  }
  count++
  const before = lastReply.length > contextChars ? `…${lastReply.slice(-contextChars)}` : lastReply
  out.push(
    `## ${count}. ${l.timestamp ?? ''}`,
    before ? `> Claude, before: ${before.replace(/\n+/g, ' ')}` : '> (start of session)',
    '',
    text,
    '',
  )
  lastReply = ''
}

console.log(`# Session ${session.id}\n${count} messages from Bruno${since ? ` after ${since}` : ''}\n`)
console.log(out.join('\n'))
