import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import l1Small from './art/levels/level-1-small.svg'
import l1SmallDisabled from './art/levels/level-1-small-disabled.svg'
import l1Large from './art/levels/level-1-large.svg'
import l1LargeDisabled from './art/levels/level-1-large-disabled.svg'
import l2Small from './art/levels/level-2-small.svg'
import l2SmallDisabled from './art/levels/level-2-small-disabled.svg'
import l2Large from './art/levels/level-2-large.svg'
import l2LargeDisabled from './art/levels/level-2-large-disabled.svg'
import l3Small from './art/levels/level-3-small.svg'
import l3SmallDisabled from './art/levels/level-3-small-disabled.svg'
import l3Large from './art/levels/level-3-large.svg'
import l3LargeDisabled from './art/levels/level-3-large-disabled.svg'
import l4Small from './art/levels/level-4-small.svg'
import l4SmallDisabled from './art/levels/level-4-small-disabled.svg'
import l4Large from './art/levels/level-4-large.svg'
import l4LargeDisabled from './art/levels/level-4-large-disabled.svg'
import l5Small from './art/levels/level-5-small.svg'
import l5SmallDisabled from './art/levels/level-5-small-disabled.svg'
import l5Large from './art/levels/level-5-large.svg'
import l5LargeDisabled from './art/levels/level-5-large-disabled.svg'
import lAdvancedSmall from './art/levels/level-advanced-small.svg'
import lAdvancedSmallDisabled from './art/levels/level-advanced-small-disabled.svg'
import lAdvancedLarge from './art/levels/level-advanced-large.svg'
import lAdvancedLargeDisabled from './art/levels/level-advanced-large-disabled.svg'
import lExpertSmall from './art/levels/level-expert-small.svg'
import lExpertSmallDisabled from './art/levels/level-expert-small-disabled.svg'
import lExpertLarge from './art/levels/level-expert-large.svg'
import lExpertLargeDisabled from './art/levels/level-expert-large-disabled.svg'
import lMasterSmall from './art/levels/level-master-small.svg'
import lMasterSmallDisabled from './art/levels/level-master-small-disabled.svg'
import lMasterLarge from './art/levels/level-master-large.svg'
import lMasterLargeDisabled from './art/levels/level-master-large-disabled.svg'

// 5Mins level illustrations (Figma Illustrations/ Learning path: dark 9120:9437, light
// 11196:8794). Shields for levels 1 to 5 and medals for Advanced, Expert and Master. Small
// (56px, number only) and large (72px, with a banner or ribbon) are different artwork, and each
// has a grey disabled version. Copied from the prototype (src/assets/level-illustrations), which
// downloaded them from that frame. Artwork: the colours don't change with the mode.

export type SkillLevel = 1 | 2 | 3 | 4 | 5 | 'advanced' | 'expert' | 'master'

const FILES: Record<string, string> = {
  'level-1-small': l1Small,
  'level-1-small-disabled': l1SmallDisabled,
  'level-1-large': l1Large,
  'level-1-large-disabled': l1LargeDisabled,
  'level-2-small': l2Small,
  'level-2-small-disabled': l2SmallDisabled,
  'level-2-large': l2Large,
  'level-2-large-disabled': l2LargeDisabled,
  'level-3-small': l3Small,
  'level-3-small-disabled': l3SmallDisabled,
  'level-3-large': l3Large,
  'level-3-large-disabled': l3LargeDisabled,
  'level-4-small': l4Small,
  'level-4-small-disabled': l4SmallDisabled,
  'level-4-large': l4Large,
  'level-4-large-disabled': l4LargeDisabled,
  'level-5-small': l5Small,
  'level-5-small-disabled': l5SmallDisabled,
  'level-5-large': l5Large,
  'level-5-large-disabled': l5LargeDisabled,
  'level-advanced-small': lAdvancedSmall,
  'level-advanced-small-disabled': lAdvancedSmallDisabled,
  'level-advanced-large': lAdvancedLarge,
  'level-advanced-large-disabled': lAdvancedLargeDisabled,
  'level-expert-small': lExpertSmall,
  'level-expert-small-disabled': lExpertSmallDisabled,
  'level-expert-large': lExpertLarge,
  'level-expert-large-disabled': lExpertLargeDisabled,
  'level-master-small': lMasterSmall,
  'level-master-small-disabled': lMasterSmallDisabled,
  'level-master-large': lMasterLarge,
  'level-master-large-disabled': lMasterLargeDisabled,
}

export function levelIllustrationUrl(level: SkillLevel, { size = 'small', disabled = false }: { size?: 'small' | 'large'; disabled?: boolean } = {}) {
  return FILES[`level-${level}-${size}${disabled ? '-disabled' : ''}`]
}

export interface LevelIllustrationProps {
  level: SkillLevel
  size?: 'small' | 'large'
  disabled?: boolean
  /** Names it when it means something on its own; otherwise it's decorative. */
  label?: string
  sx?: SxProps<Theme>
}

export function LevelIllustration({ level, size = 'small', disabled = false, label, sx }: LevelIllustrationProps) {
  const px = size === 'large' ? 72 : 56
  return (
    <Box
      component="img"
      className="ds-level-illustration"
      src={levelIllustrationUrl(level, { size, disabled })}
      alt={label ?? ''}
      sx={[
        // The disabled files grey themselves with a luminosity blend, which only works against
        // what's behind them, so the blend goes on the image (as Figma blends it on the card).
        { display: 'block', width: px, height: px, flexShrink: 0, ...(disabled && { mixBlendMode: 'luminosity' }) },
        ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}
