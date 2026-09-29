import type { Components, Theme } from '@mui/material/styles'
import type { StepIconProps } from '@mui/material/StepIcon'
import { TickCircle } from 'iconsax-react'

// MuiStepper, MuiStep, MuiStepLabel and MuiStepConnector theme overrides. Figma Library,
// Stepper page: stepper (dark 8108:5464, light instance 11249:244), Step/Instances
// (dark 8108:5472, light 11249:219) and Step/line (dark 8108:5482, light 11248:125).
//
// Plain MUI renders the Figma stepper:
//   <Stepper activeStep={2}> with <Step><StepLabel>…</StepLabel></Step>
//   Step State=Completed   → steps before activeStep: Bold tick-circle in Success-500
//   Step State=In progress → the active step: Linear tick-circle in Text-secondary
//   Step State=Disabled    → steps after it: Linear tick-circle and label in Text-disabled
//   Step/line Complete     → the line before a completed step: solid
//   Step/line Incomplete   → every other line: dotted (2px dashes, 4px gaps)

/** The Figma tick-circle: Bold when completed, Linear otherwise. The colour comes from the label. */
export function StepTickIcon({ completed, className }: StepIconProps) {
  return <TickCircle className={className} variant={completed ? 'Bold' : 'Linear'} color="currentColor" size={20} aria-hidden />
}

export const MuiStepper: Components<Theme>['MuiStepper'] = {
  styleOverrides: {
    // The Figma stepper frame: a 1px Border stroke inside, radius 12, padding 16/20 (53px tall).
    horizontal: ({ theme }) => {
      const t = theme.tokens
      return {
        alignItems: 'center',
        margin: 0,
        padding: `${t.space.m}px ${t.space.ml}px`,
        boxShadow: `inset 0 0 0 1px ${t.semantic.border}`,
        borderRadius: t.radius.sm,
        listStyle: 'none',
      }
    },
  },
}

export const MuiStep: Components<Theme>['MuiStep'] = {
  styleOverrides: {
    horizontal: { paddingLeft: 0, paddingRight: 0 },
  },
}

export const MuiStepLabel: Components<Theme>['MuiStepLabel'] = {
  defaultProps: { StepIconComponent: StepTickIcon },
  styleOverrides: {
    root: ({ theme }) => ({ gap: theme.tokens.space.xs }),
    iconContainer: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        paddingRight: 0,
        display: 'flex',
        color: s.textDisabled,
        '&.Mui-active': { color: s.textSecondary },
        '&.Mui-completed': { color: theme.tokens.palette.success[500] },
      }
    },
    label: ({ theme }) => {
      const s = theme.tokens.semantic
      return {
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        whiteSpace: 'nowrap',
        color: s.textDisabled,
        '&.Mui-active, &.Mui-completed': { color: s.textSecondary, fontWeight: 400 },
      }
    },
  },
}

// Step/line: 12px from each step, a 0.5px Text-tertiary line that fills the space between.
export const MuiStepConnector: Components<Theme>['MuiStepConnector'] = {
  styleOverrides: {
    horizontal: ({ theme }) => ({ margin: `0 ${theme.tokens.space.sm}px`, minWidth: 24 }),
    line: ({ theme }) => {
      const c = theme.tokens.semantic.textTertiary
      return {
        border: 0,
        height: 1,
        transform: 'scaleY(0.5)',
        backgroundImage: `repeating-linear-gradient(to right, ${c} 0 2px, transparent 2px 6px)`,
        '.Mui-completed > &': { backgroundImage: 'none', backgroundColor: c },
      }
    },
  },
}
