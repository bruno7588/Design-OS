import { Link as RouterLink } from 'react-router-dom'
import { Box, Card, CardActionArea, Typography } from '@mui/material'
import { PageHeader } from '@design-os/components'
import { components } from './registry'
import { InventoryTable } from './InventoryTable'

export function ComponentsIndex() {
  return (
    <Box sx={{ p: 10 }}>
      <Box sx={{ mb: 8 }}>
        <PageHeader
          title="Components"
          supportingText="5Mins reference components on MUI 5, themed with the Figma Library tokens."
        />
      </Box>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Built
      </Typography>
      <Box sx={{ mb: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 4 }}>
        {components.map((c) => (
          <Card
            key={c.slug}
            elevation={0}
            sx={(theme) => ({ border: `1px solid ${theme.tokens.semantic.border}`, boxShadow: theme.tokens.shadow.s })}
          >
            <CardActionArea component={RouterLink} to={`/components/${c.slug}`} sx={{ p: 6 }}>
              <Typography variant="h4">{c.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {c.summary}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Inventory
      </Typography>
      <InventoryTable />
    </Box>
  )
}
