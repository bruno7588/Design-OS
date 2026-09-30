import type { FigmaMapping } from '../figma'

export const certificateIllustrationFigma: FigmaMapping = {
  component: 'CertificateIllustration',
  mui: 'img',
  page: 'Gamification',
  set: 'Illustrations/Certificate',
  nodes: { light: '11196:7670', dark: '9120:9301' },
  variants: { Size: ['XL', 'L', 'M', 'S'] },
}

export const gamificationIllustrationFigma: FigmaMapping = {
  component: 'GamificationIllustration',
  mui: 'img',
  page: 'Gamification',
  set: 'Illustrations/Gamification',
  nodes: { light: '11196:7707', dark: '11196:7607' },
  variants: { Type: ['Progress', 'Certificate', 'Quiz', 'Learning Path'] },
}

export const progressIllustrationFigma: FigmaMapping = {
  component: 'ProgressIllustration',
  mui: 'img',
  page: 'Gamification',
  set: 'Illustrations/ Progress',
  nodes: { light: '11196:7723', dark: '10157:9081' },
  variants: { Type: ['Streak', 'Points', 'Jewels', 'Certificates', 'Passed', 'Nearly there', 'Not passed'] },
}

export const functionIllustrationFigma: FigmaMapping = {
  component: 'FunctionIllustration',
  mui: 'img',
  page: 'Gamification',
  set: 'Illustrations/ Functions',
  nodes: { light: '9120:9874', dark: '9120:9874' },
  variants: {
    Function: ['Creative', 'Customer Experience', 'Customer Happiness', 'Customer Success', 'Engineering', 'Finances', 'General Admin', 'IT Network & Security', 'Logistics', 'Leadership', 'Legal', 'Marketing', 'Operations', 'Partnerships', 'People', 'Product', 'Rev Ops', 'Sales', 'Custom', 'Contact Centre'],
  },
}

export const assessmentIllustrationFigma: FigmaMapping = {
  component: 'AssessmentIllustration',
  mui: 'img',
  page: 'Gamification',
  set: 'Illustrations/ Assessments',
  nodes: { light: '12154:10371', dark: '9120:8850' },
  variants: {
    Type: ['Lesson quiz', 'Multiple choice', 'Short text', 'Exercise', 'Situational test', 'Fast Track', 'Poll', 'Fill in the blank', 'Sequence', 'Categorise', 'Match the pairs'],
    Device: ['Mobile', 'Desktop'],
  },
}

export const emptyStateIllustrationFigma: FigmaMapping = {
  component: 'EmptyStateIllustration',
  mui: 'img',
  page: 'Empty state',
  set: 'Illustrations Empty state',
  nodes: { light: '9120:8372', dark: '9120:8372' },
  variants: {
    Illustration: ['Certificates', 'Pie chart', 'Empty box', 'Search', 'Share', 'No bookmarks', 'No automations', 'Connect brain', 'No likes', 'Not following', 'Cloud', 'UFO', 'Party', 'Flashcards', 'Custom Fields', 'Computer screen', 'Calendar', 'Rocket', 'Message', 'Buble', 'No results', 'No activity', 'No internet', 'Skill level', 'Add users', 'No playlists', 'Add', 'Category', 'Quiz', 'Resources', 'Deactivated', 'HRIS mapping', 'Programs'],
  },
}
