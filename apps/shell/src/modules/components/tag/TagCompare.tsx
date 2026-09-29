import { tagFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { TagMatrix } from './TagMatrix'

// Figma = Tags (dark 4603:27712, light 11337:14129), checked 2026-09-29.
const compare: Compare = {
  page: tagFigma.page,
  set: tagFigma.set,
  frames: { light: '/figma/tag-light.png', dark: '/figma/tag-dark.png' },
  live: (mode) => <TagMatrix mode={mode} />,
  differences: [
    { property: 'Box', figma: 'L 40, M 28, S 24; padding 4; Border fill', reference: 'Same', status: 'Matches' },
    { property: 'Corner', figma: 'Bottom right only: 8 in M and S, 9.14 in L', reference: '8 in every size', status: 'Design to update', note: 'L’s 9.14 looks like a scaled copy; 8 is the radius token.' },
    { property: 'Icons', figma: 'vuesax Bold, Text-secondary: volume-high, play-circle, document-text, link-2, directbox-notif, note-2', reference: 'Iconsax Bold for four; link-2 and note-2 copied from Figma', status: 'Matches', note: 'Iconsax React’s Link2 is a different drawing and it has no note-2, so those two are Figma shapes in FigmaIcons.tsx.' },
    { property: 'Icon size', figma: 'L 32, M 20, S 16', reference: 'Same', status: 'Matches' },
    { property: 'Used in Figma', figma: 'No instances in the Library', reference: '–', status: 'Design to update', note: 'The Card sets draw their own media icons; they could use this tag.' },
    { property: 'Built component', figma: '–', reference: 'Tag', status: 'Code to update', note: 'The prototype has no tag component; cards draw PlayCircle and others inline.' },
  ],
  engineering: {
    mui: 'Box (MUI has no equivalent)',
    usage: `<Tag type="video" size="M" sx={{ position: 'absolute', top: 0, left: 0 }} />`,
    props: [
      { figma: 'Media Type', code: 'type: video | pdf | link | scorm | flashcard | audio' },
      { figma: 'Size', code: 'size: L | M | S' },
    ],
    theme: ['No theme override: styled from the tokens inside the component.'],
    files: ['packages/components/src/Tag/Tag.tsx', 'packages/components/src/Tag/tag.figma.ts (Figma mapping)'],
  },
}

export function TagCompare() {
  return <CompareTemplate c={compare} />
}
