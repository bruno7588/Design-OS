import { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Button } from '@design-os/components'
import { Copy, TickCircle } from 'iconsax-react'

export function CodeBlock({ title, code, caption }: { title: string; code: string; caption?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.tokens.semantic.border}`,
        borderRadius: `${theme.tokens.radius.sm}px`,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      })}
    >
      <Stack
        direction="row"
        sx={(theme) => ({
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          px: 4,
          py: 3,
          borderBottom: `1px solid ${theme.tokens.semantic.border}`,
        })}
      >
        <Box>
          <Typography variant="h5">{title}</Typography>
          {caption && (
            <Typography variant="caption" color="text.secondary">
              {caption}
            </Typography>
          )}
        </Box>
        <Button
          variant="outlined2"
          size="small"
          icon={copied ? <TickCircle color="currentColor" /> : <Copy color="currentColor" />}
          onClick={copy}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </Stack>
      <Box
        component="pre"
        sx={(theme) => ({
          m: 0,
          p: 4,
          maxHeight: 560,
          overflow: 'auto',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 12,
          lineHeight: 1.5,
          color: theme.tokens.semantic.textPrimary,
          bgcolor: theme.tokens.semantic.inputBackground,
        })}
      >
        {code}
      </Box>
    </Box>
  )
}
