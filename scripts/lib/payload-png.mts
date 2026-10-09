// Payload PNGs (Phase 4e): a use_figma call takes at most 50,000 characters, so the runtime and
// each screen's data travel into Figma as 1×1 PNGs carrying the text in a tEXt chunk, uploaded
// with the Figma connector's upload_assets and read back in the plugin with getBytesAsync().
// tEXt is Latin-1, so the text is kept ASCII: anything else is written as \uXXXX.

import { crc32, deflateSync } from 'node:zlib'

const KEYWORD = 'design-os'

/** JSON.stringify, with every non-ASCII character escaped so it survives Latin-1. */
export const asciiJson = (value: unknown) => JSON.stringify(value).replace(/[\u0080-￿]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`)

function chunk(type: string, data: Buffer) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body) >>> 0)
  return Buffer.concat([length, body, crc])
}

export function payloadPng(text: string): Buffer {
  if (/[^\x00-\x7f]/.test(text)) throw new Error('Payload text must be ASCII (use asciiJson).')
  const header = Buffer.alloc(13)
  header.writeUInt32BE(1, 0)
  header.writeUInt32BE(1, 4)
  header[8] = 8 // bit depth
  header[9] = 6 // RGBA
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('tEXt', Buffer.concat([Buffer.from(`${KEYWORD}\0`, 'latin1'), Buffer.from(text, 'latin1')])),
    chunk('IDAT', deflateSync(Buffer.from([0, 0, 0, 0, 0]))),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/**
 * Plain JavaScript for use_figma: reads the payload on the node named "__payload:<name>" on the
 * page. Kept tiny, since it travels in every loader script.
 */
export const READ_PAYLOAD = `async function readPayload(page, name) {
  const node = page.findOne((n) => n.name === '__payload:' + name)
  if (!node) throw new Error('No payload "' + name + '" on this page: upload the payload PNGs first.')
  const fill = node.fills.find((f) => f.type === 'IMAGE')
  const b = await figma.getImageByHash(fill.imageHash).getBytesAsync()
  for (let i = 8; i < b.length; ) {
    const len = ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0
    if (String.fromCharCode(b[i + 4], b[i + 5], b[i + 6], b[i + 7]) === 'tEXt') {
      const parts = []
      for (let j = i + 8; j < i + 8 + len; j += 8192) parts.push(String.fromCharCode.apply(null, b.subarray(j, Math.min(j + 8192, i + 8 + len))))
      const s = parts.join('')
      return s.slice(s.indexOf('\\0') + 1)
    }
    i += 12 + len
  }
  throw new Error('Payload "' + name + '" has no text.')
}`
