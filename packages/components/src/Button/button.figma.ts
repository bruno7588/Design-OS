import type { FigmaMapping, MappedFigma } from '../figma'
import type { ButtonProps } from './Button'

// The Figma "Configuration" property, mapped to MUI props.
export const CONFIGURATIONS = [
  { figma: 'Filled', variant: 'contained', color: 'primary' },
  { figma: 'Outlined', variant: 'outlined', color: 'primary' },
  { figma: 'Outlined-2', variant: 'outlined2', color: 'primary' },
  { figma: 'Text', variant: 'text', color: 'primary' },
  { figma: 'Link', variant: 'link', color: 'primary' },
  { figma: 'Danger', variant: 'contained', color: 'error' },
  { figma: 'Danger-outlined', variant: 'outlined', color: 'error' },
  { figma: 'Danger-text', variant: 'text', color: 'error' },
  { figma: 'Warning', variant: 'contained', color: 'warning' },
  { figma: 'Warning-outlined', variant: 'outlined', color: 'warning' },
  { figma: 'Warning-text', variant: 'text', color: 'warning' },
  { figma: 'Success', variant: 'contained', color: 'success' },
  { figma: 'Success-outlined', variant: 'outlined', color: 'success' },
  { figma: 'Success-text', variant: 'text', color: 'success' },
  { figma: 'AI', variant: 'contained', color: 'ai' },
  { figma: 'AI-Outlined', variant: 'outlined', color: 'ai' },
] as const satisfies ReadonlyArray<{ figma: string; variant: ButtonProps['variant']; color: ButtonProps['color'] }>

// The Figma "Size" property, mapped to MUI `size`.
export const SIZES = [
  { figma: 'Small', size: 'small' },
  { figma: 'Medium', size: 'medium' },
  { figma: 'Large', size: 'large' },
] as const

export const buttonFigma: MappedFigma = {
  component: 'Button',
  mui: 'Button',
  page: 'Buttons',
  set: 'Buttons',
  nodes: { light: '12141:7567', dark: '10825:3269' },
  variants: {
    Configuration: CONFIGURATIONS.map((c) => c.figma),
    Size: SIZES.map((s) => s.figma),
    // Figma uses "n/a" for the disabled frames; the reference covers them with `disabled`.
    State: ['Enabled', 'Hover', 'Pressed', 'Loading', 'n/a'],
    Disabled: ['false', 'true'],
    Icon: ['true', 'false'],
  },
  map: {
    kind: 'leaf',
    props: {
      'variant|color': {
        figma: 'Configuration',
        values: {
          ...Object.fromEntries(CONFIGURATIONS.map((c) => [`${c.variant}|${c.color}`, c.figma])),
          ...Object.fromEntries(CONFIGURATIONS.filter((c) => c.color === 'primary').map((c) => [`${c.variant}|undefined`, c.figma])),
          'undefined|*': 'Filled',
          '*': 'Filled',
        },
      },
      size: { figma: 'Size', values: { ...Object.fromEntries(SIZES.map((s) => [s.size, s.figma])), '*': 'Medium' } },
      'disabled|loading': { figma: 'State', values: { 'true|*': 'n/a', '*|true': 'Loading', '*': 'Enabled' } },
      disabled: { figma: 'Disabled', values: { true: 'true', '*': 'false' } },
      icon: { figma: 'Icon', values: { undefined: 'false', '*': 'true' } },
    },
  },
}
