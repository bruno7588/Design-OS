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

/** Avatar fallback: the Figma Emojies Type=Angel face (Avatar set, Picture=false).
 *  The face takes `fill` (Border), the features `color` (Text-tertiary). */
export function AvatarFallbackIcon({ size = 24, fill = 'currentColor', ...props }: IconProps & { fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none" aria-hidden="true" {...props}>
      <circle cx={120} cy={120} r={120} fill={fill} />
      <path d="M 120 172.5 C 104.71 172.54 89.72 168.32 76.7 160.3 C 63.68 152.29 53.16 140.8 46.31 127.13 C 45.42 125.36 45.28 123.31 45.9 121.42 C 46.52 119.54 47.87 117.98 49.64 117.08 C 51.41 116.19 53.46 116.03 55.35 116.65 C 57.24 117.27 58.8 118.61 59.7 120.37 C 65.33 131.54 73.95 140.92 84.59 147.47 C 95.24 154.03 107.5 157.5 120 157.5 C 132.5 157.5 144.76 154.03 155.4 147.47 C 166.05 140.92 174.67 131.54 180.3 120.38 C 180.74 119.5 181.35 118.71 182.1 118.06 C 182.85 117.42 183.71 116.93 184.65 116.62 C 185.58 116.31 186.57 116.19 187.56 116.26 C 188.54 116.33 189.5 116.6 190.38 117.05 C 191.26 117.49 192.05 118.1 192.69 118.85 C 193.33 119.6 193.82 120.47 194.13 121.41 C 194.44 122.34 194.55 123.33 194.48 124.32 C 194.4 125.3 194.13 126.26 193.69 127.14 C 186.84 140.81 176.32 152.29 163.3 160.3 C 150.28 168.32 135.29 172.54 120 172.5 Z" fill="currentColor" />
      <path d="M 189.37 86.33 C 188.38 86.33 187.41 86.14 186.5 85.76 C 185.59 85.39 184.76 84.83 184.07 84.13 C 180.34 80.39 175.91 77.42 171.02 75.39 C 166.14 73.37 160.91 72.34 155.62 72.35 C 153.63 72.35 151.72 71.56 150.32 70.15 C 148.91 68.75 148.12 66.84 148.12 64.85 C 148.12 62.86 148.91 60.95 150.32 59.55 C 151.72 58.14 153.63 57.35 155.62 57.35 C 162.88 57.33 170.06 58.75 176.77 61.53 C 183.47 64.31 189.56 68.38 194.67 73.53 C 195.72 74.58 196.44 75.91 196.72 77.37 C 197.01 78.82 196.87 80.33 196.3 81.7 C 195.73 83.07 194.77 84.24 193.54 85.07 C 192.3 85.89 190.85 86.33 189.37 86.33 Z" fill="currentColor" />
      <path d="M 50.63 86.33 C 49.15 86.33 47.7 85.89 46.46 85.07 C 45.23 84.24 44.27 83.07 43.7 81.7 C 43.13 80.33 42.98 78.82 43.27 77.37 C 43.56 75.91 44.28 74.58 45.33 73.53 C 50.44 68.38 56.53 64.3 63.23 61.53 C 69.93 58.75 77.12 57.33 84.38 57.35 C 86.37 57.35 88.28 58.14 89.68 59.55 C 91.09 60.95 91.88 62.86 91.88 64.85 C 91.88 66.84 91.09 68.75 89.68 70.15 C 88.28 71.56 86.37 72.35 84.38 72.35 C 79.09 72.34 73.86 73.37 68.97 75.39 C 64.09 77.42 59.66 80.39 55.93 84.13 C 55.24 84.83 54.41 85.39 53.5 85.76 C 52.59 86.14 51.61 86.33 50.63 86.33 Z" fill="currentColor" />
    </svg>
  )
}

