// @design-os/mock-data: realistic data at admin scale for replicas and demos.
// See skills/mock-data/SKILL.md for when and how to use it.

export * from './types.ts'
export { generateOrg, emptyOrg, withLearning, enrolmentsByEmployee, summarise, DEFAULT_TODAY, type GenerateOptions } from './generate.ts'
export { fromCsv, parseCsv, parseDate, type CsvOptions, type CsvField } from './csv.ts'
export { createRng, type Rng } from './random.ts'
export { ORG_NAME, DEPARTMENTS, SITES, COURSES, PHOTOS } from './catalogue.ts'
