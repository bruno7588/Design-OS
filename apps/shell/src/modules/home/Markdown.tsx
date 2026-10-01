import { Box, Link, Typography } from '@mui/material'
import ReactMarkdown, { defaultUrlTransform, type Components } from 'react-markdown'
import { obsidianUrl } from './useDashboardFile'

// Markdown from the vault, drawn with the theme's type scale. The card title is the h2,
// so ## becomes an h3 (Bold 14) and ### an h4 (SemiBold 14). Obsidian [[links]] open the
// note in Obsidian.

const components: Components = {
  h1: ({ children }) => <Typography variant="h5" component="h3">{children}</Typography>,
  h2: ({ children }) => <Typography variant="h5" component="h3">{children}</Typography>,
  h3: ({ children }) => <Typography variant="subtitle2" component="h4">{children}</Typography>,
  p: ({ children }) => <Typography variant="body2" color="text.secondary">{children}</Typography>,
  ul: ({ children }) => <Box component="ul" sx={{ m: 0, pl: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>{children}</Box>,
  ol: ({ children }) => <Box component="ol" sx={{ m: 0, pl: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>{children}</Box>,
  li: ({ children }) => <Typography variant="body2" component="li" color="text.secondary">{children}</Typography>,
  strong: ({ children }) => <Box component="strong" sx={{ fontWeight: 600, color: 'text.primary' }}>{children}</Box>,
  a: ({ href, children }) => <Link href={href} underline="hover">{children}</Link>,
}

export function Markdown({ body, vault }: { body: string; vault: string }) {
  const withLinks = body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target: string, alias?: string) => `[${alias ?? target}](${obsidianUrl(vault, target)})`)
  return (
    // Sections 16px apart, lines inside a section 8px apart.
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, '& h3:not(:first-of-type)': { mt: 2 } }}>
      <ReactMarkdown components={components} urlTransform={(url) => (url.startsWith('obsidian://') ? url : defaultUrlTransform(url))}>
        {withLinks}
      </ReactMarkdown>
    </Box>
  )
}
