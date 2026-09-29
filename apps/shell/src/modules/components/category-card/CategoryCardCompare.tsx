import { categoryCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { CategoryCardMatrix } from './CategoryCardMatrix'

// Figma = Card/ Category (dark 10176:1806, light 10574:3913), checked 2026-09-29.
const compare: Compare = {
  page: categoryCardFigma.page,
  set: categoryCardFigma.set,
  frames: { light: '/figma/category-card-light.png', dark: '/figma/category-card-dark.png' },
  live: (mode) => <CategoryCardMatrix mode={mode} />,
  differences: [
    { property: 'Desktop', figma: '300 × 273, gap 16; glow 300 × 204 (layer blur 32, 32%), image 240 × 140 radius 12; info gap 8', reference: 'Same (CSS blur 16px matches Figma’s 32)', status: 'Matches' },
    { property: 'Mobile', figma: '272 × 238, gap 12; glow 272 × 180, image 208 × 116; info gap 4; meta gap 8, icon 18', reference: 'Same, 235 tall', status: 'Matches', note: 'Figma gives the 21px title a 24px box, so it’s 3px taller.' },
    { property: 'Meta icons', figma: 'CollectionPlay 20 (custom) and play-circle 16, Linear', reference: 'CollectionPlayIcon copied from Figma; Iconsax PlayCircle', status: 'Matches' },
    { property: 'New', figma: 'Badge Type=New, SemiBold 12/1.2, at 30, −11', reference: 'The 5Mins Badge (new), 12 SemiBold, same place', status: 'Matches' },
    { property: 'Hover', figma: 'Image 281 × 164; glow 348 × 237, blur 37, 48%', reference: 'Scaled 1.17 and 1.16, glow 48%, animated', status: 'Matches' },
    { property: 'Disabled', figma: 'Thumbnail in Luminosity; 40px Bold lock in Text-secondary; Text-disabled; hover shows the Tooltip', reference: 'Greyscale; same lock and text; MUI Tooltip on hover and focus', status: 'Matches' },
    { property: 'Disabled + New', figma: 'No variant', reference: 'The New badge hides when disabled', status: 'Matches' },
    { property: 'Tooltip copy', figma: '"Category not available in your plan.\\nPlease contact Customer Success" (regular weight)', reference: 'Same text; cards.md shows Customer Success as a link', status: 'Matches', note: 'If it should be a link, the tooltip needs to be interactive.' },
    { property: 'Built component', figma: '–', reference: 'CategoryCard', status: 'Code to update', note: 'The prototype has CategoryCard and mobile/CategoryCard.' },
  ],
  engineering: {
    mui: 'Box (article) + Badge + Tooltip',
    usage: `<CategoryCard title="Leadership" image={cat.cover} courses="12 courses" lessons="24 lessons" isNew onClick={open} />`,
    props: [
      { figma: 'Device', code: 'device: desktop | mobile' },
      { figma: 'New', code: 'isNew (newLabel)' },
      { figma: 'Disabled', code: 'disabled (disabledReason)' },
    ],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/CategoryCard.tsx', 'packages/components/src/icons/FigmaIcons.tsx (CollectionPlayIcon)'],
  },
}

export function CategoryCardCompare() {
  return <CompareTemplate c={compare} />
}
