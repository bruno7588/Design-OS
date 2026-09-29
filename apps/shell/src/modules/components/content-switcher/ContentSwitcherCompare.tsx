import { contentSwitcherItemFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ContentSwitcherMatrix } from './ContentSwitcherMatrix'

// Figma = the Content switcher item set (dark 8497:24186, light 11908:5278) and Content switcher (7128:23859), checked 2026-09-29.
const compare: Compare = {
  page: contentSwitcherItemFigma.page,
  set: contentSwitcherItemFigma.set,
  frames: { light: '/figma/content-switcher-light.png', dark: '/figma/content-switcher-dark.png' },
  live: (mode) => <ContentSwitcherMatrix mode={mode} />,
  differences: [
    { property: 'Track', figma: 'Input-background, radius 12, padding 4, gap 4', reference: 'Same', status: 'Matches' },
    { property: 'Section', figma: '33px: padding 6/12, radius 8, Regular 14 Text-secondary', reference: 'Same', status: 'Matches' },
    { property: 'Selected', figma: 'Secondary-500, Bold Neutral-800', reference: 'Same', status: 'Matches', note: 'chips-switcher-tabs.md says Medium in its table and Bold in its CSS.' },
    { property: 'Hover', figma: 'Input-background-hover', reference: 'Same', status: 'Matches' },
    { property: 'Icons', figma: 'Left 20px, right 16px, gap 4', reference: 'Same', status: 'Matches' },
    { property: 'Focus', figma: 'Not in the set', reference: '2px ring in the primary button colour', status: 'Design to update' },
    { property: 'Selected width', figma: 'Bold widens the selected section (78 against 76px)', reference: 'Same', status: 'Matches', note: 'Tabs reserve the Bold width; the switcher could too.' },
    {
      property: 'Semantics',
      figma: 'Not shown',
      reference: 'A group of toggle buttons with aria-pressed',
      status: 'Matches',
      note: 'The prototype uses tablist and tab roles, but a switcher changes the view of one panel rather than showing different panels.',
    },
  ],
  engineering: {
    mui: 'ToggleButtonGroup (exclusive)',
    usage: `import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

// With the 5Mins theme, an exclusive group is the Figma Content switcher.
<ToggleButtonGroup exclusive value={view} onChange={(_, v) => v && setView(v)} aria-label="View">
  <ToggleButton value="grid">Grid</ToggleButton>
  <ToggleButton value="list">List</ToggleButton>
</ToggleButtonGroup>`,
    props: [
      { figma: 'Selected=True', code: 'value' },
      { figma: 'State=Hover', code: ':hover' },
      { figma: 'Disabled=true', code: 'disabled on the ToggleButton' },
      { figma: 'icon left / icon right', code: 'an icon before, or after with className ds-icon-right' },
    ],
    theme: ['MuiToggleButtonGroup: the track, and no joined borders.', 'MuiToggleButton: sections, states and focus ring, whatever the size.', 'No new tokens.'],
    files: ['packages/components/src/ContentSwitcher/contentSwitcher.overrides.ts', 'packages/components/src/ContentSwitcher/ContentSwitcher.tsx', 'packages/components/src/ContentSwitcher/contentSwitcher.figma.ts'],
  },
}

export function ContentSwitcherCompare() {
  return <CompareTemplate c={compare} />
}
