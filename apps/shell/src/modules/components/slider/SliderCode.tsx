import { Stack, Typography } from '@mui/material'
import overridesSource from '@design-os/components/src/Slider/slider.overrides.ts?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import Slider from '@mui/material/Slider'

// With the 5Mins theme, plain MUI renders the reference.
<Typography id="pass-mark">Pass mark: {value}%</Typography>
<Slider aria-labelledby="pass-mark" value={value} onChange={(_, v) => setValue(v)} step={5} getAriaValueText={(v) => \`\${v}%\`} />`

export function SliderCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is plain MUI 5.18 Slider with the 5Mins theme: no wrapper. The rail, track, thumb, halo and disabled
        colours are theme overrides. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="slider.overrides.ts" caption="packages/components/src/Slider" code={overridesSource} />
    </Stack>
  )
}