/** Tags, Media Type=Flashcard: the vuesax Bold note-2 (two stacked notes). Iconsax React
 *  has no match, so it's copied from the Tags set (12319:7504). Takes the text colour. */
export function FlashcardIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M16.9036 26.6094C17.2699 26.6946 17.3034 27.1744 16.9466 27.2933L14.84 27.9867C9.54663 29.6933 6.75997 28.2667 5.03997 22.9733L3.3333 17.7067C1.62663 12.4133 3.03997 9.61334 8.3333 7.90667L9.03196 7.67529C9.56912 7.49741 10.0919 8.03615 9.93934 8.58105C9.86374 8.85115 9.79101 9.13302 9.71997 9.42667L8.4133 15.0133C6.94663 21.2933 9.0933 24.76 15.3733 26.2533L16.9036 26.6094Z"
        fill="currentColor"
      />
      <path
        d="M22.8933 4.28001L20.6666 3.76001C16.2133 2.70667 13.56 3.57334 12 6.80001C11.6 7.61334 11.28 8.60001 11.0133 9.73334L9.70662 15.32C8.39995 20.8933 10.12 23.64 15.68 24.96L17.92 25.4933C18.6933 25.68 19.4133 25.8 20.08 25.8533C24.24 26.2533 26.4533 24.3067 27.5733 19.4933L28.88 13.92C30.1866 8.34667 28.48 5.58667 22.8933 4.28001ZM20.3866 17.7733C20.2666 18.2267 19.8666 18.52 19.4133 18.52C19.3333 18.52 19.2533 18.5067 19.16 18.4933L15.28 17.5067C14.7466 17.3733 14.4266 16.8267 14.56 16.2933C14.6933 15.76 15.24 15.44 15.7733 15.5733L19.6533 16.56C20.2 16.6933 20.52 17.24 20.3866 17.7733ZM24.2933 13.2667C24.1733 13.72 23.7733 14.0133 23.32 14.0133C23.24 14.0133 23.16 14 23.0666 13.9867L16.6 12.3467C16.0666 12.2133 15.7466 11.6667 15.88 11.1333C16.0133 10.6 16.56 10.28 17.0933 10.4133L23.56 12.0533C24.1066 12.1733 24.4266 12.72 24.2933 13.2667Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Tags, Media Type=Link: the vuesax Bold link-2 (a diagonal chain), copied from the Tags
 *  set (12319:7504); Iconsax React's Link2 is drawn differently. Takes the text colour. */
export function LinkChainIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13.4967 7.04544C16.6648 3.88966 21.8163 3.88037 24.9674 7.04349C28.1214 10.2098 28.1219 15.3487 24.9557 18.5152C24.8248 18.6461 24.6396 18.6344 24.5328 18.524L24.525 18.5152L24.4821 18.4634C24.3985 18.3391 24.4199 18.1866 24.5162 18.0933L24.525 18.0845C27.4511 15.1581 27.4522 10.4023 24.5231 7.48782C21.5985 4.57791 16.8434 4.55904 13.9274 7.48978C11.0181 10.4137 10.9995 15.1673 13.9283 18.0835V18.0845C14.0593 18.2155 14.0477 18.4006 13.9371 18.5074L13.9283 18.5152C13.7975 18.646 13.6132 18.6342 13.5065 18.524L13.4977 18.5152C10.3311 15.3484 10.3323 10.1976 13.4967 7.04544Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.33333}
      />
      <path
        d="M18.071 13.485C18.202 13.3541 18.3872 13.3657 18.4939 13.4763L18.5017 13.485C21.6685 16.6519 21.6673 21.8025 18.5027 24.9548C15.3344 28.1103 10.183 28.1191 7.03198 24.9557C3.8784 21.7894 3.87855 16.6514 7.04468 13.485C7.17552 13.3542 7.35978 13.366 7.46655 13.4763L7.47534 13.485C7.60601 13.6159 7.59432 13.8002 7.48413 13.9069H7.48315L7.47534 13.9157C4.54925 16.842 4.54732 21.5978 7.47632 24.5124C10.4009 27.4223 15.1569 27.4412 18.073 24.5104C20.9829 21.5859 21.0008 16.8298 18.0701 13.9138H18.0691C17.9401 13.7829 17.9532 13.5991 18.0632 13.4929L18.071 13.485Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.33333}
      />
    </svg>
  )
}

