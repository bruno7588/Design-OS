import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { Button } from '@design-os/components'
import { Moon, Sun1 } from 'iconsax-react'
import { useThemeMode } from './theme-mode'
import { ComponentsIndex } from './modules/components/ComponentsIndex'
import { ComponentPage } from './modules/components/ComponentPage'
import { ModulePlaceholder } from './modules/ModulePlaceholder'

const MODULES = [
  { path: '/home', label: 'Home', phase: 'a later phase' },
  { path: '/components', label: 'Components' },
  { path: '/prototypes', label: 'Prototypes', phase: 'Phase 4' },
  { path: '/skills', label: 'Skills', phase: 'a later phase' },
  { path: '/engines', label: 'Engines', phase: 'Phase 6' },
  { path: '/brain', label: 'Brain', phase: 'a later phase' },
]

export function App() {
  const { mode, toggle } = useThemeMode()
  const [server, setServer] = useState('checking')

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setServer(d.status))
      .catch(() => setServer('offline'))
  }, [])

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box
        component="nav"
        sx={(theme) => ({
          width: 240,
          flexShrink: 0,
          p: 4,
          borderRight: `1px solid ${theme.tokens.semantic.border}`,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        })}
      >
        <Typography variant="h3">Design OS</Typography>
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {MODULES.map((m) => (
            <ListItemButton
              key={m.path}
              component={NavLink}
              to={m.path}
              sx={(theme) => ({
                borderRadius: `${theme.tokens.radius.s}px`,
                py: 2,
                '&:hover': { bgcolor: theme.tokens.semantic.pageBackgroundHover },
                '&.active': { bgcolor: theme.tokens.semantic.pageBackgroundHover },
                '&.active .MuiListItemText-primary': { fontWeight: 700, color: theme.tokens.semantic.textSelected },
              })}
            >
              <ListItemText primary={m.label} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItemButton>
          ))}
        </List>
        <Stack sx={{ mt: 'auto', gap: 2 }}>
          <Button
            variant="outlined2"
            size="small"
            icon={mode === 'dark' ? <Sun1 color="currentColor" /> : <Moon color="currentColor" />}
            onClick={toggle}
          >
            {mode === 'dark' ? 'Light mode' : 'Dark mode'}
          </Button>
          <Typography variant="caption" color="text.secondary">
            Server: {server}
          </Typography>
        </Stack>
      </Box>

      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/components" replace />} />
          <Route path="/components" element={<ComponentsIndex />} />
          <Route path="/components/:slug" element={<ComponentPage />} />
          {MODULES.filter((m) => m.phase).map((m) => (
            <Route key={m.path} path={m.path} element={<ModulePlaceholder name={m.label} phase={m.phase!} />} />
          ))}
        </Routes>
      </Box>
    </Box>
  )
}
