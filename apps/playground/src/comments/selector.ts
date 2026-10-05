import type { CommentElement } from '@design-os/demos'

// What a comment points at: a CSS selector that finds the element again, and a description an
// agent can search the code for (tag, role, name, text, React component chain).

/** Marks Design OS's own overlay, which is never commented on and never part of a selector. */
export const OVERLAY_ATTR = 'data-design-os-comments'

const unique = (selector: string) => {
  try {
    return document.querySelectorAll(selector).length === 1
  } catch {
    return false
  }
}

// MUI and React generate ids such as :r1: and mui-123; they change between renders.
const stableId = (id: string) => id && !/^:|^mui-|^\d/.test(id)

function own(el: Element): string | null {
  const tag = el.tagName.toLowerCase()
  const testid = el.getAttribute('data-testid')
  if (testid) return `[data-testid="${CSS.escape(testid)}"]`
  if (stableId(el.id)) return `#${CSS.escape(el.id)}`
  const label = el.getAttribute('aria-label')
  if (label) return `${tag}[aria-label="${CSS.escape(label)}"]`
  return null
}

/** The shortest selector, built upwards from the element, that matches only it. */
export function uniqueSelector(el: Element): string {
  const self = own(el)
  if (self && unique(self)) return self
  const parts: string[] = []
  let node: Element | null = el
  while (node && node !== document.body && parts.length < 10) {
    const anchor = own(node)
    if (anchor && parts.length) {
      const candidate = [anchor, ...parts].join(' > ')
      if (unique(candidate)) return candidate
    }
    const tag = node.tagName.toLowerCase()
    const siblings = node.parentElement ? Array.from(node.parentElement.children).filter((c) => c.tagName === node!.tagName) : []
    parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${siblings.indexOf(node) + 1})` : tag)
    const candidate = parts.join(' > ')
    if (unique(candidate)) return candidate
    node = node.parentElement
  }
  return ['body', ...parts].join(' > ')
}

// React components from the page down to the element, read from React's dev fibre. Best effort:
// MUI and router internals are left out, and production builds may have no names.
const SKIP = /^(Mui|Styled|Emotion|Insertion|ForwardRef|Memo|Context|Provider|Consumer|Router|Routes|Route|RenderedRoute|Outlet|Suspense|Lazy|Fragment|ThemeProvider|DefaultPropsProvider|Box|Typography|ButtonBase|Ripple|TransitionGroup|Transition|Portal|FocusTrap|Popper|Grow|Fade|Collapse)/

function componentChain(el: Element): string | undefined {
  const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$'))
  if (!key) return undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fiber: any = (el as any)[key]
  const names: string[] = []
  while (fiber && names.length < 6) {
    const type = fiber.type
    const name = typeof type === 'function' ? type.displayName || type.name : typeof type === 'object' && type ? type.displayName || type.render?.displayName || type.render?.name : null
    if (name && /^[A-Z]/.test(name) && !SKIP.test(name) && names[names.length - 1] !== name) names.push(name)
    fiber = fiber.return
  }
  return names.length ? names.reverse().join(' > ') : undefined
}

export function describeElement(el: Element): CommentElement {
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim()
  const name = el.getAttribute('aria-label') ?? (el instanceof HTMLElement && /^(BUTTON|A|H[1-6]|LABEL)$/.test(el.tagName) ? text : undefined)
  return {
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role') ?? undefined,
    name: name?.slice(0, 120) || undefined,
    text: text.slice(0, 120) || undefined,
    components: componentChain(el),
  }
}
