import { tabsFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { TabsMatrix } from './TabsMatrix'

// Figma = the Tab items set (dark 1939:18281, light 12134:6969) and Tabs (8497:24855), checked 2026-09-29.
const compare: Compare = {
  page: tabsFigma.page,
  set: tabsFigma.set,
  frames: { light: '/figma/tabs-light.png', dark: '/figma/tabs-dark.png' },
  live: (mode) => <TabsMatrix mode={mode} />,
  differences: [
    { property: 'Type', figma: 'Paragraph M medium 14/500; Selected H5 Bold', reference: 'Same', status: 'Matches' },
    { property: 'Indicator', figma: '2px, 4px under the label row, as wide as the row, Selected colour', reference: 'Same', status: 'Matches' },
    { property: 'Bar', figma: '27px tall, 16px between tabs', reference: 'Same', status: 'Matches', note: 'Prototype pages use 16, 20 or 24px between tabs.' },
    { property: 'Counter', figma: '20px pill, padding 0/6, Input-background, 14/500; Text-tertiary, Text-secondary on hover and selected', reference: 'Same', status: 'Matches', note: 'Prototype pages have three different counter styles.' },
    {
      property: 'Indicator colour, light',
      figma: 'Selected (Secondary-600 #EDA30D)',
      reference: 'Same',
      status: 'Matches',
      note: 'About 12 prototype pages use Secondary-500 in light mode. The prototype should use this reference.',
    },
    {
      property: 'Width when selected',
      figma: 'The tab widens when its label turns Bold',
      reference: 'Width reserved for the Bold label, so tabs do not shift',
      status: 'Design to update',
      note: 'Small difference: Figma tabs are a few pixels narrower when not selected.',
    },
    { property: 'Focus', figma: 'No focus frames', reference: '2px ring, 2px offset; arrow keys move between tabs', status: 'Design to update', note: 'Most prototype tabs have no focus style or arrow keys.' },
    { property: 'Disabled', figma: 'Not in the set', reference: 'Text-disabled', status: 'Design to update', note: 'From the prototype lesson editor.' },
  ],
  engineering: {
    mui: 'Tabs and Tab',
    usage: `import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

// With the 5Mins theme, plain MUI renders the reference.
<Tabs value={section} onChange={(_, v) => setSection(v)} aria-label="Course sections">
  <Tab value="overview" label="Overview" />
  <Tab value="learners" label="Learners" />
</Tabs>`,
    props: [
      { figma: 'Selected', code: 'Tabs value equal to the Tab value' },
      { figma: 'State: Hover', code: ':hover, from the theme' },
      { figma: 'counter', code: 'count on the Design OS Tab (a .ds-tab-counter span in the label)' },
    ],
    theme: [
      'MuiTabs: no min height, 16px gap on the flex container, a 2px indicator in the Selected token.',
      'MuiTab: no min width or height, padding 0 0 6px (4px gap and the indicator), 14/500, no text transform, no ripple.',
      'Tabs defaultProps textColor="inherit", so the colours come from the tokens, not the palette.',
    ],
    files: [
      'packages/components/src/Tabs/tabs.overrides.ts (theme overrides)',
      'packages/components/src/Tabs/Tab.tsx (counter wrapper)',
      'packages/components/src/Tabs/tabs.figma.ts (Figma mapping)',
    ],
  },
}

export function TabsCompare() {
  return <CompareTemplate c={compare} />
}
