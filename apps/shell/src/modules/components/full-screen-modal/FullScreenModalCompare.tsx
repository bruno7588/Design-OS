import { fullScreenModalFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { FullScreenModalMatrix } from './FullScreenModalMatrix'

// Figma = Modal/Full screen (dark 3223:31934, light 11498:1694), checked 2026-09-29.
const compare: Compare = {
  page: fullScreenModalFigma.page,
  set: fullScreenModalFigma.set,
  frames: { light: '/figma/full-screen-modal-light.png', dark: '/figma/full-screen-modal-dark.png' },
  live: (mode) => <FullScreenModalMatrix mode={mode} />,
  differences: [
    { property: 'Surface', figma: 'Page-background, 1536 × 864 (Desktop), 375 × 812 (Mobile)', reference: 'The whole viewport in Page-background', status: 'Matches' },
    { property: 'Close button', figma: '40px, padding 4, Input-background, radius full. Desktop at 20 / 30; Mobile at 60 / 20 (40px since 2026-09-29; was a scaled 43)', reference: 'Same; on small screens 16 under the status bar / 20', status: 'Matches' },
    { property: 'Close glyph', figma: 'close Linear, 32px, Text-secondary', reference: 'CloseOutlineIcon at 32 (the same X)', status: 'Matches' },
    { property: 'Size in overlays.md', figma: '40px', reference: '40px', status: 'Matches', note: 'overlays.md and the prototype’s CloseButton.css said 44; updated to 40 on 2026-09-29.' },
    { property: 'Built component', figma: '–', reference: 'FullScreenModal, CloseButton variant="fullscreen"', status: 'Code to update', note: 'The prototype has CloseButton variant="fullscreen"; each editor builds its own full-screen surface.' },
  ],
  engineering: {
    mui: 'Dialog (fullScreen) + CloseButton',
    usage: `<FullScreenModal open={open} onClose={close} aria-labelledby="title">…</FullScreenModal>`,
    props: [{ figma: 'Device', code: 'Responsive: the close button moves on small screens' }],
    theme: ['No theme override: the surface is set on the Dialog paper.'],
    files: ['packages/components/src/Overlay/FullScreenModal.tsx', 'packages/components/src/Overlay/CloseButton.tsx'],
  },
}

export function FullScreenModalCompare() {
  return <CompareTemplate c={compare} />
}
