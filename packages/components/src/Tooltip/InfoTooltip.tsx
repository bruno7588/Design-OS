import MuiTooltip, { type TooltipProps } from '@mui/material/Tooltip'
import ButtonBase from '@mui/material/ButtonBase'
import { InfoOutlineIcon } from '../icons/FigmaIcons'

// The Figma Tooltip with Icon=True: a 20px info button that shows the tooltip on
// hover and focus. For any other trigger, wrap it in MUI <Tooltip> directly; the
// theme (tooltip.overrides.ts) styles both.
//
// Figma → props
//   Position + Alignment → placement ("top", "top-start", "right", …)
//   Icon=true            → InfoTooltip (Icon=false → MUI Tooltip around your element)

export interface InfoTooltipProps extends Omit<TooltipProps, 'children'> {
  /** Accessible name of the info button. */
  label?: string
}

export function InfoTooltip({ label = 'More information', ...props }: InfoTooltipProps) {
  return (
    // describeChild: the button's name is the label; the tooltip text is its description.
    <MuiTooltip describeChild {...props}>
      <ButtonBase
        aria-label={label}
        disableRipple
        sx={(theme) => ({
          width: 20,
          height: 20,
          borderRadius: `${theme.tokens.radius.full}px`,
          color: theme.tokens.semantic.textSecondary,
          '&.Mui-focusVisible': {
            outline: `2px solid ${theme.tokens.semantic.primaryButtonBackground}`,
            outlineOffset: 2,
          },
        })}
      >
        <InfoOutlineIcon size={20} />
      </ButtonBase>
    </MuiTooltip>
  )
}
