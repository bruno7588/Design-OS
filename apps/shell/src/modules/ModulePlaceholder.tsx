import { Box, Typography } from '@mui/material'

export function ModulePlaceholder({ name, phase }: { name: string; phase: string }) {
  return (
    <Box sx={{ p: 10 }}>
      <Typography variant="h1">{name}</Typography>
      <Typography color="text.secondary">This module arrives in {phase}.</Typography>
    </Box>
  )
}
