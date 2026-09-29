import { forwardRef, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import MuiAlert, { type AlertProps as MuiAlertProps } from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { ArrowUp2, Danger } from 'iconsax-react'
import { Button } from '../Button/Button'
import { InfoOutlineIcon } from '../icons/FigmaIcons'
import { BellIllustration, PinIllustration } from '../icons/Illustrations'

// 5Mins inline Alert and Callout. MUI Alert, variant="standard": the look is in the theme
// (alert.overrides.ts), so <MuiAlert severity="info"> is a Callout and severity="warning"
// an Alert. The wrapper picks the Figma icon or illustration and lays out the button.
//
// Figma → props
//   Type=Callout / Alert → type "callout" / "alert"
//   Illustration=true    → illustration (default): the pin, or the bell
//   Icon=true            → icon: the info outline, or Danger Bold. Wins over the illustration.
//   Supporting text=true → title: the SemiBold line, with children as the body
//   Button=true          → action: a link at the end of the row, or an Outlined-2
//                          button under the supporting text
//
// A Callout whose supporting text runs past 3 lines can collapse (Bruno, 2026-09-29):
// the chevron at the end of the title row (Figma vuesax/linear/arrow-up) hides and
// shows the body and its button. It starts expanded.
//
// Callouts are role "note" and Alerts role "status", not MUI's role "alert": they're part
// of the page, and "alert" would interrupt a screen reader when the page loads.

export type AlertType = 'callout' | 'alert'

export interface AlertAction {
  label: string
  onClick: () => void
  /** Leading icon for the Outlined-2 button under supporting text. */
  icon?: ReactNode
}

export interface AlertProps extends Omit<MuiAlertProps, 'title' | 'icon' | 'action' | 'severity' | 'variant' | 'color'> {
  type?: AlertType
  illustration?: boolean
  icon?: boolean
  title?: ReactNode
  action?: AlertAction
  /** Start with the supporting text hidden (only when it can collapse). */
  defaultCollapsed?: boolean
}

/** More than 3 lines of supporting text. */
const MAX_LINES = 3

function useTall(ref: React.RefObject<HTMLDivElement | null>, active: boolean) {
  const [tall, setTall] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !active) return
    const measure = () => {
      const line = parseFloat(getComputedStyle(el).lineHeight) || 21
      setTall(el.scrollHeight > line * MAX_LINES + 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, active])
  return tall
}

function leading(type: AlertType, icon: boolean, illustration: boolean) {
  if (icon) {
    return type === 'alert' ? <Danger variant="Bold" color="currentColor" /> : <InfoOutlineIcon size={20} />
  }
  if (illustration) {
    return type === 'alert' ? <BellIllustration className="ds-illustration" /> : <PinIllustration className="ds-illustration" />
  }
  return false
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { type = 'callout', illustration = true, icon = false, title, action, children, role, defaultCollapsed = false, ...props },
  ref,
) {
  const below = !!title && type === 'callout'
  const bodyId = useId()
  const body = useRef<HTMLDivElement>(null)
  const [collapsed, setCollapsed] = useState(false)
  // Measured while the body is shown; a collapsed body keeps its last answer.
  const tall = useTall(body, below && !collapsed)
  const collapsible = below && (tall || collapsed)
  useEffect(() => {
    if (tall && defaultCollapsed) setCollapsed(true)
  }, [tall, defaultCollapsed])

  return (
    <MuiAlert
      ref={ref}
      variant="standard"
      severity={type === 'alert' ? 'warning' : 'info'}
      icon={leading(type, icon, illustration)}
      role={role ?? (type === 'alert' ? 'status' : 'note')}
      action={
        action && !below ? (
          <Button variant="link" onClick={action.onClick}>
            {action.label}
          </Button>
        ) : undefined
      }
      {...props}
    >
      {title && (
        <AlertTitle className="ds-alert-headline">
          <span>{title}</span>
          {collapsible && (
            <IconButton
              className="ds-alert-toggle"
              aria-expanded={!collapsed}
              aria-controls={bodyId}
              aria-label={collapsed ? 'Show details' : 'Hide details'}
              onClick={() => setCollapsed((c) => !c)}
              disableRipple
            >
              <ArrowUp2 color="currentColor" />
            </IconButton>
          )}
        </AlertTitle>
      )}
      {below ? (
        <Box ref={body} id={bodyId} className="ds-alert-body" hidden={collapsed}>
          {children}
        </Box>
      ) : (
        children
      )}
      {action && below && !collapsed && (
        <Button variant="outlined2" icon={action.icon} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </MuiAlert>
  )
})
