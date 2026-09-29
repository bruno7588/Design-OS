import type { Components, Theme } from '@mui/material/styles'

// MuiSlider theme overrides. Figma Library, Slider page: <Slider> (dark 10662:14039,
// light 11045:9459). Plain <Slider> renders the Figma slider:
//   State=Enabled  → a 4px Border rail, a 6px Selected track, a 20px Selected thumb
//                    with a 1px 1px 4px shadow
//   State=Hover    → a 42px Selected halo round the thumb (the thumb's Overlay layer)
//   State=Disabled → disabled: track and thumb in Button-background-disabled
// Forced-state classes (ds-hover, ds-focus) are for docs and visual tests.
//
// The Figma halo is the thumb's 42px Overlay layer: Selected at 16%.

export const MuiSlider: Components<Theme>['MuiSlider'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.tokens
      const s = t.semantic
      const halo = `0 0 0 11px ${s.selected}29` // 16% Selected
      return {
        height: 6,
        padding: '19px 0',
        color: s.selected,
        '& .MuiSlider-rail': { height: 4, backgroundColor: s.border, opacity: 1, borderRadius: 100 },
        '& .MuiSlider-track': { height: 6, border: 0, backgroundColor: s.selected, borderRadius: 100 },
        '& .MuiSlider-thumb': {
          width: 20,
          height: 20,
          backgroundColor: s.selected,
          boxShadow: t.shadow.sliderThumb,
          '&::before': { boxShadow: 'none' },
          '&:hover, &.Mui-focusVisible, &.Mui-active, &.ds-hover': { boxShadow: `${t.shadow.sliderThumb}, ${halo}` },
          '&.Mui-focusVisible, &.ds-focus': { outline: `2px solid ${s.primaryButtonBackground}`, outlineOffset: 2 },
        },
        '&.Mui-disabled': {
          color: s.buttonBackgroundDisabled,
          '& .MuiSlider-track': { backgroundColor: s.buttonBackgroundDisabled },
          '& .MuiSlider-thumb': { backgroundColor: s.buttonBackgroundDisabled, boxShadow: t.shadow.sliderThumbDisabled },
        },
        '& .MuiSlider-valueLabel': {
          backgroundColor: s.tooltipBackground,
          borderRadius: t.radius.s,
          fontSize: 12,
          fontWeight: 500,
          padding: `${t.space.xs}px ${t.space.s}px`,
        },
        '@media (prefers-reduced-motion: reduce)': { '& .MuiSlider-thumb, & .MuiSlider-track': { transition: 'none' } },
      }
    },
  },
}
