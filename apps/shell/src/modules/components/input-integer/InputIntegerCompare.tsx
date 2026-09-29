import { inputIntegerFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { InputIntegerMatrix } from './InputIntegerMatrix'

// Figma = Input field/Integer (dark 10145:10895, light 12114:20914), checked 2026-09-29.
const compare: Compare = {
  page: inputIntegerFigma.page,
  set: inputIntegerFigma.set,
  frames: { light: '/figma/input-integer-light.png', dark: '/figma/input-integer-dark.png' },
  live: (mode) => <InputIntegerMatrix mode={mode} />,
  differences: [
    { property: 'Field', figma: '37px: padding 8/12, radius 12, 1px Border-elevated inside; hugs its content', reference: 'Same', status: 'Matches' },
    { property: '− and +', figma: 'Iconsax minus and add, 20px, Text-secondary, 12px from the value', reference: '20px icons in a 24px halo that doesn’t grow the field', status: 'Matches', note: 'Figma drew them at 21px until 2026-09-29; now 20px, the standard icon size. The field is 114px.' },
    { property: 'Value', figma: 'Regular 14, centred in 26px; empty "0" in Text-disabled', reference: 'Same (value null shows the placeholder)', status: 'Matches' },
    { property: 'Hover', figma: 'Border-hover, no fill; Page-background-hover halo on the button, radius 40', reference: 'Same (the halo follows the pointer)', status: 'Matches' },
    { property: 'Active', figma: 'Selected border', reference: 'Same', status: 'Matches' },
    { property: 'Helper text', figma: 'Regular 14, Text-secondary', reference: 'Same (the input field’s is Text-tertiary)', status: 'Matches' },
    { property: 'Error', figma: 'Text-error border, label and message; no icon', reference: 'Same', status: 'Matches' },
    { property: 'Success', figma: 'Looks the same as Filled', reference: 'Same', status: 'Design to update', note: 'The variant changes nothing. Either remove it or give it the TickCircle, as the input field has.' },
    { property: 'Disabled', figma: 'Border; label, value, icons and helper Text-disabled', reference: 'Same', status: 'Matches' },
    { property: 'At min or max', figma: 'Not in the set', reference: 'The button turns Text-disabled', status: 'Design to update' },
    { property: 'Label at the start', figma: 'Not in the set', reference: 'Not built', status: 'Design to update', note: 'The prototype has an input-integer--inline variant (label beside the field) and a suffix such as "%". Neither is in Figma.' },
    { property: 'Keyboard', figma: '–', reference: 'Spinbutton: arrows, Home and End', status: 'Code to update', note: 'The prototype input has no role or arrow keys, and its − and + are skipped by Tab with no other way to step.' },
  ],
  engineering: {
    mui: 'TextField (outlined) with IconButton adornments',
    usage: `import { InputInteger } from '@design-os/components'

<InputInteger label="Maximum course attempts" value={attempts} onChange={setAttempts} min={1} max={10} />`,
    props: [
      { figma: 'Label', code: 'label' },
      { figma: 'Helper text', code: 'helperText' },
      { figma: 'Validation=error', code: 'validation="error" (MUI error)' },
      { figma: 'Validation=success', code: 'validation="success"' },
      { figma: 'State=Enabled / Filled', code: 'value null / a number' },
      { figma: 'Disabled', code: 'disabled' },
    ],
    theme: [
      'MuiOutlinedInput .ds-integer: gap 12, width fit-content, input 26px centred, no hover fill, disabled Border.',
      '.ds-integer-step: 24px round IconButton with -2px margin, Text-secondary, hover Page-background-hover.',
      'MuiTextField: helper text Text-secondary next to a .ds-integer box.',
    ],
    files: [
      'packages/components/src/InputField/inputTypes.overrides.ts (theme rules)',
      'packages/components/src/InputField/InputInteger.tsx (stepping, typing and the spinbutton)',
      'packages/components/src/InputField/inputTypes.figma.ts (Figma mapping)',
    ],
  },
}

export function InputIntegerCompare() {
  return <CompareTemplate c={compare} />
}
