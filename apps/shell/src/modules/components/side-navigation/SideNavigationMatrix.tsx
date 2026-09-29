import { Box, Typography } from '@mui/material'
import { SideNav, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { adminHelp, adminItems, profile, webItems } from './navItems'

// The Figma Side navigation set: Web app and Admin, expanded and collapsed. Each panel shows
// a selected item and a hovered one, which cover the Menu/Itens states.
const PANELS = [
  { name: 'Web app, expanded', el: <SideNav system="web" items={webItems('My Team')} profile={profile} hoverItem="Knowledge Hub" /> },
  { name: 'Web app, collapsed', el: <SideNav system="web" items={webItems('My Team')} profile={profile} collapsed hoverItem="Knowledge Hub" /> },
  { name: 'Admin, expanded', el: <SideNav system="admin" items={adminItems('Teams')} help={adminHelp} hoverItem="Reports" /> },
  { name: 'Admin, collapsed', el: <SideNav system="admin" items={adminItems('Automations')} help={adminHelp} collapsed hoverItem="Reports" /> },
]

export function SideNavigationMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box data-testid={`side-navigation-matrix-${mode}`} sx={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        {PANELS.map((p) => (
          <Box key={p.name} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" color="text.secondary">
              {p.name}
            </Typography>
            <Box sx={(theme) => ({ height: 1008, border: `1px dashed ${theme.tokens.semantic.border}` })}>{p.el}</Box>
          </Box>
        ))}
      </Box>
    </Canvas>
  )
}
