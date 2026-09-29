import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

// A labelled row of cards for the card matrices, laid out like the Figma board.
export function CardGroup({ label, children, gap = 6 }: { label: string; children: ReactNode; gap?: number }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" color="text.secondary">
        {label}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap, alignItems: 'flex-start' }}>{children}</Box>
    </Box>
  )
}
