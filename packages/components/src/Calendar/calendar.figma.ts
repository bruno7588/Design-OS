import type { FigmaMapping } from '../figma'

export const calendarFigma: FigmaMapping = {
  component: 'DateField',
  mui: 'DesktopDatePicker (MUI X Date Pickers 7)',
  page: 'Calendar',
  set: 'Calendar',
  nodes: { light: '12204:5743', dark: '11529:406' },
  variants: {
    Calendar: ['Active', 'Enabled', 'Hover', 'Error'],
    Label: ['true', 'false'],
  },
}

export const dayItemFigma: FigmaMapping = {
  component: 'DateField',
  mui: 'PickersDay',
  page: 'Calendar',
  set: 'Day item',
  nodes: { light: '11916:6094', dark: '5279:26511' },
  // State=Illustration (the streak mark) is out of scope for the date field (Bruno, 2026-09-29).
  variants: {
    Disabled: ['false', 'true'],
    Selected: ['false', 'true'],
    State: ['n/a', 'Enabled', 'Hover', 'Focus', 'Current day'],
  },
}
