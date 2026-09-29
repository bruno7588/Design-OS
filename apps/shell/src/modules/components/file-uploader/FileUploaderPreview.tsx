import { useEffect, useState } from 'react'
import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material'
import { FileUploader, type FileUploaderState, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { FileUploaderMatrix } from './FileUploaderMatrix'

// Pick or drop a file: it "uploads" for a moment, then shows as filled.
export function FileUploaderPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [size, setSize] = useState<'L' | 'S'>('L')
  const [state, setState] = useState<FileUploaderState>('enabled')
  const [fileName, setFileName] = useState<string>()
  const [progress, setProgress] = useState(0)
  const [tooBig, setTooBig] = useState(false)

  useEffect(() => {
    if (state !== 'uploading') return
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 8)), 120)
    return () => clearInterval(id)
  }, [state])
  useEffect(() => {
    if (state === 'uploading' && progress >= 100) setState('filled')
  }, [state, progress])

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ width: size === 'L' ? 560 : 'auto', maxWidth: '100%' }} data-testid="file-uploader-preview">
          <FileUploader
            size={size}
            state={state}
            accept=".csv,.pdf"
            fileName={fileName}
            progress={progress}
            errors={['The file is over 20 MB', 'Upload a CSV or PDF file']}
            onFileSelect={(file) => {
              setFileName(file.name)
              if (tooBig) {
                setState('error')
                return
              }
              setProgress(0)
              setState('uploading')
            }}
          />
        </Stack>
      }
      controls={
        <>
          <TextField select size="small" label="Size" value={size} onChange={(e) => setSize(e.target.value as 'L' | 'S')}>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="S">S</MenuItem>
          </TextField>
          <TextField select size="small" label="State" value={state} onChange={(e) => setState(e.target.value as FileUploaderState)}>
            <MenuItem value="enabled">Enabled</MenuItem>
            <MenuItem value="error">Error</MenuItem>
            <MenuItem value="uploading">Uploading</MenuItem>
            <MenuItem value="filled">Filled</MenuItem>
          </TextField>
          <FormControlLabel control={<Switch checked={tooBig} onChange={(e) => setTooBig(e.target.checked)} />} label="Reject the next file" />
        </>
      }
      hint="Select a file or drop one on the zone. It uploads, then shows as filled. Turn on Reject to see the error state."
      matrix={<FileUploaderMatrix mode={mode} />}
    />
  )
}
