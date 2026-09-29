import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/InputField/InputRadio.tsx?raw'
import overridesSource from '@design-os/components/src/InputField/inputTypes.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import RadioGroup from '@mui/material/RadioGroup'
import { InputRadio } from '@design-os/components'

// Quiz answers: people type each option and pick the correct one.
<RadioGroup aria-labelledby="answers-label" name="correct" value={correct} onChange={(e) => setCorrect(e.target.value)}>
  {answers.map((answer, i) => (
    <InputRadio
      key={i}
      radioValue={String(i)}
      radioLabel={\`Answer \${i + 1} is correct\`}
      inputProps={{ 'aria-label': \`Answer \${i + 1}\` }}
      placeholder="Add an answer"
      value={answer}
      onChange={(e) => setAnswer(i, e.target.value)}
    />
  ))}
</RadioGroup>

// Standalone, with a label
<InputRadio label="Other" radioLabel="Choose other" checked={other} onSelect={() => setOther(true)} />`

export function InputRadioCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is MUI 5.18 TextField with the 5Mins theme and className "ds-radio-input" on the box: a MUI Radio sits
        in the start adornment at 21px, so the field stays 37px. In a RadioGroup the group handles the selection and the
        arrow keys. The files below are read from the source, so they are always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="InputRadio.tsx" caption="packages/components/src/InputField" code={source} />
      <CodeBlock title="inputTypes.overrides.ts" caption="Theme rules for the Integer, Radio button and Inline inputs" code={overridesSource} />
    </Stack>
  )
}
