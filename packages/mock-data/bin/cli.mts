// pnpm mock-data [--employees 500] [--seed 1] [--today yyyy-mm-dd] [--csv export.csv] [--empty] [--out file.json]
// Writes an Org as JSON (to --out, or stdout) and prints a summary to stderr.

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { emptyOrg, fromCsv, generateOrg, summarise } from '../src/index.ts'

const { values } = parseArgs({
  options: {
    employees: { type: 'string', default: '500' },
    seed: { type: 'string', default: '1' },
    today: { type: 'string' },
    csv: { type: 'string' },
    empty: { type: 'boolean', default: false },
    out: { type: 'string' },
  },
})

// pnpm runs scripts from the repo root; INIT_CWD is where the command was typed.
const cwd = process.env.INIT_CWD ?? process.cwd()
const seed = Number(values.seed)
const org = values.empty
  ? emptyOrg(values.today)
  : values.csv
    ? fromCsv(readFileSync(resolve(cwd, values.csv), 'utf8'), { seed, today: values.today })
    : generateOrg({ employees: Number(values.employees), seed, today: values.today })

const json = JSON.stringify(org, null, 2)
if (values.out) writeFileSync(resolve(cwd, values.out), json + '\n')
else process.stdout.write(json + '\n')
console.error(JSON.stringify(summarise(org), null, 2))
