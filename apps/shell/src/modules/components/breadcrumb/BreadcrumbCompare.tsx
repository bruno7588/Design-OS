import { breadcrumbItemFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { BreadcrumbMatrix } from './BreadcrumbMatrix'

// Figma = the Breadcrumb item set (dark 8497:1494, light 11935:2383) and Breadcrumb (8497:2231), checked 2026-09-29.
const compare: Compare = {
  page: breadcrumbItemFigma.page,
  set: breadcrumbItemFigma.set,
  frames: { light: '/figma/breadcrumb-light.png', dark: '/figma/breadcrumb-dark.png' },
  live: (mode) => <BreadcrumbMatrix mode={mode} />,
  differences: [
    { property: 'Type', figma: 'Regular 14 at 1.5', reference: 'Same', status: 'Matches', note: 'navigation.md says the Library shows 12px: out of date.' },
    { property: 'Colours', figma: 'Link Text-tertiary; hover Text-primary, underlined; current Text-secondary; disabled Text-disabled', reference: 'Same', status: 'Matches' },
    { property: 'Chevron', figma: 'ArrowRight2 16px, 2px after the label, in the label colour', reference: 'Same (the MUI separator follows the link before it)', status: 'Matches' },
    { property: 'Spacing', figma: '4px between items', reference: 'Same', status: 'Matches' },
    { property: 'Current page gap', figma: 'The Current page item has an 8px gap setting, with nothing to space', reference: 'n/a', status: 'Design to update', note: 'Harmless, but inconsistent with the Link items (2px).' },
    { property: 'Focus', figma: 'Not in the set', reference: '2px ring in the primary button colour', status: 'Design to update' },
    { property: 'Semantics', figma: 'Not shown', reference: 'nav "Breadcrumb", ordered list, aria-current="page"', status: 'Matches', note: 'Three prototype pages still hand-roll the trail: code to update there.' },
  ],
  engineering: {
    mui: 'Breadcrumbs',
    usage: `import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

// With the 5Mins theme: chevron, spacing and states come from the theme.
<Breadcrumbs aria-label="Breadcrumb">
  <Link href="/programs">Programs</Link>
  <Typography aria-current="page">Giving feedback</Typography>
</Breadcrumbs>`,
    props: [
      { figma: 'Type=Link', code: 'a Link (href or onClick)' },
      { figma: 'Type=Current page', code: 'the last child, aria-current="page"' },
      { figma: 'Disabled=true', code: 'aria-disabled="true" on the link' },
    ],
    theme: ['MuiBreadcrumbs defaultProps.separator: ArrowRight2 16px.', 'MuiBreadcrumbs styleOverrides: links, current page, separator spacing and state.', 'No new tokens.'],
    files: ['packages/components/src/Breadcrumb/breadcrumb.overrides.tsx', 'packages/components/src/Breadcrumb/Breadcrumb.tsx', 'packages/components/src/Breadcrumb/breadcrumb.figma.ts'],
  },
}

export function BreadcrumbCompare() {
  return <CompareTemplate c={compare} />
}
