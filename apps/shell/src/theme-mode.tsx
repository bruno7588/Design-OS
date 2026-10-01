import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme, type Mode } from '@design-os/components'

const STORAGE_KEY = 'design-os-mode'

const ModeContext = createContext<{ mode: Mode; toggle: () => void }>({ mode: 'light', toggle: () => {} })

function storedMode(): Mode {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

/** Dark by default (the admin look), with a persisted switch. Mirrors the prototype's useTheme. */
export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(storedMode)
  const value = useMemo(
    () => ({
      mode,
      toggle: () =>
        setMode((m) => {
          const next = m === 'dark' ? 'light' : 'dark'
          try {
            localStorage.setItem(STORAGE_KEY, next)
          } catch {
            /* storage unavailable: the mode still applies for this session */
          }
          return next
        }),
    }),
    [mode],
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
