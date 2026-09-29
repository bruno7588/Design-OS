import type { SVGProps } from 'react'
import { palette } from '../theme/tokens'

// Icons the Figma Library uses that aren't Iconsax (Ionicons and the Dialog tick badge),
// copied from their sets: Dialog 7789:24651, Badge 5799:479, Toast 5045:14119, Tooltip 2683:29027.

// Extra props (className, onClick…) pass through, because MUI clones icons with its own handlers.
interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number
}

/** Info: Ionicons IoInformationCircleOutline, as in Figma. Takes the text colour. */
export function InfoOutlineIcon({ size = 56, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true" {...props}>
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
export function SuccessBadgeIcon({ size = 56, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true" {...props}>
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

/** Badge remove: Ionicons IoCloseOutline, as in the Figma Badge set. Takes the text colour. */
export function CloseOutlineIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M11.5 11.5L4.5 4.5M11.5 4.5L4.5 11.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Checkbox and radio glyphs, copied from the Checkbox (11917:3924) and radio-button (11917:3950) sets.
// They take currentColor, so the theme colours them per state. The checked and indeterminate
// boxes are one filled shape with the tick or bar cut out, as in Figma: the mark shows what's behind.

const BOX = 'M11.3577 0H4.6503C1.7369 0 0 1.736 0 4.648V11.344C0 14.264 1.7369 16 4.6503 16H11.3497C14.2631 16 16 14.264 16 11.352V4.648C16.008 1.736 14.2711 0 11.3577 0Z'

/** Checkbox, not checked: a 16px box with a 1px border inside. */
export function CheckboxIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <rect x={0.5} y={0.5} width={15} height={15} rx={4.9} stroke="currentColor" />
    </svg>
  )
}

/** Checkbox, checked. */
export function CheckboxCheckedIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d={`${BOX}M11.8299 6.16L7.2916 10.696C7.1796 10.808 7.0275 10.872 6.8674 10.872C6.7073 10.872 6.5553 10.808 6.4432 10.696L4.1781 8.432C3.946 8.2 3.946 7.816 4.1781 7.584C4.4102 7.352 4.7944 7.352 5.0265 7.584L6.8674 9.424L10.9815 5.312C11.2136 5.08 11.5978 5.08 11.8299 5.312C12.062 5.544 12.062 5.92 11.8299 6.16Z`}
        fill="currentColor"
      />
    </svg>
  )
}

/** Checkbox, indeterminate. */
export function CheckboxIndeterminateIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d={`${BOX}M11.2056 8.6H4.8024C4.4742 8.6 4.2021 8.328 4.2021 8C4.2021 7.672 4.4742 7.4 4.8024 7.4H11.2056C11.5337 7.4 11.8059 7.672 11.8059 8C11.8059 8.328 11.5337 8.6 11.2056 8.6Z`} fill="currentColor" />
    </svg>
  )
}

/** Radio, not selected: a 15px ring in a 24px frame. */
export function RadioIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx={12} cy={12} r={7.5} stroke="currentColor" strokeWidth={1.07} />
    </svg>
  )
}

/** Radio, selected: the ring and a 7.5px dot. */
export function RadioCheckedIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx={12} cy={12} r={7.5} stroke="currentColor" strokeWidth={1.07} />
      <circle cx={12} cy={12} r={3.75} fill="currentColor" />
    </svg>
  )
}
