import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeModeProvider } from './theme-mode'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeModeProvider>
  </StrictMode>,
)
