import { SkillCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { LABEL, SKILL_ICON } from './SkillCardMatrix'

// Content from playground/docs/design-system/cards.md and the Figma Card/skill set.
const g: Guidelines = {
  overview: 'A skill card shows one skill as a compact outlined tag, with its illustration.',
  whenToUse: ['To list the skills a course, lesson or learner covers.', 'In skill pickers, with Remove.'],
  whenNotToUse: ['For filters. Use the Chip.', 'For statuses. Use the Badge.'],
  anatomy: {
    example: <SkillCard label={LABEL} icon={SKILL_ICON} onRemove={() => undefined} />,
    parts: [
      { name: 'Outline', description: '37px: 1px Border, radius 12, padding 8/12, gap 8, no fill.' },
      { name: 'Illustration', description: 'The skill type’s artwork at 20px.' },
      { name: 'Label', description: 'The skill name, Regular 14/1.5, Text-secondary.' },
      { name: 'Remove', description: 'A 20px close button in editable places.' },
    ],
  },
  variants: [{ name: 'Disabled', description: 'Greyscale illustration, Text-disabled, no Remove.', example: <SkillCard label={LABEL} icon={SKILL_ICON} disabled /> }],
  states: [{ name: 'Hover', description: 'Page-background-hover fill and a Border-hover outline.' }],
  dos: [
    {
      do: { example: <SkillCard label="Negotiation" icon={SKILL_ICON} />, text: 'Use the skill’s own name.' },
      dont: { example: <SkillCard label="Negotiation skills for sales teams in 2026" icon={SKILL_ICON} />, text: 'Write a sentence; the card is a tag.' },
    },
  ],
  content: ['Skill names as they appear in the skills library.'],
  accessibility: ['Remove is a button named "Remove" plus the skill.', 'Disabled cards set aria-disabled.', 'The illustration is decorative.'],
  figma: [
    { label: 'Card/skill, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11828-5184' },
    { label: 'Card/skill, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11802-3704' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function SkillCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
