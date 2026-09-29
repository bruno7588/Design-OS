import { pageHeaderFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { PageHeaderMatrix } from './PageHeaderMatrix'

// Figma = Header (dark 7902:1019, light 11921:13215), checked 2026-09-29.
const compare: Compare = {
  page: pageHeaderFigma.page,
  set: pageHeaderFigma.set,
  frames: { light: '/figma/page-header-light.png', dark: '/figma/page-header-dark.png' },
  live: (mode) => <PageHeaderMatrix mode={mode} />,
  differences: [
    { property: 'Slots', figma: 'Label, Header, Divider, Navigation (slot properties)', reference: 'metadata, title / supportingText / actions, navigation (each optional)', status: 'Matches' },
    { property: 'Gaps', figma: 'Page 16, Section 12', reference: 'Same', status: 'Matches' },
    { property: 'Title', figma: 'Page Bold 24, Section Bold 20; Text-primary', reference: 'Same, as h1 and h2', status: 'Matches' },
    { property: 'Supporting text', figma: 'Regular 16 / 14, Text-secondary, 4px under', reference: 'Same', status: 'Matches' },
    { property: 'Label', figma: 'Regular 14 / 12 in Text-tertiary; 16 / 14px icons; 8px apart', reference: 'Same', status: 'Matches' },
    { property: 'Actions', figma: 'Search M, an AI icon, Outlined and Filled buttons, 12px apart', reference: 'Same (a slot)', status: 'Matches' },
    { property: 'Navigation', figma: 'Tab items, 24px apart (20 in Section)', reference: 'MUI Tabs with the 5Mins Tab (its own spacing)', status: 'Design to update', note: 'The Tabs component spaces its tabs the same in both.' },
    { property: 'Built component', figma: '–', reference: 'PageHeader', status: 'Code to update', note: 'headers.md documents many page-local headers; this is the shared one.' },
  ],
  engineering: {
    mui: 'Box + Typography + Divider',
    usage: `<PageHeader title="Your Courses" supportingText="…" actions={<Button>Create Course</Button>} navigation={<Tabs …/>} />`,
    props: [
      { figma: 'Type=Page / Section', code: 'type: page | section' },
      { figma: 'Label slot', code: 'metadata' },
      { figma: 'Header slot', code: 'title, supportingText, actions' },
      { figma: 'Navigation slot', code: 'navigation' },
    ],
    theme: ['No theme override: styled from the tokens inside the component.'],
    files: ['packages/components/src/Navigation/PageHeader.tsx', 'packages/components/src/Navigation/navigation.figma.ts (Figma mapping)'],
  },
}

export function PageHeaderCompare() {
  return <CompareTemplate c={compare} />
}
