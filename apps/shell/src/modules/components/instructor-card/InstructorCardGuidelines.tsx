import { InstructorCard } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { INSTRUCTOR } from './InstructorCardMatrix'

// Content from playground/docs/design-system/cards.md and the Figma Card/Instructor set.
const g: Guidelines = {
  overview: 'An instructor card introduces who teaches a course: photo, name, a short bio and their main skills.',
  whenToUse: ['On course and lesson pages, and in instructor lists, in the web app and the mobile app.'],
  whenNotToUse: ['For learners or colleagues. Use the Avatar with their name.'],
  anatomy: {
    example: <InstructorCard {...INSTRUCTOR} />,
    parts: [
      { name: 'Photo', description: '120 wide, the full card height, clipped by the 12px corner.' },
      { name: 'Name', description: 'Bold 16/1.5 (14 on mobile), Text-primary.' },
      { name: 'Bio', description: 'Regular 14/1.5 (12/1.2 on mobile), Text-secondary, up to two lines.' },
      { name: 'Skills', description: 'Up to two rows: a 16px skill icon and the skill, Regular 12/1.2, Text-tertiary, one line.' },
      { name: 'Card', description: '404 × 160 (340 × 137 on mobile), Cards-background, Shadow S in light mode.' },
    ],
  },
  variants: [{ name: 'Mobile', description: 'Padding 12, gap 16.', example: <InstructorCard {...INSTRUCTOR} device="mobile" /> }],
  states: [{ name: 'Hover', description: 'Cards-background-hover, on every device.' }],
  dos: [
    {
      do: { example: <InstructorCard {...INSTRUCTOR} bio="Leadership coach and former Head of People at Monzo." />, text: 'Keep the bio to one or two short sentences.' },
      dont: { example: <InstructorCard {...INSTRUCTOR} skills={[]} bio="" />, text: 'Leave out the bio and skills; the card needs them to mean anything.' },
    },
  ],
  content: ['Names as the instructor writes them.', 'Skills from the skills library.'],
  accessibility: ['The card is an article; the name is its heading and its button.', 'Skills are a list named "Skills"; the icons are decorative.'],
  figma: [
    { label: 'Card/Instructor, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=9926-2477' },
    { label: 'Card/Instructor, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5149-27386' },
  ],
  spec: 'playground/docs/design-system/cards.md',
}

export function InstructorCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
