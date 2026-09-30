import { Stack } from '@mui/material'
import { LearningPathCard, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma "Learning path" set, top to bottom, 24 apart (the Figma copy).
const TITLE = 'Master'
const DESC = 'Achieve mastery and lead in your domain'
const T5 = Array(5).fill('Admin Management')
const T6 = Array(6).fill('Admin Management')
const P = { value: 80, total: 120 }

export function LearningPathMatrix({ mode }: { mode: Mode }) {
  const noop = () => {}
  const level = { level: 5 as const, title: TITLE, description: DESC }
  return (
    <Canvas mode={mode}>
      <Stack data-testid={`learning-path-matrix-${mode}`} sx={{ gap: 6, width: 900, alignItems: 'flex-start' }}>
        <LearningPathCard {...level} state="in-progress" topics={T6} progress={P} actionLabel="Keep Learning" onAction={noop} />
        <LearningPathCard {...level} state="in-progress" topics={T6} expanded progress={P} actionLabel="Keep Learning" onAction={noop} />
        <LearningPathCard level={5} title="Skill name" size="md" state="in-progress" progress={P} />
        <LearningPathCard {...level} state="completed" topics={T5} />
        <LearningPathCard {...level} state="completed" topics={T5} expanded />
        <LearningPathCard {...level} state="disabled" topics={T5} />
        <LearningPathCard {...level} state="disabled" topics={T5} expanded />
        <LearningPathCard type="certificate" title="Master Certificate" state="pending" actionLabel="Get Started" onAction={noop} />
        <LearningPathCard type="certificate" title="Skill name" size="md" state="pending" />
        <LearningPathCard type="certificate" title="Master Certificate" state="disabled" />
        <LearningPathCard type="certificate" title="Master Certificate" description="Mastery Achieved" state="completed" />
        <LearningPathCard {...level} size="l" state="in-progress" topics={T6} progress={P} actionLabel="Keep Learning" onAction={noop} />
        <LearningPathCard {...level} size="l" state="completed" topics={T6} />
        <LearningPathCard {...level} size="l" state="disabled" topics={T6} />
        <LearningPathCard type="certificate" title="Master Certificate" size="l" state="pending" actionLabel="Get Started" onAction={noop} />
        <LearningPathCard type="certificate" title="Master Certificate" size="l" state="disabled" />
        <LearningPathCard type="certificate" title="Master Certificate" description="Mastery Achieved" size="l" state="completed" onDownload={noop} />
      </Stack>
    </Canvas>
  )
}
