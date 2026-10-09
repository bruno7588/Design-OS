// Runs inside Figma (use_figma) as 00-setup.js, after `const D = {...}` (scripts/figma-script.mts):
// creates the demo's page (a numbered copy if the name is taken), one section per flow with its
// description, a note under each screen slot, and arrows between steps. Returns the page id.

let name = D.pageName
for (let n = 2; figma.root.children.some((p) => p.name === name); n++) name = D.pageName + ' (' + n + ')'
const page = figma.createPage()
page.name = name
await figma.setCurrentPageAsync(page)
const fonts = await figma.listAvailableFontsAsync()
const fam = fonts.some((f) => f.fontName.family === 'Poppins') ? 'Poppins' : 'Inter'
const has = (style) => fonts.some((f) => f.fontName.family === fam && f.fontName.style === style)
const regular = { family: fam, style: 'Regular' }
const bold = { family: fam, style: has('Bold') ? 'Bold' : 'Regular' }
const semibold = { family: fam, style: has('SemiBold') ? 'SemiBold' : bold.style }
await Promise.all([regular, bold, semibold].map((f) => figma.loadFontAsync(f)))
const ink = [{ type: 'SOLID', color: { r: 0.125, g: 0.133, b: 0.165 } }]
const muted = [{ type: 'SOLID', color: { r: 0.36, g: 0.38, b: 0.45 } }]
const text = (parent, chars, fontName, size, lineHeight, fills, x, y, width) => {
  const t = figma.createText()
  t.fontName = fontName
  t.characters = chars
  t.fontSize = size
  t.lineHeight = { unit: 'PIXELS', value: lineHeight }
  t.fills = fills
  parent.appendChild(t)
  t.x = x
  t.y = y
  if (width) {
    t.resize(width, t.height)
    t.textAutoResize = 'HEIGHT'
  }
  return t
}
const created = [page.id]
const sections = {}
const L = D.layout
for (const [i, flow] of D.flows.entries()) {
  const s = figma.createSection()
  s.name = flow.name
  page.appendChild(s)
  s.x = 0
  s.y = i * L.flowStep
  s.resizeWithoutConstraints(L.pad * 2 + flow.steps.length * L.screenWidth + (flow.steps.length - 1) * L.gapX, L.sectionHeight)
  sections[flow.name] = s.id
  created.push(s.id)
  created.push(text(s, flow.name, bold, 40, 60, ink, L.pad, L.pad, 0).id)
  created.push(text(s, flow.description, regular, 20, 32, muted, L.pad, L.pad + 80, 1440).id)
  for (const [j, step] of flow.steps.entries()) {
    const at = { x: L.pad + j * (L.screenWidth + L.gapX), y: L.headerHeight }
    created.push(text(s, step.title, semibold, 24, 36, ink, at.x, at.y + L.screenHeight + 48, 0).id)
    created.push(text(s, step.note, regular, 20, 32, muted, at.x, at.y + L.screenHeight + 96, L.screenWidth).id)
    if (j < flow.steps.length - 1) {
      const v = figma.createVector()
      s.appendChild(v)
      const length = L.gapX - 80
      await v.setVectorNetworkAsync({ vertices: [{ x: 0, y: 0 }, { x: length, y: 0, strokeCap: 'ARROW_LINES' }], segments: [{ start: 0, end: 1 }], regions: [] })
      v.strokes = ink
      v.strokeWeight = 4
      v.x = at.x + L.screenWidth + 40
      v.y = at.y + L.screenHeight / 2
      v.name = 'Arrow to step ' + (j + 2)
      created.push(v.id)
    }
  }
}
const credit = text(page, D.source, regular, 16, 24, muted, 0, -80, 0)
created.push(credit.id)
return { pageId: page.id, pageName: name, sections, createdNodeIds: created }
