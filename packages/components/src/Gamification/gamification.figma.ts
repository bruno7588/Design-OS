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
