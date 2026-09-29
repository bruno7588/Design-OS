import { palette } from '../theme/tokens'

// The two Dialog icons that aren't Iconsax, copied from the Figma Library Dialog set
// (7789:24651). Error and Warning use Iconsax Danger and InfoCircle.

interface IconProps {
  size?: number
  className?: string
}

/** Info: Ionicons IoInformationCircleOutline, as in Figma. Takes the text colour. */
export function InfoOutlineIcon({ size = 56, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
      <path
        d="M27.125 7C16.0114 7 7 16.0114 7 27.125C7 38.2386 16.0114 47.25 27.125 47.25C38.2386 47.25 47.25 38.2386 47.25 27.125C47.25 16.0114 38.2386 7 27.125 7Z"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeMiterlimit={10}
      />
      <path d="M24.0625 24.0625H27.5625V36.75" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.75 37.1875H32.375" stroke="currentColor" strokeWidth={3.5} strokeMiterlimit={10} strokeLinecap="round" />
      <path
        d="M27.125 14.2188C26.5626 14.2188 26.0128 14.3855 25.5451 14.698C25.0774 15.0105 24.713 15.4546 24.4977 15.9742C24.2825 16.4939 24.2262 17.0657 24.3359 17.6173C24.4456 18.1689 24.7165 18.6756 25.1142 19.0733C25.5119 19.471 26.0186 19.7419 26.5702 19.8516C27.1218 19.9613 27.6936 19.905 28.2133 19.6898C28.7329 19.4745 29.177 19.1101 29.4895 18.6424C29.802 18.1748 29.9688 17.6249 29.9688 17.0625C29.9688 16.3083 29.6691 15.585 29.1358 15.0517C28.6025 14.5184 27.8792 14.2188 27.125 14.2188Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Success: the green tick badge from Figma. Fixed colours in both modes. */
export function SuccessBadgeIcon({ size = 56, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
      <path
        d="M27.9678 54.2306C42.4652 54.2306 54.2178 42.4781 54.2178 27.9806C54.2178 13.4831 42.4652 1.73058 27.9678 1.73058C13.4703 1.73058 1.71777 13.4831 1.71777 27.9806C1.71777 42.4781 13.4703 54.2306 27.9678 54.2306Z"
        fill={palette.success[600]}
      />
      <path
        d="M26.2614 52.1307C39.8165 52.1307 50.8052 41.1421 50.8052 27.5869C50.8052 14.0318 39.8165 3.04317 26.2614 3.04317C12.7063 3.04317 1.71766 14.0318 1.71766 27.5869C1.71766 41.1421 12.7063 52.1307 26.2614 52.1307Z"
        fill={palette.success[500]}
      />
      <path
        d="M10.4844 12.9962C12.4531 9.88997 16.6531 7.30872 21.0281 6.52122C22.1219 6.34622 23.2156 6.25872 24.1344 6.60872C24.8344 6.87122 25.4031 7.52747 25.0094 8.27122C24.7031 8.88372 23.8719 9.14622 23.2156 9.36497C19.1119 10.7212 15.5725 13.3943 13.1531 16.9775C12.2781 18.29 10.9656 21.9212 9.34688 21.0025C7.64063 19.9962 7.99063 16.8462 10.4844 12.9962Z"
        fill={palette.success[300]}
      />
      <path
        d="M18.0833 28.0044L24.6867 34.6077L37.9167 21.401"
        stroke={palette.neutral[800]}
        strokeWidth={3.11111}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
