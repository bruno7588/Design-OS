import { useState } from 'react'
import { Box, IconButton, Tabs, Typography } from '@mui/material'
import { Add, Clock, PlayCircle, VideoPlay } from 'iconsax-react'
import { Button, PageHeader, Search, SparkleIcon, Tab, type Mode, type PageHeaderProps } from '@design-os/components'
import { Canvas } from '../shared/Canvas'

// The Figma Header set: Type=Page and Type=Section, every slot filled.
export function HeaderExample({ type = 'page', ...props }: Partial<PageHeaderProps>) {
  const [tab, setTab] = useState(0)
  const page = type === 'page'
  return (
    <PageHeader
      type={type}
      title={page ? 'Title of this page' : 'Title of this section'}
      supportingText="Supporting text"
      metadata={[
        { icon: <VideoPlay variant="Bold" color="currentColor" />, label: 'Course' },
        { icon: <PlayCircle color="currentColor" />, label: '17 lessons' },
        { icon: <Clock color="currentColor" />, label: '20 min' },
      ]}
      actions={
        <>
          <Box sx={{ width: page ? 400 : 300 }}>
            <Search value="" onChange={() => {}} placeholder="Search" inputProps={{ tabIndex: -1 }} fullWidth />
          </Box>
          <IconButton aria-label="Ask Hugo" tabIndex={-1} sx={{ width: 40, height: 40 }}>
            <SparkleIcon size={24} variant="Linear" />
          </IconButton>
          <Button variant="outlined" tabIndex={-1}>
            Button
          </Button>
          <Button icon={<Add color="currentColor" />} tabIndex={-1}>
            Button
          </Button>
        </>
      }
      navigation={
        <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="Sections">
          {['Tab item', 'Tab item', 'Tab item', 'Tab item', 'Tab item', 'Tab item'].map((l, i) => (
            <Tab key={i} label={l} tabIndex={-1} />
          ))}
        </Tabs>
      }
      {...props}
    />
  )
}

export function PageHeaderMatrix({ mode }: { mode: Mode }) {
  return (
    <Canvas mode={mode} sx={{ overflowX: 'auto' }}>
      <Box data-testid={`page-header-matrix-${mode}`} sx={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Box sx={{ width: 1100, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Page
          </Typography>
          <HeaderExample type="page" headingComponent="h2" />
        </Box>
        <Box sx={{ width: 900, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Section
          </Typography>
          <HeaderExample type="section" headingComponent="h3" />
        </Box>
      </Box>
    </Canvas>
  )
}
