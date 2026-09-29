import { Box } from '@mui/material'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { Sample } from './samples'

const Phone = ({ children }: { children: React.ReactNode }) => <Box sx={{ width: 375, maxWidth: '100%' }}>{children}</Box>

// Content from playground/docs/design-system/navigation.md (Mobile App Navigation) and the Figma Top nav/ App set.
const g: Guidelines = {
  overview: 'The top bar of the learner app. Each top-level page has its own layout; detail pages get a back button and a title.',
  whenToUse: ['At the top of every page in the mobile app, with the variant for that page.'],
  whenNotToUse: ['On the web app or in Admin. Use the Top navigation.', 'For page content such as long descriptions or extra actions. Keep the bar to one row.'],
  anatomy: {
    example: <Phone><Sample page="home" statusBar={false} /></Phone>,
    parts: [
      { name: 'Bar', description: '375 wide, Page-background, a 1px Border underneath. 65px on top-level pages (padding 12/16), 56px on detail pages (padding 8/16).' },
      { name: 'Chips', description: 'The 5Mins Chip: Home 8px apart, Progress 16px apart.' },
      { name: 'Icon actions', description: 'Home: flash-circle and notification-bing, Bold 28 in Text-primary, 16px apart. An 8px Text-error dot marks new notifications.' },
      { name: 'Back', description: '40px round, Input-background, arrow-left Linear 24.' },
      { name: 'Title', description: 'Bold 16/1.5, centred (Bold 14 next to a skill icon on Skill).' },
      { name: 'Status bar', description: 'The iOS status bar in Figma. In code it’s an optional stand-in for prototypes.' },
    ],
  },
  variants: [
    { name: 'Search', description: 'The Search field (M) across the bar.', example: <Phone><Sample page="search" statusBar={false} /></Phone> },
    { name: 'Feed', description: 'A centred page title.', example: <Phone><Sample page="feed" statusBar={false} /></Phone> },
    { name: 'Profile', description: 'The learner’s avatar with a settings badge, name and role, and the Primary add button.', example: <Phone><Sample page="profile" statusBar={false} /></Phone> },
    { name: 'Detail page', description: 'Back, a centred title and an optional 32px action.', example: <Phone><Sample page="detail" statusBar={false} /></Phone> },
    { name: 'Skill', description: 'Back, the skill illustration and name, and more options.', example: <Phone><Sample page="skill" statusBar={false} /></Phone> },
    { name: 'Lesson feed', description: 'Transparent over the video, with no border. Back keeps a dark fill so it stays legible.', example: <Phone><Sample page="lesson-feed" statusBar={false} /></Phone> },
  ],
  states: [
    { name: 'Chips and Search', description: 'Their own states: see Chip and Search.' },
    { name: 'Icon buttons', description: 'Page-background-hover on hover (pointer devices) and a 2px Primary focus ring.' },
  ],
  dos: [
    {
      do: { example: <Phone><Sample page="detail" statusBar={false} /></Phone>, text: 'Use the Detail page bar with a back button below the top-level pages.' },
      dont: { example: <Phone><Sample page="feed" statusBar={false} title="Notifications" /></Phone>, text: 'Use a top-level bar on a page people reach from another one; they lose the way back.' },
    },
  ],
  content: ['Titles in sentence case, short enough for one line: "Notifications".', 'Chip labels as in Figma: "For You", "Your Workspace".'],
  accessibility: [
    'The bar is a header; the page title is its h1 (on Profile, the learner’s name).',
    'Every icon button has a name: "Back", "Streak", "Notifications, new", "More options", "Profile settings", "Add".',
    'Chips are toggle buttons with aria-pressed.',
    'The settings badge is 18px: too small a touch target on its own. Tapping the avatar should also open settings.',
  ],
  figma: [
    { label: 'Top nav/ App, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11235-11758' },
    { label: 'Top nav/ App, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=1910-18375' },
  ],
  spec: 'playground/docs/design-system/navigation.md',
}

export function AppTopNavigationGuidelines() {
  return <GuidelinesTemplate g={g} />
}
