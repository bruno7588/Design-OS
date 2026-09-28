import type { ComponentType } from 'react'
import { ButtonPreview } from './button/ButtonPreview'
import { ButtonCode } from './button/ButtonCode'
import { ButtonGuidelines } from './button/ButtonGuidelines'

// One entry per component. Adding Chip later means one entry and one folder.
export interface ComponentDoc {
  slug: string
  name: string
  summary: string
  /** Figma Library frames, per mode. */
  figma: { light: string; dark: string }
  /** The prototype spec this reference implements. */
  spec: string
  Preview: ComponentType
  Code: ComponentType
  Guidelines: ComponentType
}

const LIBRARY = 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id='

export const components: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    summary: 'Starts an action. Filled, outlined, text and link, in primary, danger, warning, success and AI.',
    figma: { light: `${LIBRARY}12141-7567`, dark: `${LIBRARY}10825-3269` },
    spec: 'playground/docs/design-system/buttons.md',
    Preview: ButtonPreview,
    Code: ButtonCode,
    Guidelines: ButtonGuidelines,
  },
]

export const findComponent = (slug: string | undefined) => components.find((c) => c.slug === slug)
