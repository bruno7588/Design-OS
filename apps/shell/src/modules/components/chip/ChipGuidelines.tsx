import { Chip, Tab } from '@design-os/components'
import { Tabs } from '@mui/material'
import { Add, CloseCircle, User } from 'iconsax-react'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}

// Content from playground/docs/design-system/chips-switcher-tabs.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A chip is a compact option people can select, often in a row of filters. It can also show a value that has been added, such as a person or a skill, with a way to remove it.',
  whenToUse: [
    'To filter a list or table, with one chip per option.',
    'To show values someone has picked, such as learners added to a course, with a remove icon.',
    'For short, parallel options that fit on one line.',
  ],
  whenNotToUse: [
    'To go to another page. Use a link or the side navigation.',
    'To switch between sections of a page. Use tabs.',
    'To switch between views of the same data. Use a content switcher.',
    'To show a status, such as In progress. Use a badge.',
  ],
  anatomy: {
    example: <Chip label="Maria Silva" icon={<User color="currentColor" />} onClick={noop} />,
    parts: [
      { name: 'Container', description: 'Hugs its content. 33px tall, radius 24px, 1px border inside. Padding 6px by 12px, and 10px on the side with an icon.' },
      { name: 'Leading icon', description: 'Optional. Iconsax Linear, 16px, in the label colour. Use it for people.' },
      { name: 'Label', description: 'Poppins Regular 14px, Bold when selected.' },
      { name: 'Trailing icon', description: 'Optional. 16px, 4px after the label. Removes the chip.' },
    ],
  },
  variants: [
    { name: 'Default', description: 'Border and label only. The chip is available but not selected.', example: <Chip label="Leadership" onClick={noop} /> },
    { name: 'Selected', description: 'Secondary-500 fill with a Bold, dark label, in both modes.', example: <Chip label="Compliance" selected onClick={noop} /> },
    { name: 'With a leading icon', description: 'For people and other values that benefit from a symbol.', example: <Chip label="Maria Silva" icon={<User color="currentColor" />} /> },
    { name: 'Removable', description: 'A trailing icon that removes the value.', example: <Chip label="Onboarding" iconRight={<CloseCircle color="currentColor" />} onDelete={noop} /> },
  ],
  states: [
    { name: 'Enabled', description: 'Border-elevated border, Text-secondary label, no fill.' },
    { name: 'Hover', description: 'Border-hover border and a Page-background-hover fill. Only on chips that do something.' },
    { name: 'Selected', description: 'Secondary-500 fill, no visible border, Neutral-800 Bold label.' },
    { name: 'Focus', description: 'Keyboard focus only: a 2px ring in the primary button colour, 2px outside the chip.' },
    { name: 'Disabled', description: 'Border and Text-disabled label. Not clickable. Means unavailable, not unselected.' },
  ],
  dos: [
    {
      do: { example: <><Chip label="All" selected onClick={noop} /><Chip label="Compliance" onClick={noop} /><Chip label="Leadership" onClick={noop} /></>, text: 'Keep filter labels short and parallel.' },
      dont: { example: <><Chip label="Show only compliance training" onClick={noop} /><Chip label="Leadership" onClick={noop} /></>, text: 'Write long labels. Chips are for one to three words.' },
    },
    {
      do: { example: <Chip label="Maria Silva" icon={<User color="currentColor" />} iconRight={undefined} />, text: 'Use one icon: leading for a person, trailing to remove.' },
      dont: { example: <Chip label="Maria Silva" icon={<User color="currentColor" />} iconRight={<CloseCircle color="currentColor" />} onDelete={noop} />, text: 'Put an icon on both sides.' },
    },
    {
      do: { example: <Tabs value="a"><Tab value="a" label="Courses" /><Tab value="b" label="Lessons" /></Tabs>, text: 'Use tabs to move between sections of a page.' },
      dont: { example: <><Chip label="Courses" selected onClick={noop} /><Chip label="Lessons" onClick={noop} /></>, text: 'Use chips as tabs or navigation.' },
    },
    {
      do: { example: <Chip label="Add skill" icon={<Add color="currentColor" />} onClick={noop} />, text: 'Keep the label in sentence case.' },
      dont: { example: <Chip label="Add Skill" icon={<Add color="currentColor" />} onClick={noop} />, text: 'Use Title Case.' },
    },
  ],
  content: [
    'One to three words. Labels do not wrap; long ones are cut off at 240px.',
    'Sentence case, with proper nouns and feature names kept as they are ("AI Studio").',
    'Use nouns for filters ("Compliance"), not instructions ("Show compliance").',
    'Keep the options in a row parallel: all topics, or all people, not a mix.',
  ],
  accessibility: [
    'A chip with onClick is a button with aria-pressed, so screen readers announce selected and not selected.',
    'Enter and Space select it. Backspace and Delete remove a removable chip.',
    'Group a row of filter chips with role="group" and a label, such as "Filter by topic".',
    'Selected is shown by the fill and the Bold label, not by colour alone.',
  ],
  figma: [
    { label: 'Chips, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12160-12109' },
    { label: 'Chips, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=5162-28510' },
  ],
  spec: 'playground/docs/design-system/chips-switcher-tabs.md',
}

export function ChipGuidelines() {
  return <GuidelinesTemplate g={g} />
}
