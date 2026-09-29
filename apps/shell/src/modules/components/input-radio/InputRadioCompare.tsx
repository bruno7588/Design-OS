import { inputRadioFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { InputRadioMatrix } from './InputRadioMatrix'

// Figma = Input field/Radio button (dark 8974:30479, light 12114:20857), checked 2026-09-29.
const compare: Compare = {
  page: inputRadioFigma.page,
  set: inputRadioFigma.set,
  frames: { light: '/figma/input-radio-light.png', dark: '/figma/input-radio-dark.png' },
  live: (mode) => <InputRadioMatrix mode={mode} />,
  differences: [
    { property: 'Field', figma: 'As the input field: 37px, padding 8/12, radius 12, Border-elevated', reference: 'Same', status: 'Matches' },
    { property: 'Radio', figma: '21px radio-button instance, 8px before the text', reference: 'MUI Radio at 21px', status: 'Matches' },
    { property: 'Hover', figma: 'Border-hover and Input-background; the radio’s Page-background-hover halo', reference: 'Same', status: 'Matches' },
    { property: 'Active', figma: 'Selected border', reference: 'Same', status: 'Matches' },
    { property: 'Selected', figma: 'Selected ring and dot; the border stays Border-elevated', reference: 'Same', status: 'Matches' },
    { property: 'Success', figma: 'The selected radio in Success-500; no icon', reference: 'Same', status: 'Matches', note: 'input.md says a trailing bold tick-circle. Figma has none: the doc is out of date.' },
    { property: 'Disabled', figma: 'Border; label, radio and text Text-disabled', reference: 'Same', status: 'Matches' },
    { property: 'Disabled variant name', figma: 'Selected=true, but the radio inside is Selected=false', reference: 'Follows the drawing', status: 'Design to update', note: 'Rename the variant, or swap in the selected radio.' },
    { property: 'Label', figma: 'Semibold 14, Text-secondary', reference: 'Same', status: 'Matches', note: 'input.md says Medium 14. The label is Semibold everywhere.' },
    { property: 'Helper and error', figma: 'Not in the set', reference: 'MUI helperText works, as in the input field', status: 'Design to update' },
    { property: 'Built component', figma: '–', reference: 'InputRadio', status: 'Code to update', note: 'The prototype has no component; answer rows are hand-rolled.' },
  ],
  engineering: {
    mui: 'TextField (outlined) with a Radio adornment',
    usage: `<RadioGroup aria-labelledby="answers-label" name="correct" value={correct} onChange={(e) => setCorrect(e.target.value)}>
  <InputRadio radioValue="0" radioLabel="Answer 1 is correct" inputProps={{ 'aria-label': 'Answer 1' }} value={a1} onChange={…} />
  <InputRadio radioValue="1" radioLabel="Answer 2 is correct" inputProps={{ 'aria-label': 'Answer 2' }} value={a2} onChange={…} />
</RadioGroup>`,
    props: [
      { figma: 'Label', code: 'label' },
      { figma: 'Selected', code: 'checked, or radioValue inside a RadioGroup' },
      { figma: 'Validation=success', code: 'validation="success"' },
      { figma: 'Disabled', code: 'disabled' },
    ],
    theme: [
      'MuiOutlinedInput .ds-radio-input: the radio 21px with no padding; disabled Border.',
      'Hovering the field shows the radio halo; .ds-success turns the checked radio Success-500.',
    ],
    files: [
      'packages/components/src/InputField/inputTypes.overrides.ts (theme rules)',
      'packages/components/src/InputField/InputRadio.tsx (the radio adornment)',
      'packages/components/src/InputField/inputTypes.figma.ts (Figma mapping)',
    ],
  },
}

export function InputRadioCompare() {
  return <CompareTemplate c={compare} />
}
