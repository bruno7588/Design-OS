import { Box } from '@mui/material'
import { Badge, type BadgeType, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Badge set, in its order: each type without an icon, with the left icon,
// and removable (the icon right). New has no icons.
export const TYPES: { figma: string; type: BadgeType; label: string }[] = [
  { figma: 'Success', type: 'success', label: 'Success' },
  { figma: 'Warning', type: 'warning', label: 'Warning' },
  { figma: 'In progress', type: 'progress', label: 'In progress' },
  { figma: 'Error', type: 'error', label: 'Error' },
  { figma: 'Informative', type: 'informative', label: 'Information' },
  { figma: 'New', type: 'new', label: 'New' },
]

const noop = () => {}

export function BadgeMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`badge-matrix-${mode}`} sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 564, alignItems: 'center' }}>
        {TYPES.flatMap((t) =>
          t.type === 'new'
            ? [<Badge key={t.type} type={t.type} label={t.label} />]
            : [
                <Badge key={`${t.type}-plain`} type={t.type} label={t.label} />,
                <Badge key={`${t.type}-icon`} type={t.type} label={t.label} icon />,
                <Badge key={`${t.type}-remove`} type={t.type} label={t.label} onDismiss={noop} tabIndex={-1} />,
              ],
        )}
      </Box>
    </Canvas>
  )
}
