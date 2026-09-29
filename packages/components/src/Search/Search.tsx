import { useRef, type KeyboardEvent } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput, { type OutlinedInputProps } from '@mui/material/OutlinedInput'
import { SearchNormal1 } from 'iconsax-react'
import { CloseOutlineIcon } from '../icons/FigmaIcons'

// 5Mins Search. MUI OutlinedInput with className="ds-search"; the look lives in the
// theme (field.overrides.tsx). The wrapper adds the search icon, the clear button
// and Escape to clear.
//
// Figma → props
//   Size=M / L    → size "M" (37px) / "L" (48px)
//   Filled=true   → value is not empty (the clear button shows)
//   State=Hover / Active → :hover / focus

export interface SearchProps extends Omit<OutlinedInputProps, 'size' | 'onChange' | 'value'> {
  size?: 'M' | 'L'
  value: string
  onChange: (value: string) => void
  /** Accessible name when there is no visible label. Defaults to the placeholder. */
  label?: string
}

export function Search({ size = 'M', value, onChange, placeholder = 'Search', label, className, ...props }: SearchProps) {
  const input = useRef<HTMLInputElement>(null)
  const clear = () => {
    onChange('')
    input.current?.focus()
  }

  return (
    <OutlinedInput
      inputRef={input}
      type="search"
      size={size === 'M' ? 'small' : 'medium'}
      className={['ds-search', className].filter(Boolean).join(' ')}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Escape' && value) {
          e.preventDefault()
          clear()
        }
      }}
      inputProps={{ 'aria-label': label ?? placeholder }}
      startAdornment={
        <InputAdornment position="start">
          <SearchNormal1 color="currentColor" />
        </InputAdornment>
      }
      endAdornment={
        value ? (
          <InputAdornment position="end">
            <ButtonBase className="ds-search-clear" aria-label="Clear search" onClick={clear} disableRipple sx={{ borderRadius: 1 }}>
              <CloseOutlineIcon size={size === 'M' ? 20 : 24} />
            </ButtonBase>
          </InputAdornment>
        ) : undefined
      }
      {...props}
    />
  )
}
