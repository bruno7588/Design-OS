import { useState, type ReactNode } from 'react'
import { Box, Link, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Badge, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { figmaNodeUrl, findInventoryRow } from '../inventory'
import { Bullets, Section } from './GuidelinesTemplate'
import { CodeBlock } from './CodeBlock'

// The Compare tab for every component. Same sections, same order.
export type DiffStatus = 'Matches' | 'Design to update' | 'Code to update'

export interface Compare {
  /** Figma page and set name, as in the inventory. */
  page: string
  set: string
  /** Figma frames saved by the component-inventory skill, per mode. */
  frames: Record<Mode, string>
  /** The live reference, laid out like the Figma board. */
  live: (mode: Mode) => ReactNode
  differences: { property: string; figma: string; reference: string; status: DiffStatus; note?: string }[]
  engineering: {
    mui: string
    usage: string
    props: { figma: string; code: string }[]
    theme: string[]
    files: string[]
  }
}

const STATUS_TYPE = { Matches: 'success', 'Design to update': 'warning', 'Code to update': 'error' } as const

export function StatusBadge({ status }: { status: DiffStatus }) {
  return <Badge type={STATUS_TYPE[status]} label={status} />
}

export function CompareTemplate({ c }: { c: Compare }) {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const row = findInventoryRow(c.page, c.set)
  const counts = c.differences.reduce<Record<string, number>>((acc, d) => ({ ...acc, [d.status]: (acc[d.status] ?? 0) + 1 }), {})

  return (
    <Stack sx={{ gap: 12 }}>
      <Section title="Figma and reference">
        <Stack direction="row" sx={{ gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          <ToggleButtonGroup exclusive size="small" value={mode} onChange={(_, v) => v && setMode(v)}>
            <ToggleButton value="light" disableRipple>Light</ToggleButton>
            <ToggleButton value="dark" disableRipple>Dark</ToggleButton>
          </ToggleButtonGroup>
          {row?.nodes.map((n) => (
            <Link key={n} href={figmaNodeUrl(n)} target="_blank" rel="noreferrer" variant="body2">
              Open {n} in Figma
            </Link>
          ))}
        </Stack>
        <Stack sx={{ gap: 6 }}>
          <Frame label="Figma, at 1:1">
            <Box
              sx={(theme) => ({
                overflowX: 'auto',
                border: `1px solid ${theme.tokens.semantic.border}`,
                borderRadius: `${theme.tokens.radius.sm}px`,
              })}
            >
              {/* Exported at the frame's natural size, so it shows at the same scale as the live reference. */}
              <Box
                component="img"
                data-testid="compare-figma-frame"
                src={c.frames[mode]}
                alt={`Figma ${c.set} set, ${mode} mode`}
                sx={{ display: 'block', maxWidth: 'none' }}
              />
            </Box>
          </Frame>
          <Frame label="Reference (live)">{c.live(mode)}</Frame>
        </Stack>
      </Section>

      <Section title="Differences">
        <Typography variant="body2" color="text.secondary">
          {(['Matches', 'Design to update', 'Code to update'] as const).map((s) => `${counts[s] ?? 0} ${s.toLowerCase()}`).join(', ')}
        </Typography>
        <Box
          data-testid="compare-differences"
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '180px 1fr 1fr 180px' },
            border: `1px solid ${theme.tokens.semantic.border}`,
            borderRadius: `${theme.tokens.radius.sm}px`,
            overflow: 'hidden',
            '& > *': { px: 4, py: 3 },
            '& > .row-cell': { borderTop: `1px solid ${theme.tokens.semantic.border}` },
          })}
        >
          {['Property', 'Figma', 'Reference', 'Status'].map((h) => (
            <Typography key={h} variant="h6" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
              {h}
            </Typography>
          ))}
          {c.differences.flatMap((d) => [
            <Typography key={`${d.property}-p`} className="row-cell" variant="h5" data-testid="compare-row">
              {d.property}
            </Typography>,
            <Typography key={`${d.property}-f`} className="row-cell" variant="body2">
              {d.figma}
            </Typography>,
            <Box key={`${d.property}-r`} className="row-cell">
              <Typography variant="body2">{d.reference}</Typography>
              {d.note && (
                <Typography variant="caption" color="text.secondary">
                  {d.note}
                </Typography>
              )}
            </Box>,
            <Box key={`${d.property}-s`} className="row-cell">
              <StatusBadge status={d.status} />
            </Box>,
          ])}
        </Box>
      </Section>

      <Section title="Inventory status">
        {row ? (
          <Stack sx={{ gap: 2 }}>
            <Typography variant="body2">
              {row.inFigma && row.inCode ? 'In Figma and in code' : row.inFigma ? 'Figma only' : 'Code only'}.{' '}
              {row.nodes.length} Figma {row.nodes.length === 1 ? 'copy' : 'copies'} on the {row.page} page
              {row.copiesDiffer ? ', and their variants differ' : ''}.
            </Typography>
            <Typography variant="body2">
              Variants missing in code: {describe(row.missingInCode)}. Variants missing in Figma: {describe(row.missingInFigma)}.
            </Typography>
          </Stack>
        ) : (
          <Typography variant="body2">
            Not in the inventory yet. Run the component-inventory skill, then pnpm inventory.
          </Typography>
        )}
      </Section>

      <Section title="Notes for engineering">
        <Stack
          sx={(theme) => ({
            gap: 5,
            p: 6,
            border: `1px solid ${theme.tokens.semantic.border}`,
            borderRadius: `${theme.tokens.radius.sm}px`,
            bgcolor: 'background.paper',
          })}
        >
          <Typography variant="body2">
            Built on MUI <Box component="span" sx={{ fontWeight: 600 }}>{c.engineering.mui}</Box>. Compare these props and
            theme overrides with the ones you use.
          </Typography>
          <CodeBlock title="Usage with plain MUI" code={c.engineering.usage} />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
              columnGap: 6,
              rowGap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Figma property
            </Typography>
            <Typography variant="h6" color="text.secondary">
              MUI prop
            </Typography>
            {c.engineering.props.flatMap((p) => [
              <Typography key={`${p.figma}-f`} variant="body2" sx={{ fontWeight: 600 }}>
                {p.figma}
              </Typography>,
              <Typography key={`${p.figma}-c`} variant="body2">
                {p.code}
              </Typography>,
            ])}
          </Box>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="h5">Theme</Typography>
            <Bullets items={c.engineering.theme} />
          </Stack>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="h5">Files</Typography>
            <Bullets items={c.engineering.files} />
          </Stack>
        </Stack>
      </Section>
    </Stack>
  )
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack sx={{ gap: 2, minWidth: 0 }}>
      <Typography variant="h5">{label}</Typography>
      {children}
    </Stack>
  )
}

function describe(v: Record<string, string[]> | null) {
  if (!v || !Object.keys(v).length) return 'none'
  return Object.entries(v)
    .map(([k, values]) => `${k} (${values.join(', ')})`)
    .join('; ')
}
