import type { FigmaMapping } from '../figma'

export const progressBarFigma: FigmaMapping = {
  component: 'ProgressBar',
  mui: 'LinearProgress (determinate)',
  page: 'Gamification',
  set: 'Progress bar',
  nodes: { light: '12000:10067', dark: '7046:25097' },
  variants: { Progress: ['0%', '12%', '25%', '37%', '50%', '62%', '75%', '87%', '100%'] },
}
