import type { FigmaMapping } from '../figma'

export const sliderFigma: FigmaMapping = {
  component: 'Slider (MUI)',
  mui: 'Slider',
  page: 'Slider',
  set: '<Slider>',
  nodes: { light: '11045:9459', dark: '10662:14039' },
  variants: {
    State: ['Enabled', 'Hover', 'Disabled'],
    '%': ['50', '80', '0'],
  },
}
