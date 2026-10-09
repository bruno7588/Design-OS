import type { FigmaMapping, MappedFigma } from '../figma'

// The Table is a component with slots; its light version is an instance (11927:7332).
export const tableFigma: MappedFigma = {
  component: 'Table (MUI)',
  mui: 'Table',
  page: 'Table',
  set: 'Table',
  nodes: { light: '11927:7332', dark: '7896:2624' },
  variants: {},
  map: { kind: 'container' },
}

export const tableRowFigma: MappedFigma = {
  component: 'TableRow (MUI)',
  mui: 'TableRow',
  page: 'Table',
  set: 'Table row',
  nodes: { light: '11927:7487', dark: '7896:2804' },
  variants: {
    Selected: ['false', 'true'],
    Disabled: ['false', 'true'],
    // Figma uses "n/a" for the disabled row; the reference covers it with aria-disabled.
    State: ['Enabled', 'Hover', 'n/a'],
  },
  map: { kind: 'container' },
}

export const tableHeaderFigma: MappedFigma = {
  component: 'TableHead (MUI)',
  mui: 'TableCell (head), TableSortLabel',
  page: 'Table',
  set: 'Table header',
  nodes: { light: '11927:7554', dark: '11872:3077' },
  variants: { Type: ['Text'], Checkbox: ['false', 'true'], Icon: ['false', 'true'], Disabled: ['false', 'true'] },
  map: { kind: 'container' },
}

// Illustration cells need the Gamification illustrations, not built yet.
export const tableDataFigma: MappedFigma = {
  component: 'CellContent',
  mui: 'TableCell (body)',
  page: 'Table',
  set: 'Table data',
  nodes: { light: '11927:7602', dark: '11766:619' },
  variants: {
    Text: ['true', 'false'],
    'Supporting text': ['false', 'true'],
    date: ['false', 'true'],
    Checkbox: ['false', 'true'],
    Avatar: ['false', 'true'],
    Thumbnail: ['false', 'true'],
    Icon: ['false', 'true'],
    'Progress bar': ['false', 'true'],
    Illustration: ['false'],
    Button: ['false', 'true'],
    Badge: ['false', 'true'],
    Dropdown: ['false', 'true'],
    Disabled: ['false', 'true'],
    State: ['Hover', 'Selected', 'Read-only', 'Enabled'],
  },
  map: { kind: 'container' },
}

export const thumbnailTypeFigma: FigmaMapping = {
  component: 'TableThumbnail',
  mui: 'img',
  page: 'Table',
  set: 'Thumbnail type',
  nodes: { light: '9537:7400', dark: '9537:7400' },
  variants: { Thumbnail: ['Course', 'Your content', 'Lesson'] },
}
