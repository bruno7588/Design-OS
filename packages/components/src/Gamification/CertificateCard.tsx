import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { Add, TickCircle } from 'iconsax-react'
import { Button } from '../Button/Button'
import { levelIllustrationUrl } from './LevelIllustration'
import masterBg from './art/certificate/master.png'
import expertBg from './art/certificate/expert.png'
import advancedBg from './art/certificate/advanced.png'

// 5Mins Certificate card (Figma Certificate instances: dark 5514:2390, light 8442:6119): an
// earned certificate on its tier's artwork. The same in both modes, like the illustrations.
//
// Figma → props
//   Type=Mastery / Master / Expert / Advanced → tier ('master' covers Mastery and Master)
//   Type=Mastery (subtitle "Mastery Achieved") → subtitle; Type=Master (Download under the title) → onDownload
//   Size=small / md / large                    → size
//
// small (343) and md (408): padding 16, radius 12, a 64px medal with a soft copy behind it, the
// title and a subtitle or a Download text button, and a tick. large (900): padding 24,
// the 72px medal with its ribbon, and an Outlined Download button. Radius 12 on every size. A 4px inner edge on the right
// and bottom in the tier colour.

export type CertificateTier = 'master' | 'expert' | 'advanced'

export interface CertificateCardProps {
  tier: CertificateTier
  size?: 'small' | 'md' | 'large'
  /** Defaults to "Master Certificate", "Expert Certificate" or "Advanced Certificate". */
  title?: string
  subtitle?: string
  /** Shows the Download button (a text button on small and md, Outlined on large). */
  onDownload?: () => void
  className?: string
  sx?: SxProps<Theme>
}

const TIER = {
  master: { bg: masterBg, level: 'master', name: 'Master Certificate', edge: 'certificateMaster' },
  expert: { bg: expertBg, level: 'expert', name: 'Expert Certificate', edge: 'certificateExpert' },
  advanced: { bg: advancedBg, level: 'advanced', name: 'Advanced Certificate', edge: 'certificateAdvanced' },
} as const

export function CertificateCard({ tier, size = 'small', title, subtitle, onDownload, className, sx }: CertificateCardProps) {
  const t = TIER[tier]
  const large = size === 'large'
  const medal = levelIllustrationUrl(t.level, { size: large ? 'large' : 'small' })
  return (
    <Box
      component="article"
      className={['ds-certificate-card', className].filter(Boolean).join(' ')}
      sx={[
        (theme) => {
          const tk = theme.tokens
          // Master's orange takes dark text; Expert's purple and Advanced's blue take light text.
          const ink = tier === 'master' ? tk.palette.neutral[800] : tk.palette.neutral[25]
          return {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            gap: `${tk.space.s}px`,
            width: large ? '100%' : size === 'md' ? 408 : 343,
            maxWidth: '100%',
            minHeight: large ? 120 : 96,
            padding: `${large ? tk.space.l : tk.space.m}px`,
            borderRadius: `${tk.radius.sm}px`,
            backgroundImage: `url(${t.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: `inset -4px -4px 0 ${tk.palette.gamification[t.edge]}`,
            color: ink,
            fontFamily: theme.typography.fontFamily,
            '& .ds-certificate-download.MuiButton-root': {
              color: ink,
              ...(large && { borderColor: ink, '&:hover': { borderColor: ink, backgroundColor: 'transparent' } }),
            },
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ position: 'relative', flexShrink: 0, width: large ? 72 : 64, height: large ? 72 : 64 }}>
        {/* Figma: a copy of the medal, blurred 4 and 2px down and right, as its glow. */}
        {!large && <Box component="img" src={medal} alt="" sx={{ position: 'absolute', top: 2, left: 2, width: 64, height: 64, filter: 'blur(4px)' }} />}
        <Box component="img" src={medal} alt="" sx={{ position: 'relative', display: 'block', width: '100%', height: '100%' }} />
      </Box>
      <Box sx={(theme) => ({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: large ? `${theme.tokens.space.s}px` : `${theme.tokens.space.xs}px`, pl: large ? `${theme.tokens.space.xs}px` : 0 })}>
        <Box component="h3" sx={{ m: 0, fontSize: large ? 20 : size === 'md' ? 16 : 14, fontWeight: 700, lineHeight: 1.5 }}>
          {title ?? t.name}
        </Box>
        {subtitle && <Box sx={{ fontSize: large ? 14 : size === 'md' ? 14 : 12, lineHeight: 1.5 }}>{subtitle}</Box>}
        {onDownload && !large && (
          <Button
            variant="text"
            size="small"
            className="ds-certificate-download"
            endIcon={<Add color="currentColor" />}
            onClick={onDownload}
            sx={{ alignSelf: 'flex-start', minWidth: 0, p: 0, fontSize: 12, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}
          >
            Download
          </Button>
        )}
      </Box>
      {large
        ? onDownload && (
            <Button variant="outlined" className="ds-certificate-download" endIcon={<Add color="currentColor" />} onClick={onDownload}>
              Download
            </Button>
          )
        : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, flexShrink: 0 }}>
              <TickCircle size={20} variant="Bold" color="currentColor" aria-label="Earned" role="img" />
            </Box>
          )}
    </Box>
  )
}
