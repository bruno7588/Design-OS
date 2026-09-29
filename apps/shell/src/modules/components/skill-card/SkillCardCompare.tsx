import { skillCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { SkillCardMatrix } from './SkillCardMatrix'

// Figma = Card/skill (dark 11802:3704, light 11828:5184), checked 2026-09-29.
const compare: Compare = {
  page: skillCardFigma.page,
  set: skillCardFigma.set,
  frames: { light: '/figma/skill-card-light.png', dark: '/figma/skill-card-dark.png' },
  live: (mode) => <SkillCardMatrix mode={mode} />,
  differences: [
    { property: 'Card', figma: '37px: 1px Border, radius 12, padding 8/12, gap 8; label Regular 14/1.5 Text-secondary', reference: 'Same', status: 'Matches' },
    { property: 'Hover', figma: 'Page-background-hover fill, Border-hover outline', reference: 'Same', status: 'Matches' },
    { property: 'Remove', figma: 'close Linear 20 in Text-secondary', reference: 'CloseOutlineIcon at 20 (the same X), in a named button', status: 'Matches' },
    { property: 'Disabled', figma: 'Illustration in Luminosity, Text-disabled', reference: 'Greyscale, Text-disabled, aria-disabled', status: 'Matches' },
    { property: 'Illustration', figma: 'Icons/Skill Icon/Pricing Strategy (Hugo Library), 20px; swapped in on 2026-09-29 from a deleted Illustrations set', reference: 'An icon slot; the docs use the same Pricing Strategy artwork', status: 'Matches', note: 'The full skill library is in the prototype’s src/assets/skill-icons (see iconography.md).' },
    { property: 'Hover width', figma: 'The hover variant is 285 wide; the label box is wider (233 against 197)', reference: 'Hugs its content', status: 'Matches' },
    { property: 'Built component', figma: '–', reference: 'SkillCard', status: 'Code to update', note: 'The prototype has SkillCard.' },
  ],
  engineering: {
    mui: 'Box + IconButton',
    usage: `<SkillCard label="Negotiation" icon={<SkillIllustration />} onRemove={remove} />`,
    props: [
      { figma: 'Remove=true', code: 'onRemove' },
      { figma: 'Disabled=true', code: 'disabled' },
    ],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/SkillCard.tsx'],
  },
}

export function SkillCardCompare() {
  return <CompareTemplate c={compare} />
}
