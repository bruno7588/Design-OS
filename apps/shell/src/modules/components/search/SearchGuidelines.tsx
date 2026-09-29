import { Box } from '@mui/material'
import { Search, type SearchProps } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const noop = () => {}
const Example = (props: Partial<SearchProps>) => (
  <Box sx={{ width: 280 }}>
    <Search value="" onChange={noop} fullWidth inputProps={{ tabIndex: -1 }} {...props} />
  </Box>
)

// Content from playground/docs/design-system/search.md and the 5mins-copy-review skill.
const g: Guidelines = {
  overview:
    'Search filters a list or finds content as people type. It is a filled field with a search icon, and a clear button once there is text.',
  whenToUse: [
    'To find items in a long list or table: people, courses, roles.',
    'As the main way to find content on a page (size L).',
    'To narrow a list inside a panel, drawer or menu (size M).',
  ],
  whenNotToUse: [
    'To enter data that gets saved. Use an input field.',
    'To pick one value from a short list. Use a dropdown.',
    'For fewer than about 7 items, where people can scan the list.',
  ],
  anatomy: {
    example: <Example size="L" value="Data protection" placeholder="Search courses" />,
    parts: [
      { name: 'Field', description: 'M: 37px, padding 8px by 12px, radius 12. L: 48px, padding 12px by 16px, radius 16. Input-background fill and a 1px Border.' },
      { name: 'Search icon', description: 'SearchNormal1 in Text-tertiary: 18px in M, 20px in L.' },
      { name: 'Text', description: 'Regular 14px in M, 16px in L. The placeholder in Text-disabled.' },
      { name: 'Clear button', description: 'Only with text. Close icon in Text-secondary, 20px in M, 24px in L.' },
    ],
  },
  variants: [
    { name: 'L', description: 'Page-level search, usually at the top of a list.', example: <Example size="L" placeholder="Search courses" /> },
    { name: 'M', description: 'Panels, drawers, filter rows and menus.', example: <Example size="M" placeholder="Search people" /> },
  ],
  states: [
    { name: 'Enabled', description: 'Input-background fill, Border.' },
    { name: 'Hover', description: 'Input-background-hover fill and Border-hover.' },
    { name: 'Active', description: 'The border turns Selected while typing.' },
    { name: 'Filled', description: 'Shows the clear button. Clearing puts the focus back in the field.' },
  ],
  dos: [
    {
      do: { example: <Example placeholder="Search people" />, text: 'Say what is searched in the placeholder.' },
      dont: { example: <Example placeholder="Type here to search for anything…" />, text: 'Write long or vague placeholders.' },
    },
  ],
  content: [
    'Placeholder: "Search" plus what is searched, in sentence case: "Search courses".',
    'No ellipsis and no instructions in the placeholder.',
    'Results update as people type; there is no search button.',
    'When nothing matches, say so and offer a way out: "No courses match "fire safety"".',
  ],
  accessibility: [
    'The field has type="search" and an accessible name (the label, or the placeholder).',
    'The clear button is a real button named "Clear search". Escape clears the field too.',
    'Announce the number of results in a polite live region, as the preview does.',
    'Focus stays in the field while results update.',
  ],
  figma: [
    { label: 'Search, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11927-6338' },
    { label: 'Search, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=697-33529' },
  ],
  spec: 'playground/docs/design-system/search.md',
}

export function SearchGuidelines() {
  return <GuidelinesTemplate g={g} />
}
