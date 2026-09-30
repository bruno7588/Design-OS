import { Box } from '@mui/material'
import { QuizExplanation, QuizOptions, type QuizOptionsProps, type Mode } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

export const TEXT = "They are occasionally considered but aren't the main drivers of design changes."
export const EXPLANATION =
  "User feedback and testing are taken into account, but they aren't always the primary factors influencing design modifications. This could be due to Organizational Priorities: The organization might prioritize business objectives, technological feasibility, or other internal factors over user feedback."

type Row = { width: number; props?: Partial<QuizOptionsProps>; value?: string; hover?: boolean }

// One option in one state, at the width of the Figma variant (343 mobile, 900 desktop).
function One({ width, props, value = 'a', hover }: Row) {
  return (
    <Box sx={{ width }}>
      <QuizOptions label="Question" options={[{ value, label: TEXT, className: hover ? 'ds-hover' : undefined }]} value={null} {...props} />
    </Box>
  )
}

// The Figma Quiz/Options set, in its order: each state on mobile, then desktop.
export function QuizOptionsMatrix({ mode }: { mode: Mode }) {
  const picked = { value: 'a' }
  const right = { answer: 'a', revealed: true }
  const wrong = { answer: 'b', revealed: true }
  return (
    <Canvas mode={mode}>
      <Box data-testid={`quiz-options-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 6, width: 900 }}>
        <One width={343} />
        <One width={900} />
        <One width={900} hover />
        <One width={343} props={picked} />
        <One width={900} props={picked} />
        <One width={343} props={{ ...picked, ...right }} />
        <One width={900} props={{ ...picked, ...right }} />
        <One width={343} props={right} />
        <One width={900} props={right} />
        <One width={900} props={{ ...right, disabled: true }} />
        <QuizExplanation result="correct">{EXPLANATION}</QuizExplanation>
        <Box sx={{ width: 343 }}>
          <QuizExplanation result="correct">{EXPLANATION}</QuizExplanation>
        </Box>
        <One width={343} props={{ ...picked, ...wrong }} />
        <One width={900} props={{ ...picked, ...wrong }} />
        <One width={900} value="b" props={{ answer: 'a', revealed: true }} />
        <One width={900} value="b" props={{ answer: 'a', revealed: true, disabled: true }} />
        <QuizExplanation result="incorrect">{EXPLANATION}</QuizExplanation>
        <One width={343} props={{ disabled: true }} />
        <One width={900} props={{ disabled: true }} />
      </Box>
    </Canvas>
  )
}
