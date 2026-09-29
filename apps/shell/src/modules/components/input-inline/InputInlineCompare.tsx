import { inputInlineFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { InputInlineMatrix } from './InputInlineMatrix'

// Figma = Input field/Inline (dark 10330:4736, light 12114:20828), checked 2026-09-29.
const compare: Compare = {
  page: inputInlineFigma.page,
  set: inputInlineFigma.set,
  frames: { light: '/figma/input-inline-light.png', dark: '/figma/input-inline-dark.png' },
  live: (mode) => <InputInlineMatrix mode={mode} />,
  differences: [
    { property: 'Title', figma: 'Bold 32, line height 1.5; Text-disabled placeholder, Text-primary filled', reference: 'Same', status: 'Matches' },
    { property: 'Description', figma: 'Regular 16; Text-disabled placeholder, Text-secondary filled; 4px below', reference: 'Same, and it grows onto more lines', status: 'Matches' },
    { property: 'Placeholders', figma: '"Add Title", "Add a description"', reference: '"Add a title", "Add a description"', status: 'Design to update', note: 'Sentence case in UI copy.' },
    { property: 'Error', figma: 'Title and message (Regular 14) in Text-error, the message right under the title', reference: 'Same', status: 'Matches', note: 'input.md said a 24px Danger icon at the end of the row; corrected 2026-09-29.' },
    { property: 'Active', figma: 'The caret (a GIF instance)', reference: 'The browser caret', status: 'Matches' },
    { property: 'Width', figma: 'Title 900, description 868', reference: 'Both fill the width', status: 'Design to update', note: 'The 32px gap at the end of the description looks unintended.' },
    { property: 'Disabled', figma: 'Only Disabled=false', reference: 'disabled: Text-disabled', status: 'Design to update' },
    { property: 'Built component', figma: '–', reference: 'InputInline', status: 'Code to update', note: 'The prototype has page-local patterns only.' },
  ],
  engineering: {
    mui: 'InputBase',
    usage: `import InputBase from '@mui/material/InputBase'

// With the 5Mins theme, plain MUI renders the reference.
<InputBase className="ds-inline-title" placeholder="Add a title" inputProps={{ 'aria-label': 'Course title' }} />
<InputBase className="ds-inline-description" multiline placeholder="Add a description" inputProps={{ 'aria-label': 'Course description' }} />`,
    props: [
      { figma: 'Description', code: 'description (undefined hides it)' },
      { figma: 'State=Enabled / Filled', code: 'title and description empty / set' },
      { figma: 'Validation=error', code: 'error (the message)' },
    ],
    theme: [
      'MuiInputBase .ds-inline-title: 32/700/1.5, Text-primary; error Text-error.',
      'MuiInputBase .ds-inline-description: 16/400/1.5, Text-secondary.',
      'Both: no padding, Text-disabled placeholder.',
    ],
    files: [
      'packages/components/src/InputField/inputTypes.overrides.ts (theme rules)',
      'packages/components/src/InputField/InputInline.tsx (layout, error and names)',
      'packages/components/src/InputField/inputTypes.figma.ts (Figma mapping)',
    ],
  },
}

export function InputInlineCompare() {
  return <CompareTemplate c={compare} />
}
