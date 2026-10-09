import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { SideNav } from '@design-os/components'
import { Book1, Category, Cpu, Home2, Magicpen, Mobile, Moon, Sun1 } from 'iconsax-react'
import { useThemeMode } from './theme-mode'
import { STATIC } from './static'
import { ComponentsIndex } from './modules/components/ComponentsIndex'
import { ComponentPage } from './modules/components/ComponentPage'
import { HomePage } from './modules/home/HomePage'
import { ModulePlaceholder } from './modules/ModulePlaceholder'
import { PrototypesGallery } from './modules/prototypes/PrototypesGallery'
import { DemoViewer } from './modules/prototypes/DemoViewer'

const ALL_MODULES = [
  { path: '/home', label: 'Home', icon: Home2 },
  { path: '/components', label: 'Components', icon: Category },
  { path: '/prototypes', label: 'Prototypes', icon: Mobile },
  { path: '/skills', label: 'Skills', icon: Magicpen, phase: 'Phase 5' },
  { path: '/engines', label: 'Engines', icon: Cpu, phase: 'Phase 6' },
  { path: '/brain', label: 'Brain', icon: Book1, phase: 'a later phase' },
]

// The shared site has the library and the prototypes only: Home reads the private vault.
const MODULES = STATIC ? ALL_MODULES.filter((m) => m.path === '/components' || m.path === '/prototypes') : ALL_MODULES

export function App() {
  const { mode, toggle } = useThemeMode()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* The library's Admin side navigation, pinned while the page scrolls. */}
      <Box sx={{ position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }}>
        <SideNav
          system="admin"
          aria-label="Modules"
          items={MODULES.map((m) => ({
            label: m.label,
            icon: m.icon,
            selected: pathname === m.path || pathname.startsWith(`${m.path}/`),
            onClick: () => navigate(m.path),
          }))}
          help={[
            {
              label: mode === 'dark' ? 'Light mode' : 'Dark mode',
              icon: mode === 'dark' ? Sun1 : Moon,
              onClick: toggle,
            },
          ]}
        />
      </Box>

      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Routes>
          <Route path="/" element={<Navigate to={STATIC ? '/components' : '/home'} replace />} />
          {!STATIC && <Route path="/home" element={<HomePage />} />}
          <Route path="/components" element={<ComponentsIndex />} />
          <Route path="/components/:slug" element={<ComponentPage />} />
          <Route path="/prototypes" element={<PrototypesGallery />} />
          <Route path="/prototypes/:slug" element={<DemoViewer />} />
          {MODULES.filter((m) => m.phase).map((m) => (
            <Route key={m.path} path={m.path} element={<ModulePlaceholder name={m.label} phase={m.phase!} />} />
          ))}
        </Routes>
      </Box>
    </Box>
  )
}
