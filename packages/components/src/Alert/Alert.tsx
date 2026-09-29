import { forwardRef, type ReactNode } from 'react'
import MuiAlert, { type AlertProps as MuiAlertProps } from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { Danger } from 'iconsax-react'
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
  { type = 'callout', illustration = true, icon = false, title, action, children, role, ...props },
  ref,
) {
  const below = !!title && type === 'callout'
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
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
      {action && below && (
        <Button variant="outlined2" icon={action.icon} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </MuiAlert>
  )
})
