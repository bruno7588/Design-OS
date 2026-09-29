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
import { InputIntegerPreview } from './input-integer/InputIntegerPreview'
import { InputIntegerCode } from './input-integer/InputIntegerCode'
import { InputIntegerGuidelines } from './input-integer/InputIntegerGuidelines'
import { InputIntegerCompare } from './input-integer/InputIntegerCompare'
import { InputRadioPreview } from './input-radio/InputRadioPreview'
import { InputRadioCode } from './input-radio/InputRadioCode'
import { InputRadioGuidelines } from './input-radio/InputRadioGuidelines'
import { InputRadioCompare } from './input-radio/InputRadioCompare'
import { InputInlinePreview } from './input-inline/InputInlinePreview'
import { InputInlineCode } from './input-inline/InputInlineCode'
import { InputInlineGuidelines } from './input-inline/InputInlineGuidelines'
import { InputInlineCompare } from './input-inline/InputInlineCompare'
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
import { AvatarPreview } from './avatar/AvatarPreview'
import { AvatarCode } from './avatar/AvatarCode'
import { AvatarGuidelines } from './avatar/AvatarGuidelines'
import { AvatarCompare } from './avatar/AvatarCompare'
import { AvatarGroupPreview } from './avatar-group/AvatarGroupPreview'
import { AvatarGroupCode } from './avatar-group/AvatarGroupCode'
import { AvatarGroupGuidelines } from './avatar-group/AvatarGroupGuidelines'
import { AvatarGroupCompare } from './avatar-group/AvatarGroupCompare'
import { BreadcrumbPreview } from './breadcrumb/BreadcrumbPreview'
import { BreadcrumbCode } from './breadcrumb/BreadcrumbCode'
import { BreadcrumbGuidelines } from './breadcrumb/BreadcrumbGuidelines'
import { BreadcrumbCompare } from './breadcrumb/BreadcrumbCompare'
import { ContentSwitcherPreview } from './content-switcher/ContentSwitcherPreview'
import { ContentSwitcherCode } from './content-switcher/ContentSwitcherCode'
import { ContentSwitcherGuidelines } from './content-switcher/ContentSwitcherGuidelines'
import { ContentSwitcherCompare } from './content-switcher/ContentSwitcherCompare'
import { TablePreview } from './table/TablePreview'
import { TableCode } from './table/TableCode'
import { TableGuidelines } from './table/TableGuidelines'
import { TableCompare } from './table/TableCompare'
import { ProgressBarPreview } from './progress-bar/ProgressBarPreview'
import { ProgressBarCode } from './progress-bar/ProgressBarCode'
import { ProgressBarGuidelines } from './progress-bar/ProgressBarGuidelines'
import { ProgressBarCompare } from './progress-bar/ProgressBarCompare'
import { EmptyStatePreview } from './empty-state/EmptyStatePreview'
import { EmptyStateCode } from './empty-state/EmptyStateCode'
import { EmptyStateGuidelines } from './empty-state/EmptyStateGuidelines'
import { EmptyStateCompare } from './empty-state/EmptyStateCompare'

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
    slug: 'input-integer',
    name: 'Integer input',
    summary: 'A small whole number people step with − and + or type.',
    figma: { light: `${LIBRARY}12114-20914`, dark: `${LIBRARY}10145-10895` },
    spec: 'playground/docs/design-system/input.md',
    Preview: InputIntegerPreview,
    Code: InputIntegerCode,
    Guidelines: InputIntegerGuidelines,
    Compare: InputIntegerCompare,
  },
  {
    slug: 'input-radio',
    name: 'Radio button input',
    summary: 'An option people type and pick, such as a quiz answer.',
    figma: { light: `${LIBRARY}12114-20857`, dark: `${LIBRARY}8974-30479` },
    spec: 'playground/docs/design-system/input.md',
    Preview: InputRadioPreview,
    Code: InputRadioCode,
    Guidelines: InputRadioGuidelines,
    Compare: InputRadioCompare,
  },
  {
    slug: 'input-inline',
    name: 'Inline input',
    summary: 'A title and description edited in place, as in the course builder.',
    figma: { light: `${LIBRARY}12114-20828`, dark: `${LIBRARY}10330-4736` },
    spec: 'playground/docs/design-system/input.md',
    Preview: InputInlinePreview,
    Code: InputInlineCode,
    Guidelines: InputInlineGuidelines,
    Compare: InputInlineCompare,
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
    figma: { light: `${LIBRARY}11919-4717`, dark: `${LIBRARY}7479-4350` },
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
    figma: { light: `${LIBRARY}11919-4738`, dark: `${LIBRARY}10871-12768` },
    spec: 'playground/docs/design-system/overlays.md',
    Preview: DrawerPreview,
    Code: DrawerCode,
    Guidelines: DrawerGuidelines,
    Compare: DrawerCompare,
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    summary: 'A person’s photo, or a friendly face when there is none. From 24 to 72px.',
    figma: { light: `${LIBRARY}11914-2605`, dark: `${LIBRARY}5097-5884` },
    spec: 'playground/docs/design-system/avatars.md',
    Preview: AvatarPreview,
    Code: AvatarCode,
    Guidelines: AvatarGuidelines,
    Compare: AvatarCompare,
  },
  {
    slug: 'avatar-group',
    name: 'Avatar group',
    summary: 'A few overlapping avatars and a count of the rest.',
    figma: { light: `${LIBRARY}11915-3296`, dark: `${LIBRARY}5097-5584` },
    spec: 'playground/docs/design-system/avatars.md',
    Preview: AvatarGroupPreview,
    Code: AvatarGroupCode,
    Guidelines: AvatarGroupGuidelines,
    Compare: AvatarGroupCompare,
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    summary: 'Where a page sits in the hierarchy, and the way back up.',
    figma: { light: `${LIBRARY}11935-2383`, dark: `${LIBRARY}8497-1494` },
    spec: 'playground/docs/design-system/navigation.md',
    Preview: BreadcrumbPreview,
    Code: BreadcrumbCode,
    Guidelines: BreadcrumbGuidelines,
    Compare: BreadcrumbCompare,
  },
  {
    slug: 'content-switcher',
    name: 'Content switcher',
    summary: 'Switches between views of the same content, such as grid and list.',
    figma: { light: `${LIBRARY}11908-5278`, dark: `${LIBRARY}8497-24186` },
    spec: 'playground/docs/design-system/chips-switcher-tabs.md',
    Preview: ContentSwitcherPreview,
    Code: ContentSwitcherCode,
    Guidelines: ContentSwitcherGuidelines,
    Compare: ContentSwitcherCompare,
  },
  {
    slug: 'table',
    name: 'Table',
    summary: 'Rows of records to compare, sort and select, each row its own card under a header bar.',
    figma: { light: `${LIBRARY}11927-7332`, dark: `${LIBRARY}7896-2624` },
    spec: 'playground/docs/design-system/table.md',
    Preview: TablePreview,
    Code: TableCode,
    Guidelines: TableGuidelines,
    Compare: TableCompare,
  },
  {
    slug: 'progress-bar',
    name: 'Progress bar',
    summary: 'How much of a course, program or path is done.',
    figma: { light: `${LIBRARY}12000-10067`, dark: `${LIBRARY}7046-25097` },
    spec: 'playground/docs/design-system/gamification.md',
    Preview: ProgressBarPreview,
    Code: ProgressBarCode,
    Guidelines: ProgressBarGuidelines,
    Compare: ProgressBarCompare,
  },
  {
    slug: 'empty-state',
    name: 'Empty state',
    summary: 'Fills an empty list, table or search, and points to the action that fills it.',
    figma: { light: `${LIBRARY}11921-5779`, dark: `${LIBRARY}5452-37234` },
    spec: 'playground/docs/design-system/empty-state.md',
    Preview: EmptyStatePreview,
    Code: EmptyStateCode,
    Guidelines: EmptyStateGuidelines,
    Compare: EmptyStateCompare,
  },
]

export const findComponent = (slug: string | undefined) => components.find((c) => c.slug === slug)
