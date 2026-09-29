import { Box, Stack, Typography } from '@mui/material'
import { ConfirmDialogPreview, type DialogType, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Dialog set, one column per Type, each with the same four
// Icon × Secondary text combinations in the Figma order.
export const TYPES: { figma: string; type: DialogType; action: string }[] = [
  { figma: 'Error', type: 'error', action: 'Cancel' },
  { figma: 'Warning', type: 'warning', action: 'Button' },
  { figma: 'Info', type: 'info', action: 'Button' },
  { figma: 'Success', type: 'success', action: 'Button' },
]

const COMBOS = [
  { icon: true, text: true },
  { icon: true, text: false },
  { icon: false, text: true },
  { icon: false, text: false },
]

export function DialogMatrix({ mode }: { mode: Mode }) {
  return (
    // Dialogs always sit on the scrim, as on the Figma board.
    <Canvas mode={mode} sx={(theme) => ({ overflowX: 'auto', backgroundImage: `linear-gradient(${theme.tokens.semantic.scrim}, ${theme.tokens.semantic.scrim})` })}>
      <Box data-testid={`dialog-matrix-${mode}`} sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 6 }}>
        {TYPES.map((t) => (
          <Stack key={t.type} sx={{ gap: 6 }}>
            <Typography variant="h6" color="text.secondary">
              {t.figma}
            </Typography>
            {COMBOS.map((c) => (
              <ConfirmDialogPreview
                key={`${c.icon}-${c.text}`}
                type={t.type}
                icon={c.icon}
                title="Title of the dialog modal"
                secondaryText={c.text ? 'Secondary text of the dialog modal' : undefined}
                actionLabel={t.action}
              />
            ))}
          </Stack>
        ))}
      </Box>
    </Canvas>
  )
}
