import { Stack, Typography } from '@mui/material'
import { InfoTooltip } from '@design-os/components'
import { TooltipCell } from './TooltipMatrix'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

function Labelled({ text }: { text: string }) {
  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Typography variant="body2">Skill level</Typography>
      <InfoTooltip title={text} />
    </Stack>
  )
}

// Content from the Tooltip section of playground/docs/design-system/alerts-toast.md,
// the Figma set description and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A tooltip shows a short, nonessential explanation when someone hovers over or focuses an element. It explains an icon or a term without taking space on the page.',
  whenToUse: [
    'To name an icon-only button, such as Duplicate or Edit.',
    'To explain a term or a field next to its label, with the info icon.',
    'For extra detail that helps but is not needed to complete the task.',
  ],
  whenNotToUse: [
    'For information people need to do the task. Put it on the page, as helper text.',
    'For errors or validation. Use the field error or an alert.',
    'For anything with a link or a button. Use a popover or a dialog.',
    'On touch-only surfaces, where hover does not exist.',
  ],
  anatomy: {
    example: <TooltipCell placement="top" icon />,
    parts: [
      { name: 'Trigger', description: 'The element it explains, or the 20px info icon in Text-secondary.' },
      { name: 'Bubble', description: 'Tooltip-background (Neutral-800 in light mode, Neutral-900 in dark), radius 12, padding 8px by 12px, Shadow L. Up to 288px wide; longer text wraps.' },
      { name: 'Text', description: 'Poppins Regular 14px in Neutral-25.' },
      { name: 'Caret', description: '12 by 6px, pointing at the trigger, 4px from it. 16px from the bubble edge for start and end alignments.' },
    ],
  },
  variants: [
    { name: 'Top', description: 'The default. Start and end align the bubble with the trigger\'s edge.', example: <TooltipCell placement="top" icon /> },
    { name: 'Bottom', description: 'When there is no room above.', example: <TooltipCell placement="bottom" icon /> },
    { name: 'Left and right', description: 'Beside the trigger, centred.', example: <TooltipCell placement="right" icon /> },
  ],
  states: [
    { name: 'Hidden', description: 'The default.' },
    { name: 'Shown', description: 'On hover after a short delay, and straight away on keyboard focus.' },
    { name: 'Closing', description: 'When the pointer leaves, focus moves on, or Escape is pressed.' },
    { name: 'Near an edge', description: 'Flips to the opposite side so it stays in the window.' },
  ],
  dos: [
    {
      do: { example: <Labelled text="How well the learner knows this skill, from 1 to 5." />, text: 'Keep it to one short sentence.' },
      dont: { example: <Labelled text="Skill level is calculated from quiz results, lesson completion and manager feedback, weighted by recency, and can be overridden by an admin in the Roles & Mapping page." />, text: 'Write a paragraph. If it needs that much, put it on the page.' },
    },
  ],
  content: [
    'One short sentence or phrase, in sentence case.',
    'Regular weight only: no bold, links or buttons.',
    'For an icon-only button, the tooltip is the action name: "Duplicate", "Edit".',
    'Say something the label does not already say.',
  ],
  accessibility: [
    'On an icon-only button, the tooltip text becomes the button\'s name ("Duplicate"). That is MUI\'s default.',
    'On the info icon, the button is named "More information" and the tooltip text is its description (aria-describedby).',
    'It opens on keyboard focus as well as hover, and Escape closes it.',
    'The trigger must be focusable, so wrap a button or a link, not plain text.',
  ],
  figma: [
    { label: 'Tooltip, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11927-8087' },
    { label: 'Tooltip, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=2683-29027' },
  ],
  spec: 'playground/docs/design-system/alerts-toast.md',
}

export function TooltipGuidelines() {
  return <GuidelinesTemplate g={g} />
}
