import { Box } from '@mui/material'
import { ResourceCard, TypeThumbnail } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'
import { TITLE } from './ResourceCardMatrix'

const Row = ({ children, width = 640 }: { children: React.ReactNode; width?: number }) => <Box sx={{ width, maxWidth: '100%' }}>{children}</Box>

// Content from playground/docs/design-system/resource-card.md and the Figma Resources board.
const g: Guidelines = {
  overview: 'A resource card shows a file or link attached to a course or lesson, with one action: download or open.',
  whenToUse: ['In lists of course and lesson resources, in the web app, Admin and the mobile app.'],
  whenNotToUse: ['For lessons or assessments. Use their cards.', 'For a file being uploaded. Use the File uploader.'],
  anatomy: {
    example: <Row><ResourceCard type="pdf" title={TITLE} size="1.1 MB" /></Row>,
    parts: [
      { name: 'Type thumbnail', description: '48px (40 on mobile): the file type’s tile, or a Certificate quiz tile with a link glyph for links.' },
      { name: 'Title', description: 'Bold 16/1.5 (14 on mobile), one line, Text-primary.' },
      { name: 'Meta', description: '"PDF • 1.1 MB" or "External link", Regular 14 (12 on mobile), Text-tertiary.' },
      { name: 'Action', description: 'A 28px round button with a 20px icon in Text-secondary: import-curve to download, export-square to open a link.' },
      { name: 'Card', description: 'Cards-background, radius 12, padding 12/16/12/12 (12 on mobile), Shadow S in light mode.' },
    ],
  },
  variants: [
    { name: 'Mobile app', description: 'Smaller tile and type, 8px gaps. No hover.', example: <Row width={344}><ResourceCard device="mobile" type="excel" title={TITLE} size="240 KB" /></Row> },
    { name: 'Link', description: 'External link in the meta line; the action opens it.', example: <Row><ResourceCard type="link" title="Our careers page" /></Row> },
    {
      name: 'Type thumbnails',
      description: 'PDF, Word, Excel, PowerPoint, Image and External link.',
      example: (
        <Box sx={{ display: 'flex', gap: 4 }}>
          {(['pdf', 'word', 'excel', 'powerpoint', 'image', 'link'] as const).map((t) => <TypeThumbnail key={t} type={t} />)}
        </Box>
      ),
    },
  ],
  states: [
    { name: 'Hover', description: 'The card fills Cards-background-hover. The action fills Input-background-hover, turns Text-primary and shows its tooltip.' },
    { name: 'Focus', description: 'A 2px Primary ring on the action.' },
  ],
  dos: [
    {
      do: { example: <Row><ResourceCard type="pdf" title="Brand guidelines" size="1.1 MB" /></Row>, text: 'Use the file’s own name as the title.' },
      dont: { example: <Row><ResourceCard type="pdf" title="brand_guidelines_v3_FINAL.pdf" size="1.1 MB" /></Row>, text: 'Show the raw file name; the meta line already says the type.' },
    },
  ],
  content: ['Titles in sentence case.', 'Meta: the type, a bullet and the size: "PDF • 1.1 MB".'],
  accessibility: [
    'The action is named with the title: "Download Brand guidelines", "Open link Our careers page".',
    'The tile is decorative; the meta line names the type.',
    'The tooltip shows on hover and keyboard focus.',
  ],
  figma: [
    { label: 'Card/Resources, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12228-2749' },
    { label: 'Card/Resources, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=12213-3040' },
  ],
  spec: 'playground/docs/design-system/resource-card.md',
}

export function ResourceCardGuidelines() {
  return <GuidelinesTemplate g={g} />
}
