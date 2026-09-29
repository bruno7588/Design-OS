import { Box } from '@mui/material'

// Stands in for a Figma slot in the docs: a dashed frame that fills its parent.
export function SlotPlaceholder({ label = 'Content slot', minHeight = 320 }: { label?: string; minHeight?: number | string }) {
  return (
    <Box
      sx={(theme) => ({
        minHeight,
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        border: `1px dashed ${theme.tokens.semantic.borderElevated}`,
        borderRadius: `${theme.tokens.radius.sm}px`,
        color: theme.tokens.semantic.textTertiary,
        fontSize: 14,
      })}
    >
      {label}
    </Box>
  )
}
