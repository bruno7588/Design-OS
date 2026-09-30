import Box from '@mui/material/Box'
import { useTheme, type SxProps, type Theme } from '@mui/material/styles'
import certXL from './art/certificate/certificate-xl.svg'
import certL from './art/certificate/certificate-l.svg'
import certM from './art/certificate/certificate-m.svg'
import certS from './art/certificate/certificate-s.svg'
import gam_progress from './art/gamification/progress.svg'
import gam_certificate from './art/gamification/certificate.svg'
import gam_quiz from './art/gamification/quiz.svg'
import gam_learningPath from './art/gamification/learning-path.svg'
import prog_streak from './art/progress/streak.svg'
import prog_points from './art/progress/points.svg'
import prog_jewels from './art/progress/jewels.svg'
import prog_certificates from './art/progress/certificates.svg'
import prog_passed from './art/progress/passed.svg'
import prog_nearlyThere from './art/progress/nearly-there.svg'
import prog_notPassed from './art/progress/not-passed.svg'
import prog_passedLight from './art/progress/passed-light.svg'
import prog_nearlyThereLight from './art/progress/nearly-there-light.svg'
import prog_notPassedLight from './art/progress/not-passed-light.svg'
import fn_contactCentre from './art/functions/contact-centre.svg'
import fn_creative from './art/functions/creative.svg'
import fn_custom from './art/functions/custom.svg'
import fn_customerExperience from './art/functions/customer-experience.svg'
import fn_customerHappiness from './art/functions/customer-happiness.svg'
import fn_customerSuccess from './art/functions/customer-success.svg'
import fn_engineering from './art/functions/engineering.svg'
import fn_finances from './art/functions/finances.svg'
import fn_generalAdmin from './art/functions/general-admin.svg'
import fn_itNetworkSecurity from './art/functions/it-network-security.svg'
import fn_leadership from './art/functions/leadership.svg'
import fn_legal from './art/functions/legal.svg'
import fn_logistics from './art/functions/logistics.svg'
import fn_marketing from './art/functions/marketing.svg'
import fn_operations from './art/functions/operations.svg'
import fn_partnerships from './art/functions/partnerships.svg'
import fn_people from './art/functions/people.svg'
import fn_product from './art/functions/product.svg'
import fn_revOps from './art/functions/rev-ops.svg'
import fn_sales from './art/functions/sales.svg'

// 5Mins illustration sets from the Figma Gamification page. Artwork: drawn at a fixed size, shown
// at that size, and the same in both modes, except where noted. Decorative by default (empty alt);
// pass label when nothing beside it says what it shows.
//
//   Illustrations/Certificate   (dark 9120:9301, light 11196:7670)  → CertificateIllustration size xl 240 / l 80 / m 56 / s 20
//   Illustrations/Gamification  (dark 11196:7607, light 11196:7707) → GamificationIllustration type, 96
//   Illustrations/ Progress     (dark 10157:9081, light 11196:7723) → ProgressIllustration type, 40
//   Illustrations/ Functions    (9120:9874, one copy)               → FunctionIllustration fn, 96
//
// Certificate, Gamification and Progress come from the prototype, which downloaded them from these
// frames. Functions were exported from Figma on 2026-09-30.

interface ArtProps {
  /** Names it when it means something on its own; otherwise it's decorative. */
  label?: string
  sx?: SxProps<Theme>
}

