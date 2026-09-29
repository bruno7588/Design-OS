import { Box, Typography } from '@mui/material'
import { FileUploader, type FileUploaderProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma File uploader set: each state (rows) in L and S (columns).
const STATES: { name: string; props: Partial<FileUploaderProps> }[] = [
  { name: 'Enabled', props: {} },
  { name: 'Hover', props: { className: 'ds-hover' } },
  { name: 'Error', props: { state: 'error', errors: ['Error message here!', 'Error message here!', 'Error message here!', 'a', 'b', 'c', 'd'] } },
  { name: 'Uploading', props: { state: 'uploading', progress: 72, fileName: 'nameofthedocument.csv' } },
  { name: 'Filled', props: { state: 'filled', fileName: 'nameofthedocument.csv' } },
]

const noop = () => {}

export function FileUploaderMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box
        data-testid={`file-uploader-matrix-${mode}`}
        sx={{ display: 'grid', gridTemplateColumns: '90px 560px 180px', columnGap: 8, rowGap: 6, alignItems: 'start' }}
      >
        <Box />
        {['L', 'S'].map((s) => (
          <Typography key={s} variant="h6" color="text.secondary">
            {s}
          </Typography>
        ))}
        {STATES.flatMap(({ name, props }) => [
          <Typography key={`${name}-l`} variant="caption" color="text.secondary" sx={{ pt: 2 }}>
            {name}
          </Typography>,
          <FileUploader key={`${name}-L`} size="L" onFileSelect={noop} {...props} />,
          <FileUploader key={`${name}-S`} size="S" onFileSelect={noop} {...props} />,
        ])}
      </Box>
    </Canvas>
  )
}
