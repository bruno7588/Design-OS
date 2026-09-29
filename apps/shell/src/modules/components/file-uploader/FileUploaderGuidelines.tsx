import { Box } from '@mui/material'
import { Button, FileUploader, type FileUploaderProps } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}
const Example = (props: Partial<FileUploaderProps>) => (
  <Box sx={{ width: props.size === 'S' ? 'auto' : 420 }}>
    <FileUploader onFileSelect={noop} {...props} />
  </Box>
)

// Content from playground/docs/design-system/file-uploader.md, the Figma set and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'A file uploader lets people add a file by dropping it on the zone or picking it. It shows the upload’s progress, any errors, and the file once it’s in.',
  whenToUse: [
    'To add one file: a CSV of learners, a document, a course image.',
    'Where dropping a file saves time, such as imports and content.',
  ],
  whenNotToUse: [
    'To attach files to a message. Use an attach button.',
    'For several files at once with their own progress. This uploader holds one file.',
  ],
  anatomy: {
    example: <Example />,
    parts: [
      { name: 'Zone', description: 'A dashed Border-elevated outline (8px dashes, 4px gaps), radius 12. L fills the width, at least 240px tall; S is 180px wide, at least 260px.' },
      { name: 'Icon', description: 'Iconsax DocumentUpload, 40px in L, 32px in S, in Text-secondary.' },
      { name: 'Description', description: 'Regular 14px in L, 12px in S, in Text-secondary.' },
      { name: 'Select File', description: 'An Outlined-2 button, Medium in L, Small in S. It shows its hover state while the zone is hovered or a file is dragged over it.' },
    ],
  },
  variants: [
    { name: 'L', description: 'The default: forms, imports and drawers.', example: <Example /> },
    { name: 'S', description: '180px, for a thumbnail or a logo next to other fields.', example: <Example size="S" /> },
  ],
  states: [
    { name: 'Enabled', description: 'No fill, the dashed Border-elevated outline.' },
    { name: 'Hover', description: 'Pointer over the zone or a file dragged over it: Input-background fill, Border-hover outline, and the button’s hover state.' },
    { name: 'Error', description: 'Danger-500 outline, a 16% Danger-500 fill, the icon and messages (Regular 14px in L, 12px in S) in Text-error. The first 3 messages show, then "+N errors".' },
    { name: 'Uploading', description: 'Input-background fill, a 64px ring (Border track, Primary-600 progress) with the percentage, and "Uploading file…".' },
    { name: 'Filled', description: 'A solid outline, Input-background fill, the Bold DocumentText icon and the file name, with Select File to replace it.' },
  ],
  dos: [
    {
      do: { example: <Example state="error" errors={['The file is over 20 MB']} />, text: 'Say what went wrong and what to do: the size or type limit.' },
      dont: { example: <Example state="error" errors={['Something went wrong']} />, text: 'Show a vague error people can’t act on.' },
    },
    {
      do: { example: <Example />, text: 'Keep the Select File button, so keyboard users can add a file.' },
      dont: { example: <Button variant="outlined2">Upload</Button>, text: 'Rely on dropping alone.' },
    },
  ],
  content: [
    'Button: "Select File". Buttons are in Title Case.',
    'Say the accepted types and the size limit near the zone or in the description: "CSV or PDF, up to 20 MB".',
    'Errors: one short sentence per problem, with the fix: "The file is over 20 MB".',
  ],
  accessibility: [
    'Select File is a real button: keyboard users pick a file with it. Dropping and clicking the zone are pointer shortcuts.',
    'Errors are in a list with role="alert", so they are read out when they appear.',
    'The upload ring is a progressbar with aria-valuenow, named "Uploading" and the file name.',
    'Icons are decorative; the text says the state.',
  ],
  figma: [
    { label: 'File uploader, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12308-6617' },
    { label: 'File uploader, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11546-1560' },
  ],
  spec: 'playground/docs/design-system/file-uploader.md',
}

export function FileUploaderGuidelines() {
  return <GuidelinesTemplate g={g} />
}