function Art({ src, size, label, className, sx }: ArtProps & { src: string; size: number; className: string }) {
  return (
    <Box
      component="img"
      className={`ds-illustration ${className}`}
      src={src}
      alt={label ?? ''}
      sx={[{ display: 'block', width: size, height: size, objectFit: 'contain', flexShrink: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}

export type CertificateIllustrationSize = 'xl' | 'l' | 'm' | 's'
const CERT = { xl: { src: certXL, px: 240 }, l: { src: certL, px: 80 }, m: { src: certM, px: 56 }, s: { src: certS, px: 20 } } as const

/** Each size is its own drawing: xl for celebrations, l on cards and rows, m on mobile rows, s inline. */
export function CertificateIllustration({ size = 'l', ...rest }: ArtProps & { size?: CertificateIllustrationSize }) {
  return <Art src={CERT[size].src} size={CERT[size].px} className="ds-certificate-illustration" {...rest} />
}

export type GamificationIllustrationType = 'progress' | 'certificate' | 'quiz' | 'learning-path'
export const GAMIFICATION_ILLUSTRATIONS: Record<GamificationIllustrationType, string> = { progress: 'Progress', certificate: 'Certificate', quiz: 'Quiz', 'learning-path': 'Learning Path' }
const GAM: Record<GamificationIllustrationType, string> = { 'progress': gam_progress, 'certificate': gam_certificate, 'quiz': gam_quiz, 'learning-path': gam_learningPath }

export function GamificationIllustration({ type, ...rest }: ArtProps & { type: GamificationIllustrationType }) {
  return <Art src={GAM[type]} size={96} className="ds-gamification-illustration" {...rest} />
}

export type ProgressIllustrationType = 'streak' | 'points' | 'jewels' | 'certificates' | 'passed' | 'nearly-there' | 'not-passed'
export const PROGRESS_ILLUSTRATIONS: Record<ProgressIllustrationType, string> = { streak: 'Streak', points: 'Points', jewels: 'Jewels', certificates: 'Certificates', passed: 'Passed', 'nearly-there': 'Nearly there', 'not-passed': 'Not passed' }
const PROG: Record<ProgressIllustrationType, string> = { 'streak': prog_streak, 'points': prog_points, 'jewels': prog_jewels, 'certificates': prog_certificates, 'passed': prog_passed, 'nearly-there': prog_nearlyThere, 'not-passed': prog_notPassed }
// Passed, Nearly there and Not passed have a ring in Page-background (Neutral-800 dark, Neutral-25 light),
// so they have a file per mode.
const PROG_LIGHT: Partial<Record<ProgressIllustrationType, string>> = { passed: prog_passedLight, 'nearly-there': prog_nearlyThereLight, 'not-passed': prog_notPassedLight }

export function ProgressIllustration({ type, ...rest }: ArtProps & { type: ProgressIllustrationType }) {
  const light = useTheme().tokens.mode === 'light'
  return <Art src={(light && PROG_LIGHT[type]) || PROG[type]} size={40} className="ds-progress-illustration" {...rest} />
}

export type FunctionIllustrationName = 'contact-centre' | 'creative' | 'custom' | 'customer-experience' | 'customer-happiness' | 'customer-success' | 'engineering' | 'finances' | 'general-admin' | 'it-network-security' | 'leadership' | 'legal' | 'logistics' | 'marketing' | 'operations' | 'partnerships' | 'people' | 'product' | 'rev-ops' | 'sales'
export const FUNCTION_ILLUSTRATIONS: Record<FunctionIllustrationName, string> = { 'contact-centre': 'Contact Centre', 'creative': 'Creative', 'custom': 'Custom', 'customer-experience': 'Customer Experience', 'customer-happiness': 'Customer Happiness', 'customer-success': 'Customer Success', 'engineering': 'Engineering', 'finances': 'Finances', 'general-admin': 'General Admin', 'it-network-security': 'IT Network & Security', 'leadership': 'Leadership', 'legal': 'Legal', 'logistics': 'Logistics', 'marketing': 'Marketing', 'operations': 'Operations', 'partnerships': 'Partnerships', 'people': 'People', 'product': 'Product', 'rev-ops': 'Rev Ops', 'sales': 'Sales' }
const FN: Record<FunctionIllustrationName, string> = { 'contact-centre': fn_contactCentre, 'creative': fn_creative, 'custom': fn_custom, 'customer-experience': fn_customerExperience, 'customer-happiness': fn_customerHappiness, 'customer-success': fn_customerSuccess, 'engineering': fn_engineering, 'finances': fn_finances, 'general-admin': fn_generalAdmin, 'it-network-security': fn_itNetworkSecurity, 'leadership': fn_leadership, 'legal': fn_legal, 'logistics': fn_logistics, 'marketing': fn_marketing, 'operations': fn_operations, 'partnerships': fn_partnerships, 'people': fn_people, 'product': fn_product, 'rev-ops': fn_revOps, 'sales': fn_sales }

/** A team function (Engineering, Sales…), for workspace set-up and team pickers. */
export function FunctionIllustration({ fn, ...rest }: ArtProps & { fn: FunctionIllustrationName }) {
  return <Art src={FN[fn]} size={96} className="ds-function-illustration" {...rest} />
}
