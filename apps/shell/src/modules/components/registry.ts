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
import { BadgePreview } from './badge/BadgePreview'
import { BadgeCode } from './badge/BadgeCode'
import { BadgeGuidelines } from './badge/BadgeGuidelines'
import { BadgeCompare } from './badge/BadgeCompare'
import { TooltipPreview } from './tooltip/TooltipPreview'
import { TooltipCode } from './tooltip/TooltipCode'
import { TooltipGuidelines } from './tooltip/TooltipGuidelines'
import { TooltipCompare } from './tooltip/TooltipCompare'
import { ToastPreview } from './toast/ToastPreview'
import { ToastCode } from './toast/ToastCode'
import { ToastGuidelines } from './toast/ToastGuidelines'
import { ToastCompare } from './toast/ToastCompare'
import { InputPreview } from './input/InputPreview'
import { InputCode } from './input/InputCode'
import { InputGuidelines } from './input/InputGuidelines'
import { InputCompare } from './input/InputCompare'
import { SearchPreview } from './search/SearchPreview'
import { SearchCode } from './search/SearchCode'
import { SearchGuidelines } from './search/SearchGuidelines'
import { SearchCompare } from './search/SearchCompare'
import { DropdownPreview } from './dropdown/DropdownPreview'
import { DropdownCode } from './dropdown/DropdownCode'
import { DropdownGuidelines } from './dropdown/DropdownGuidelines'
import { DropdownCompare } from './dropdown/DropdownCompare'
import { CheckboxPreview } from './checkbox/CheckboxPreview'
import { CheckboxCode } from './checkbox/CheckboxCode'
import { CheckboxGuidelines } from './checkbox/CheckboxGuidelines'
import { CheckboxCompare } from './checkbox/CheckboxCompare'
import { RadioPreview } from './radio/RadioPreview'
import { RadioCode } from './radio/RadioCode'
import { RadioGuidelines } from './radio/RadioGuidelines'
import { RadioCompare } from './radio/RadioCompare'
import { TogglePreview } from './toggle/TogglePreview'
import { ToggleCode } from './toggle/ToggleCode'
import { ToggleGuidelines } from './toggle/ToggleGuidelines'
import { ToggleCompare } from './toggle/ToggleCompare'
import { AlertPreview } from './alert/AlertPreview'
import { AlertCode } from './alert/AlertCode'
import { AlertGuidelines } from './alert/AlertGuidelines'
import { AlertCompare } from './alert/AlertCompare'
import { ModalPreviewTab } from './modal/ModalPreview'
import { ModalCode } from './modal/ModalCode'
import { ModalGuidelines } from './modal/ModalGuidelines'
import { ModalCompare } from './modal/ModalCompare'
import { DrawerPreview } from './drawer/DrawerPreview'
import { DrawerCode } from './drawer/DrawerCode'
import { DrawerGuidelines } from './drawer/DrawerGuidelines'
import { DrawerCompare } from './drawer/DrawerCompare'

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
  {
    slug: 'badge',
    name: 'Badge',
    summary: 'Labels the status of something: success, warning, error, in progress, informative and new.',
    figma: { light: `${LIBRARY}12186-1609`, dark: `${LIBRARY}5799-479` },
    spec: 'playground/docs/design-system/badges.md',
    Preview: BadgePreview,
    Code: BadgeCode,
    Guidelines: BadgeGuidelines,
    Compare: BadgeCompare,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    summary: 'A short explanation on hover or focus, above, below or beside its trigger.',
    figma: { light: `${LIBRARY}11927-8087`, dark: `${LIBRARY}2683-29027` },
    spec: 'playground/docs/design-system/alerts-toast.md',
    Preview: TooltipPreview,
    Code: TooltipCode,
    Guidelines: TooltipGuidelines,
    Compare: TooltipCompare,
  },
  {
    slug: 'toast',
    name: 'Toast',
    summary: 'Confirms what happened, briefly, at the bottom of the window: information, success, warning and error.',
    figma: { light: `${LIBRARY}5045-14119`, dark: `${LIBRARY}5045-14119` },
    spec: 'playground/docs/design-system/alerts-toast.md',
    Preview: ToastPreview,
    Code: ToastCode,
    Guidelines: ToastGuidelines,
    Compare: ToastCompare,
  },
  {
    slug: 'input',
    name: 'Input field',
    summary: 'Short free text with a label, helper text and validation.',
    figma: { light: `${LIBRARY}12114-20561`, dark: `${LIBRARY}8974-24610` },
    spec: 'playground/docs/design-system/input.md',
    Preview: InputPreview,
    Code: InputCode,
    Guidelines: InputGuidelines,
    Compare: InputCompare,
  },
  {
    slug: 'search',
    name: 'Search',
    summary: 'Filters a list or finds content as people type, in M and L.',
    figma: { light: `${LIBRARY}11927-6338`, dark: `${LIBRARY}697-33529` },
    spec: 'playground/docs/design-system/search.md',
    Preview: SearchPreview,
    Code: SearchCode,
    Guidelines: SearchGuidelines,
    Compare: SearchCompare,
  },
  {
    slug: 'dropdown',
    name: 'Dropdown',
    summary: 'Picks one option from a list that opens under the field.',
    figma: { light: `${LIBRARY}12113-14844`, dark: `${LIBRARY}8925-1408` },
    spec: 'playground/docs/design-system/dropdown.md',
    Preview: DropdownPreview,
    Code: DropdownCode,
    Guidelines: DropdownGuidelines,
    Compare: DropdownCompare,
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    summary: 'Picks any number of options, or accepts a statement. Checked, not checked and indeterminate.',
    figma: { light: `${LIBRARY}11917-3924`, dark: `${LIBRARY}6339-10484` },
    spec: 'playground/docs/design-system/selection-controls.md',
    Preview: CheckboxPreview,
    Code: CheckboxCode,
    Guidelines: CheckboxGuidelines,
    Compare: CheckboxCompare,
  },
  {
    slug: 'radio',
    name: 'Radio',
    summary: 'Picks exactly one option from a short list, with every option in view.',
    figma: { light: `${LIBRARY}11917-3950`, dark: `${LIBRARY}5001-18926` },
    spec: 'playground/docs/design-system/selection-controls.md',
    Preview: RadioPreview,
    Code: RadioCode,
    Guidelines: RadioGuidelines,
    Compare: RadioCompare,
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    summary: 'Turns a setting on or off, straight away.',
    figma: { light: `${LIBRARY}11917-3970`, dark: `${LIBRARY}8160-364` },
    spec: 'playground/docs/design-system/selection-controls.md',
    Preview: TogglePreview,
    Code: ToggleCode,
    Guidelines: ToggleGuidelines,
    Compare: ToggleCompare,
  },
  {
    slug: 'alert',
    name: 'Alert',
    summary: 'A message in the page: a Callout guides, an Alert warns.',
    figma: { light: `${LIBRARY}12060-2785`, dark: `${LIBRARY}3658-32304` },
    spec: 'playground/docs/design-system/alerts-toast.md',
    Preview: AlertPreview,
    Code: AlertCode,
    Guidelines: AlertGuidelines,
    Compare: AlertCompare,
  },
  {
    slug: 'modal',
    name: 'Modal',
    summary: 'A focused task in front of the page, with one main action.',
    figma: { light: `${LIBRARY}7479-4350`, dark: `${LIBRARY}7479-4350` },
    spec: 'playground/docs/design-system/overlays.md',
    Preview: ModalPreviewTab,
    Code: ModalCode,
    Guidelines: ModalGuidelines,
    Compare: ModalCompare,
  },
  {
    slug: 'side-drawer',
    name: 'Side drawer',
    summary: 'A panel from the right for longer tasks, with its buttons always in view.',
    figma: { light: `${LIBRARY}10871-12768`, dark: `${LIBRARY}10871-12768` },
    spec: 'playground/docs/design-system/overlays.md',
    Preview: DrawerPreview,
    Code: DrawerCode,
    Guidelines: DrawerGuidelines,
    Compare: DrawerCompare,
  },
]

export const findComponent = (slug: string | undefined) => components.find((c) => c.slug === slug)
