import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

// Phase 0: empty page. Modules arrive in later phases.
export function App() {
  const [server, setServer] = useState('checking')

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setServer(d.status))
      .catch(() => setServer('offline'))
  }, [])

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Design OS</Typography>
      <Typography color="text.secondary">Server: {server}</Typography>
    </Box>
  )
}
