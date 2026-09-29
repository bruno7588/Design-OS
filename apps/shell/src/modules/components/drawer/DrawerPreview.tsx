import { useState } from 'react'
import { FormControlLabel, Stack, Switch } from '@mui/material'
import { Button, Dropdown, InputField, SideDrawer, type Mode } from '@design-os/components'
import { useThemeMode } from '../../../theme-mode'
import { PreviewLayout } from '../shared/PreviewLayout'
import { DrawerMatrix } from './DrawerMatrix'

const ROLES = [
  { value: 'learner', label: 'Learner' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
]

export function DrawerPreview() {
  const { mode: appMode } = useThemeMode()
  const [mode, setMode] = useState<Mode>(appMode)
  const [open, setOpen] = useState(false)
  const [supporting, setSupporting] = useState(true)
  const [footer, setFooter] = useState(true)
  const [role, setRole] = useState('learner')

  return (
    <PreviewLayout
      mode={mode}
      onModeChange={setMode}
      canvas={
        <Stack sx={{ alignItems: 'center' }} data-testid="drawer-preview">
          <Button onClick={() => setOpen(true)}>Edit Learner</Button>
          <SideDrawer
            open={open}
            onClose={() => setOpen(false)}
            title="Edit learner"
            supportingText={supporting ? 'Changes apply the next time they sign in.' : undefined}
            primaryAction={footer ? { label: 'Save', onClick: () => setOpen(false) } : undefined}
            secondaryAction={footer ? { label: 'Cancel', onClick: () => setOpen(false) } : undefined}
          >
            <Stack sx={{ gap: 5 }}>
              <InputField label="Full name" defaultValue="Ana Costa" fullWidth />
              <InputField label="Email" defaultValue="ana.costa@example.com" fullWidth />
              <Dropdown label="Role" options={ROLES} value={role} onChange={setRole} fullWidth />
              {['Department', 'Team', 'Location', 'Manager', 'Start date', 'Employee ID'].map((f) => (
                <InputField key={f} label={f} fullWidth />
              ))}
            </Stack>
          </SideDrawer>
        </Stack>
      }
      controls={
        <>
          <FormControlLabel control={<Switch checked={supporting} onChange={(e) => setSupporting(e.target.checked)} />} label="Supporting text" />
          <FormControlLabel control={<Switch checked={footer} onChange={(e) => setFooter(e.target.checked)} />} label="Footer buttons" />
        </>
      }
      hint="The content scrolls between the header and the footer. Close it with the close button, Cancel, Escape or a click on the scrim."
      matrix={<DrawerMatrix mode={mode} />}
    />
  )
}
