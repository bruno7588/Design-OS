import type { Components, Theme } from '@mui/material/styles'

// MuiTooltip theme overrides. Implements the Tooltip section of
// playground/docs/design-system/alerts-toast.md, cross-checked with the Figma Library
// Tooltip set (dark 2683:29027, light 11927:8087).
//
// A plain <Tooltip title="…"> from @mui/material renders the 5Mins tooltip:
//   Tooltip-background bubble, 8/12 padding, radius 12, 14px Regular in Neutral-25,
//   max width 288, a 12×6 caret, 4px from the trigger.
// Figma Position + Alignment → placement: Top + Start = "top-start", Right = "right", …
// For Start and End the caret sits 16px from the edge; the offset below moves the
// bubble so the caret still points at the middle of the trigger.

const CARET_W = 12
const CARET_H = 6
const GAP = 4
const CARET_INSET = 16

export const MuiTooltip: Components<Theme>['MuiTooltip'] = {
  defaultProps: {
    arrow: true,
    placement: 'top',
    // MUI only reads popperOptions from PopperProps; these come after its own arrow settings, so they win.
    PopperProps: {
      popperOptions: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: ({ placement, reference }: { placement: string; reference: { width: number } }) => {
                const shift = CARET_INSET + CARET_W / 2 - reference.width / 2
                const skid = placement.endsWith('-start') ? -shift : placement.endsWith('-end') ? shift : 0
                return [skid, GAP + CARET_H]
              },
            },
          },
          // Keep the caret at least 16px from the bubble's ends.
          { name: 'arrow', options: { padding: CARET_INSET } },
        ],
      },
    },
  },
  styleOverrides: {
    tooltip: ({ theme }) => {
      const t = theme.tokens
      return {
        margin: '0 !important',
        padding: `${t.space.s}px ${t.space.sm}px`,
        maxWidth: 288,
        borderRadius: t.radius.sm,
        backgroundColor: t.semantic.tooltipBackground,
        boxShadow: t.shadow.l,
        color: t.palette.neutral[25],
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
      }
    },
    // The caret: a 12×6 triangle in the bubble colour, drawn with clip-path.
    arrow: ({ theme }) => ({
      color: theme.tokens.semantic.tooltipBackground,
      '&::before': { transform: 'none', borderRadius: 0 },
    }),
    popper: {
      '&[data-popper-placement*="top"] .MuiTooltip-arrow': {
        width: CARET_W,
        height: CARET_H,
        marginBottom: -CARET_H,
        '&::before': { clipPath: 'polygon(0 0, 100% 0, 50% 100%)' },
      },
      '&[data-popper-placement*="bottom"] .MuiTooltip-arrow': {
        width: CARET_W,
        height: CARET_H,
        marginTop: -CARET_H,
        '&::before': { clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' },
      },
      '&[data-popper-placement*="left"] .MuiTooltip-arrow': {
        width: CARET_H,
        height: CARET_W,
        marginRight: -CARET_H,
        '&::before': { clipPath: 'polygon(0 0, 100% 50%, 0 100%)' },
      },
      '&[data-popper-placement*="right"] .MuiTooltip-arrow': {
        width: CARET_H,
        height: CARET_W,
        marginLeft: -CARET_H,
        '&::before': { clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' },
      },
    },
  },
}
