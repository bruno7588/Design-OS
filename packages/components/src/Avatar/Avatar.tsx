import { forwardRef } from 'react'
import MuiAvatar, { type AvatarProps as MuiAvatarProps } from '@mui/material/Avatar'
import MuiAvatarGroup, { type AvatarGroupProps as MuiAvatarGroupProps } from '@mui/material/AvatarGroup'

// 5Mins Avatar and Avatar group. The look is in the theme (avatar.overrides.tsx);
// the wrappers only turn the Figma sizes into dimensions.
//
// Figma → props
//   Size=24px…72px          → size
//   Picture=true / false    → src (without one, the fallback face)
//   Avatar group Size       → AvatarGroup size (24, 32, 40): overlap 8/12/16, counter 8/10/12px
//   Num remaining           → max (shown avatars + 1) and total

export type AvatarSize = 24 | 32 | 40 | 48 | 56 | 64 | 72
export type AvatarGroupSize = 24 | 32 | 40

export interface AvatarProps extends MuiAvatarProps {
  size?: AvatarSize
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar({ size = 40, sx, ...props }, ref) {
  return <MuiAvatar ref={ref} sx={[{ width: size, height: size }, ...(Array.isArray(sx) ? sx : [sx])]} {...props} />
})

// Figma: overlap and counter text per group size.
const GROUP = {
  24: { overlap: 8, font: 8, lineHeight: 1.5 },
  32: { overlap: 12, font: 10, lineHeight: 1.5 },
  40: { overlap: 16, font: 12, lineHeight: 1.2 },
} as const

export interface AvatarGroupProps extends Omit<MuiAvatarGroupProps, 'spacing'> {
  size?: AvatarGroupSize
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { size = 24, max = 4, sx, ...props },
  ref,
) {
  const g = GROUP[size]
  return (
    <MuiAvatarGroup
      ref={ref}
      max={max}
      spacing={g.overlap}
      sx={[
        { '& .MuiAvatar-root': { width: size, height: size, fontSize: g.font, lineHeight: g.lineHeight } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  )
})
