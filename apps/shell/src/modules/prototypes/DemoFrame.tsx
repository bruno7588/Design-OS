import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

// The running demo, drawn at a desktop width (1440) and scaled down to fit its frame, like
// zoom to fit in Figma, so Admin layouts never squash. Wider frames show it at 100%.

const DESKTOP = 1440

export function DemoFrame({ src, title }: { src: string; title: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: DESKTOP, height: 900 })

  useEffect(() => {
    const el = box.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scale = Math.min(1, size.width / DESKTOP)
  return (
    <Box
      ref={box}
      sx={(theme) => ({
        flex: 1,
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${theme.tokens.semantic.border}`,
        borderRadius: `${theme.tokens.radius.sm}px`,
        backgroundColor: theme.tokens.semantic.pageBackground,
      })}
    >
      <Box
        component="iframe"
        key={src}
        src={src}
        title={title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          border: 0,
          width: scale < 1 ? DESKTOP : '100%',
          height: size.height / scale,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </Box>
  )
}
