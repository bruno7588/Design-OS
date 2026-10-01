import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme, lightTheme } from './index'
import type { Mode } from './index'

// The 5Mins theme with a light and dark switch, dark by default (the admin look), kept in
// local storage under storageKey. Shared by the Design OS shell and the playground.

const ModeContext = createContext<{ mode: Mode; toggle: () => void }>({ mode: 'dark', toggle: () => {} })

function storedMode(key: string): Mode {
  try {
    return localStorage.getItem(key) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeModeProvider({ children, storageKey = 'design-os-mode' }: { children: ReactNode; storageKey?: string }) {
  const [mode, setMode] = useState<Mode>(() => storedMode(storageKey))
  const value = useMemo(
    () => ({
      mode,
      toggle: () =>
        setMode((m) => {
          const next = m === 'dark' ? 'light' : 'dark'
          try {
            localStorage.setItem(storageKey, next)
          } catch {
            /* storage unavailable: the mode still applies for this session */
          }
          return next
        }),
    }),
    [mode, storageKey],
  )

  return (
    <ModeContext.Provider value={value}>
      <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ModeContext.Provider>
  )
}

export const useThemeMode = () => useContext(ModeContext)
