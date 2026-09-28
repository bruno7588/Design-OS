import { CONFIGURATIONS, SIZES, type ButtonProps } from '@design-os/components'

// The Figma mapping lives with the component (button.figma.ts); re-exported for the docs.
export { CONFIGURATIONS, SIZES }

export type Configuration = (typeof CONFIGURATIONS)[number]['figma']

export const STATES = ['Enabled', 'Hover', 'Pressed', 'Focus', 'Disabled', 'Loading'] as const
export type State = (typeof STATES)[number]

export const configuration = (name: Configuration) => CONFIGURATIONS.find((c) => c.figma === name)!

/** Props that put a button into a state without a pointer, for the matrix and visual tests. */
export function stateProps(state: State): Partial<ButtonProps> {
  switch (state) {
    case 'Hover':
      return { className: 'ds-hover' }
    case 'Pressed':
      return { className: 'ds-pressed' }
    case 'Focus':
      return { className: 'ds-focus' }
    case 'Disabled':
      return { disabled: true }
    case 'Loading':
      return { loading: true }
    default:
      return {}
  }
}

/** JSX a developer would write for this configuration. */
export function usageSnippet(opts: { config: Configuration; size: string; icon: boolean; state: State; label: string }) {
  const c = configuration(opts.config)
  const props = [
    c.variant !== 'contained' && `variant="${c.variant}"`,
    c.color !== 'primary' && `color="${c.color}"`,
    opts.size !== 'medium' && `size="${opts.size}"`,
    opts.icon && `icon={<Add color="currentColor" />}`,
    opts.state === 'Disabled' && 'disabled',
    opts.state === 'Loading' && 'loading',
  ].filter(Boolean)
  const imports = [`import { Button } from '@design-os/components'`, opts.icon && `import { Add } from 'iconsax-react'`]
    .filter(Boolean)
    .join('\n')
  return `${imports}\n\n<Button${props.length ? ' ' + props.join(' ') : ''}>${opts.label}</Button>`
}
