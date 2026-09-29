import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Calendar/DateField.tsx?raw'
import overridesSource from '@design-os/components/src/Calendar/calendar.overrides.tsx?raw'
import fieldSource from '@design-os/components/src/Calendar/dateField.styles.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { DateField } from '@design-os/components'

<DateField label="Due date" value={date} onChange={setDate} disablePast error={missing ? 'Choose a due date' : undefined} />

// Plain MUI X renders the same calendar with the 5Mins theme.
// It needs @mui/x-date-pickers 7 and dayjs, and the en-gb locale for Monday weeks.
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import 'dayjs/locale/en-gb'

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
  <DesktopDatePicker label="Due date" value={date} onChange={setDate} />
</LocalizationProvider>`

export function CalendarCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI X Date Pickers 7 (the free MIT package, which works with MUI 5.18) and dayjs. The field is the
        5Mins Input field; the popover, header, weekdays and day items are theme overrides. The DateField wrapper sets the
        en-gb locale and adds the Active border and the error icon. The files below are read from the source, so they are
        always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="DateField.tsx" caption="packages/components/src/Calendar" code={source} />
      <CodeBlock title="calendar.overrides.tsx" caption="Theme overrides for the MUI X date picker parts" code={overridesSource} />
      <CodeBlock title="dateField.styles.ts" caption="The date field's differences from the Input field" code={fieldSource} />
    </Stack>
  )
}
