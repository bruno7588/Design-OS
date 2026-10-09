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

/**
 * How a code component becomes a Figma instance (Phase 4e, code-to-figma). Read by
 * scripts/figma-map.mts into packages/components/figma-map.json.
 *
 *   leaf       the captured component is placed as one Library instance, with these variants
 *              and its text copied in; nothing inside it is captured separately
 *   container  rebuilt as frames with its children inside (its Figma version has slots, or its
 *              content varies too much for one instance)
 */
export interface FigmaCodeMap {
  kind: 'leaf' | 'container'
  /** The React component name to look for when it isn't `component` (such as ToastBody, MenuItem). */
  match?: string
  /** Figma variant values that never change, such as State: 'Enabled'. */
  fixed?: Record<string, string>
  /**
   * Code prop → Figma variant property. `values` maps the code value (as a string; booleans as
   * 'true'/'false', missing as 'undefined', React nodes as 'node') to the Figma value; '*' is any
   * other value. A key such as 'variant|color' joins several props, and its patterns join their
   * values the same way ('contained|error'), with '*' matching any part. The first match wins.
   */
  props?: Record<string, { figma: string; values: Record<string, string> }>
  /** CSS selector, inside the component's DOM, for the element the instance stands for (such as the dialog paper). */
  domRoot?: string
}

/** A mapping with its machine-readable map. */
export type MappedFigma = FigmaMapping & { map?: FigmaCodeMap }
