import { fileUploaderFigma } from '@design-os/components'
import { CompareTemplate, type Compare } from '../shared/CompareTemplate'
import { FileUploaderMatrix } from './FileUploaderMatrix'

// Figma = File uploader (dark 11546:1560, light 12113:20254), checked 2026-09-29.
const compare: Compare = {
  page: fileUploaderFigma.page,
  set: fileUploaderFigma.set,
  frames: { light: '/figma/file-uploader-light.png', dark: '/figma/file-uploader-dark.png' },
  live: (mode) => <FileUploaderMatrix mode={mode} />,
  differences: [
    { property: 'Zone', figma: 'Dashed 1px (8, 4), radius 12. L 900 × 240, padding 24, gap 20; S 180 × 260, padding 16, gap 16 (Filled 24)', reference: 'Same; L fills the width, heights are minimums', status: 'Matches' },
    { property: 'Enabled', figma: 'No fill, Border-elevated; DocumentUpload Linear 40 / 32 in Text-secondary; Regular 14 / 12 text', reference: 'Same', status: 'Matches' },
    { property: 'Hover', figma: 'Input-background, Border-hover, and the Outlined-2 button’s Hover variant', reference: 'Same, on pointer hover and while a file is dragged over', status: 'Matches' },
    { property: 'Error', figma: 'Danger-500 outline, Danger-500 16% fill (raw, not a variable), Text-error icon and SemiBold messages with bullets, "+4 errors"', reference: 'Same (the fill uses the Danger-500 16% badge token)', status: 'Design to update', note: 'Bind the fill to a variable. The prototype uses Danger-500 at 8% and one message.' },
    { property: 'Uploading', figma: '64px ring (Border track, Primary-600), "72%", "Uploading file..."', reference: 'Same; the ring starts at the top', status: 'Design to update', note: 'Figma’s arc starts at 9 o’clock. The prototype uses Primary-500 and says "Change File".' },
    { property: 'Filled', figma: 'Solid outline, Input-background, DocumentText Bold, the name; L: Preview then Select File, S: Select File then Preview', reference: 'Same', status: 'Matches', note: 'The prototype uses ClipboardText and "Change File", and has no Preview.' },
    { property: 'Preview button', figma: 'An old Text button instance with a Text-primary label (Text-secondary in S)', reference: 'The Library Text button (Primary)', status: 'Design to update', note: 'Swap in the current Buttons Text variant, or say which colour it should be.' },
    { property: 'Button label', figma: '"Select File"', reference: '"Select file"', status: 'Design to update', note: 'Sentence case in UI copy.' },
    { property: 'Upload icon', figma: 'vuesax document-upload', reference: 'Iconsax DocumentUpload', status: 'Code to update', note: 'The prototype uses ExportCurve.' },
    { property: 'Hover cursor and dragged file', figma: 'Pointer and a "nameoffile.png" drag image drawn in the variant', reference: '–', status: 'Matches', note: 'Illustrations of the interaction, not part of the component.' },
    { property: 'Keyboard', figma: '–', reference: 'Select file is a real button; the zone is not a second tab stop', status: 'Code to update', note: 'The prototype makes the whole zone role="button" with a button inside it.' },
  ],
  engineering: {
    mui: 'Box + Button (MUI has no drop zone)',
    usage: `<FileUploader state={state} accept=".csv" onFileSelect={upload} progress={progress} errors={errors} fileName={file?.name} onPreview={preview} />`,
    props: [
      { figma: 'Size=L / S', code: 'size="L" / "S"' },
      { figma: 'State=Enabled / Error / Uploading / Filled', code: 'state="enabled" | "error" | "uploading" | "filled"' },
      { figma: 'State=Hover', code: 'pointer over the zone, or a file dragged over it' },
      { figma: 'Error messages', code: 'errors (first 3, then "+N errors")' },
      { figma: '72%', code: 'progress' },
      { figma: 'Info slot', code: 'icon and description' },
    ],
    theme: [
      'No theme override: styled from the tokens inside the component.',
      'The outline is an SVG rect (2px stroke clipped to 1px inside) so the dashes are 8px with 4px gaps.',
    ],
    files: [
      'packages/components/src/FileUploader/FileUploader.tsx',
      'packages/components/src/FileUploader/fileUploader.figma.ts (Figma mapping)',
    ],
  },
}

export function FileUploaderCompare() {
  return <CompareTemplate c={compare} />
}
