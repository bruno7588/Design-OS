import type { ReactNode } from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'
import { CloseCircle, TickCircle } from 'iconsax-react'
import { useThemeMode } from '../../../theme-mode'
import { Canvas } from './Canvas'

// The Guidelines tab for every component. Same sections, same order.
export interface Guidelines {
  overview: string
  whenToUse: string[]
  whenNotToUse: string[]
  anatomy: { example: ReactNode; parts: { name: string; description: string }[] }
  variants: { name: string; description: string; example: ReactNode }[]
  states: { name: string; description: string }[]
  dos: { do: { example: ReactNode; text: string }; dont: { example: ReactNode; text: string } }[]
  content: string[]
  accessibility: string[]
  figma: { label: string; url: string }[]
  spec: string
}

export function GuidelinesTemplate({ g }: { g: Guidelines }) {
  const { mode } = useThemeMode()

  return (
    <Stack sx={{ gap: 12, maxWidth: 960 }}>
      <Section title="Overview and intent">
        <Typography>{g.overview}</Typography>
      </Section>

      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ gap: 8 }}>
        <Section title="When to use" sx={{ flex: 1 }}>
          <Bullets items={g.whenToUse} />
        </Section>
        <Section title="When not to use" sx={{ flex: 1 }}>
          <Bullets items={g.whenNotToUse} />
        </Section>
      </Stack>

      <Section title="Anatomy">
        <Canvas mode={mode} sx={{ display: 'grid', placeItems: 'center' }}>
          {g.anatomy.example}
        </Canvas>
        <Box component="ol" sx={{ m: 0, pl: 5, display: 'grid', gap: 2 }}>
          {g.anatomy.parts.map((p) => (
            <Typography component="li" key={p.name} variant="body2">
              <Box component="span" sx={{ fontWeight: 600 }}>{p.name}.</Box> {p.description}
            </Typography>
          ))}
        </Box>
      </Section>

      <Section title="Variants">
        <Stack sx={{ gap: 4 }}>
          {g.variants.map((v) => (
            <Stack key={v.name} direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 6, alignItems: { sm: 'center' } }}>
              <Canvas mode={mode} sx={{ p: 6, width: { sm: 240 }, flexShrink: 0, display: 'grid', placeItems: 'center' }}>
                {v.example}
              </Canvas>
              <Box>
                <Typography variant="h5">{v.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {v.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="States and interactions">
        <Table rows={g.states.map((s) => [s.name, s.description])} />
      </Section>

      <Section title="Do's and don'ts">
        <Stack sx={{ gap: 6 }}>
          {g.dos.map((pair, i) => (
            <Stack key={i} direction={{ xs: 'column', md: 'row' }} sx={{ gap: 4 }}>
              <DoCard kind="do" example={pair.do.example} text={pair.do.text} />
              <DoCard kind="dont" example={pair.dont.example} text={pair.dont.text} />
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="Content guidelines">
        <Bullets items={g.content} />
      </Section>

      <Section title="Accessibility">
        <Bullets items={g.accessibility} />
      </Section>

      <Section title="Figma link">
        <Stack sx={{ gap: 2 }}>
          {g.figma.map((f) => (
            <Link key={f.url} href={f.url} target="_blank" rel="noreferrer" variant="body2">
              {f.label}
            </Link>
          ))}
          <Typography variant="caption" color="text.secondary">
            Spec: {g.spec}
          </Typography>
        </Stack>
      </Section>
    </Stack>
  )
}

function Section({ title, children, sx }: { title: string; children: ReactNode; sx?: object }) {
  return (
    <Stack component="section" sx={{ gap: 4, ...sx }}>
      <Typography variant="h2">{title}</Typography>
      {children}
    </Stack>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 5, display: 'grid', gap: 2 }}>
      {items.map((item) => (
        <Typography component="li" key={item} variant="body2">
          {item}
        </Typography>
      ))}
    </Box>
  )
}

function Table({ rows }: { rows: string[][] }) {
  return (
    <Box
      sx={(theme) => ({
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        border: `1px solid ${theme.tokens.semantic.border}`,
        borderRadius: `${theme.tokens.radius.sm}px`,
        overflow: 'hidden',
        '& > *': { px: 4, py: 3, borderBottom: `1px solid ${theme.tokens.semantic.border}` },
        '& > :nth-last-of-type(-n+2)': { borderBottom: 'none' },
      })}
    >
      {rows.flatMap(([name, description]) => [
        <Typography key={`${name}-n`} variant="h5">
          {name}
        </Typography>,
        <Typography key={`${name}-d`} variant="body2" color="text.secondary">
          {description}
        </Typography>,
      ])}
    </Box>
  )
}

function DoCard({ kind, example, text }: { kind: 'do' | 'dont'; example: ReactNode; text: string }) {
  const { mode } = useThemeMode()
  const isDo = kind === 'do'
  return (
    <Stack sx={{ flex: 1, gap: 3 }}>
      <Canvas
        mode={mode}
        sx={(theme) => ({
          p: 8,
          display: 'flex',
          gap: 3,
          justifyContent: 'center',
          flexWrap: 'wrap',
          borderTop: `4px solid ${isDo ? theme.tokens.semantic.buttonSuccessBackground : theme.tokens.palette.danger[500]}`,
        })}
      >
        {example}
      </Canvas>
      <Stack direction="row" sx={{ gap: 2, alignItems: 'flex-start' }}>
        <Box
          sx={(theme) => ({
            display: 'inline-flex',
            color: isDo ? theme.tokens.semantic.textSuccess : theme.tokens.semantic.textError,
          })}
        >
          {isDo ? <TickCircle size={20} color="currentColor" /> : <CloseCircle size={20} color="currentColor" />}
        </Box>
        <Typography variant="body2">
          <Box component="span" sx={{ fontWeight: 600 }}>{isDo ? 'Do.' : "Don't."}</Box> {text}
        </Typography>
      </Stack>
    </Stack>
  )
}
