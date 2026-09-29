import { inputFieldFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { InputMatrix } from './InputMatrix'

// Figma = Input field/Outlined (dark 8974:24610, light 12114:20561), checked 2026-09-29.
const compare: Compare = {
  page: inputFieldFigma.page,
  set: inputFieldFigma.set,
  frames: { light: '/figma/input-light.png', dark: '/figma/input-dark.png' },
  live: (mode) => <InputMatrix mode={mode} />,
  differences: [
    { property: 'Field', figma: '37px: padding 8/12, radius 12, 1px border inside', reference: 'Same', status: 'Matches', note: 'The prototype field is about 39px (border outside); design-system-guidelines.md says 12/16 padding.' },
    { property: 'Layout', figma: 'Label, field, helper, 8px apart', reference: 'Same', status: 'Matches' },
    { property: 'Type', figma: 'Label Semibold 14; value and helper Regular 14', reference: 'Same', status: 'Matches' },
    { property: 'Colours', figma: 'Border-elevated; hover Border-hover and Input-background; Active Selected', reference: 'Same', status: 'Matches' },
    { property: 'Error', figma: 'Text-error border, label and message; Bold Danger 20px, 24px from the text', reference: 'Same', status: 'Matches' },
    { property: 'Success', figma: 'Bold TickCircle in Text-success', reference: 'Same', status: 'Matches' },
    { property: 'Disabled', figma: 'Text-disabled label, value and helper; Border-elevated', reference: 'Same', status: 'Matches' },
    { property: 'Warning', figma: 'Not in the set', reference: 'Not built', status: 'Design to update', note: 'The prototype InputField has a warning validation (Linear Danger icon).' },
    { property: 'Label', figma: 'Static, above the field', reference: 'Static (MUI floating label turned off)', status: 'Matches' },
    { property: 'Raw inputs', figma: '–', reference: '–', status: 'Code to update', note: 'About 56 raw <input>s in 43 prototype files, including 9 confirm-modal fields.' },
  ],
  engineering: {
    mui: 'TextField (outlined)',
    usage: `import TextField from '@mui/material/TextField'

// With the 5Mins theme, plain MUI renders the reference.
<TextField label="Email" placeholder="name@company.com" helperText="We send the invite here" />
<TextField label="Email" error helperText="Enter an email address, like name@company.com" />`,
    props: [
      { figma: 'Label', code: 'label' },
      { figma: 'Helper text', code: 'helperText' },
      { figma: 'Validation=error', code: 'error (Design OS: validation="error" adds the icon)' },
      { figma: 'Validation=success', code: 'Design OS only: validation="success"' },
      { figma: 'Icon right', code: 'InputProps.endAdornment (Design OS: iconRight)' },
      { figma: 'Disabled', code: 'disabled' },
    ],
    theme: [
      'MuiInputLabel: static above the field, shrink by default, 14/600.',
      'MuiOutlinedInput: notched false, the outline is the border (top 0, no legend), padding 0 12px, input 8px 0.',
      'MuiFormHelperText: no margins; MuiTextField root has an 8px gap.',
    ],
    files: [
      'packages/components/src/Field/field.overrides.tsx (theme overrides)',
      'packages/components/src/InputField/InputField.tsx (validation icons)',
      'packages/components/src/InputField/inputField.figma.ts (Figma mapping)',
    ],
  },
}

export function InputCompare() {
  return <CompareTemplate c={compare} />
}
