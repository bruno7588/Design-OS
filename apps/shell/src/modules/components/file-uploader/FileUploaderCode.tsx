import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/FileUploader/FileUploader.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { FileUploader } from '@design-os/components'

// Your app owns the upload: set the state as it goes.
<FileUploader
  state={state}               // 'enabled' | 'error' | 'uploading' | 'filled'
  accept=".csv"
  onFileSelect={(file) => upload(file)}
  progress={progress}          // uploading: 0 to 100
  errors={errors}              // error: one message per problem
  fileName={file?.name}        // filled
/>

// S, 180px wide, such as a thumbnail or a certificate logo
<FileUploader size="S" accept="image/*" onFileSelect={setLogo} />`

export function FileUploaderCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        MUI has no drop zone, so the reference is a Box styled from the 5Mins tokens, with the 5Mins Buttons inside. The dashed
        outline is an SVG, since CSS can’t set 8px dashes with 4px gaps. The component doesn’t upload: your app sets the state,
        progress and errors. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="FileUploader.tsx" caption="packages/components/src/FileUploader" code={source} />
    </Stack>
  )
}
