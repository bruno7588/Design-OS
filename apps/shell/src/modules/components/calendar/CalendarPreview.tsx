import { useState } from 'react'
import { FormControlLabel, Stack, Switch } from '@mui/material'
import dayjs, { type Dayjs } from 'dayjs'
import { DateField, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { CalendarMatrix } from './CalendarMatrix'

export function CalendarPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [value, setValue] = useState<Dayjs | null>(null)
  const [required, setRequired] = useState(false)
  const [future, setFuture] = useState(true)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ minHeight: 440 }} data-testid="calendar-preview">
          <DateField
            label="Due date"
            value={value}
            onChange={setValue}
            disablePast={future}
            error={required && !value ? 'Choose a due date' : undefined}
            helperText="Learners see it on the course."
          />
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={required} onChange={(e) => setRequired(e.target.checked)} />} label="Required (shows the error when empty)" />
          <FormControlLabel control={<Switch checked={future} onChange={(e) => setFuture(e.target.checked)} />} label="Future dates only" />
        </>
      }
      hint={`Open the calendar with the icon, or type the date. In the calendar, arrow keys move by day and week, Page Up and Down by month, Enter picks. Today is ${dayjs().format('D MMMM')}.`}
      matrix={<CalendarMatrix mode={mode} />}
    />
  )
}
