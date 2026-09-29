import { Box } from '@mui/material'
import { SideNav } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { adminHelp, adminItems, profile, webItems } from './navItems'

const Panel = ({ children }: { children: React.ReactNode }) => <Box sx={{ height: 560 }}>{children}</Box>

// Content from playground/docs/design-system/navigation.md, the Figma Navigation page and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'The side navigation is the main way around the product. The web app and Admin each have their own, with the same structure: the menu, a footer, and Powered by.',
  whenToUse: ['As the main navigation of the web app and of Admin, on every page.', 'Collapsed, when people need the width for their work, such as the course builder.'],
  whenNotToUse: ['For moving between views of one page. Use tabs.', 'For actions. Use buttons.', 'On mobile. Use the tab bar.'],
  anatomy: {
    example: (
      <Panel>
        <SideNav system="admin" items={adminItems('Teams')} help={adminHelp} />
      </Panel>
    ),
    parts: [
      { name: 'Panel', description: '240px (collapsed: 88 web, 68 Admin), Page-background. Admin has a 1px Border on the right.' },
      { name: 'Menu item', description: 'Web app: padding 16, 24px Bold icon, Regular 16. Admin: padding 12 by 16, 20px Linear icon, Regular 14. Radius 8, 8px from icon to label.' },
      { name: 'Group (Admin)', description: 'A menu item with a 14px chevron. It opens its sub-menu items: Regular 14 in Text-tertiary, 42px from the left.' },
      { name: 'Footer', description: 'Web app: the profile card (name, email, settings). Admin: 5Mins Academy and Help.' },
      { name: 'Powered by', description: 'Regular 10 (web) or 12 (Admin) in Text-tertiary, with the logo.' },
    ],
  },
  variants: [
    { name: 'Web app', description: 'For learners. Bold icons, larger items.', example: <Panel><SideNav system="web" items={webItems()} profile={profile} /></Panel> },
    { name: 'Collapsed', description: 'Icons only. Hover or focus an icon to see its label.', example: <Panel><SideNav system="admin" items={adminItems()} help={adminHelp} collapsed /></Panel> },
  ],
  states: [
    { name: 'Enabled', description: 'Text-secondary icon and label.' },
    { name: 'Hover', description: 'Input-background fill.' },
    { name: 'Selected', description: 'Text-selected, Bold label, and the Bold icon. No fill.' },
    { name: 'Group with a selected item', description: 'Bold label and icon in Text-secondary, open.' },
  ],
  dos: [
    {
      do: { example: <Panel><SideNav system="admin" items={adminItems('People')} help={adminHelp} /></Panel>, text: 'Keep one item selected: the page people are on.' },
      dont: { example: <Panel><SideNav system="admin" items={adminItems().map((i) => ({ ...i, selected: true }))} help={adminHelp} /></Panel>, text: 'Select several items.' },
    },
  ],
  content: ['Labels in Title Case, like the product’s page names: "Learning Records", "Account & Settings".', 'One or two words; the label is the page title.'],
  accessibility: [
    'The panel is a nav landmark named "Main"; the menu is a list.',
    'The current page has aria-current="page".',
    'Groups are buttons with aria-expanded; their items are a nested list.',
    'Collapsed, each icon is named by its label, and the tooltip shows it on hover and focus.',
  ],
  figma: [
    { label: 'Side navigation, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12048-2302' },
    { label: 'Side navigation, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=4697-13314' },
    { label: 'Menu/Itens/WebApp, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12048-2401' },
    { label: 'Menu/Itens/Admin, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12048-2440' },
  ],
  spec: 'playground/docs/design-system/navigation.md',
}

export function SideNavigationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
