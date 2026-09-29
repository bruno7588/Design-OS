import { Box, Typography } from '@mui/material'
import { InputRadio, type InputRadioProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Input field/Radio button set as a grid: each state (rows) with and
// without a label (columns).
const STATES = ['Enabled', 'Hover', 'Active', 'Filled', 'Success', 'Disabled'] as const

function stateProps(state: (typeof STATES)[number]): Partial<InputRadioProps> {
  switch (state) {
    case 'Hover':
      return { InputProps: { className: 'ds-hover' } }
    case 'Active':
      return { InputProps: { className: 'ds-focus' }, defaultValue: 'Text' }
    case 'Filled':
      return { checked: true, defaultValue: 'Text' }
    case 'Success':
      return { checked: true, defaultValue: 'Text', validation: 'success' }
    case 'Disabled':
      // Figma names it Selected=true but draws the radio empty: we follow the drawing.
      return { defaultValue: 'Text', disabled: true }
    default:
      return {}
  }
}

const LAYOUTS = [
  { name: 'Field', props: {} },
  { name: 'Label', props: { label: 'Label' } },
]

export function InputRadioMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`input-radio-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: '90px repeat(2, 320px)', columnGap: 8, rowGap: 6, alignItems: 'end' }}
      >
        <Box />
        {LAYOUTS.map((l) => (
          <Typography key={l.name} variant="h6" color="text.secondary">
            {l.name}
          </Typography>
        ))}
        {STATES.flatMap((state) => [
          <Typography key={`${state}-l`} variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
            {state}
          </Typography>,
          ...LAYOUTS.map((l) => (
            <InputRadio
              key={`${state}-${l.name}`}
              placeholder="Input text"
              radioLabel="Correct answer"
              checked={false}
              fullWidth
              inputProps={{ tabIndex: -1, 'aria-label': 'Answer' }}
              radioProps={{ tabIndex: -1 }}
              {...l.props}
              {...stateProps(state)}
            />
          )),
        ])}
      </Box>
    </Canvas>
  )
}