/** Tab nav, Feed: a custom glyph (three people in a ring). Iconsax has no match, so it's
 *  copied from the Tab nav set (1324:35285). Takes the text colour. */
export function FeedIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1C14.8738 1 17.4759 2.17496 19.3597 4.07546C20.0354 4.75736 20.619 5.53296 21.0898 6.38117H18.9915C18.7242 6.01021 18.429 5.66149 18.108 5.33796C16.5452 3.76129 14.3853 2.78572 12 2.78572C9.61466 2.78572 7.45483 3.76129 5.89227 5.33796C5.57129 5.66149 5.27613 6.01021 5.00884 6.38117H2.91053C3.38069 5.53296 3.96462 4.75736 4.64055 4.07546C6.52409 2.17496 9.12593 1 12 1ZM19.7376 11.8262C21.539 11.8262 23 13.1092 23 14.6917C23 15.1124 22.8964 15.5127 22.7109 15.8725H16.7643C16.5788 15.5127 16.4749 15.1124 16.4749 14.6917C16.4749 13.1092 17.9359 11.8262 19.7376 11.8262ZM19.7376 7.1272C20.9069 7.1272 21.8551 8.08374 21.8551 9.26368C21.8551 10.443 20.9069 11.3996 19.7376 11.3996C18.5686 11.3996 17.6202 10.443 17.6202 9.26368C17.6202 8.08374 18.5686 7.1272 19.7376 7.1272ZM12 11.8262C13.802 11.8262 15.2624 13.1092 15.2624 14.6917C15.2624 15.1124 15.1588 15.5127 14.9733 15.8725H9.02696C8.84122 15.5127 8.7379 15.1124 8.7379 14.6917C8.7379 13.1092 10.198 11.8262 12 11.8262ZM12 7.1272C13.1693 7.1272 14.1175 8.08374 14.1175 9.26368C14.1175 10.443 13.1693 11.3996 12 11.3996C10.8304 11.3996 9.88254 10.443 9.88254 9.26368C9.88254 8.08374 10.8304 7.1272 12 7.1272ZM4.26268 11.8262C6.06409 11.8262 7.52477 13.1092 7.52477 14.6917C7.52477 15.1124 7.42116 15.5127 7.23571 15.8725H1.28935C1.1039 15.5127 1 15.1124 1 14.6917C1 13.1092 2.46069 11.8262 4.26268 11.8262ZM4.26268 7.1272C5.43198 7.1272 6.37985 8.08374 6.37985 9.26368C6.37985 10.443 5.43198 11.3996 4.26268 11.3996C3.09337 11.3996 2.14493 10.443 2.14493 9.26368C2.14493 8.08374 3.09337 7.1272 4.26268 7.1272ZM21.0898 16.6188C20.6196 17.4667 20.0354 18.2426 19.3597 18.9248C17.4759 20.8247 14.8738 22 12 22C9.12593 22 6.52409 20.8247 4.64055 18.9248C3.96462 18.2426 3.38069 17.4667 2.91053 16.6188H5.00826C5.27584 16.9898 5.57129 17.3385 5.89227 17.662C7.45483 19.2387 9.61466 20.2146 12 20.2146C14.3853 20.2146 16.5452 19.2387 18.108 17.662C18.429 17.3385 18.7244 16.9898 18.9915 16.6188H21.0898Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Top nav/ App, Skill: the Remix RiMore2Line (vertical dots), as in Figma. Takes the text colour. */
export function MoreVerticalIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
