import { Box, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import dayjs from 'dayjs'
import { DateField, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Calendar set (the field in Enabled, Hover and Error, with and without a label,
// and Active with the calendar open on July 2024), then the Day item set.
const FIELDS = [
  { name: 'Enabled', props: {} },
  { name: 'Hover', props: { fieldClassName: 'ds-hover' } },
  { name: 'Error', props: { error: 'Date is required!' } },
]

const DAY = dayjs('2024-07-01')
const DAYS = [
  { name: 'Disabled', props: { outsideCurrentMonth: true, showDaysOutsideCurrentMonth: true, day: dayjs('2024-06-30') } },
  { name: 'Enabled', props: {} },
  { name: 'Current day', props: { today: true } },
  { name: 'Focus', props: { className: 'ds-focus' } },
  { name: 'Hover', props: { className: 'ds-hover' } },
  { name: 'Selected', props: { selected: true } },
]
const noop = () => {}

export function CalendarMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box data-testid={`calendar-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '90px repeat(2, 200px)', columnGap: 8, rowGap: 6, alignItems: 'end', justifyItems: 'start' }}>
          <Box />
          {['Label', 'Field'].map((h) => (
            <Typography key={h} variant="h6" color="text.secondary">
              {h}
            </Typography>
          ))}
          {FIELDS.flatMap((f) => [
            <Typography key={`${f.name}-l`} variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
              {f.name}
            </Typography>,
            <DateField key={`${f.name}-label`} label="Label" value={null} {...f.props} />,
            <DateField key={`${f.name}-field`} value={null} aria-label="Date" {...f.props} />,
          ])}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '90px 1fr', columnGap: 8 }}>
          <Typography variant="caption" color="text.secondary">
            Active
          </Typography>
          <Box sx={{ position: 'relative', height: 66 + 8 + 344 }} data-testid={`calendar-open-${mode}`}>
            <DateField label="Label" open disablePortal onClose={noop} value={dayjs('2024-07-17')} referenceDate={DAY} />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: `90px repeat(${DAYS.length}, 80px)`, columnGap: 4, rowGap: 3, alignItems: 'center' }} data-testid={`calendar-days-${mode}`}>
          <Typography variant="caption" color="text.secondary">
            Day item
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            {DAYS.map((d) => (
              <Box key={d.name} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <PickersDay day={DAY} outsideCurrentMonth={false} isFirstVisibleCell={false} isLastVisibleCell={false} onDaySelect={noop} tabIndex={-1} {...d.props} />
                <Typography variant="caption" color="text.secondary">
                  {d.name}
                </Typography>
              </Box>
            ))}
          </LocalizationProvider>
        </Box>
      </Box>
    </Canvas>
  )
}
