import type { FigmaMapping } from '../figma'

export const tagFigma: FigmaMapping = {
  component: 'Tag',
  mui: 'Box (MUI has no equivalent)',
  page: 'Badges / Tags',
  set: 'Tags',
  nodes: { light: '12319:7504', dark: '4603:27712' },
  variants: {
    'Media Type': ['Video', 'PDF', 'Link', 'SCORM', 'Flashcard', 'Audio'],
    Size: ['L', 'M', 'S'],
  },
}
