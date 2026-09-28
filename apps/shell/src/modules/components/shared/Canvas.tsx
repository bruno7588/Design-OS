import type { ReactNode } from 'react'
import { Box, ThemeProvider, type SxProps, type Theme } from '@mui/material'
import { darkTheme, lightTheme, type Mode } from '@design-os/components'

/** A frame that renders its contents in a given mode, on that mode's page background. */
export function Canvas({ mode, children, sx }: { mode: Mode; children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <Box
        data-mode={mode}
        sx={[
          (theme) => ({
            bgcolor: theme.tokens.semantic.pageBackground,
            color: theme.tokens.semantic.textPrimary,
            border: `1px solid ${theme.tokens.semantic.border}`,
            borderRadius: `${theme.tokens.radius.sm}px`,
            p: 10,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {children}
      </Box>
    </ThemeProvider>
  )
}
