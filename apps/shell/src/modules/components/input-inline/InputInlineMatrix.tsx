import { Box, Typography } from '@mui/material'
import { InputInline, type InputInlineProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Input field/Inline set: each state in Size L, then in M (rows), with and
// without the description (columns). Active is the caret, so it isn't drawn here.
const STATES: { name: string; props: Partial<InputInlineProps> }[] = [
  { name: 'Enabled', props: { title: '' } },
  { name: 'Filled', props: { title: 'Title of the course', description: 'Description of the course' } },
  { name: 'Error', props: { title: 'Title of the course', description: 'Description of the course', error: 'Error message' } },
]

const SIZES = ['L', 'M'] as const
const COLUMNS = [
  { name: 'Description', description: true },
  { name: 'Title only', description: false },
]

const noop = () => {}

export function InputInlineMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`input-inline-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: '90px repeat(2, 440px)', columnGap: 8, rowGap: 8, alignItems: 'start' }}
      >
        <Box />
        {COLUMNS.map((c) => (
          <Typography key={c.name} variant="h6" color="text.secondary">
            {c.name}
          </Typography>
        ))}
        {SIZES.flatMap((size) =>
          STATES.flatMap(({ name, props }) => [
            <Typography key={`${size}-${name}-l`} variant="caption" color="text.secondary" sx={{ pt: 2 }}>
              {size}, {name}
            </Typography>,
            ...COLUMNS.map((c) => (
              <InputInline
                key={`${size}-${name}-${c.name}`}
                title=""
                onTitleChange={noop}
                onDescriptionChange={noop}
                {...props}
                size={size}
                description={c.description ? (props.description ?? '') : undefined}
              />
            )),
          ]),
        )}
      </Box>
    </Canvas>
  )
}
