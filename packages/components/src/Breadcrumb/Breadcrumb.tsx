import { forwardRef } from 'react'
import Breadcrumbs, { type BreadcrumbsProps } from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// 5Mins Breadcrumb. MUI Breadcrumbs: the trail, chevrons and states are in the theme
// (breadcrumb.overrides.tsx). The wrapper turns a list into links, with the last entry
// as the current page (no chevron, not a link, aria-current="page").
//
// Figma → props
//   Breadcrumb item Type=Link         → items[] with href or onClick
//   Breadcrumb item Type=Current page → the last item
//   Disabled=true                     → disabled

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  /** For docs and visual tests: ds-hover, ds-focus. */
  className?: string
}

export interface BreadcrumbProps extends Omit<BreadcrumbsProps, 'children'> {
  items: BreadcrumbItem[]
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb({ items, ...props }, ref) {
  return (
    <Breadcrumbs ref={ref} aria-label="Breadcrumb" {...props}>
      {items.map((item, i) =>
        i === items.length - 1 ? (
          <Typography key={i} component="span" aria-current="page" aria-disabled={item.disabled || undefined}>
            {item.label}
          </Typography>
        ) : (
          <Link
            key={i}
            href={item.disabled ? undefined : item.href}
            component={item.href ? 'a' : 'button'}
            onClick={item.disabled ? undefined : item.onClick}
            aria-disabled={item.disabled || undefined}
            tabIndex={item.disabled ? -1 : undefined}
            underline="none"
            className={item.className}
          >
            {item.label}
          </Link>
        ),
      )}
    </Breadcrumbs>
  )
})
