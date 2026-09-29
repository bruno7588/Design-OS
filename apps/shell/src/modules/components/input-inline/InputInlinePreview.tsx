import { useState } from 'react'
import { FormControlLabel, Stack, Switch } from '@mui/material'
import { InputInline, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { InputInlineMatrix } from './InputInlineMatrix'

export function InputInlinePreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showDescription, setShowDescription] = useState(true)
  const [error, setError] = useState(false)

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: 560, maxWidth: '100%' }} data-testid="input-inline-preview">
          <InputInline
            title={title}
            onTitleChange={setTitle}
            description={showDescription ? description : undefined}
            onDescriptionChange={setDescription}
            titleLabel="Course title"
            descriptionLabel="Course description"
            error={error ? 'Add a title of 3 characters or more' : undefined}
          />
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={showDescription} onChange={(e) => setShowDescription(e.target.checked)} />} label="Description" />
          <FormControlLabel control={<Switch checked={error} onChange={(e) => setError(e.target.checked)} />} label="Error" />
        </>
      }
      hint="Click the title or the description and type. The description grows onto more lines."
      matrix={<InputInlineMatrix mode={mode} />}
    />
  )
}
