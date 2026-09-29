import type { FigmaMapping } from '../figma'

export const fileUploaderFigma: FigmaMapping = {
  component: 'FileUploader',
  mui: 'Box + Button (MUI has no drop zone)',
  page: 'File uploader',
  set: 'File uploader',
  nodes: { light: '12113:20254', dark: '11546:1560' },
  variants: {
    State: ['Enabled', 'Hover', 'Error', 'Uploading', 'Filled'],
    Size: ['L', 'S'],
  },
}
