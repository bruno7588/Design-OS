import type { FigmaMapping } from '../figma'

export const lessonCardFigma: FigmaMapping = {
  component: 'LessonCard',
  mui: 'Box (article) + Tag + Badge + Button + LinearProgress',
  page: 'Cards',
  set: 'Card/Lessons',
  nodes: { light: '11916:9353', dark: '5144:14181' },
  variants: {
    View: ['grid', 'list'],
    Device: ['Mobile', 'Web app', 'n/a', 'Admin'],
    Disabled: ['false', 'true'],
    Completed: ['false', 'true'],
    State: ['Enabled', 'Hover'],
    Quiz: ['Completed', 'Pending', 'n/a'],
  },
}

export const assessmentCardFigma: FigmaMapping = {
  component: 'AssessmentCard',
  mui: 'Box (article) + Badge + Button + IconButton',
  page: 'Cards',
  set: 'Card/Assessments',
  nodes: { light: '12104:3647', dark: '10242:2782' },
  variants: { Device: ['Web App', 'Mobile app', 'Admin'], Disabled: ['false', 'true'], State: ['Enabled', 'Hover'], Completed: ['false', 'true'] },
}

export const resourceCardFigma: FigmaMapping = {
  component: 'ResourceCard',
  mui: 'Box (article) + IconButton + Tooltip',
  page: 'Cards',
  set: 'Card/Resources',
  nodes: { light: '12228:2749', dark: '12213:3040' },
  variants: { Device: ['Mobile app', 'Web/Admin'], State: ['Enabled', 'Hover'] },
}

export const typeThumbnailFigma: FigmaMapping = {
  component: 'TypeThumbnail',
  mui: 'Box (img)',
  page: 'Cards',
  set: 'Type thumbnail',
  nodes: { light: '12228:2778', dark: '12213:2984' },
  // The light set has no Image variant yet; code has it.
  variants: { Type: ['PDF', 'Excel', 'Word', 'PowerPoint', 'Image', 'External link'] },
}
