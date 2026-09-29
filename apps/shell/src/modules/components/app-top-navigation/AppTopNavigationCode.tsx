import { Stack, Typography } from '@mui/material'
import source from '@design-os/components/src/Navigation/AppTopNav.tsx?raw'
import { CodeBlock } from '../shared/CodeBlock'

const examples = `import { AppTopNav } from '@design-os/components'

// Home: filter chips, Streak and Notifications
<AppTopNav page="home" chips={[{ label: 'For You', selected: true, onClick: … }, { label: 'Your Workspace', onClick: … }]} notificationsUnread />

// Search
<AppTopNav page="search" searchValue={q} onSearchChange={setQ} />

// Detail page and Skill: back, title
<AppTopNav page="detail" title="Notifications" onBack={goBack} />
<AppTopNav page="skill" title={skill.name} skillIcon={<SkillIllustration />} onBack={goBack} onMore={openMenu} />

// Lesson feed: over the video
<AppTopNav page="lesson-feed" points="45 Pt" onBack={goBack} />

// Profile
<AppTopNav page="profile" name={user.name} role={user.role} avatarSrc={user.photo} onProfileSettings={…} onAdd={…} />`

export function AppTopNavigationCode() {
  return (
    <Stack sx={{ gap: 6 }}>
      <Typography variant="body2" color="text.secondary">
        The reference is a header built from the tokens and the 5Mins Chip, Search and Avatar, with MUI IconButton for the icon
        actions. Every icon button has a name. The file below is read from the source, so it is always current.
      </Typography>
      <CodeBlock title="Usage" code={examples} />
      <CodeBlock title="AppTopNav.tsx" caption="packages/components/src/Navigation" code={source} />
    </Stack>
  )
}
