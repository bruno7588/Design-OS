import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

// A Figma-style board: states down the side, variants across the top.
export function StateGrid({ testId, columns, rows }: { testId: string; columns: string[]; rows: { name: string; cells: ReactNode[] }[] }) {
  return (
    <Box
      data-testid={testId}
      sx={{ display: 'grid', gridTemplateColumns: `80px repeat(${columns.length}, minmax(120px, max-content))`, columnGap: 8, rowGap: 5, alignItems: 'center' }}
    >
      <Box />
      {columns.map((c) => (
        <Typography key={c} variant="h6" color="text.secondary">
          {c}
        </Typography>
      ))}
      {rows.flatMap((r) => [
        <Typography key={`${r.name}-label`} variant="caption" color="text.secondary">
          {r.name}
        </Typography>,
        ...r.cells.map((cell, i) => (
          <Box key={`${r.name}-${i}`} sx={{ display: 'flex', alignItems: 'center' }}>
            {cell}
          </Box>
        )),
      ])}
    </Box>
  )
}
