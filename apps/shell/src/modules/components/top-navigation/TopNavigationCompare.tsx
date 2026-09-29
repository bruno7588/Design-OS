import { topNavFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { TopNavigationMatrix } from './TopNavigationMatrix'

// Figma = Top Nav/Admin (dark 5385:20137, light 11982:3602), checked 2026-09-29.
const compare: Compare = {
  page: topNavFigma.page,
  set: topNavFigma.set,
  frames: { light: '/figma/top-navigation-light.png', dark: '/figma/top-navigation-dark.png' },
  live: (mode) => <TopNavigationMatrix mode={mode} />,
  differences: [
    { property: 'Bar', figma: '70px (72 small), Page-background, 1px Border underneath, padding 8/32 (8/16 small)', reference: 'Same', status: 'Matches' },
    { property: 'Logo', figma: 'Logo/Logo=Default, 102 × 22: Primary-500, Text-primary, Secondary-500', reference: 'Same (Logo component)', status: 'Matches' },
    { property: 'Exit Admin', figma: 'Outlined-2, 37px (padding 8/16, text 14)', reference: 'Outlined-2 Small (33px)', status: 'Design to update', note: '37px isn’t one of the Button sizes (33, 41, 48).' },
    { property: 'Theme and log out', figma: 'Moon Linear 21 and Logout Bold 21', reference: '20px icons in 32px round buttons', status: 'Design to update', note: '21px isn’t the icon scale.' },
    { property: 'Web app: Get App', figma: 'An old Text button with the icon after the label, in Text-secondary', reference: 'The Library Text button with a leading icon (Primary)', status: 'Design to update' },
    { property: 'Web app: Create', figma: 'Outlined-2 with Add, 37px', reference: 'Outlined-2 Small with Add', status: 'Design to update' },
    { property: 'Web app: Streak', figma: 'flash-circle Bold 24 with a raw #FFA538 flash', reference: 'FlashCircle Bold in Text-primary', status: 'Design to update', note: 'Bind the flash colour to a variable (Warning-500?).' },
    { property: 'Web app: Events dot', figma: '8px Text-error dot', reference: 'Same; the button name says "new"', status: 'Matches' },
    { property: 'Small: log out', figma: 'An old 34px outlined icon button (radius 4, Mode=Dark)', reference: 'The same 32px round icon button as large', status: 'Design to update' },
    { property: 'Web app: layout', figma: 'The content column is 1536 wide, centred', reference: 'Fills its container', status: 'Code to update', note: 'The page sets the width.' },
  ],
  engineering: {
    mui: 'Box (header) + Button + IconButton + Tooltip',
    usage: `<TopNav system="admin" darkMode={dark} onToggleTheme={toggle} onExitAdmin={goToApp} onLogout={logOut} />`,
    props: [
      { figma: 'System', code: 'system: web | admin' },
      { figma: 'Breakpoint=small', code: 'small' },
      { figma: 'Expand/collapse slot', code: 'leading' },
    ],
    theme: ['No theme override: styled from the tokens inside the component.'],
    files: ['packages/components/src/Navigation/TopNav.tsx', 'packages/components/src/Navigation/Logo.tsx'],
  },
}

export function TopNavigationCompare() {
  return <CompareTemplate c={compare} />
}
