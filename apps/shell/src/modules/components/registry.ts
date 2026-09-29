import type { ComponentType } from 'react'
import { ButtonPreview } from './button/ButtonPreview'
import { ButtonCode } from './button/ButtonCode'
import { ButtonGuidelines } from './button/ButtonGuidelines'
import { ButtonCompare } from './button/ButtonCompare'
import { ChipPreview } from './chip/ChipPreview'
import { ChipCode } from './chip/ChipCode'
import { ChipGuidelines } from './chip/ChipGuidelines'
import { ChipCompare } from './chip/ChipCompare'
import { TabsPreview } from './tabs/TabsPreview'
import { TabsCode } from './tabs/TabsCode'
import { TabsGuidelines } from './tabs/TabsGuidelines'
import { TabsCompare } from './tabs/TabsCompare'
import { DialogPreview } from './dialog/DialogPreview'
import { DialogCode } from './dialog/DialogCode'
import { DialogGuidelines } from './dialog/DialogGuidelines'
import { DialogCompare } from './dialog/DialogCompare'

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
  Compare: ComponentType
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
    Compare: ButtonCompare,
  },
  {
    slug: 'chip',
    name: 'Chip',
    summary: 'A compact option people select, usually as a filter, or a value they can remove.',
    figma: { light: `${LIBRARY}12160-12109`, dark: `${LIBRARY}5162-28510` },
    spec: 'playground/docs/design-system/chips-switcher-tabs.md',
    Preview: ChipPreview,
    Code: ChipCode,
    Guidelines: ChipGuidelines,
    Compare: ChipCompare,
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    summary: 'Moves between sibling sections of a page, with an optional counter.',
    figma: { light: `${LIBRARY}12134-6969`, dark: `${LIBRARY}1939-18281` },
    spec: 'playground/docs/design-system/chips-switcher-tabs.md',
    Preview: TabsPreview,
    Code: TabsCode,
    Guidelines: TabsGuidelines,
    Compare: TabsCompare,
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    summary: 'Asks for a decision in front of the page: error, warning, info and success.',
    figma: { light: `${LIBRARY}12242-5728`, dark: `${LIBRARY}7789-24651` },
    spec: 'playground/docs/design-system/overlays.md',
    Preview: DialogPreview,
    Code: DialogCode,
    Guidelines: DialogGuidelines,
    Compare: DialogCompare,
  },
]

export const findComponent = (slug: string | undefined) => components.find((c) => c.slug === slug)
