import { Box } from '@mui/material'
import { TabNav, TAB_NAV_ITEMS } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Phone = ({ children }: { children: React.ReactNode }) => <Box sx={{ width: 375, maxWidth: '100%' }}>{children}</Box>

// Content from playground/docs/design-system/navigation.md (Mobile App Navigation) and the Figma Tab nav set.
const g: Guidelines = {
  overview: 'The tab bar sits at the bottom of the learner app and moves between its five main pages.',
  whenToUse: ['On the top-level pages of the mobile app: Home, Search, Progress, Feed and Profile.'],
  whenNotToUse: ['On detail pages, lessons and flows with a back button. Hide the bar there.', 'On the web app or in Admin. Use the side navigation.'],
  anatomy: {
    example: <Phone><TabNav value="home" /></Phone>,
    parts: [
      { name: 'Bar', description: '375 × 66: Page-background, a 1px Border on top, padding 8px by 16px.' },
      { name: 'Tab', description: 'An equal share of the width; 4px padding, the icon and label 4px apart.' },
      { name: 'Icon', description: '24px Iconsax Bold (Feed is a custom glyph), in Text-secondary.' },
      { name: 'Label', description: 'Regular 10/1.4, Text-secondary. The one place type goes below 12px.' },
    ],
  },
  variants: [
    { name: 'Nothing selected', description: 'Page=Enabled: for a page outside the five tabs.', example: <Phone><TabNav value={null} /></Phone> },
  ],
  states: [
    { name: 'Selected', description: 'The icon and label turn Selected. The icon stays Bold and nothing else changes.' },
    { name: 'Focus', description: 'A 2px Primary ring for keyboards and switch control. There are no hover or pressed states.' },
  ],
  dos: [
    {
      do: { example: <Phone><TabNav value="feed" /></Phone>, text: 'Keep the five tabs, in this order, on every top-level page.' },
      dont: { example: <Phone><TabNav value="home" items={TAB_NAV_ITEMS.slice(0, 3)} /></Phone>, text: 'Drop or reorder tabs per page; people learn where each one sits.' },
    },
  ],
  content: ['One word per label, sentence case: "Home", "Progress".'],
  accessibility: [
    'The bar is a nav landmark named "Main".',
    'Each tab is a button with its label as its name; the current one has aria-current="page".',
    'The 10px label is small: keep it to one short word and don’t lower the contrast.',
  ],
  figma: [
    { label: 'Tab nav, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9897-18192' },
    { label: 'Tab nav, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=1324-35285' },
  ],
  spec: 'playground/docs/design-system/navigation.md',
}

export function TabNavigationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
