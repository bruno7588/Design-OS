import { resourceCardFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { ResourceCardMatrix } from './ResourceCardMatrix'

// Figma = the Resources board: Card/Resources (dark 12213:3040, light 12228:2749) and Type
// thumbnail (dark 12213:2984, light 12228:2778), checked 2026-09-29.
const compare: Compare = {
  page: resourceCardFigma.page,
  set: 'Card/Resources and Type thumbnail',
  frames: { light: '/figma/resource-card-light.png', dark: '/figma/resource-card-dark.png' },
  live: (mode) => <ResourceCardMatrix mode={mode} />,
  differences: [
    { property: 'Web/Admin', figma: 'Padding 12/16/12/12, gap 12, centred; tile 48; title Bold 16 one line; meta Regular 14 Text-tertiary', reference: 'Same', status: 'Matches' },
    { property: 'Mobile app', figma: 'Padding 12, gap 8; tile 40; title Bold 14; meta Regular 12/1.2', reference: 'Same; Hover added 2026-09-29', status: 'Matches' },
    { property: 'Action', figma: 'import-curve Linear 20 in a 28px button; hover fills Input-background-hover with a Tooltip (Top, End)', reference: 'Same; the Tooltip is centred on the button', status: 'Matches' },
    { property: 'Link action', figma: 'Not drawn', reference: 'export-square, "Open link"', status: 'Design to update', note: 'From resource-card.md; add it to the set.' },
    { property: 'Type thumbnail', figma: 'PDF, Excel, Word, PowerPoint, Image (dark only) and External link (Certificate quiz tile, Bold link-2 in Neutral-25)', reference: 'All six', status: 'Design to update', note: 'The light set has no Image variant.' },
    { property: 'Shadow', figma: 'Shadow S in the light set, none in dark', reference: 'Same', status: 'Matches' },
    { property: 'Remove', figma: '–', reference: 'Not built', status: 'Code to update', note: 'The prototype’s ResourceCard takes onRemove for authoring; Figma has no remove action yet.' },
  ],
  engineering: {
    mui: 'Box (article) + IconButton + Tooltip',
    usage: `<ResourceCard type="pdf" title="Brand guidelines" size="1.1 MB" onOpen={download} />`,
    props: [
      { figma: 'Device', code: 'device: web | mobile' },
      { figma: 'Type thumbnail Type', code: 'type: pdf | word | excel | powerpoint | image | link' },
    ],
    theme: ['No theme override: styled from the tokens.'],
    files: ['packages/components/src/Card/ResourceCard.tsx', 'packages/components/src/Card/illustrations.tsx (TypeThumbnail)', 'packages/components/src/Card/illustrations/files/*.svg'],
  },
}

export function ResourceCardCompare() {
  return <CompareTemplate c={compare} />
}
