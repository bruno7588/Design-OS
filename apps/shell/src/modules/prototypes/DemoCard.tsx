import { Box, Typography } from '@mui/material'
import { Badge, CardRoot, CardTitle, EmptyStateIllustration } from '@design-os/components'
import type { DemoSummary } from '@design-os/demos'
import { shortDate, thumbnailUrl } from './useDemos'

// One demo in the gallery. There's no Demo card in Figma yet, so this is the shared card
// surface (CardRoot) with the thumbnail on top, as Home composes its cards.

export function DemoCard({ demo, onOpen }: { demo: DemoSummary; onOpen: () => void }) {
  const versions = demo.versions.length
  const meta = [demo.template ? 'Starter' : demo.feature, versions ? `v${versions}` : 'No versions yet', `Updated ${shortDate(demo.updatedAt)}`].join(' · ')
  return (
    <CardRoot sx={{ display: 'flex', flexDirection: 'column' }} data-testid={`demo-${demo.slug}`}>
      <Box
        sx={(theme) => ({
          aspectRatio: '16 / 10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.tokens.semantic.inputBackground,
          borderBottom: `1px solid ${theme.tokens.semantic.border}`,
        })}
      >
        {demo.thumbnailAt ? (
          <Box component="img" src={thumbnailUrl(demo.slug, undefined, demo.thumbnailAt)} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left', display: 'block' }} />
        ) : (
          <EmptyStateIllustration name="computer-screen" />
        )}
      </Box>
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CardTitle onClick={onOpen} sx={(theme) => ({ ...theme.typography.subtitle1, color: theme.tokens.semantic.textPrimary })}>
          {demo.name}
        </CardTitle>
        <Typography variant="caption" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary })}>
          {meta}
        </Typography>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Badge type="informative" label={demo.platform} />
        </Box>
      </Box>
    </CardRoot>
  )
}
