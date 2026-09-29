import { DateField, InputField } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

// Content from playground/docs/design-system/calendar.md, the Figma Calendar page and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'A date field lets people type a date or pick it from a month calendar that opens under the field.',
  whenToUse: ['For due dates, start dates and schedules.', 'When the date is likely within a few months of today.'],
  whenNotToUse: ['For dates far in the past, such as a birth date. Let people type it.', 'For a date range. Use two date fields, start and end.', 'For times. Use a time field.'],
  anatomy: {
    example: <DateField label="Due date" value={null} />,
    parts: [
      { name: 'Label', description: 'Semibold 14px in Text-secondary, 8px above.' },
      { name: 'Field', description: 'As the input field: 37px, radius 12, Border-elevated. The placeholder "dd/mm/yyyy" is Text-secondary. The calendar icon (Linear, 20px, Text-primary) sits 8px after it.' },
      { name: 'Calendar', description: 'Cards-background, Border-elevated, radius 12, Shadow L, 8px below. 352px wide: month and year (Semibold 16), prev and next chevrons, Mon to Sun, and 6 weeks of 40px days, 8px apart.' },
      { name: 'Helper or error', description: 'Regular 14px, 8px below the field. Text-error in the error state.' },
    ],
  },
  variants: [
    { name: 'With a label', description: 'The default in forms.', example: <DateField label="Start date" value={null} /> },
    { name: 'Error', description: 'Required and empty, or out of range. The Linear Danger icon sits before the calendar icon.', example: <DateField label="Due date" value={null} error="Choose a due date" /> },
  ],
  states: [
    { name: 'Enabled', description: 'Border-elevated.' },
    { name: 'Hover', description: 'Border-hover and the Input-background fill.' },
    { name: 'Active', description: 'While the calendar is open: the Selected border.' },
    { name: 'Day items', description: 'Hover: Cards-background-hover. Focus: a Selected ring. Today: a Border-elevated ring. Selected: Secondary-500 with a Bold Neutral-800 number. Outside the month or out of range: Text-disabled.' },
  ],
  dos: [
    {
      do: { example: <DateField label="Due date" value={null} />, text: 'Use a date field, so people can type or pick.' },
      dont: { example: <InputField label="Due date" placeholder="e.g. next Friday" inputProps={{ tabIndex: -1 }} />, text: 'Ask for a date in a plain text field.' },
    },
  ],
  content: ['Label: what the date is for: "Due date", "Start date".', 'Error: say what to do: "Choose a due date", "Choose a date after the start date".', 'Dates read day, month, year: 17/07/2024.'],
  accessibility: [
    'The field is a text box named by its label; people can type the date, section by section.',
    'The calendar button is named "Choose date" and says the date picked.',
    'In the calendar, the arrow keys move by day and week, Page Up and Down by month, Home and End to the start and end of the week, Enter picks, and Escape closes and returns focus.',
    'Days are a grid with their full date as the name; today and the selected day are marked for screen readers.',
  ],
  figma: [
    { label: 'Calendar, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12204-5743' },
    { label: 'Calendar, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11529-406' },
    { label: 'Day item, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11916-6094' },
  ],
  spec: 'playground/docs/design-system/calendar.md',
}

export function CalendarGuidelines() {
  return <GuidelinesTemplate g={g} />
}
