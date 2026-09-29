import type { FigmaMapping } from '../figma'

export const breadcrumbItemFigma: FigmaMapping = {
  component: 'Breadcrumb',
  mui: 'Breadcrumbs',
  page: 'Navigation',
  set: 'Breadcrumb item',
  nodes: { light: '11935:2383', dark: '8497:1494' },
  variants: {
    Type: ['Link', 'Current page'],
    // Figma uses "n/a" for the disabled frames; the reference covers them with `disabled`.
    State: ['Hover', 'Enabled', 'n/a'],
    Disabled: ['false', 'true'],
  },
}

// The trail itself: a component with no variants. Its light version is an instance (11935:2368).
export const breadcrumbFigma: FigmaMapping = {
  component: 'Breadcrumb',
  mui: 'Breadcrumbs',
  page: 'Navigation',
  set: 'Breadcrumb',
  nodes: { light: '11935:2368', dark: '8497:2231' },
  variants: {},
}
