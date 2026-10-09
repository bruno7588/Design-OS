---
name: component-inventory
description: "Lists every component in the 5Mins Figma Library (file EC26cSVe9KNTCWXvYovakw) with its variants, keys, variables and text styles, and checks which exist in Design OS code (packages/components). Feeds the Components module overview, each component's Compare tab, and the component map code-to-figma uses (figma-map.json). Use when Bruno asks to refresh the inventory, after the Library changes, after a component is added to packages/components, or when he asks what's in Figma but not in code."
---

# Component inventory

Two parts. Claude runs the Figma part; the code part is a script that needs no Figma access.

1. **Figma → `packages/components/inventory/figma.json`** (this skill)
2. **`pnpm inventory` → `packages/components/inventory/inventory.json`** (merges Figma, code and prototype)

The shell imports `inventory.json` at build time, so the Components overview and the Compare tabs update after step 2.

## 1. Read the Library

The Figma MCP's `get_metadata` only lists the Cover page, but `use_figma` can see every page. Every script here is **read-only**: it never creates, edits or deletes nodes.

1. Load the figma-use skill first (`/figma-use`, or the `skill://figma/figma-use/SKILL.md` MCP resource) and pass `skillNames` as the skill says.
2. List the pages:
   ```js
   return figma.root.children.map(p => ({ id: p.id, name: p.name }));
   ```
   The component pages sit between `COMPONENTS ↓` and `charts (in revision)`. Skip templates, foundations, layout and charts.
3. In **one message**, run one `use_figma` per component page, in parallel (switching pages inside one script reloads the file). Each runs:
   ```js
   const PAGE_ID = '<page id>';
   const page = await figma.getNodeByIdAsync(PAGE_ID);
   await figma.setCurrentPageAsync(page);
   // Light version: a board set to the Surface colours Light mode holds either a copy of the
   // set or an instance of it. No explicit mode means Dark mode, the collection's default.
   const surface = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === 'Surface colours');
   const lightId = surface.modes.find(m => m.name === 'Light mode').modeId;
   const isLight = (n) => { for (let p = n; p && p.type !== 'PAGE'; p = p.parent) { const m = p.explicitVariableModes?.[surface.id]; if (m) return m === lightId; } return false; };
   const lightBoards = [];
   const walk = (n, d) => { if (d > 5 || !('children' in n)) return; for (const c of n.children) { if (c.explicitVariableModes?.[surface.id] === lightId) lightBoards.push(c); else walk(c, d + 1); } };
   walk(page, 0);
   const lightMains = new Set();
   for (const b of lightBoards) {
     const insts = []; const coll = (n, d) => { if (d > 3 || !('children' in n)) return; for (const c of n.children) { if (c.type === 'INSTANCE') insts.push(c); else coll(c, d + 1); } };
     coll(b, 0);
     for (const i of insts.slice(0, 200)) { const m = await i.getMainComponentAsync(); if (m) { lightMains.add(m.id); if (m.parent?.type === 'COMPONENT_SET') lightMains.add(m.parent.id); } }
   }
   const out = [];
   for (const n of page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })) {
     if (n.type === 'COMPONENT' && n.parent && n.parent.type === 'COMPONENT_SET') continue;
     // key: what other files import the set or component by (code-to-figma, Phase 4e).
     const row = { name: n.name, id: n.id, type: n.type === 'COMPONENT_SET' ? 'set' : 'component', key: n.key };
     const variants = {}; const props = [];
     for (const [k, d] of Object.entries(n.componentPropertyDefinitions)) {
       if (d.type === 'VARIANT') variants[k] = d.variantOptions; else props.push(k.split('#')[0] + ':' + d.type);
     }
     if (Object.keys(variants).length) row.variants = variants;
     if (props.length) row.props = props;
     row.board = isLight(n) ? 'light' : 'dark';
     row.light = lightMains.has(n.id) ? 'instance' : undefined;
     out.push(row);
   }
   // Copies: two items with the same name, one on each board.
   const byName = {};
   for (const r of out) (byName[r.name.trim().toLowerCase()] ||= []).push(r);
   for (const r of out) {
     const group = byName[r.name.trim().toLowerCase()];
     if (!r.light) r.light = group.length > 1 && group.some(g => g.board === 'light') && group.some(g => g.board === 'dark') ? 'copy' : r.board === 'light' ? 'light only' : 'none';
     delete r.board;
   }
   return { page: page.name.trim(), count: out.length, items: out };
   ```
