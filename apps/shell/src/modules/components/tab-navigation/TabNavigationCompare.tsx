import { tabNavFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { TabNavigationMatrix } from './TabNavigationMatrix'

// Figma = Tab nav (dark 1324:35285, light 9897:18192), checked 2026-09-29.
const compare: Compare = {
  page: tabNavFigma.page,
  set: tabNavFigma.set,
  frames: { light: '/figma/tab-navigation-light.png', dark: '/figma/tab-navigation-dark.png' },
  live: (mode) => <TabNavigationMatrix mode={mode} />,
  differences: [
    { property: 'Bar', figma: '375 × 66, Page-background, 1px Border on top (inside), padding 8/16', reference: 'Same', status: 'Matches' },
    { property: 'Tab', figma: 'Fills its share (69px), padding 4, gap 4, 50px tall', reference: 'Same', status: 'Matches' },
    { property: 'Icons', figma: 'Home, search, award and user-square Bold 24; Feed is a custom glyph', reference: 'Iconsax Home, SearchNormal1, Award, UserSquare Bold; FeedIcon copied from Figma', status: 'Matches' },
    { property: 'Label', figma: 'Regular 10/1.4, Text-secondary', reference: 'Same', status: 'Matches', note: 'Below the type scale; navigation.md calls it out.' },
    { property: 'Selected', figma: 'Icon and label in Selected, nothing else', reference: 'Same (MUI Mui-selected); MUI’s label growth on select is turned off', status: 'Matches' },
    { property: 'Focus', figma: '–', reference: '2px Primary ring inside the tab', status: 'Design to update', note: 'Figma has no focus state; the ring follows the other components.' },
    { property: 'Built component', figma: '–', reference: 'TabNav', status: 'Code to update', note: 'The prototype’s mobile/TabNav is hand-built with buttons; it matches visually and already sets aria-current.' },
  ],
  engineering: {
    mui: 'BottomNavigation + BottomNavigationAction (theme overrides)',
    usage: `<TabNav value={page} onChange={(p) => navigate(\`/\${p}\`)} />`,
    props: [
      { figma: 'Page=Enabled', code: 'value={null}' },
      { figma: 'Page=Home … Profile', code: 'value: home | search | progress | feed | profile' },
    ],
    theme: ['MuiBottomNavigation: the bar.', 'MuiBottomNavigationAction: tab, 10px label, Selected colour, no ripple.'],
    files: [
      'packages/components/src/Navigation/tabNav.overrides.ts',
      'packages/components/src/Navigation/TabNav.tsx',
      'packages/components/src/icons/FigmaIcons.tsx (FeedIcon)',
    ],
  },
}

export function TabNavigationCompare() {
  return <CompareTemplate c={compare} />
}
