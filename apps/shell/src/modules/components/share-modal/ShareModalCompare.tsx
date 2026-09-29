import { shareModalFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ShareModalMatrix } from './ShareModalMatrix'

// Figma = Modal/Send (dark 5399:12437; light board 12358:472, added 2026-09-29), checked 2026-09-29.
const compare: Compare = {
  page: shareModalFigma.page,
  set: shareModalFigma.set,
  frames: { light: '/figma/share-modal-light.png', dark: '/figma/share-modal-dark.png' },
  live: (mode) => <ShareModalMatrix mode={mode} />,
  differences: [
    { property: 'Surface', figma: '400 × 816, padding 32, gap 24, Page-background; Team: radius 16 and a loose 24px shadow; Company: radius 12, Shadow L', reference: 'Radius 12 and Shadow L (the Dialog surface)', status: 'Design to update', note: 'The two variants disagree; code follows Company.' },
    { property: 'Title', figma: '"Share lesson", Bold 20/1.5', reference: 'Same, as an h2 that names the dialog', status: 'Matches' },
    { property: 'Search', figma: 'Search Size=L; its fill is bound to a deleted Input-background', reference: 'The 5Mins Search (L)', status: 'Design to update', note: 'Rebind the fill.' },
    { property: 'Switcher', figma: 'An old Chip/Toggle (radius 4, Selected fill) bound to a deleted Input-background', reference: 'The 5Mins Content switcher', status: 'Design to update', note: 'Swap in the current Content switcher.' },
    { property: 'Rows', figma: '56px, padding 8/16, Avatar 40, name Bold 14, detail Regular 12, Tick on the right, Border underneath', reference: 'Same; the Tick is the 5Mins Checkbox', status: 'Matches' },
    { property: 'Buttons', figma: 'Hand-built: raw #00CEE6 2px stroke, radius 8 (4 on Company), 45px, icon after the label; "Share to", "Copy link"', reference: 'The Outlined Button (Medium) with the icon after; "Share To", "Copy Link"', status: 'Design to update', note: 'Use the Buttons set; labels in Title Case.' },
    { property: 'Close', figma: 'Team: the close icon (32). Company: an Iconsax closecircle frame (40)', reference: 'The CloseButton', status: 'Design to update' },
    { property: 'Scrollbar', figma: 'A raw #3E4354 bar', reference: 'The system scrollbar', status: 'Matches' },
    { property: 'Light version', figma: 'None until 2026-09-29', reference: '–', status: 'Matches', note: 'Added a light board (12358:472) with instances of both variants.' },
  ],
  engineering: {
    mui: 'Dialog + Search + ContentSwitcher + Avatar + Checkbox + Button',
    usage: `<ShareModal open={open} onClose={close} people={people} teams={teams} selected={ids} onSelectedChange={setIds} onShareTo={share} onCopyLink={copy} />`,
    props: [{ figma: 'Type=Team / Company', code: 'The People / Teams tab' }],
    theme: ['No theme override: the Dialog surface comes from the theme; the layout is set in the component.'],
    files: ['packages/components/src/Overlay/ShareModal.tsx'],
  },
}

export function ShareModalCompare() {
  return <CompareTemplate c={compare} />
}
