import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, CardRoot, PageHeader } from '@design-os/components'

// The playground's front page: the replicas, until the demo gallery arrives in Phase 4b.

const REPLICAS = [
  {
    name: 'Admin',
    description: 'Top and side navigation, page title row, tabs, a data table, drawer, modal and confirmation dialog. People shows 500 generated employees.',
    links: [
      { label: 'Open People', to: '/admin/people' },
      { label: 'Open Empty People', to: '/admin/people?data=empty' },
    ],
  },
  {
    name: 'Web app',
    description: 'The learner web app shell: top and side navigation with the profile card.',
    links: [{ label: 'Open Web App', to: '/web/for-you' }],
  },
  {
    name: 'Native app',
    description: 'Not built yet. It needs a decision on how the components reach React Native.',
    links: [],
  },
]

export function ReplicasIndex() {
  const navigate = useNavigate()
  return (
    <Box component="main" sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.l}px`, maxWidth: 960, mx: 'auto', padding: `${theme.tokens.space.xl}px` })}>
      <PageHeader title="Playground" supportingText="Replicas of the 5Mins surfaces, built from the Design OS components. Demos are built on these." />
      {REPLICAS.map((r) => (
        <CardRoot key={r.name} hover={false} sx={(theme) => ({ display: 'flex', flexDirection: 'column', gap: `${theme.tokens.space.sm}px`, padding: `${theme.tokens.space.l}px` })}>
          <Typography component="h2" variant="h3" sx={(theme) => ({ color: theme.tokens.semantic.textPrimary })}>
            {r.name}
          </Typography>
          <Typography variant="body2" sx={(theme) => ({ color: theme.tokens.semantic.textSecondary })}>
            {r.description}
          </Typography>
          {r.links.length > 0 && (
            <Box sx={(theme) => ({ display: 'flex', gap: `${theme.tokens.space.sm}px`, mt: `${theme.tokens.space.xs}px` })}>
              {r.links.map((l, i) => (
                <Button key={l.to} variant={i === 0 ? 'contained' : 'outlined'} size="small" onClick={() => navigate(l.to)}>
                  {l.label}
                </Button>
              ))}
            </Box>
          )}
        </CardRoot>
      ))}
    </Box>
  )
}