4. In the same message, run one more read-only `use_figma` for the **variables and text styles**, which code-to-figma binds to (Phase 4e):
   ```js
   const hex = (c) => '#' + [c.r, c.g, c.b, c.a ?? 1].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
   const collections = await figma.variables.getLocalVariableCollectionsAsync();
   const byId = new Map((await figma.variables.getLocalVariablesAsync()).map((v) => [v.id, v]));
   const resolve = (v, modeId, depth = 0) => {
     let value = v.valuesByMode[modeId] ?? Object.values(v.valuesByMode)[0];
     while (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS' && depth++ < 10) {
       const target = byId.get(value.id);
       if (!target) return null;
       const coll = collections.find((c) => c.id === target.variableCollectionId);
       const targetMode = coll.modes.find((m) => m.modeId === modeId) ? modeId : coll.defaultModeId;
       value = target.valuesByMode[targetMode] ?? Object.values(target.valuesByMode)[0];
     }
     return value && typeof value === 'object' && 'r' in value ? hex(value) : value;
   };
   const variables = [];
   for (const c of collections) for (const id of c.variableIds) {
     const v = byId.get(id); if (!v) continue;
     const values = {}; for (const m of c.modes) values[m.name] = resolve(v, m.modeId);
     variables.push({ name: v.name, key: v.key, collection: c.name, type: v.resolvedType, scopes: v.scopes, values });
   }
   const textStyles = (await figma.getLocalTextStylesAsync()).map((t) => ({
     name: t.name, key: t.key, family: t.fontName.family, style: t.fontName.style, size: t.fontSize,
     lineHeight: t.lineHeight.unit === 'PIXELS' ? t.lineHeight.value : t.lineHeight.unit === 'PERCENT' ? Math.round(t.fontSize * t.lineHeight.value) / 100 : null,
   }));
   return { variables, textStyles };
   ```
5. Write every result to `figma.json` exactly as returned: `{ fileKey, fetchedAt, source, pages: [{ page, pageId, items }], variables, textStyles }`. Don't merge or rename anything; the scripts do that.

Most sets exist twice, once on the light board and once on the dark board, as separate copies with the same name. Keep both; `pnpm inventory` merges them and flags copies whose variants differ.

Some components have one copy, with the light version as an instance on a board set to the Light variable modes (Modal, Side Drawer, Toast). The script records either as `light: 'copy' | 'instance'`.

Every component must have a dark and a light version (Bruno, 2026-09-29). `light: 'none'` or `'light only'` is a gap to report, and `pnpm inventory` counts them as `noLightVersion`.

## 2. Merge with code

Run `pnpm inventory`. It:
- merges the light and dark copies by page and name
- matches each set to a `packages/components/src/<Name>/<name>.figma.ts` mapping (`FigmaMapping`: page, set name, node IDs, and the variant values the reference covers)
- lists variant values missing in code, or missing in Figma
- notes whether `playground/src/components` has a folder with a similar name, as a hint only
- prints a summary: in Figma, in code, both, Figma only, code only, and components with no light version

When a new reference component is added to `packages/components`, give it a `.figma.ts` mapping. Otherwise it won't show as "in code".

Then run `pnpm figma-map`. It writes `packages/components/figma-map.json`, the component map code-to-figma uses to place Library instances: the keys of each mapped set per mode, how code props become variant values (the `map` in each `.figma.ts`), and the variables and text styles. It lists components that aren't mapped yet, mapped sets missing from Figma, and map values a set doesn't offer. Fix problems in the `.figma.ts` maps; give a new component a `map` when it should be placed as an instance (`kind: 'leaf'`) or rebuilt as frames (`kind: 'container'`, for sets with slots).

## 3. Report to Bruno

Keep it short and in Figma terms:
- the summary counts, and what changed since the last run (`git diff packages/components/inventory/inventory.json`)
- sets whose light and dark copies differ (`copiesDiffer`), or are named differently (`namesDiffer`)
- components with no light version (`lightVersion` none or light only)
- for components in code: any missing variants, and whether Figma or code should change

The inventory compares variant values, not combinations. For a component in code, also check each board for missing combinations with a read-only script over `set.children` (`variantProperties`). Buttons, for example, has every value but 13 Configuration × Size gaps. Record them in that component's Compare tab.

Then commit `figma.json`, `inventory.json` and `figma-map.json`.

## Compare frames

A Compare tab shows the Figma frame as an image in `apps/shell/public/figma/<slug>-<mode>.png`. To refresh one, call `get_screenshot` on the set's node for each mode (the node IDs are in the mapping) and download it to that path with the curl command the tool returns.
