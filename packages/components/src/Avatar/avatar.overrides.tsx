import type { Components, Theme } from '@mui/material/styles'
import { AvatarFallbackIcon } from '../icons/FigmaIcons'

// MuiAvatar and MuiAvatarGroup theme overrides. Implements playground/docs/design-system/avatars.md,
// cross-checked with the Figma Library: Avatar (dark 5097:5884, light 11914:2605) and
// Avatar group (dark 5097:5584, light 11915:3296).
//
// Plain MUI renders the 5Mins avatar:
//   Picture=true  → <Avatar src> (cover, fully round)
//   Picture=false → <Avatar /> shows the Figma fallback face (Emojies Type=Angel): an opaque
//                   Border face with Text-tertiary features (Figma, updated 2026-09-29)
//   Size          → width and height (24, 32, 40, 48, 56, 64, 72); the Avatar wrapper takes `size`
// In a group each avatar gets a 1px Page-background ring, and the "+N" counter is
// Page-background-hover with Text-tertiary text. As in Figma, each avatar sits on top of the
// one before, and the counter on top of all (MUI stacks the first on top; avatars.md agrees
// with MUI, Figma doesn't).

export const MuiAvatar: Components<Theme>['MuiAvatar'] = {
  defaultProps: { children: <AvatarFallbackIcon fill="transparent" style={{ width: '100%', height: '100%' }} /> },
  styleOverrides: {
    root: ({ theme }) => ({
      fontFamily: theme.typography.fontFamily,
      '& img': { objectFit: 'cover' },
    }),
    colorDefault: ({ theme }) => ({
      backgroundColor: theme.tokens.semantic.border,
      color: theme.tokens.semantic.textTertiary,
    }),
  },
}

export const MuiAvatarGroup: Components<Theme>['MuiAvatarGroup'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        '& .MuiAvatar-root': { border: `1px solid ${s.pageBackground}`, boxSizing: 'border-box', position: 'relative' },
        // MUI renders the avatars in reverse (row-reverse), so the later the avatar, the earlier in the DOM.
        ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`& .MuiAvatar-root:nth-last-of-type(${i + 1})`, { zIndex: i + 1 }])),
        // The "+N" counter: the only avatar with neither a photo nor the fallback face.
        '& .MuiAvatar-root:not(:has(img, svg))': {
          backgroundColor: s.pageBackgroundHover,
          color: s.textTertiary,
          fontWeight: 400,
          lineHeight: 1.5,
        },
      }
    },
  },
}
