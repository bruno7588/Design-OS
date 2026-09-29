import { appTopNavFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { AppTopNavigationMatrix } from './AppTopNavigationMatrix'

// Figma = Top nav/ App (dark 1910:18375, light 11235:11758), checked 2026-09-29.
const compare: Compare = {
  page: appTopNavFigma.page,
  set: appTopNavFigma.set,
  frames: { light: '/figma/app-top-navigation-light.png', dark: '/figma/app-top-navigation-dark.png' },
  live: (mode) => <AppTopNavigationMatrix mode={mode} />,
  differences: [
    { property: 'Bar', figma: '375 wide, Page-background, 1px Border underneath (inside); 64px on the top-level pages (Home, Search, Progress, Feed, Profile), 56 on the rest', reference: 'Same heights per page', status: 'Matches', note: 'Home, Search, Progress and Feed were 65; set to 64 on 2026-09-29.' },
    { property: 'Divider', figma: 'Every page but Lesson feed', reference: 'Same', status: 'Matches', note: 'navigation.md said Home had none; it’s updated.' },
    { property: 'Chips', figma: 'Chips instances, 33px; Home 8px apart, Progress 16', reference: 'The 5Mins Chip; same gaps', status: 'Matches', note: 'Two gaps for the same group; worth settling on one.' },
    { property: 'Home icons', figma: 'flash-circle and notification-bing Bold 28, Text-primary, 16px apart; 8 × 9 Text-error Nudge', reference: 'FlashCircle and NotificationBing Bold 28; an 8px dot', status: 'Matches', note: 'The prototype uses the plain Notification bell.' },
    { property: 'Search', figma: 'Search, Size=M, full width', reference: 'The 5Mins Search (M)', status: 'Matches' },
    { property: 'Profile', figma: 'Avatar 40, 18px settings badge (Input-background, setting-2 12), name Bold 14, role Regular 12/1.2, 2px apart; 40px Primary-500 add button', reference: 'Same (the badge is Input-background)', status: 'Matches', note: 'The badge was bound to a deleted Input-background variable (solid Neutral-50 / Neutral-700); rebound to the current one on 2026-09-29.' },
    { property: 'Detail page', figma: 'Back 40, the title fills and centres, a 32px slot on the right', reference: 'Same (the slot takes an action)', status: 'Matches', note: 'The title sits 4px right of centre because the sides differ (40 and 32).' },
    { property: 'Skill', figma: 'Skill illustration 24, title Bold 14, Remix more-vertical in a 32px button', reference: 'skillIcon slot; MoreVerticalIcon copied from Figma', status: 'Matches' },
    { property: 'Back over media', figma: 'Lesson feed: Neutral-900 at 50% fill, Neutral-25 arrow, in both sets (bound 2026-09-29)', reference: 'backOverMedia: the same fill and arrow wherever the button sits over a video, image or document (on by default for Lesson feed)', status: 'Matches', note: 'Elsewhere the back button is Input-background with a Text-primary arrow.' },
    { property: 'Lesson feed points', figma: '“45 Pt” in Text-primary (dark in the light set)', reference: 'Neutral-25 in both modes, like the arrow', status: 'Design to update', note: 'Over the video the text needs to stay light.' },
    { property: 'Status bar', figma: 'Status Bar/iOS, 25px, Medium 14 clock', reference: 'statusBar: an aria-hidden stand-in, off by default', status: 'Matches', note: 'The phone draws the real one.' },
    { property: 'Mobile web', figma: 'Browser chrome with the app.5mins.ai address', reference: 'Not built', status: 'Matches', note: 'It’s the browser’s own UI, for mockups only.' },
    { property: 'Built component', figma: '–', reference: 'AppTopNav', status: 'Code to update', note: 'The prototype’s mobile/TopNav matches in most places; it hand-builds the chips and search.' },
  ],
  engineering: {
    mui: 'Box (header) + Chip + Search + Avatar + IconButton',
    usage: `<AppTopNav page="detail" title="Notifications" onBack={goBack} />`,
    props: [
      { figma: 'Page', code: 'page: home | search | progress | feed | profile | detail | skill | lesson-feed' },
      { figma: 'Nudge', code: 'notificationsUnread' },
      { figma: 'Status Bar/iOS', code: 'statusBar' },
      { figma: 'Back over a video, image or document', code: 'backOverMedia' },
    ],
    theme: ['No theme override: styled from the tokens inside the component.'],
    files: [
      'packages/components/src/Navigation/AppTopNav.tsx',
      'packages/components/src/icons/FigmaIcons.tsx (MoreVerticalIcon)',
      'packages/components/src/icons/Illustrations.tsx (PointsIllustration)',
    ],
  },
}

export function AppTopNavigationCompare() {
  return <CompareTemplate c={compare} />
}
