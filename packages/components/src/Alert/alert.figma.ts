import type { FigmaMapping } from '../figma'

export const alertFigma: FigmaMapping = {
  component: 'Alert',
  mui: 'Alert (variant="standard")',
  page: 'Alert',
  set: 'Alert',
  nodes: { light: '12060:2785', dark: '3658:32304' },
  variants: {
    Type: ['Callout', 'Alert'],
    Illustration: ['true', 'false'],
    Icon: ['false', 'true'],
    Button: ['false', 'true'],
    'Supporting text': ['false', 'true'],
  },
}
