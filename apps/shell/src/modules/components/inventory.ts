import data from '@design-os/components/inventory/inventory.json'

// The inventory written by `pnpm inventory` (see skills/component-inventory).
export type Variants = Record<string, string[]>

export interface InventoryRow {
  name: string
  page: string
  pageId: string | null
  type: 'set' | 'component'
  nodes: string[]
  copiesDiffer: boolean
  /** How the light version exists in Figma: a second copy, or an instance set to the Light modes. */
  lightVersion: 'copy' | 'instance' | 'none' | 'light only' | 'unknown'
  /** The light and dark copies have different names (for example a different case). */
  namesDiffer: boolean
  variants: Variants
  slots: string[]
  inFigma: boolean
  inCode: boolean
  code: { component: string; mui: string; path: string } | null
  prototype: string | null
  missingInCode: Variants | null
  missingInFigma: Variants | null
}

export interface Inventory {
  fileKey: string
  figmaFetchedAt: string
  summary: { inFigma: number; inCode: number; both: number; figmaOnly: number; codeOnly: number; noLightVersion: number }
  rows: InventoryRow[]
}

export const inventory = data as Inventory

export const findInventoryRow = (page: string, set: string) =>
  inventory.rows.find((r) => r.page === page && r.name === set)

export const figmaNodeUrl = (nodeId: string) =>
  `https://www.figma.com/design/${inventory.fileKey}/Library?node-id=${nodeId.replace(':', '-')}`
