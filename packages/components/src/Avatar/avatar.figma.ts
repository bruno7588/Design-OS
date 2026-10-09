import type { FigmaMapping, MappedFigma } from '../figma'

export const avatarFigma: MappedFigma = {
  component: 'Avatar',
  mui: 'Avatar',
  page: 'Avatar',
  set: 'Avatar',
  nodes: { light: '11914:2605', dark: '5097:5884' },
  variants: {
    Size: ['24px', '32px', '40px', '48px', '56px', '64px', '72px'],
    Picture: ['true', 'false'],
  },
  map: {
    kind: 'leaf',
    props: {
      size: { figma: 'Size', values: { 24: '24px', 32: '32px', 48: '48px', 56: '56px', 64: '64px', 72: '72px', '*': '40px' } },
      src: { figma: 'Picture', values: { undefined: 'false', '': 'false', '*': 'true' } },
    },
  },
}

export const avatarGroupFigma: FigmaMapping = {
  component: 'AvatarGroup',
  mui: 'AvatarGroup',
  page: 'Avatar',
  set: 'Avatar group',
  nodes: { light: '11915:3296', dark: '5097:5584' },
  variants: { Size: ['24px', '32px', '40px'] },
}

