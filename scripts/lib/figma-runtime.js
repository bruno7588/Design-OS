// Runs inside Figma (use_figma), prepended to every script scripts/figma-script.mts writes.
// Expects `const DATA = {...}` before it. Plain JavaScript: top-level await and return are
// allowed, nothing is imported. Builds one captured screen (scripts/lib/capture-dom.mts) with
// Library instances, variables and text styles, and reports what it couldn't match.

const report = { created: [], unlinked: [], variantErrors: [], textMismatches: [], rawColours: {}, rawText: 0, layoutFallbacks: 0, fontFallbacks: [] }

// Library lookups (imports are cached; every import is independent, so they can run together).
// Failed imports are remembered as plain objects in a WeakSet: Figma nodes throw on unknown
// properties, so results can't be told apart by reading something like .error.
const cache = new Map()
const failures = new WeakSet()
const once = (key, make) => {
  if (!cache.has(key))
    cache.set(
      key,
      make().catch((e) => {
        const failure = { error: String(e && e.message ? e.message : e) }
        failures.add(failure)
        return failure
      }),
    )
  return cache.get(key)
}
const variable = (key) => once('v:' + key, () => figma.variables.importVariableByKeyAsync(key))
const textStyle = (key) => once('t:' + key, () => figma.importStyleByKeyAsync(key))
const component = (key, type) => once('c:' + key, () => (type === 'set' ? figma.importComponentSetByKeyAsync(key) : figma.importComponentByKeyAsync(key)))
const ok = (x) => !!x && !failures.has(x)

const rgba = (hex) => ({ r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255, a: hex.length > 7 ? parseInt(hex.slice(7, 9), 16) / 255 : 1 })

/** A solid paint, bound to the 5Mins colour variable with that value when there is one. */
async function paint(hex, use) {
  const { r, g, b, a } = rgba(hex)
  const solid = { type: 'SOLID', color: { r, g, b }, opacity: a }
  const key = (DATA.colours[use] && DATA.colours[use][hex]) || DATA.colours.any[hex]
  if (key) {
    const v = await variable(key)
    if (ok(v)) return figma.variables.setBoundVariableForPaint(solid, 'color', v)
  }
  report.rawColours[hex] = (report.rawColours[hex] || 0) + 1
  return solid
}

/** Sets a number and binds it to the 5Mins spacing or radius variable with that value. */
async function setFloat(node, field, value, kind) {
  node[field] = value
  const key = value && DATA.floats[kind] && DATA.floats[kind][String(value)]
  if (!key) return
  const v = await variable(key)
  if (ok(v)) {
    try {
      node.setBoundVariable(field, v)
    } catch (e) {
      /* the field can't take this variable: keep the number */
    }
  }
}

