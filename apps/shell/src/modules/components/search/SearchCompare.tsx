import { searchFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { SearchMatrix } from './SearchMatrix'

// Figma = the Search set (dark 697:33529, light 11927:6338), checked 2026-09-29.
const compare: Compare = {
  page: searchFigma.page,
  set: searchFigma.set,
  frames: { light: '/figma/search-light.png', dark: '/figma/search-dark.png' },
  live: (mode) => <SearchMatrix mode={mode} />,
  differences: [
    { property: 'M', figma: '37px: padding 8/12, gap 8, radius 12, 18px icon, 14px text', reference: 'Same', status: 'Matches' },
    { property: 'L', figma: '48px: padding 12/16, gap 12, radius 16, 20px icon, 16px text', reference: 'Same (radius-m token)', status: 'Matches', note: 'The prototype hard-codes the 16px radius.' },
    { property: 'Colours', figma: 'Input-background and Border; hover Input-background-hover and Border-hover; Active Selected', reference: 'Same', status: 'Matches' },
    { property: 'Clear icon', figma: 'Ionicons close, 20px (M)', reference: 'Same; 24px in L', status: 'Matches', note: 'The prototype uses an Iconsax Add rotated 45°.' },
    { property: 'Escape', figma: 'Not shown', reference: 'Clears the field', status: 'Matches', note: 'The prototype does not clear on Escape: code to update there.' },
    { property: 'Hand-rolled search fields', figma: '–', reference: '–', status: 'Code to update', note: '15 prototype files build their own search field (Roles, People, Automations, content tables, drawers, menus).' },
  ],
  engineering: {
    mui: 'OutlinedInput (className="ds-search")',
    usage: `import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// With the 5Mins theme and the ds-search class, plain MUI renders the reference.
<OutlinedInput
  className="ds-search"
  size="small" // M; size="medium" is L
  type="search"
  placeholder="Search people"
  inputProps={{ 'aria-label': 'Search people' }}
  startAdornment={<InputAdornment position="start"><SearchNormal1 /></InputAdornment>}
/>`,
    props: [
      { figma: 'Size', code: 'size: small (M), medium (L)' },
      { figma: 'Filled', code: 'a value; add the clear button as an end adornment' },
      { figma: 'State', code: ':hover and focus, from the theme' },
    ],
    theme: [
      'MuiOutlinedInput root styles &.ds-search: fill, border, hover and focus colours, and the L sizes.',
      'The native search cancel button is hidden; the clear button replaces it.',
    ],
    files: [
      'packages/components/src/Field/field.overrides.tsx (the ds-search rules)',
      'packages/components/src/Search/Search.tsx (icon, clear, Escape)',
      'packages/components/src/Search/search.figma.ts (Figma mapping)',
    ],
  },
}

export function SearchCompare() {
  return <CompareTemplate c={compare} />
}
