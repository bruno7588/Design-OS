import { Avatar, type AvatarSize, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'
import { StateGrid } from '../shared/StateGrid'

// The Figma Avatar set: each size (columns) with a picture and with the fallback face (rows).
export const SIZES: AvatarSize[] = [72, 64, 56, 48, 40, 32, 24]
export const PHOTO = '/samples/avatar.png'

export function AvatarMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode}>
      <StateGrid
        testId={`avatar-matrix-${mode}`}
        columns={SIZES.map((s) => `${s}px`)}
        rows={[
          { name: 'Picture', cells: SIZES.map((s) => <Avatar key={s} size={s} src={PHOTO} alt="Ana Costa" />) },
          { name: 'Fallback', cells: SIZES.map((s) => <Avatar key={s} size={s} alt="" />) },
        ]}
      />
    </Canvas>
  )
}
