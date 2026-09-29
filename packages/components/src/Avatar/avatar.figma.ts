import type { FigmaMapping } from '../figma'

export const avatarFigma: FigmaMapping = {
  component: 'Avatar',
  mui: 'Avatar',
  page: 'Avatar',
  set: 'Avatar',
  nodes: { light: '11914:2605', dark: '5097:5884' },
  variants: {
    Size: ['24px', '32px', '40px', '48px', '56px', '64px', '72px'],
    Picture: ['true', 'false'],
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

