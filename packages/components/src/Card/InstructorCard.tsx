import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { CardRoot, CardTitle, clamp } from './CardBase'

// 5Mins Instructor card (Figma Card/Instructor: dark 5149:27386, light 9926:2477): photo, name,
// a short bio and up to two skill rows.
//
// Figma → props
//   Device=Desktop / Mobile → device "desktop" (404 × 160) | "mobile" (340 × 137)
//   State=Hover             → :hover (desktop): Cards-background-hover

export interface InstructorSkill {
  label: string
  /** The 16px skill illustration (Icons/Skill Icon). */
  icon?: ReactNode
}

export interface InstructorCardProps {
  device?: 'desktop' | 'mobile'
  name: string
  bio?: string
  image?: string
  /** Up to two rows show. */
  skills?: InstructorSkill[]
  onClick?: () => void
  className?: string
  sx?: SxProps<Theme>
}

export function InstructorCard({ device = 'desktop', name, bio, image, skills = [], onClick, className, sx }: InstructorCardProps) {
  const mobile = device === 'mobile'
  return (
    <CardRoot
      className={['ds-instructor-card', className].filter(Boolean).join(' ')}
      hover={!mobile}
      sx={[{ display: 'flex', width: mobile ? 340 : 404, height: mobile ? 137 : 160 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        className="ds-instructor-photo"
        sx={(theme) => ({
          width: 120,
          flexShrink: 0,
          backgroundColor: theme.tokens.semantic.inputBackground,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        })}
      />
      <Box
        sx={(theme) => ({
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: `${mobile ? theme.tokens.space.m : theme.tokens.space.sm}px`,
          padding: `${mobile ? theme.tokens.space.sm : theme.tokens.space.m}px`,
        })}
      >
        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.s}px`, minWidth: 0 })}>
          <CardTitle onClick={onClick} sx={(theme) => ({ fontSize: mobile ? 14 : 16, fontWeight: 700, lineHeight: 1.5, color: theme.tokens.semantic.textPrimary, ...clamp(1) })}>
            {name}
          </CardTitle>
          {bio && (
            <Box component="p" sx={(theme) => ({ m: 0, fontSize: mobile ? 12 : 14, lineHeight: mobile ? 1.2 : 1.5, color: theme.tokens.semantic.textSecondary, ...clamp(2) })}>
              {bio}
            </Box>
          )}
        </Box>
        {skills.length > 0 && (
          <Box component="ul" aria-label="Skills" sx={(theme) => ({ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.s}px`, minWidth: 0 })}>
            {skills.slice(0, 2).map((s) => (
              <Box
                component="li"
                key={s.label}
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${theme.tokens.space.xs}px`,
                  minWidth: 0,
                  fontSize: 12,
                  lineHeight: 1.2,
                  color: theme.tokens.semantic.textTertiary,
                  '& > .ds-skill-icon': { display: 'flex', width: 16, height: 16, flexShrink: 0, '& > svg, & > img': { width: 16, height: 16 } },
                })}
              >
                {s.icon && (
                  <span className="ds-skill-icon" aria-hidden>
                    {s.icon}
                  </span>
                )}
                <Box component="span" sx={clamp(1)}>
                  {s.label}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </CardRoot>
  )
}
