// A seeded random generator (mulberry32), so the same seed always gives the same org.

export interface Rng {
  /** 0 (inclusive) to 1 (exclusive). */
  next(): number
  /** A whole number from min to max, both inclusive. */
  int(min: number, max: number): number
  pick<T>(items: readonly T[]): T
  /** Picks a key by weight, such as { Completed: 50, Overdue: 10 }. */
  weighted<K extends string>(weights: Record<K, number>): K
  chance(probability: number): boolean
}

export function createRng(seed: number): Rng {
  let a = seed >>> 0
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const int = (min: number, max: number) => min + Math.floor(next() * (max - min + 1))
  return {
    next,
    int,
    pick: (items) => items[Math.floor(next() * items.length)],
    weighted: (weights) => {
      const entries = Object.entries(weights) as [keyof typeof weights, number][]
      let roll = next() * entries.reduce((sum, [, w]) => sum + w, 0)
      for (const [key, w] of entries) {
        roll -= w
        if (roll < 0) return key
      }
      return entries[entries.length - 1][0]
    },
    chance: (p) => next() < p,
  }
}

const DAY = 86_400_000

export const toIso = (date: Date) => date.toISOString().slice(0, 10)
export const addDays = (iso: string, days: number) => toIso(new Date(Date.parse(iso) + days * DAY))
export const daysBetween = (from: string, to: string) => Math.round((Date.parse(to) - Date.parse(from)) / DAY)
