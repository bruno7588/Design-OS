import { Box, Typography } from '@mui/material'
import { InputInline, type InputInlineProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Input field/Inline set: each state (rows) with and without the
// description (columns). Active is the caret, so it isn't drawn here.
const STATES: { name: string; props: Partial<InputInlineProps> }[] = [
  { name: 'Enabled', props: { title: '' } },
  { name: 'Filled', props: { title: 'Title of the course', description: 'Description of the course' } },
  { name: 'Error', props: { title: 'Title of the course', description: 'Description of the course', error: 'Error message' } },
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
        {['Description', 'Title only'].map((h) => (
          <Typography key={h} variant="h6" color="text.secondary">
            {h}
          </Typography>
        ))}
        {STATES.flatMap(({ name, props }) => [
          <Typography key={`${name}-l`} variant="caption" color="text.secondary" sx={{ pt: 3 }}>
            {name}
          </Typography>,
          ...[true, false].map((withDescription) => (
            <InputInline
              key={`${name}-${withDescription}`}
              title=""
              onTitleChange={noop}
              onDescriptionChange={noop}
              {...props}
              description={withDescription ? (props.description ?? '') : undefined}
            />
          )),
        ])}
      </Box>
    </Canvas>
  )
}
