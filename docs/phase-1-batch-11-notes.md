# Phase 1, batch 11: File uploader and Stepper

Checked 2026-09-29.
- **Why this batch:** both are used in the course builder. Neither had a reference component.
- **Sources:**
  - File uploader: `playground/docs/design-system/file-uploader.md` and `src/components/FileUploader`.
  - Stepper: no prototype spec or component, so the Figma Library only.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma |
|---|---|---|
| File uploader | Box + the 5Mins Button (MUI has no drop zone) | File uploader `11546:1560` dark, `12308:6617` light |
| Stepper | `Stepper`, `Step`, `StepLabel`, `StepConnector` + `Stepper` wrapper | stepper `8108:5464` dark, light instance `11249:244`; Step/Instances `8108:5472` / `11249:219`; Step/line `8108:5482` / `11248:125` |

## Verified (Playwright: `file-uploader.spec.ts`, `stepper.spec.ts`)

**File uploader**
- L is at least 240px tall and fills its container, with 24px padding. S is 180 × 260 with 16px padding.
- The outline is 8px dashes with 4px gaps, radius 12. It's drawn as an SVG, as the Empty state dropzone is.
- Outline and fill by state:
  - Enabled: Border-elevated outline, no fill.
  - Hover (pointer or dragging): Border-hover outline, Input-background fill, and the button's hover state.
  - Error: Danger-500 outline and a 16% Danger-500 fill.
  - Uploading: dashed outline, Input-background fill.
  - Filled: solid outline, Input-background fill.
- Errors: the first 3 as a bulleted list, then "+N errors", with role="alert".
- Uploading: the ring is a progressbar named "Uploading" plus the file name.
- Select file opens the file picker. A picked file goes through Uploading to Filled in the Preview.

**Stepper**
- The frame is 53px tall: a 1px Border stroke inside, radius 12, padding 16/20.
- Steps: a 20px tick-circle, 4px before the label.
  - Completed: Bold, Success-500.
  - In progress: Linear, Text-secondary.
  - Not started: Linear, Text-disabled.
- Lines: 0.5px Text-tertiary. Solid before a completed step, dotted (2, 4) otherwise.
- The steps are a named ordered list. The current step has aria-current="step", and each step says its state to screen readers.

## Follow-up, 2026-09-29 (Bruno)
- **Figma:** Bruno updated the File uploader and replaced the light copy (new set `12308:6617`).
  - Error messages are Regular: 14 in L, 12 in S (were SemiBold 16 / 12).
  - Filled has only Select File; Preview is gone.
  - Both sets are 948 × 2782 and match variant for variant.
- **Rule:** button labels are always Title Case. Now in CLAUDE.md, and applied across the shell: the Button and Empty state guidelines (which said sentence case), Dialog action labels, Alert and Empty state actions, the Preview opener buttons, the File uploader's "Select File", and the checks that find buttons by name.

## Mismatches recorded

**Figma**
- **File uploader:**
  - The error fill is a raw colour, not a variable.
  - The ring's arc starts at 9 o'clock; code starts it at the top.
- **Stepper:**
  - Nothing marks the current step apart from the Linear icon.
  - The light instance sits on a board named "Dark mode", although the board is set to the Light modes.

**Prototype**
- **FileUploader:**
  - It uses ExportCurve and ClipboardText instead of DocumentUpload and DocumentText.
  - It says "Change File" and has no Preview.
  - The error fill is Danger-500 at 8%, and it shows only one error message.
  - Its progress ring is Primary-500.
  - The whole zone is role="button" with a button inside it.
- **Stepper:** there's no component or spec.
