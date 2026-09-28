---
name: component-inventory
description: "Lists every component in the 5Mins Figma Library (file EC26cSVe9KNTCWXvYovakw) with its variants, and checks which exist in Design OS code (packages/components). Feeds the Components module overview and each component's Compare tab. Use when Bruno asks to refresh the inventory, after the Library changes, after a component is added to packages/components, or when he asks what's in Figma but not in code."
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
   const out = [];
   for (const n of page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })) {
     if (n.type === 'COMPONENT' && n.parent && n.parent.type === 'COMPONENT_SET') continue;
     const row = { name: n.name, id: n.id, type: n.type === 'COMPONENT_SET' ? 'set' : 'component' };
     const variants = {}; const props = [];
     for (const [k, d] of Object.entries(n.componentPropertyDefinitions)) {
       if (d.type === 'VARIANT') variants[k] = d.variantOptions; else props.push(k.split('#')[0] + ':' + d.type);
     }
     if (Object.keys(variants).length) row.variants = variants;
     if (props.length) row.props = props;
     out.push(row);
   }
   return { page: page.name.trim(), count: out.length, items: out };
   ```
4. Write every result to `figma.json` exactly as returned: `{ fileKey, fetchedAt, source, pages: [{ page, pageId, items }] }`. Don't merge or rename anything; the script does that.

Most sets exist twice, once on the light board and once on the dark board, as separate copies with the same name. Keep both; `pnpm inventory` merges them and flags copies whose variants differ.

## 2. Merge with code

Run `pnpm inventory`. It:
- merges the light and dark copies by page and name
- matches each set to a `packages/components/src/<Name>/<name>.figma.ts` mapping (`FigmaMapping`: page, set name, node IDs, and the variant values the reference covers)
- lists variant values missing in code, or missing in Figma
- notes whether `playground/src/components` has a folder with a similar name, as a hint only
- prints a summary: in Figma, in code, both, Figma only, code only

When a new reference component is added to `packages/components`, give it a `.figma.ts` mapping. Otherwise it won't show as "in code".

## 3. Report to Bruno

Keep it short and in Figma terms:
- the summary counts, and what changed since the last run (`git diff packages/components/inventory/inventory.json`)
- sets whose light and dark copies differ (`copiesDiffer`)
- for components in code: any missing variants, and whether Figma or code should change

The inventory compares variant values, not combinations. For a component in code, also check each board for missing combinations with a read-only script over `set.children` (`variantProperties`). Buttons, for example, has every value but 13 Configuration × Size gaps. Record them in that component's Compare tab.

Then commit both JSON files.

## Compare frames

A Compare tab shows the Figma frame as an image in `apps/shell/public/figma/<slug>-<mode>.png`. To refresh one, call `get_screenshot` on the set's node for each mode (the node IDs are in the mapping) and download it to that path with the curl command the tool returns.