// Fonts: the 5Mins type is Poppins; weights map to Figma style names, checked against what's installed.
const STYLE_FOR_WEIGHT = { 100: 'Thin', 200: 'ExtraLight', 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black' }
const available = await figma.listAvailableFontsAsync()
const families = new Map()
for (const f of available) {
  if (!families.has(f.fontName.family)) families.set(f.fontName.family, new Set())
  families.get(f.fontName.family).add(f.fontName.style)
}
const loaded = new Set()
async function font(family, weight, italic) {
  let fam = families.has(family) ? family : families.has('Poppins') ? 'Poppins' : 'Inter'
  if (fam !== family && !report.fontFallbacks.includes(family)) report.fontFallbacks.push(family)
  const styles = families.get(fam) || new Set(['Regular'])
  let style = STYLE_FOR_WEIGHT[Math.round(weight / 100) * 100] || 'Regular'
  if (italic && styles.has(style + ' Italic')) style += ' Italic'
  if (!styles.has(style)) style = styles.has('Regular') ? 'Regular' : [...styles][0]
  const name = { family: fam, style }
  const id = fam + '/' + style
  if (!loaded.has(id)) {
    await figma.loadFontAsync(name)
    loaded.add(id)
  }
  return name
}

function textStyleFor(f) {
  const style = STYLE_FOR_WEIGHT[Math.round(f.weight / 100) * 100] || 'Regular'
  return DATA.textStyles.find((t) => t.size === f.size && t.style.replace(/\s/g, '') === style && (t.lineHeight == null || f.lineHeight == null || Math.abs(t.lineHeight - f.lineHeight) < 0.6))
}

const JUSTIFY = { 'flex-start': 'MIN', start: 'MIN', normal: 'MIN', left: 'MIN', center: 'CENTER', 'flex-end': 'MAX', end: 'MAX', right: 'MAX', 'space-between': 'SPACE_BETWEEN' }
const ALIGN = { 'flex-start': 'MIN', start: 'MIN', center: 'CENTER', 'flex-end': 'MAX', end: 'MAX', baseline: 'BASELINE' }

function place(node, n, parent, origin) {
  // Absolute first: inside auto layout, x and y only stick once the child is absolute.
  if (parent.layoutMode && parent.layoutMode !== 'NONE' && n.abs) node.layoutPositioning = 'ABSOLUTE'
  node.x = Math.round((n.box.x - origin.x) * 10) / 10
  node.y = Math.round((n.box.y - origin.y) * 10) / 10
}

async function buildText(n, parent, origin) {
  const t = figma.createText()
  t.fontName = await font(n.font.family, n.font.weight, n.font.italic)
  t.characters = n.text
  t.fontSize = n.font.size
  if (n.font.lineHeight) t.lineHeight = { unit: 'PIXELS', value: n.font.lineHeight }
  if (n.font.letterSpacing) t.letterSpacing = { unit: 'PIXELS', value: n.font.letterSpacing }
  const style = textStyleFor(n.font)
  if (style) {
    const s = await textStyle(style.key)
    if (ok(s)) {
      await figma.loadFontAsync(s.fontName)
      await t.setTextStyleIdAsync(s.id)
    } else report.rawText++
  } else report.rawText++
  t.fills = [await paint(n.color, 'text')]
  t.textAlignHorizontal = n.align === 'center' ? 'CENTER' : n.align === 'right' || n.align === 'end' ? 'RIGHT' : 'LEFT'
  t.name = n.name
  parent.appendChild(t)
  const oneLine = !n.font.lineHeight || n.box.h < n.font.lineHeight * 1.6
  if (n.truncate) {
    t.resize(Math.max(1, n.box.w), Math.max(1, n.box.h))
    t.textAutoResize = 'NONE'
    t.textTruncation = 'ENDING'
    t.maxLines = 1
  } else if (oneLine) {
    t.textAutoResize = 'WIDTH_AND_HEIGHT'
    if (t.width > n.box.w + 1) {
      t.resize(Math.max(1, n.box.w), t.height)
      t.textAutoResize = 'NONE'
      t.textTruncation = 'ENDING'
      t.maxLines = 1
    }
  } else {
    t.resize(Math.max(1, n.box.w + 1), Math.max(1, n.box.h))
    t.textAutoResize = 'HEIGHT'
  }
  place(t, n, parent, origin)
  return t
}

async function buildIcon(n, parent, origin) {
  if (n.rotation) {
    const wrap = figma.createFrame()
    wrap.name = n.name
    wrap.fills = []
    parent.appendChild(wrap)
    wrap.resize(Math.max(1, n.box.w), Math.max(1, n.box.h))
    place(wrap, n, parent, origin)
    const inner = await buildIcon({ ...n, rotation: 0, abs: false }, wrap, n.box)
    // Figma rotates about the top-left corner; move it so it turns about the wrapper's centre.
    const a = (n.rotation * Math.PI) / 180
    const w = inner.width
    const h = inner.height
    inner.rotation = -n.rotation
    inner.x = n.box.w / 2 - (Math.cos(a) * w) / 2 + (Math.sin(a) * h) / 2
    inner.y = n.box.h / 2 - (Math.sin(a) * w) / 2 - (Math.cos(a) * h) / 2
    return wrap
  }
  let node
  try {
    node = figma.createNodeFromSvg(n.s !== undefined ? DATA.svgs[n.s] : n.svg)
  } catch (e) {
    node = figma.createFrame()
    node.fills = []
  }
  node.name = n.name
  parent.appendChild(node)
  if (node.width && node.height && (Math.abs(node.width - n.box.w) > 0.5 || Math.abs(node.height - n.box.h) > 0.5)) node.resize(Math.max(1, n.box.w), Math.max(1, n.box.h))
  place(node, n, parent, origin)
  return node
}

async function buildImage(n, parent, origin) {
  const asset = DATA.images[n.src]
  let node
  if (asset && asset.svg) {
    node = figma.createNodeFromSvg(asset.svg)
    parent.appendChild(node)
    node.resize(Math.max(1, n.box.w), Math.max(1, n.box.h))
  } else {
    node = figma.createRectangle()
    parent.appendChild(node)
    node.resize(Math.max(1, n.box.w), Math.max(1, n.box.h))
    if (asset && asset.base64) {
      const image = figma.createImage(figma.base64Decode(asset.base64))
      node.fills = [{ type: 'IMAGE', imageHash: image.hash, scaleMode: n.fit === 'contain' ? 'FIT' : 'FILL' }]
    }
    if (n.radius) [node.topLeftRadius, node.topRightRadius, node.bottomRightRadius, node.bottomLeftRadius] = n.radius
  }
  node.name = n.name
  place(node, n, parent, origin)
  return node
}

async function buildInstance(n, parent, origin) {
  const lib = DATA.instances[n.component]
  const comp = lib && lib.key ? await component(lib.key, lib.type) : null
  if (!ok(comp)) {
    const f = await build(n.fallback || { kind: 'frame', name: n.component, box: n.box, children: [] }, parent, origin)
    if (f) {
      f.name = 'Not linked: ' + n.component
      try {
        f.annotations = [{ label: 'Not linked to the 5Mins Library: ' + n.component + (lib && lib.key ? ' (import failed: ' + (comp && failures.has(comp) ? comp.error : 'unknown') + ')' : ' (no published key)') }]
      } catch (e) {
        /* annotations unavailable */
      }
      report.unlinked.push(n.component)
    }
    return f
  }
  const main = comp.type === 'COMPONENT_SET' ? comp.defaultVariant : comp
  const inst = main.createInstance()
  parent.appendChild(inst)
  if (comp.type === 'COMPONENT_SET' && n.variants) {
    try {
      inst.setProperties(n.variants)
    } catch (e) {
      report.variantErrors.push(n.component + ': ' + JSON.stringify(n.variants) + ' (' + String(e.message || e) + ')')
    }
  }
  // Text: copied in order into the instance's visible text layers.
  const layers = inst.findAll((x) => x.type === 'TEXT' && x.visible)
  if (n.texts.length && layers.length) {
    if (layers.length !== n.texts.length) report.textMismatches.push(n.component + ': ' + n.texts.length + ' texts in code, ' + layers.length + ' layers in Figma')
    for (let i = 0; i < Math.min(layers.length, n.texts.length); i++) {
      const layer = layers[i]
      for (const seg of layer.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(seg.fontName)
      if (layer.characters !== n.texts[i]) {
        const before = layer.height
        layer.characters = n.texts[i]
        // Short text that now wraps (a tab counter in a fixed badge): one line, and the badge hugs it.
        if (layer.textAutoResize === 'HEIGHT' && layer.height > before + 2 && !/\s/.test(n.texts[i])) {
          layer.textAutoResize = 'WIDTH_AND_HEIGHT'
          const p = layer.parent
          if (p && p.type !== 'INSTANCE' && p.layoutMode && p.layoutMode !== 'NONE') {
            try {
              p.layoutSizingHorizontal = 'HUG'
            } catch (e) {
              /* not resizable */
            }
          }
        }
      }
    }
  }
  // Long text set to hug that runs wider than the component in code wraps inside it instead.
  const room = n.box.w - (inst.paddingLeft || 0) - (inst.paddingRight || 0)
  for (const layer of layers) {
    if (layer.textAutoResize === 'WIDTH_AND_HEIGHT' && layer.width > room * 1.5 && room > 40) {
      layer.textAutoResize = 'HEIGHT'
      layer.resize(room, layer.height)
    }
  }
  // The code's photo in place of the component's sample picture.
  const photo = n.image && DATA.images[n.image]
  if (photo && photo.base64) {
    const target = inst.findAll((x) => 'fills' in x && Array.isArray(x.fills) && x.fills.some((f) => f.type === 'IMAGE'))[0]
    if (target) {
      const image = figma.createImage(figma.base64Decode(photo.base64))
      target.fills = target.fills.map((f) => (f.type === 'IMAGE' ? { ...f, imageHash: image.hash } : f))
    }
  }
  // Instances with auto layout take the code's size (a full-width bar, a wider field); others,
  // such as a checkbox, keep the component's own size.
  const differs = Math.abs(inst.width - n.box.w) > 2 || Math.abs(inst.height - n.box.h) > 2
  if (differs && inst.layoutMode !== 'NONE') {
    try {
      inst.resize(Math.max(1, n.box.w), Math.max(1, n.box.h))
    } catch (e) {
      /* fixed-size component */
    }
  }
  place(inst, n, parent, origin)
  return inst
}

async function buildFrame(n, parent, origin) {
  const f = figma.createFrame()
  f.name = n.name
  parent.appendChild(f)
  f.resize(Math.max(1, n.box.w), Math.max(1, n.box.h))
  f.fills = n.fill ? [await paint(n.fill, 'fill')] : []
  if (n.radius) {
    const [tl, tr, br, bl] = n.radius
    if (tl === tr && tr === br && br === bl) await setFloat(f, 'cornerRadius', tl, 'radius')
    else [f.topLeftRadius, f.topRightRadius, f.bottomRightRadius, f.bottomLeftRadius] = n.radius
  }
  if (n.border) {
    f.strokes = [await paint(n.border.color, 'stroke')]
    f.strokeAlign = 'INSIDE'
    const [t, r, b, l] = n.border.widths
    f.strokeTopWeight = t
    f.strokeRightWeight = r
    f.strokeBottomWeight = b
    f.strokeLeftWeight = l
  }
  f.clipsContent = !!n.clip
  if (n.opacity != null) f.opacity = n.opacity
  place(f, n, parent, origin)

  const flowing = n.children.filter((c) => !c.abs)
  if (n.layout) {
    f.layoutMode = n.layout.dir === 'row' ? 'HORIZONTAL' : 'VERTICAL'
    f.primaryAxisSizingMode = 'FIXED'
    f.counterAxisSizingMode = 'FIXED'
    f.resize(Math.max(1, n.box.w), Math.max(1, n.box.h))
    if (n.layout.wrap) f.layoutWrap = 'WRAP'
    const [pt, pr, pb, pl] = n.layout.pad
    await setFloat(f, 'paddingTop', pt, 'spacing')
    await setFloat(f, 'paddingRight', pr, 'spacing')
    await setFloat(f, 'paddingBottom', pb, 'spacing')
    await setFloat(f, 'paddingLeft', pl, 'spacing')
    await setFloat(f, 'itemSpacing', n.layout.gap, 'spacing')
    f.primaryAxisAlignItems = JUSTIFY[n.layout.justify] || 'MIN'
    f.counterAxisAlignItems = n.layout.dir === 'row' && ALIGN[n.layout.align] === 'BASELINE' ? 'BASELINE' : ALIGN[n.layout.align] === 'BASELINE' ? 'MIN' : ALIGN[n.layout.align] || 'MIN'
  }
  for (const c of n.children) await build(c, f, n.box)

  // Auto layout only stays where it reproduces the screen; CSS margins and odd alignments it
  // can't express fall back to fixed positions.
  if (n.layout && flowing.length) {
    const kids = f.children.filter((k) => k.layoutPositioning !== 'ABSOLUTE')
    const drift = kids.some((k, i) => {
      const c = flowing[i]
      return c && (Math.abs(k.x - (c.box.x - n.box.x)) > 1.5 || Math.abs(k.y - (c.box.y - n.box.y)) > 1.5)
    })
    if (drift) {
      report.layoutFallbacks++
      f.layoutMode = 'NONE'
      kids.forEach((k, i) => {
        const c = flowing[i]
        if (c) {
          k.x = c.box.x - n.box.x
          k.y = c.box.y - n.box.y
        }
      })
    }
  }
  return f
}

async function build(n, parent, origin) {
  let node
  if (n.kind === 'frame') node = await buildFrame(n, parent, origin)
  else if (n.kind === 'text') node = await buildText(n, parent, origin)
  else if (n.kind === 'instance') node = await buildInstance(n, parent, origin)
  else if (n.kind === 'icon') node = await buildIcon(n, parent, origin)
  else if (n.kind === 'image') node = await buildImage(n, parent, origin)
  return node
}

/** The screen frame, in its section, in the demo's Dark or Light mode. */
async function buildScreen() {
  const page = await figma.getNodeByIdAsync(DATA.pageId)
  if (!page || page.type !== 'PAGE') throw new Error('The demo page ' + DATA.pageId + ' is gone. Run the setup script again.')
  await figma.setCurrentPageAsync(page)
  const section = page.findOne((x) => x.type === 'SECTION' && x.name === DATA.section)
  if (!section) throw new Error('No section "' + DATA.section + '" on the page.')
  const screen = figma.createFrame()
  screen.name = DATA.title
  section.appendChild(screen)
  screen.x = DATA.at.x
  screen.y = DATA.at.y
  screen.resize(DATA.tree.box.w, DATA.tree.box.h)
  screen.clipsContent = true
  for (const m of DATA.modes) {
    const v = await variable(m.sampleKey)
    if (!ok(v)) continue
    const coll = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId)
    const mode = coll && coll.modes.find((x) => x.name === m.modeName)
    if (mode) screen.setExplicitVariableModeForCollection(coll, mode.modeId)
  }
  screen.fills = DATA.tree.fill ? [await paint(DATA.tree.fill, 'fill')] : []
  for (const c of DATA.tree.children) await build(c, screen, DATA.tree.box)
  report.created.push(screen.id)
  return screen
}
