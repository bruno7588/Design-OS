import { Stack } from '@mui/material'
import { Avatar, AvatarGroup, type AvatarGroupSize, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { PHOTO } from '../avatar/AvatarMatrix'

// The Figma Avatar group set: three avatars and "+3", at 24, 32 and 40px.
export const GROUP_SIZES: AvatarGroupSize[] = [24, 32, 40]

export function AvatarGroupMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <Stack data-testid={`avatar-group-matrix-${mode}`} sx={{ gap: 8, alignItems: 'flex-start' }}>
        {GROUP_SIZES.map((s) => (
          <AvatarGroup key={s} size={s} total={6}>
            <Avatar src={PHOTO} alt="" />
            <Avatar alt="" />
            <Avatar src={PHOTO} alt="" />
            <Avatar alt="" />
            <Avatar alt="" />
            <Avatar alt="" />
          </AvatarGroup>
        ))}
      </Stack>
    </Canvas>
  )
}
