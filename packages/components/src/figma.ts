// How a reference component maps to its Figma Library component set.
// One `<name>.figma.ts` per component folder. Read by the shell and by
// `pnpm inventory`, so it must stay free of runtime imports (types only).

export interface FigmaMapping {
  /** Component name in code, as exported from @design-os/components. */
  component: string
  /** The MUI component it's built on. */
  mui: string
  /** Figma page and component set name, as in the Library. */
  page: string
  set: string
  /** Node IDs of the set on each mode's board. */
  nodes: { light: string; dark: string }
  /** Figma variant properties and the values this reference covers. */
  variants: Record<string, readonly string[]>
}
