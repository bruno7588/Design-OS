import { folderCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { FolderCardMatrix } from './FolderCardMatrix'

// Figma = Card/Folder (dark 10175:3106) and Card/folder (light 10175:3183), checked 2026-09-29.
const compare: Compare = {
  page: folderCardFigma.page,
  set: 'Card/Folder (dark), Card/folder (light)',
  frames: { light: '/figma/folder-card-light.png', dark: '/figma/folder-card-dark.png' },
  live: (mode) => <FolderCardMatrix mode={mode} />,
  differences: [
    { property: 'Surface', figma: '308 × 272, Cards-background, radius 12, padding 24; Shadow S in the light set', reference: 'Same', status: 'Matches' },
    { property: 'Deck', figma: 'Cover 240 × 140 at the bottom; 224 × 132 Border-elevated 12 higher; 208 × 118 Cards-background-hover at the top; radius 8', reference: 'Same', status: 'Matches' },
    { property: 'Hover', figma: 'Deck 200 wide (radius 6.7); back layers Border-elevated and Neutral-400', reference: 'The deck scales to 5/6 and the layers change colour', status: 'Matches' },
    { property: 'Info gap', figma: '8 everywhere (set on 2026-09-29; was 4 on the rest states)', reference: 'Same', status: 'Matches' },
    { property: 'Empty', figma: 'Artwork in Border-elevated with a Cards-background stroke', reference: 'The same artwork, drawn from the tokens', status: 'Matches' },
    { property: 'Deleted variable', figma: 'The deck, the empty artwork and the New Folder outline were bound to a deleted Border-elevated (7423:2)', reference: '–', status: 'Matches', note: 'Rebound to the current Border-elevated on 2026-09-29 (22 layers).' },
    { property: 'New Folder', figma: '1.5px dashed Border-elevated (4, 4), radius 12; + Regular 48 and "New Folder" Regular 16 in Text-secondary', reference: 'A button with the same look (CSS dashes are close to 4, 4; a 1.5px border shows as 1px on standard screens)', status: 'Matches' },
    { property: 'Set names', figma: 'Card/Folder (dark) and Card/folder (light)', reference: '–', status: 'Design to update', note: 'The inventory matches sets by name; the capital F differs.' },
    { property: 'Count label', figma: '"3+ courses" (the variant name)', reference: 'The real number: "5 courses"', status: 'Matches' },
    { property: 'Built component', figma: '–', reference: 'FolderCard, NewFolderCard', status: 'Code to update', note: 'Folders are page-local in the prototype.' },
  ],
  engineering: {
    mui: 'Box (article) + ButtonBase (New Folder)',
    usage: `<FolderCard title="Onboarding" count={5} image={cover} onClick={open} />\n<NewFolderCard onClick={create} />`,
    props: [
      { figma: 'Number of courses', code: 'count (countLabel to override)' },
      { figma: 'New folder=true', code: '<NewFolderCard />' },
    ],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/FolderCard.tsx'],
  },
}

export function FolderCardCompare() {
  return <CompareTemplate c={compare} />
}
