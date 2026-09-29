import { forwardRef } from 'react'
import MuiTab, { type TabProps as MuiTabProps } from '@mui/material/Tab'

// 5Mins Tab. Use inside MUI <Tabs>; every visual rule lives in the theme
// (tabs.overrides.ts). The wrapper only adds what MUI 5 lacks: the counter.
//
// Figma → props
//   Selected=true → the Tabs `value` matches this tab's `value`
//   counter=true  → count

export interface TabProps extends Omit<MuiTabProps, 'label' | 'icon' | 'iconPosition'> {
  label: string
  /** Shown in a pill after the label. Use only when the number helps. */
  count?: number
}

export const Tab = forwardRef<HTMLDivElement, TabProps>(function Tab({ label, count, ...props }, ref) {
  return (
    <MuiTab
      ref={ref}
      label={
        <>
          <span className="ds-tab-label" data-label={label}>
            {label}
          </span>
          {count !== undefined && <span className="ds-tab-counter">{count}</span>}
        </>
      }
      {...props}
    />
  )
})
