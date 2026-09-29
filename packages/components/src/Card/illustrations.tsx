import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { LinkChainIcon } from '../icons/FigmaIcons'
import lessonQuizMobile from './illustrations/assessments/lesson-quiz-mobile.svg'
import lessonQuizDesktop from './illustrations/assessments/lesson-quiz-desktop.svg'
import multipleChoiceMobile from './illustrations/assessments/multiple-choice-mobile.svg'
import multipleChoiceDesktop from './illustrations/assessments/multiple-choice-desktop.svg'
import shortTextMobile from './illustrations/assessments/short-text-mobile.svg'
import shortTextDesktop from './illustrations/assessments/short-text-desktop.svg'
import exerciseMobile from './illustrations/assessments/exercise-mobile.svg'
import exerciseDesktop from './illustrations/assessments/exercise-desktop.svg'
import situationalTestMobile from './illustrations/assessments/situational-test-mobile.svg'
import situationalTestDesktop from './illustrations/assessments/situational-test-desktop.svg'
import fastTrackMobile from './illustrations/assessments/fast-track-mobile.svg'
import fastTrackDesktop from './illustrations/assessments/fast-track-desktop.svg'
import pollMobile from './illustrations/assessments/poll-mobile.svg'
import pollDesktop from './illustrations/assessments/poll-desktop.svg'
import fillBlankMobile from './illustrations/assessments/fill-blank-mobile.svg'
import fillBlankDesktop from './illustrations/assessments/fill-blank-desktop.svg'
import sequenceMobile from './illustrations/assessments/sequence-mobile.svg'
import sequenceDesktop from './illustrations/assessments/sequence-desktop.svg'
import categorizeMobile from './illustrations/assessments/categorize-mobile.svg'
import categorizeDesktop from './illustrations/assessments/categorize-desktop.svg'
import matchPairsMobile from './illustrations/assessments/match-pairs-mobile.svg'
import matchPairsDesktop from './illustrations/assessments/match-pairs-desktop.svg'
import pdf from './illustrations/files/pdf.svg'
import word from './illustrations/files/word.svg'
import excel from './illustrations/files/excel.svg'
import powerpoint from './illustrations/files/powerpoint.svg'
import image from './illustrations/files/image.svg'

// Artwork used by the cards. Colours are part of the drawing and don't change with the mode.
//
// Illustrations/ Assessments (Figma 9120:8850): eleven types, each drawn for Mobile (56px)
// and Desktop (80px; the Admin row scales it to 48). Copied from the prototype
// (src/assets/assessment-illustrations), which downloaded them from that frame.
//
// Type thumbnail (Figma, Cards page, Resources: dark 12213:2984, light 12228:2778): the file
// tiles are finished artwork; External link is a Certificate quiz tile with the Bold link-2
// glyph in Neutral-25.

export type AssessmentType =
  | 'lesson-quiz' | 'multiple-choice' | 'short-text' | 'exercise' | 'situational-test' | 'fast-track' | 'poll' | 'fill-blank' | 'sequence' | 'categorize' | 'match-pairs'

export const ASSESSMENT_TYPES: Record<AssessmentType, string> = {
  'lesson-quiz': 'Lesson quiz',
  'multiple-choice': 'Multiple choice',
  'short-text': 'Short text',
  exercise: 'Exercise',
  'situational-test': 'Situational test',
  'fast-track': 'Fast Track',
  poll: 'Poll',
  'fill-blank': 'Fill in the blank',
  sequence: 'Sequence',
  categorize: 'Categorise',
  'match-pairs': 'Match the pairs',
}

const ASSESSMENT_ART: Record<AssessmentType, { mobile: string; desktop: string }> = {
  'lesson-quiz': { mobile: lessonQuizMobile, desktop: lessonQuizDesktop },
  'multiple-choice': { mobile: multipleChoiceMobile, desktop: multipleChoiceDesktop },
  'short-text': { mobile: shortTextMobile, desktop: shortTextDesktop },
  'exercise': { mobile: exerciseMobile, desktop: exerciseDesktop },
  'situational-test': { mobile: situationalTestMobile, desktop: situationalTestDesktop },
  'fast-track': { mobile: fastTrackMobile, desktop: fastTrackDesktop },
  'poll': { mobile: pollMobile, desktop: pollDesktop },
  'fill-blank': { mobile: fillBlankMobile, desktop: fillBlankDesktop },
  'sequence': { mobile: sequenceMobile, desktop: sequenceDesktop },
  'categorize': { mobile: categorizeMobile, desktop: categorizeDesktop },
  'match-pairs': { mobile: matchPairsMobile, desktop: matchPairsDesktop },
}

export interface AssessmentIllustrationProps {
  type: AssessmentType
  device?: 'mobile' | 'desktop'
  size?: number
  sx?: SxProps<Theme>
}

export function AssessmentIllustration({ type, device = 'desktop', size = device === 'mobile' ? 56 : 80, sx }: AssessmentIllustrationProps) {
  return <Box component="img" className="ds-illustration" src={ASSESSMENT_ART[type][device]} alt="" sx={[{ display: 'block', width: size, height: size, flexShrink: 0 }, ...(Array.isArray(sx) ? sx : [sx])]} />
}

export type ResourceType = 'pdf' | 'word' | 'excel' | 'powerpoint' | 'image' | 'link'

export const RESOURCE_TYPES: Record<ResourceType, string> = {
  pdf: 'PDF',
  word: 'Word',
  excel: 'Excel',
  powerpoint: 'PowerPoint',
  image: 'Image',
  link: 'External link',
}

const FILE_ART: Record<Exclude<ResourceType, 'link'>, string> = { pdf, word, excel, powerpoint, image }

export interface TypeThumbnailProps {
  type: ResourceType
  /** 48 on Web/Admin, 40 on the mobile app. */
  size?: 48 | 40
  sx?: SxProps<Theme>
}

export function TypeThumbnail({ type, size = 48, sx }: TypeThumbnailProps) {
  const base = [{ display: 'block', width: size, height: size, flexShrink: 0 }, ...(Array.isArray(sx) ? sx : [sx])]
  if (type !== 'link') return <Box component="img" className="ds-type-thumbnail" src={FILE_ART[type]} alt="" sx={base} />
  return (
    <Box
      className="ds-type-thumbnail"
      aria-hidden
      sx={[
        ...base,
        (theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: `${theme.tokens.radius.s}px`,
          backgroundColor: theme.tokens.palette.gamification.certificateQuiz,
          color: theme.tokens.palette.neutral[25],
        }),
      ]}
    >
      <LinkChainIcon size={size / 2} />
    </Box>
  )
}
