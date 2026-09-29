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

export const courseCardFigma: FigmaMapping = {
  component: 'CourseCard',
  mui: 'Box (article) + Badge + LinearProgress',
  page: 'Cards',
  set: 'Card/Courses',
  nodes: { light: '11916:10292', dark: '5132:5756' },
  variants: { Device: ['Mobile', 'Desktop'], New: ['false', 'true'], 'Due date': ['false', 'true'], State: ['Enabled', 'Hover'] },
}

export const categoryCardFigma: FigmaMapping = {
  component: 'CategoryCard',
  mui: 'Box (article) + Badge + Tooltip',
  page: 'Cards',
  set: 'Card/ Category',
  nodes: { light: '10574:3913', dark: '10176:1806' },
  variants: { Device: ['Desktop', 'Mobile'], Disabled: ['false', 'true'], State: ['Enabled', 'Hover'], New: ['false', 'true'] },
}

export const folderCardFigma: FigmaMapping = {
  component: 'FolderCard',
  mui: 'Box (article) + ButtonBase (New Folder)',
  page: 'Cards',
  set: 'Card/Folder',
  nodes: { light: '10175:3183', dark: '10175:3106' },
  variants: { 'New folder': ['false', 'true'], State: ['Enabled', 'Hover'], 'Number of courses': ['0', '3+', 'n/a', '2', '1'] },
}

export const skillCardFigma: FigmaMapping = {
  component: 'SkillCard',
  mui: 'Box + IconButton',
  page: 'Cards',
  set: 'Card/skill',
  nodes: { light: '11828:5184', dark: '11802:3704' },
  variants: { Disabled: ['false', 'true'], State: ['Enabled', 'Hover', 'n/a'], Remove: ['false', 'true'] },
}

export const instructorCardFigma: FigmaMapping = {
  component: 'InstructorCard',
  mui: 'Box (article)',
  page: 'Cards',
  set: 'Card/Instructor',
  nodes: { light: '9926:2477', dark: '5149:27386' },
  variants: { Device: ['Mobile', 'Desktop'], State: ['Enabled', 'Hover'] },
}

export const externalTrainingCardFigma: FigmaMapping = {
  component: 'ExternalTrainingCard',
  mui: 'Box (article)',
  page: 'Cards',
  set: 'Card/External training',
  nodes: { light: '9577:3582', dark: '5908:21523' },
  variants: { Device: ['Mobile', 'Desktop'], State: ['Enabled', 'Hover'] },
}

export const marketplaceCardFigma: FigmaMapping = {
  component: 'MarketplaceCard',
  mui: 'Box (article)',
  page: 'Cards',
  set: 'Card/Marketplace',
  nodes: { light: '9577:3648', dark: '5213:4524' },
  variants: { Type: ['Subscription', 'Coaching', 'Reward'], Device: ['Mobile', 'Desktop'] },
}
