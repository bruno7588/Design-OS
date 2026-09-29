import { Box } from '@mui/material'
import { TopNav } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Wide = ({ children }: { children: React.ReactNode }) => <Box sx={{ width: 640, maxWidth: '100%' }}>{children}</Box>

// Content from playground/docs/design-system/navigation.md, the Figma Top Nav/Admin set and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'The top navigation sits across the top of every page: the logo on the left and a few global actions on the right.',
  whenToUse: ['On every page of the web app and of Admin, above the side navigation.'],
  whenNotToUse: ['For page actions, such as Create Course. Put them in the page header.', 'On mobile in the learner app. Use the app’s top bar.'],
  anatomy: {
    example: <Wide><TopNav system="admin" /></Wide>,
    parts: [
      { name: 'Bar', description: '70px (72 small), Page-background, a 1px Border underneath, padding 8px by 32px (16 small).' },
      { name: 'Menu button (Admin)', description: 'sidebar-left, 20px, before the logo: expands and collapses the side navigation.' },
      { name: 'Logo', description: '5Mins.ai, 102 × 22, 16px after the menu button.' },
      { name: 'Actions', description: 'Admin: Exit Admin (Outlined-2), the theme button and Log out, 16px apart. Web app: Get App, Create, Streak and Events, 24px apart.' },
      { name: 'Icon buttons', description: '32px round, 20 to 24px icons in Text-primary, Page-background-hover on hover.' },
    ],
  },
  variants: [
    { name: 'Web app', description: 'For learners: Get App, Create, and the Streak and Events icons. A dot on Events says there is something new.', example: <Wide><TopNav system="web" eventsUnread /></Wide> },
    { name: 'Admin, small', description: 'Under 600px: the menu button opens the side navigation.', example: <Box sx={{ width: 375 }}><TopNav system="admin" small /></Box> },
  ],
  states: [{ name: 'Buttons', description: 'Their own states: see Button. Icon buttons fill Page-background-hover on hover and show the focus ring.' }],
  dos: [
    {
      do: { example: <Wide><TopNav system="admin" /></Wide>, text: 'Keep it to global actions that apply everywhere.' },
      dont: { example: <Wide><TopNav system="web" /></Wide>, text: 'Add page actions here; they belong in the page header.' },
    },
  ],
  content: ['Button labels in Title Case: "Exit Admin", "Get App".', 'Icon buttons need a name: "Log out", "Switch to dark mode".'],
  accessibility: [
    'The bar is the banner landmark (header).',
    'Every icon button has an accessible name and a tooltip. The menu button has aria-expanded.',
    'The theme button says what it switches to, and Events says when there is something new.',
  ],
  figma: [
    { label: 'Top Nav/Admin, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12328-8954' },
    { label: 'Top Nav/Admin, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5385-20137' },
  ],
  spec: 'playground/docs/design-system/navigation.md',
}

export function TopNavigationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
