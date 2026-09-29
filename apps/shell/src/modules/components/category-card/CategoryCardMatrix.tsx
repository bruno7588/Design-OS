import { Box } from '@mui/material'
import { CategoryCard, type CategoryCardProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { CardGroup } from '../shared/CardGroup'

export const CATEGORY: CategoryCardProps = { title: 'Category name', image: '/samples/thumbnail.png', courses: '12 courses', lessons: '24 lessons' }

// The Figma Card/ Category set: Desktop (Default, New, Hover, New hover, Disabled, Disabled hover), then Mobile.
export function CategoryCardMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Box data-testid={`category-card-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 8, pt: 4 }}>
        <CardGroup label="Desktop" gap={8}>
          <CategoryCard {...CATEGORY} />
          <CategoryCard {...CATEGORY} isNew />
          <CategoryCard {...CATEGORY} className="ds-hover" />
          <CategoryCard {...CATEGORY} isNew className="ds-hover" />
          <CategoryCard {...CATEGORY} disabled />
        </CardGroup>
        <CardGroup label="Mobile" gap={8}>
          <CategoryCard {...CATEGORY} device="mobile" />
          <CategoryCard {...CATEGORY} device="mobile" className="ds-hover" />
          <CategoryCard {...CATEGORY} device="mobile" isNew />
          <CategoryCard {...CATEGORY} device="mobile" isNew className="ds-hover" />
          <CategoryCard {...CATEGORY} device="mobile" disabled />
        </CardGroup>
      </Box>
    </Canvas>
  )
}
