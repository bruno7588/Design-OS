import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { CardRoot, CardTitle, clamp } from './CardBase'
import jewelsArt from './illustrations/jewels.svg'

// 5Mins External training and Marketplace cards (Figma Cards page): an image over a title, a
// line or two about it, and a price. They share one layout, so one component draws both.
//
//   Card/External training (dark 5908:21523, light 9577:3582)
//     → <ExternalTrainingCard>: provider line, price in money
//   Card/Marketplace (dark 5213:4524, light 9577:3648)
//     Type=Subscription → <MarketplaceCard type="subscription">: a description (3 lines)
//     Type=Coaching     → <MarketplaceCard type="coaching">: the coach
//     Type=Reward       → <MarketplaceCard type="reward">: the brand; the price is points, after the
//                          Jewels illustration (Illustrations/ Progress, copied from the prototype)
//   Device=Desktop / Mobile → device "desktop" (300 wide) | "mobile" (272 wide)
//   State=Hover (External training) → :hover: Cards-background-hover

interface BaseProps {
  device?: 'desktop' | 'mobile'
  title: string
  image?: string
  price: string
  onClick?: () => void
  className?: string
  sx?: SxProps<Theme>
}

interface ProductCardProps extends BaseProps {
  kind: 'training' | 'subscription' | 'coaching' | 'reward'
  /** The line under the title: provider, description, coach or brand. */
  subtitle?: string
}

function ProductCard({ kind, device = 'desktop', title, subtitle, image, price, onClick, className, sx }: ProductCardProps) {
  const mobile = device === 'mobile'
  const marketplace = kind !== 'training'
  // The subtitle is Regular 14/1.5, except the mobile Coaching and Reward cards (Regular 12/1.2).
  const smallSub = mobile && (kind === 'coaching' || kind === 'reward')
  const imageH = mobile && marketplace ? 140 : 160
  const titleGap = mobile && marketplace ? 4 : 8
  const t = (theme: Theme) => theme.tokens

  return (
    <CardRoot
      className={['ds-product-card', `ds-product-${kind}`, className].filter(Boolean).join(' ')}
      sx={[{ display: 'flex', flexDirection: 'column', width: mobile ? 272 : 300 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        sx={(theme) => ({
          height: imageH,
          flexShrink: 0,
          backgroundColor: t(theme).semantic.inputBackground,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        })}
      />
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: `${mobile && marketplace ? t(theme).space.sm : t(theme).space.m}px`,
          padding: `${mobile ? t(theme).space.m : t(theme).space.l}px`,
        })}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${titleGap}px`, minWidth: 0 }}>
          <CardTitle onClick={onClick} sx={(theme) => ({ fontSize: mobile ? 14 : 16, fontWeight: 700, lineHeight: 1.5, color: t(theme).semantic.textPrimary, ...clamp(2) })}>
            {title}
          </CardTitle>
          {subtitle && (
            <Box
              component="p"
              sx={(theme) => ({
                m: 0,
                fontSize: smallSub ? 12 : 14,
                lineHeight: smallSub ? 1.2 : 1.5,
                color: t(theme).semantic.textSecondary,
                ...clamp(kind === 'subscription' ? 3 : 1),
              })}
            >
              {subtitle}
            </Box>
          )}
        </Box>
        <Box
          component="p"
          className="ds-product-price"
          sx={(theme) => ({
            m: 0,
            display: 'flex',
            alignItems: 'center',
            gap: `${t(theme).space.s}px`,
            fontSize: mobile ? 14 : 16,
            fontWeight: 700,
            lineHeight: 1.5,
            color: t(theme).semantic.textPrimary,
          })}
        >
          {kind === 'reward' && <Box component="img" src={jewelsArt} alt="" sx={{ width: mobile ? 21 : 24, height: mobile ? 21 : 24, flexShrink: 0 }} />}
          {kind === 'reward' ? <span aria-label={`${price} points`}>{price}</span> : price}
        </Box>
      </Box>
    </CardRoot>
  )
}

export interface ExternalTrainingCardProps extends BaseProps {
  /** "Self paced online course" */
  provider?: string
}

export function ExternalTrainingCard({ provider, ...props }: ExternalTrainingCardProps) {
  return <ProductCard kind="training" subtitle={provider} {...props} />
}

export interface MarketplaceCardProps extends BaseProps {
  type: 'subscription' | 'coaching' | 'reward'
  /** Subscription: the description. Coaching: the coach. Reward: the brand. */
  subtitle?: string
}

export function MarketplaceCard({ type, ...props }: MarketplaceCardProps) {
  return <ProductCard kind={type} {...props} />
}
