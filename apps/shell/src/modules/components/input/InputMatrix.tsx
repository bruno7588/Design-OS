import { Box, Typography } from '@mui/material'
import { InputField, type InputFieldProps, type Mode } from '@design-os/components'
import { Eye } from 'iconsax-react'
import { Canvas } from '../shared/Canvas'

// The Figma Input field/Outlined set as a grid: each state (rows) with no label,
// a label, and a label with helper text (columns).
export const STATES = ['Enabled', 'Hover', 'Active', 'Filled', 'Error', 'Success', 'Disabled'] as const
export type InputState = (typeof STATES)[number]

export function stateProps(state: InputState): Partial<InputFieldProps> {
  switch (state) {
    case 'Hover':
      return { InputProps: { className: 'ds-hover' } }
    case 'Active':
      return { InputProps: { className: 'ds-focus' } }
    case 'Filled':
      return { defaultValue: 'Compliance essentials' }
    case 'Error':
      return { defaultValue: 'Compliance essentials', validation: 'error' }
    case 'Success':
      return { defaultValue: 'Compliance essentials', validation: 'success' }
    case 'Disabled':
      return { disabled: true }
    default:
      return {}
  }
}

const LAYOUTS = [
  { name: 'Field', props: {} },
  { name: 'Label', props: { label: 'Label' } },
  { name: 'Label and helper', props: { label: 'Label', helperText: 'Helper text' } },
]

export function InputMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`input-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: '90px repeat(3, 280px)', columnGap: 8, rowGap: 6, alignItems: 'end' }}
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
            <InputField
              key={`${state}-${l.name}`}
              placeholder="Input text"
              fullWidth
              {...l.props}
              {...stateProps(state)}
              helperText={state === 'Error' && 'helperText' in l.props ? 'Error message' : (l.props as { helperText?: string }).helperText}
              inputProps={{ tabIndex: -1 }}
            />
          )),
        ])}
        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
          Icon right
        </Typography>
        <InputField placeholder="Password" type="password" defaultValue="secret-passphrase" fullWidth iconRight={<Eye color="currentColor" />} inputProps={{ tabIndex: -1 }} />
      </Box>
    </Canvas>
  )
}
