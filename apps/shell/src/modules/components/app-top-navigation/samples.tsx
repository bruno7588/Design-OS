import { Box } from '@mui/material'
import { Teacher } from 'iconsax-react'
import { AppTopNav, type AppTopNavPage, type AppTopNavProps } from '@design-os/components'
import { PHOTO } from '../avatar/AvatarMatrix'

// The Figma sample content for each Page variant.
export const SAMPLE: Record<AppTopNavPage, Omit<AppTopNavProps, 'page'>> = {
  home: { chips: [{ label: 'For You', selected: true }, { label: 'Your Workspace' }], notificationsUnread: true },
  search: {},
  progress: { chips: [{ label: 'My Team', selected: true }, { label: 'My Progress' }] },
  feed: { title: 'Feed' },
  profile: { name: 'Anthony Wallace', role: 'Customer Support Specialist', avatarSrc: PHOTO },
  detail: { title: 'Notifications' },
  // The skill illustrations come with the Illustrations batch; an Iconsax stand-in until then.
  skill: { title: 'Skill name', skillIcon: <Teacher size={24} variant="Bulk" color="currentColor" /> },
  'lesson-feed': { points: '45 Pt' },
}

export const PAGES: { page: AppTopNavPage; figma: string }[] = [
  { page: 'home', figma: 'Home' },
  { page: 'search', figma: 'Search' },
  { page: 'progress', figma: 'Progress' },
  { page: 'feed', figma: 'Feed' },
  { page: 'profile', figma: 'Profile' },
  { page: 'detail', figma: 'Detail page' },
  { page: 'skill', figma: 'Skill' },
  { page: 'lesson-feed', figma: 'Lesson feed' },
]

/** Lesson feed floats over a video; the docs stand one in behind it. */
export function Sample({ page, statusBar = true, ...rest }: { page: AppTopNavPage; statusBar?: boolean } & Partial<AppTopNavProps>) {
  const nav = <AppTopNav page={page} statusBar={statusBar} {...SAMPLE[page]} {...rest} />
  if (page !== 'lesson-feed') return nav
  return (
    <Box sx={(theme) => ({ background: `linear-gradient(180deg, ${theme.tokens.palette.neutral[700]}, ${theme.tokens.palette.neutral[900]})` })}>{nav}</Box>
  )
}
