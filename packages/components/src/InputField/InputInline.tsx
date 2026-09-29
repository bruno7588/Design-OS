import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'

// 5Mins Inline input (Figma Input field/Inline): a page title and an optional
// description edited in place, such as a course in the builder. No box and no label:
// the text style is the field. Two MUI InputBase fields; the look is in the theme
// (inputTypes.overrides.ts, classNames "ds-inline-title" and "ds-inline-description").
//
// Figma → props
//   Description=true  → description (a string, even empty, shows the field)
//   State=Enabled     → empty: the placeholders in Text-disabled
//   State=Filled      → title and description
//   Validation=error  → error: the title and the message under it in Text-error

export interface InputInlineProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title' | 'onChange'> {
  sx?: SxProps<Theme>
  title: string
  onTitleChange: (title: string) => void
  /** Leave undefined for no description field. */
  description?: string
  onDescriptionChange?: (description: string) => void
  titlePlaceholder?: string
  descriptionPlaceholder?: string
  /** Accessible names, as there's no visible label. */
  titleLabel?: string
  descriptionLabel?: string
  /** The error message. Shown under the title. */
  error?: string
  disabled?: boolean
}

export const InputInline = forwardRef<HTMLDivElement, InputInlineProps>(function InputInline(
  {
    title,
    onTitleChange,
    description,
    onDescriptionChange,
    titlePlaceholder = 'Add a title',
    descriptionPlaceholder = 'Add a description',
    titleLabel = 'Title',
    descriptionLabel = 'Description',
    error,
    disabled,
    sx,
    ...props
  },
  ref,
) {
  const errorId = useId()
  return (
    <Box ref={ref} {...props} sx={[{ display: 'flex', flexDirection: 'column', gap: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <div>
        <InputBase
          className="ds-inline-title"
          fullWidth
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={titlePlaceholder}
          error={!!error}
          disabled={disabled}
          inputProps={{ 'aria-label': titleLabel, 'aria-invalid': !!error || undefined, 'aria-describedby': error ? errorId : undefined }}
        />
        {error && (
          <Typography id={errorId} variant="body2" sx={{ color: (t) => t.tokens.semantic.textError, fontSize: 14, lineHeight: 1.5 }}>
            {error}
          </Typography>
        )}
      </div>
      {description !== undefined && (
        <InputBase
          className="ds-inline-description"
          fullWidth
          multiline
          value={description}
          onChange={(e) => onDescriptionChange?.(e.target.value)}
          placeholder={descriptionPlaceholder}
          disabled={disabled}
          inputProps={{ 'aria-label': descriptionLabel }}
        />
      )}
    </Box>
  )
})
