import type { MouseEventHandler } from 'react'
import './CloseButton.css'

interface CloseButtonProps {
  onClick?: () => void
  onMouseDown?: MouseEventHandler<HTMLButtonElement>
  size?: number
  className?: string
  ariaLabel?: string
  /** `fullscreen` is the close for a full-screen modal (Figma Library Modal/Full screen 3223:31934):
      a 40px `--input-background` disc around a 32px IoCloseOutline in
      `--text-secondary`. `size` is ignored for it. */
  variant?: 'default' | 'fullscreen'
}

function CloseButton({ onClick, onMouseDown, size = 24, className = '', ariaLabel = 'Close', variant = 'default' }: CloseButtonProps) {
  const fullscreen = variant === 'fullscreen'
  return (
    <button
      className={`close-btn${fullscreen ? ' close-btn--fullscreen' : ''} ${className}`.trim()}
      onClick={onClick}
      onMouseDown={onMouseDown}
      aria-label={ariaLabel}
      type="button"
    >
      {fullscreen ? (
        /* IoCloseOutline: two 14px strokes at 1.5px in a 32px box. */
        <svg width={32} height={32} viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M23 23L9 9M23 9L9 23"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

export default CloseButton
