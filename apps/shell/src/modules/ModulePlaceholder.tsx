import { Box } from '@mui/material'
import { PageHeader } from '@design-os/components'

export function ModulePlaceholder({ name, phase }: { name: string; phase: string }) {
  return (
    <Box sx={{ p: 10 }}>
      <PageHeader title={name} supportingText={`This module arrives in ${phase}.`} />
    </Box>
  )
}
