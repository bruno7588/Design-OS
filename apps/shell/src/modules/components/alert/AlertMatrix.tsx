import { Stack, Typography } from '@mui/material'
import { Alert, type AlertProps, type Mode } from '@design-os/components'
import { Add } from 'iconsax-react'
import { Canvas } from '../shared/Canvas'

// The Figma Alert set, in its order: the twelve Callouts (Illustration, Icon or neither,
// each without and with a button and supporting text), then the three Alerts.
const TEXT = 'You can add your content and 5Mins content to a collection, and share it with your teams.'
const BODY = (
  <ul>
    <li>Collections group courses, lessons and resources.</li>
    <li>Learners see them on their home page.</li>
    <li>They appear in the order you set.</li>
  </ul>
)
const noop = () => {}
const action = { label: 'Button', onClick: noop }
const below = { label: 'Button', onClick: noop, icon: <Add color="currentColor" /> }

const LEAD: { name: string; props: Partial<AlertProps> }[] = [
  { name: 'Illustration', props: { illustration: true } },
  { name: 'Icon', props: { icon: true } },
  { name: 'Neither', props: { illustration: false } },
]

export const CALLOUTS: { name: string; props: AlertProps }[] = LEAD.flatMap((l) => [
  { name: `${l.name}`, props: { ...l.props, children: TEXT } },
  { name: `${l.name}, button`, props: { ...l.props, children: TEXT, action } },
  { name: `${l.name}, supporting text`, props: { ...l.props, title: TEXT, children: BODY } },
  { name: `${l.name}, supporting text, button`, props: { ...l.props, title: TEXT, children: BODY, action: below } },
])

export const ALERTS: { name: string; props: AlertProps }[] = [
  { name: 'Illustration', props: { type: 'alert', children: 'Warning title', action } },
  { name: 'Icon', props: { type: 'alert', icon: true, children: 'Warning title', action } },
  { name: 'Neither', props: { type: 'alert', illustration: false, children: 'Warning title', action } },
]

export function AlertMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Stack data-testid={`alert-matrix-${mode}`} sx={{ gap: 6, width: 900 }}>
        <Typography variant="h6" color="text.secondary">
          Callout
        </Typography>
        {CALLOUTS.map((c) => (
          <Alert key={c.name} {...c.props} />
        ))}
        <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
          Alert
        </Typography>
        {ALERTS.map((a) => (
          <Alert key={a.name} {...a.props} />
        ))}
      </Stack>
    </Canvas>
  )
}
