import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Grow from '@mui/material/Grow'

// 5Mins Toast. The body is MUI Alert variant="filled", styled in the theme
// (toast.overrides.tsx). ToastProvider adds what MUI lacks: a stack at the bottom
// centre, a 5 second timer that pauses on hover and focus, and the right live role.
//
// Figma → props
//   Type=Information / Success / Warning / Error → type info / success / warning / error
//   Icon=False                                    → icon: false

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface ToastOptions {
  type?: ToastType
  message: string
  /** Show the type's icon (default true). */
  icon?: boolean
  /** A short action such as Undo. Not in Figma; the prototype uses it for undoing a delete. */
  action?: { label: string; onClick: () => void }
}

interface ToastItem extends ToastOptions {
  id: number
}

const DURATION = 5000

const ToastContext = createContext<(toast: ToastOptions) => void>(() => {})

/** Shows a toast: `const toast = useToast(); toast({ type: 'success', message: 'Course published' })`. */
export const useToast = () => useContext(ToastContext)

/** One toast body, without timing or placement. Also used to show toasts in place in the docs. */
export function ToastBody({ type = 'success', message, icon = true, action, onAction }: ToastOptions & { onAction?: () => void }) {
  return (
    <Alert
      variant="filled"
      severity={type}
      icon={icon ? undefined : false}
      // Success and Information are polite; Warning and Error interrupt.
      role={type === 'warning' || type === 'error' ? 'alert' : 'status'}
      action={
        action && (
          <ButtonBase
            className="ds-toast-action"
            disableRipple
            onClick={() => {
              action.onClick()
              onAction?.()
            }}
          >
            {action.label}
          </ButtonBase>
        )
      }
    >
      {message}
    </Alert>
  )
}

function TimedToast({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const [shown, setShown] = useState(true)
  const remaining = useRef(DURATION)
  const started = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const start = useCallback(() => {
    started.current = Date.now()
    timer.current = setTimeout(() => setShown(false), remaining.current)
  }, [])
  const pause = useCallback(() => {
    clearTimeout(timer.current)
    remaining.current -= Date.now() - started.current
  }, [])

  useEffect(() => {
    start()
    return () => clearTimeout(timer.current)
  }, [start])

  return (
    <Grow in={shown} onExited={onClose} appear>
      <Box onMouseEnter={pause} onMouseLeave={start} onFocus={pause} onBlur={start} sx={{ pointerEvents: 'auto' }}>
        <ToastBody {...toast} onAction={() => setShown(false)} />
      </Box>
    </Grow>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const show = useCallback((toast: ToastOptions) => {
    const id = nextId.current++
    setToasts((all) => [...all, { ...toast, id }])
  }, [])
  const remove = useCallback((id: number) => setToasts((all) => all.filter((t) => t.id !== id)), [])
  const value = useMemo(() => show, [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Box
        data-testid="toast-stack"
        sx={(theme) => ({
          position: 'fixed',
          left: '50%',
          bottom: `${theme.tokens.space.l}px`,
          transform: 'translateX(-50%)',
          zIndex: theme.zIndex.snackbar,
          display: 'flex',
          // As in the prototype: each new toast appears above the ones already showing.
          flexDirection: 'column-reverse',
          alignItems: 'center',
          gap: `${theme.tokens.space.s}px`,
          pointerEvents: 'none',
          '@media (prefers-reduced-motion: reduce)': { '& > *': { transition: 'none !important' } },
        })}
      >
        {toasts.map((t) => (
          <TimedToast key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </Box>
    </ToastContext.Provider>
  )
}
