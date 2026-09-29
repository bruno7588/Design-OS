import { sliderFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { SliderMatrix } from './SliderMatrix'

// Figma = <Slider> (dark 10662:14039, light 11045:9459), checked 2026-09-29.
const compare: Compare = {
  page: sliderFigma.page,
  set: sliderFigma.set,
  frames: { light: '/figma/slider-light.png', dark: '/figma/slider-dark.png' },
  live: (mode) => <SliderMatrix mode={mode} />,
  differences: [
    { property: 'Rail', figma: '4px, radius 100, Border', reference: 'Same', status: 'Matches' },
    { property: 'Track', figma: '6px, radius 100, Selected', reference: 'Same', status: 'Matches' },
    { property: 'Thumb', figma: '20px Selected, shadow 1px 1px 4px Secondary-800 at 24%', reference: 'Same (a new shadow token)', status: 'Matches' },
    { property: 'Hover', figma: '42px Selected overlay at 16%', reference: 'Same, on hover, focus and drag', status: 'Matches' },
    { property: 'Disabled', figma: 'Button-background-disabled track and thumb; Neutral-800 24% shadow', reference: 'Same', status: 'Matches' },
    { property: 'Height', figma: '44px frame', reference: '44px (19px padding round the 6px track)', status: 'Matches' },
    { property: 'Focus', figma: 'Not in the set', reference: 'The halo and a 2px focus ring', status: 'Design to update' },
    { property: 'Light version', figma: 'A copy on a board named "Dark mode", with only Surface colours set to Light', reference: '–', status: 'Design to update', note: 'Rename the board and set Text colours to Light too.' },
    { property: 'Built component', figma: '–', reference: 'Plain MUI Slider', status: 'Code to update', note: 'The prototype has no slider component.' },
  ],
  engineering: {
    mui: 'Slider',
    usage: `<Slider aria-labelledby="pass-mark" value={value} onChange={(_, v) => setValue(v)} step={5} />`,
    props: [
      { figma: 'State=Disabled', code: 'disabled' },
      { figma: '%', code: 'value' },
    ],
    theme: ['MuiSlider: rail, track, thumb, halo and disabled colours; the thumb shadow tokens sliderThumb and sliderThumbDisabled.'],
    files: ['packages/components/src/Slider/slider.overrides.ts (theme overrides)', 'packages/components/src/Slider/slider.figma.ts (Figma mapping)'],
  },
}

export function SliderCompare() {
  return <CompareTemplate c={compare} />
}
