import type { FigmaMapping } from '../figma'

export const quizOptionsFigma: FigmaMapping = {
  component: 'QuizOptions, QuizExplanation',
  mui: 'Radio (in a radiogroup)',
  page: 'Gamification',
  set: 'Quiz/Options',
  nodes: { light: '12112:10047', dark: '5504:24966' },
  variants: {
    Device: ['Mobile', 'Desktop'],
    Disabled: ['false', 'true'],
    State: ['Enabled', 'Hover', 'Read only'],
    Selected: ['false', 'true'],
    Validation: ['n/a', 'Success', 'Error'],
    Explanation: ['false', 'true'],
  },
}

export const rankingBadgeFigma: FigmaMapping = {
  component: 'RankingBadge',
  mui: 'Box',
  page: 'Gamification',
  set: 'Ranking, leaderboard',
  nodes: { light: '8442:6198', dark: '2613:26421' },
  variants: { Rank: ['1', '2', '3', '4'] },
}

export const learningPathFigma: FigmaMapping = {
  component: 'LearningPathCard',
  mui: 'Box (CardRoot) + Button + LinearProgress',
  page: 'Gamification',
  set: 'Learning path',
  nodes: { light: '11984:7015', dark: '5514:8463' },
  variants: {
    State: ['In progress', 'Completed', 'Disabled', 'Pending'],
    Expanded: ['false', 'true'],
    Size: ['s', 'md', 'l'],
    Type: ['Level', 'Certificate'],
    Modules: ['true', 'false'],
  },
}

export const certificateCardFigma: FigmaMapping = {
  component: 'CertificateCard',
  mui: 'Box + Button',
  page: 'Gamification',
  set: 'Certificate instances',
  nodes: { light: '8442:6119', dark: '5514:2390' },
  variants: { Type: ['Mastery', 'Master', 'Expert', 'Advanced'], Size: ['small', 'md', 'large'] },
}

export const levelIllustrationFigma: FigmaMapping = {
  component: 'LevelIllustration',
  mui: 'img',
  page: 'Gamification',
  set: 'Illustrations/ Learning path',
  nodes: { light: '11196:8794', dark: '9120:9437' },
  variants: { Level: ['1', '2', '3', '4', '5', 'Advanced', 'Expert', 'Master'], Disabled: ['false', 'true'], Size: ['small', 'large'] },
}
