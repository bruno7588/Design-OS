import { calendarFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { CalendarMatrix } from './CalendarMatrix'

// Figma = Calendar (dark 11529:406, light 12204:5743) and Day item (dark 5279:26511, light 11916:6094), checked 2026-09-29.
const compare: Compare = {
  page: calendarFigma.page,
  set: 'Calendar, Day item',
  frames: { light: '/figma/calendar-light.png', dark: '/figma/calendar-dark.png' },
  live: (mode) => <CalendarMatrix mode={mode} />,
  differences: [
    { property: 'Field', figma: '37px, padding 8/12, radius 12, Border-elevated; hugs "dd/mm/yyyy" and the icon, 8px apart', reference: 'Same', status: 'Matches', note: 'calendar.md says Border and a 16px gap.' },
    { property: 'Placeholder', figma: '"dd/mm/yyyy" in Text-secondary', reference: 'Same', status: 'Matches', note: 'Other fields use Text-disabled for placeholders.' },
    { property: 'Active border', figma: 'Selected (rebound from Secondary-500, 2026-09-29)', reference: 'Same, as every field', status: 'Matches' },
    { property: 'Error', figma: 'Text-error border and label; Linear danger icon before the calendar icon; message below', reference: 'Same', status: 'Matches', note: 'The Input field uses the Bold Danger icon at the end.' },
    { property: 'Popover', figma: '352 × 344, Cards-background, Border-elevated, radius 12, Shadow L, 8px below', reference: 'Same', status: 'Matches' },
    { property: 'Header', figma: '"July 2024" Semibold 16; chevrons 20px with 12px glyphs, 4px apart', reference: 'Same', status: 'Matches' },
    { property: 'Weekdays', figma: 'Mon to Sun, Regular 14, Text-secondary', reference: 'Same (weeks start on Monday)', status: 'Matches' },
    { property: 'Day items', figma: 'Enabled, Hover, Focus, Current day, Selected, Disabled', reference: 'Same', status: 'Matches' },
    { property: 'Built component', figma: '–', reference: 'DateField on MUI X DesktopDatePicker', status: 'Code to update', note: 'The prototype’s DatePickerField uses its own MiniCalendar with no grid keyboard support.' },
  ],
  engineering: {
    mui: 'DesktopDatePicker (MUI X Date Pickers 7) + dayjs',
    usage: `<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
  <DesktopDatePicker label="Due date" value={date} onChange={setDate} />
</LocalizationProvider>`,
    props: [
      { figma: 'Label', code: 'label' },
      { figma: 'Calendar=Error', code: 'error (DateField: the message)' },
      { figma: 'Calendar=Active', code: 'open (the calendar is open)' },
      { figma: 'Day item Disabled', code: 'minDate, maxDate, disablePast, shouldDisableDate; days outside the month' },
    ],
    theme: [
      'MuiDesktopDatePicker and MuiDateCalendar defaultProps: dd/mm/yyyy, day view only, 6 weeks, days outside the month, Mon labels, Iconsax icons.',
      'MuiPickersPopper, MuiPickersCalendarHeader, MuiPickersArrowSwitcher, MuiDayCalendar and MuiPickersDay: the Figma popover and day items.',
      'MuiTextField .ds-date-field: the placeholder, width and icons.',
    ],
    files: [
      'packages/components/src/Calendar/calendar.overrides.tsx (theme overrides)',
      'packages/components/src/Calendar/DateField.tsx (locale, Active border, error icon)',
      'packages/components/src/Calendar/dateField.styles.ts (the field)',
    ],
  },
}

export function CalendarCompare() {
  return <CompareTemplate c={compare} />
}
