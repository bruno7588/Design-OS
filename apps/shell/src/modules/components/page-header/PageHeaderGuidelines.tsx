import { Box } from '@mui/material'
import { Add } from 'iconsax-react'
import { Button, PageHeader } from '@design-os/components'
import { GuidelinesTemplate, type Guidelines } from '../shared/GuidelinesTemplate'

const Wide = ({ children }: { children: React.ReactNode }) => <Box sx={{ width: 640, maxWidth: '100%' }}>{children}</Box>

// Content from playground/docs/design-system/headers.md, the Figma Header set and the 5mins-copy-review skill.
const g: Guidelines = {
  overview: 'A page header names the page and holds its main actions. A section header does the same for a part of a page.',
  whenToUse: ['At the top of every page, under the top navigation.', 'For sections inside a page with their own actions, such as Lessons in a course.'],
  whenNotToUse: ['Inside cards or dialogs. They have their own titles.', 'For global actions. They belong in the top navigation.'],
  anatomy: {
    example: (
      <Wide>
        <PageHeader title="Your Courses" supportingText="Courses you created or copied." headingComponent="h3" actions={<Button icon={<Add color="currentColor" />}>Create Course</Button>} />
      </Wide>
    ),
    parts: [
      { name: 'Label', description: 'Optional metadata: Regular 14 (12 in a section) in Text-tertiary, each with a 16px (14px) icon, 8px apart.' },
      { name: 'Title', description: 'Page: Bold 24, h1. Section: Bold 20, h2. Text-primary.' },
      { name: 'Supporting text', description: 'Regular 16 (14 in a section) in Text-secondary, 4px under the title.' },
      { name: 'Actions', description: 'Search, icon buttons and buttons, 12px apart, at the end of the title row.' },
      { name: 'Navigation', description: 'Optional tabs under a divider.' },
    ],
  },
  variants: [
    { name: 'Page', description: '16px between the slots.', example: <Wide><PageHeader title="People" supportingText="Everyone in your workspace." headingComponent="h3" /></Wide> },
    { name: 'Section', description: '12px between the slots.', example: <Wide><PageHeader type="section" title="Lessons" headingComponent="h3" actions={<Button variant="outlined">Add Lesson</Button>} /></Wide> },
  ],
  states: [{ name: 'Default', description: 'The header has no states of its own; its buttons and tabs do.' }],
  dos: [
    {
      do: { example: <Wide><PageHeader title="People" headingComponent="h3" actions={<Button icon={<Add color="currentColor" />}>Add People</Button>} /></Wide>, text: 'One filled button: the main action on the page.' },
      dont: { example: <Wide><PageHeader title="People" headingComponent="h3" actions={<><Button>Import</Button><Button>Export</Button><Button>Add People</Button></>} /></Wide>, text: 'Several filled buttons compete.' },
    },
  ],
  content: ['Title: the page name, as in the navigation.', 'Supporting text: one short sentence on what the page is for.', 'Button labels in Title Case.'],
  accessibility: [
    'The title is the page’s h1 (a section’s h2); change the level with headingComponent if the page needs it.',
    'The metadata is a list; its icons are decorative.',
    'Tabs keep their own roles: a tablist with tabs.',
  ],
  figma: [
    { label: 'Header, light mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=11921-13215' },
    { label: 'Header, dark mode (Figma Library)', url: 'https://www.figma.com/design/EC26cSVe9KNTCWXvYovakw/Library?node-id=7902-1019' },
  ],
  spec: 'playground/docs/design-system/headers.md',
}

export function PageHeaderGuidelines() {
  return <GuidelinesTemplate g={g} />
}
