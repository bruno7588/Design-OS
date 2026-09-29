import { forwardRef, useRef, useState, type DragEvent, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import { useTheme, type Theme } from '@mui/material/styles'
import { DocumentText, DocumentUpload } from 'iconsax-react'
import { Button } from '../Button/Button'

// 5Mins File uploader (Figma File uploader). MUI has no drop zone, so this is a Box
// with the 5Mins Buttons inside, styled from the tokens.
//
// Figma → props
//   Size=L / S          → size "L" (fills the width) / "S" (180px)
//   State=Enabled       → state "enabled"
//   State=Hover         → pointer over the zone, or a file dragged over it
//   State=Error         → state "error" with errors: the first 3, then "+N errors"
//   State=Uploading     → state "uploading" with progress (0 to 100)
//   State=Filled        → state "filled" with fileName; onPreview shows the Preview button
//   Info slot           → icon (replaces the upload icon) and description
//
// People pick a file with the Select file button (keyboard and pointer) or drop one on
// the zone. Clicking anywhere on an empty zone opens the picker too.

export type FileUploaderState = 'enabled' | 'error' | 'uploading' | 'filled'

export interface FileUploaderProps {
  size?: 'L' | 'S'
  state?: FileUploaderState
  onFileSelect: (file: File) => void
  accept?: string
  /** Error: one message per problem. The first 3 show, then "+N errors". */
  errors?: string[]
  /** Uploading: 0 to 100. */
  progress?: number
  /** Filled: the file's name. */
  fileName?: string
  onPreview?: () => void
  /** Replaces the upload icon, such as a video icon for a media upload. */
  icon?: ReactNode
  description?: ReactNode
  buttonLabel?: string
  className?: string
}

const SHOWN_ERRORS = 3

function outlineColour(theme: Theme, state: FileUploaderState, hover: boolean) {
  const s = theme.tokens.semantic
  if (state === 'error') return theme.tokens.palette.danger[500]
  if (hover && state === 'enabled') return s.borderHover
  return s.borderElevated
}

export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(function FileUploader(
  {
    size = 'L',
    state = 'enabled',
    onFileSelect,
    accept,
    errors = [],
    progress = 0,
    fileName,
    onPreview,
    icon,
    description = 'Drag and drop file here or click to upload',
    buttonLabel = 'Select file',
    className,
  },
  ref,
) {
  const theme = useTheme()
  const t = theme.tokens
  const s = t.semantic
  const L = size === 'L'
  const input = useRef<HTMLInputElement>(null)
  const [pointer, setPointer] = useState(false)
  const [dragging, setDragging] = useState(false)
  const hover = dragging || (pointer && state === 'enabled') || !!className?.split(' ').includes('ds-hover')
  const pick = () => input.current?.click()
  const iconSize = L ? 40 : t.iconSize.xl
  const text = { fontSize: L ? 14 : 12, lineHeight: L ? 1.5 : 1.4, color: s.textSecondary, margin: 0 }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) onFileSelect(file)
  }

  const select = (
    <Button
      variant="outlined2"
      size={L ? 'medium' : 'small'}
      className={hover ? 'ds-hover' : undefined}
      onClick={(e) => {
        e.stopPropagation()
        pick()
      }}
    >
      {buttonLabel}
    </Button>
  )
  const preview = onPreview && (
    <Button
      variant="text"
      size={L ? 'medium' : 'small'}
      onClick={(e) => {
        e.stopPropagation()
        onPreview()
      }}
    >
      Preview
    </Button>
  )

  let body: ReactNode
  if (state === 'error') {
    const shown = errors.slice(0, SHOWN_ERRORS)
    const more = errors.length - shown.length
    body = (
      <>
        <DocumentUpload size={iconSize} color={s.textError} variant="Linear" aria-hidden />
        <Box
          component="ul"
          role="alert"
          sx={{ m: 0, p: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: `${L ? t.space.xs : t.space.xxs}px` }}
        >
          {shown.map((message, i) => (
            <Box component="li" key={i} sx={{ fontSize: L ? 16 : 12, fontWeight: 600, lineHeight: L ? 1.5 : 1.2, color: s.textError, listStyle: 'disc inside' }}>
              {message}
            </Box>
          ))}
          {more > 0 && (
            <Box component="li" sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2, color: s.textError, listStyle: 'none', pl: 2 }}>
              +{more} {more === 1 ? 'error' : 'errors'}
            </Box>
          )}
        </Box>
        {select}
      </>
    )
  } else if (state === 'uploading') {
    body = (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${L ? t.space.m : t.space.s}px` }}>
          <ProgressRing value={progress} label={fileName ? `Uploading ${fileName}` : 'Uploading file'} />
          <Box component="p" sx={text}>
            Uploading file…
          </Box>
        </Box>
        {select}
      </>
    )
  } else if (state === 'filled') {
    body = (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${t.space.s}px`, maxWidth: '100%' }}>
          <DocumentText size={iconSize} color={s.textSecondary} variant="Bold" aria-hidden />
          <Box component="p" sx={{ ...text, overflowWrap: 'anywhere' }}>
            {breakable(fileName)}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: L ? 'row' : 'column', alignItems: 'center', gap: `${L ? t.space.l : t.space.m}px` }}>
          {L ? (
            <>
              {preview}
              {select}
            </>
          ) : (
            <>
              {select}
              {preview}
            </>
          )}
        </Box>
      </>
    )
  } else {
    body = (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${L ? t.space.m : t.space.s}px` }}>
          {icon ?? <DocumentUpload size={iconSize} color={s.textSecondary} variant="Linear" aria-hidden />}
          <Box component="p" sx={text}>
            {description}
          </Box>
        </Box>
        {select}
      </>
    )
  }

  return (
    <Box
      ref={ref}
      className={['ds-file-uploader', className].filter(Boolean).join(' ')}
      data-state={state}
      onClick={state === 'enabled' || state === 'error' ? pick : undefined}
      onMouseEnter={() => setPointer(true)}
      onMouseLeave={() => setPointer(false)}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      sx={{
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: `${L ? t.space.ml : state === 'filled' ? t.space.l : t.space.m}px`,
        padding: `${L ? t.space.l : t.space.m}px`,
        width: L ? '100%' : 180,
        minHeight: L ? 240 : 260,
        borderRadius: `${t.radius.sm}px`,
        fontFamily: theme.typography.fontFamily,
        cursor: state === 'enabled' || state === 'error' ? 'pointer' : 'default',
        backgroundColor:
          state === 'error' ? s.badgeErrorBackground : hover || state === 'uploading' || state === 'filled' ? s.inputBackground : 'transparent',
        transition: 'background-color 150ms',
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      }}
    >
      {/* A CSS dashed border can't set the dash length or gap: an SVG outline can.
          A 2px stroke centred on the edge, clipped by the SVG, shows 1px inside. */}
      <Box
        component="svg"
        aria-hidden
        className="ds-file-uploader-outline"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={t.radius.sm}
          ry={t.radius.sm}
          fill="none"
          strokeWidth={2}
          strokeDasharray={state === 'filled' ? undefined : '8 4'}
          stroke={outlineColour(theme, state, hover)}
        />
      </Box>
      <input
        ref={input}
        type="file"
        accept={accept}
        hidden
        tabIndex={-1}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelect(file)
          e.target.value = ''
        }}
      />
      {body}
    </Box>
  )
})

// A long name may wrap before its extension, as in Figma, not mid-word.
function breakable(name?: string) {
  const dot = name?.lastIndexOf('.') ?? -1
  if (!name || dot <= 0) return name
  return (
    <>
      {name.slice(0, dot)}
      <wbr />
      {name.slice(dot)}
    </>
  )
}

// Figma Loading: a 64px ring (the inner radius is 85% of the outer), Border track,
// Primary-600 progress, the percentage in the middle.
function ProgressRing({ value, label }: { value: number; label: string }) {
  const theme = useTheme()
  const t = theme.tokens
  const width = 4.8
  const r = 32 - width / 2
  const circumference = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <Box
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      sx={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}
    >
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx="32" cy="32" r={r} fill="none" stroke={t.semantic.border} strokeWidth={width} />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={t.palette.primary[600]}
          strokeWidth={width}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct / 100)}
          style={{ transition: 'stroke-dashoffset 200ms' }}
        />
      </svg>
      <Box
        component="span"
        aria-hidden
        sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, lineHeight: 1.5, color: t.semantic.textSecondary }}
      >
        {pct}%
      </Box>
    </Box>
  )
}
