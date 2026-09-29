import { Box, Typography } from '@mui/material'
import { InputInteger, type InputIntegerProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Input field/Integer set as a grid: each state (rows) with no label,
// a label, and a label with helper text (columns).
const STATES = ['Enabled', 'Hover', 'Active', 'Filled', 'Success', 'Error', 'Disabled'] as const

function stateProps(state: (typeof STATES)[number]): Partial<InputIntegerProps> {
  switch (state) {
    case 'Hover':
      return { InputProps: { className: 'ds-hover' } }
    case 'Active':
      return { InputProps: { className: 'ds-focus' } }
    case 'Filled':
      return { value: 100 }
    case 'Success':
      return { value: 100, validation: 'success' }
    case 'Error':
      return { value: 100, validation: 'error' }
    case 'Disabled':
      return { disabled: true }
    default:
      return {}
  }
}

const LAYOUTS = [
  { name: 'Field', props: { inputProps: { 'aria-label': 'Attempts', tabIndex: -1 } } },
  { name: 'Label', props: { label: 'Label' } },
  { name: 'Label and helper', props: { label: 'Label', helperText: 'Helper text' } },
]

const noop = () => {}

export function InputIntegerMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`input-integer-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: '90px repeat(3, 160px)', columnGap: 8, rowGap: 6, alignItems: 'end' }}
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
            <InputInteger
              key={`${state}-${l.name}`}
              value={null}
              onChange={noop}
              inputProps={{ tabIndex: -1 }}
              {...l.props}
              {...stateProps(state)}
              helperText={state === 'Error' && 'helperText' in l.props ? 'Error message' : (l.props as { helperText?: string }).helperText}
            />
          )),
        ])}
      </Box>
    </Canvas>
  )
}
