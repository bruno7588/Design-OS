import { describe, expect, it } from 'vitest'
import { READ_PAYLOAD, asciiJson, payloadPng } from './payload-png.mts'

describe('payload PNGs', () => {
  it('carries text that readPayload gets back exactly, including non-ASCII through JSON escapes', async () => {
    const data = { title: 'Entry point: Admin › People', big: 'x'.repeat(200_000) }
    const png = payloadPng(asciiJson(data))
    expect(png.subarray(1, 4).toString()).toBe('PNG')
    const figma = { getImageByHash: () => ({ getBytesAsync: async () => new Uint8Array(png) }) }
    const page = { findOne: (fn: (n: { name: string }) => boolean) => [{ name: '__payload:screen', fills: [{ type: 'IMAGE', imageHash: 'h' }] }].find(fn) ?? null }
    const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
    const read = new AsyncFunction('figma', 'page', `${READ_PAYLOAD}\nreturn await readPayload(page, 'screen')`)
    expect(JSON.parse(await read(figma, page))).toEqual(data)
    await expect(new AsyncFunction('figma', 'page', `${READ_PAYLOAD}\nreturn await readPayload(page, 'missing')`)(figma, page)).rejects.toThrow('No payload "missing"')
  })

  it('refuses text that is not ASCII', () => {
    expect(() => payloadPng('Admin › People')).toThrow('ASCII')
  })
})
