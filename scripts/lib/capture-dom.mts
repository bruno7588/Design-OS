// The screen tree (Phase 4e, code-to-figma): what one screen of a running demo is made of,
// read in the browser from the DOM and React's fibre. `extractScreen` runs inside the page
// (page.evaluate), so it must stay self-contained: no imports, no outside variables.

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Font {
  family: string;
  size: number;
  weight: number;
  /** Line height in px; null for normal. */
  lineHeight: number | null;
  letterSpacing: number;
  italic: boolean;
}

export interface Layout {
  dir: "row" | "column";
  gap: number;
  wrap: boolean;
  /** Padding: top, right, bottom, left. */
  pad: [number, number, number, number];
  justify: string;
  align: string;
}

export type ScreenNode =
  | {
      kind: "frame";
      name: string;
      box: Box;
      layout?: Layout;
      fill?: string;
      radius?: [number, number, number, number];
      /** Stroke colour and per-side widths: top, right, bottom, left. */
      border?: { color: string; widths: [number, number, number, number] };
      shadow?: string;
      clip?: boolean;
      opacity?: number;
      abs?: boolean;
      grow?: boolean;
      children: ScreenNode[];
    }
  | {
      kind: "text";
      name: string;
      box: Box;
      text: string;
      font: Font;
      color: string;
      align: string;
      truncate: boolean;
      abs?: boolean;
    }
  | {
      kind: "instance";
      component: string;
      props: Record<string, unknown>;
      texts: string[];
      box: Box;
      abs?: boolean;
      fallback: ScreenNode;
    }
  | {
      kind: "icon";
      name: string;
      box: Box;
      svg: string;
      rotation?: number;
      abs?: boolean;
    }
  | {
      kind: "image";
      name: string;
      box: Box;
      src: string;
      radius?: [number, number, number, number];
      fit: string;
      abs?: boolean;
    };

export interface Leaf {
  match: string;
  domRoot?: string;
}

/**
 * Runs in the page. Marks the DOM elements of library leaf components (from React's fibre),
 * then walks the DOM from <body>, keeping what's visible in the viewport.
 */
export function extractScreen(args: {
  leaves: Leaf[];
  width: number;
  height: number;
  skip: string;
}): ScreenNode {
  const { leaves, width, height, skip } = args;
  const byName = new Map(leaves.map((l) => [l.match, l]));

  // 1. Library leaves: React components by name, with their props.
  const marks = new Map<
    Element,
    { component: string; props: Record<string, unknown> }
  >();
  // The bundler renames functions inside forwardRef to avoid clashes (Button → Button2), so
  // trailing digits are dropped before matching.
  const nameOf = (type: any): string | null => {
    if (!type) return null;
    const raw =
      typeof type === "function"
        ? type.displayName || type.name
        : typeof type === "object"
          ? type.displayName ||
            type.render?.displayName ||
            type.render?.name ||
            nameOf(type.type)
          : null;
    return raw ? String(raw).replace(/\d+$/, "") : null;
  };
  const serialise = (props: Record<string, unknown>) => {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(props ?? {})) {
      if (
        typeof v === "function" ||
        k === "sx" ||
        k === "ref" ||
        k === "className" ||
        k === "style"
      )
        continue;
      if (v === null || ["string", "number", "boolean"].includes(typeof v))
        out[k] = v;
      else if (v !== undefined) out[k] = "node";
    }
    return out;
  };
  const hosts = (fiber: any): Element[] => {
    const found: Element[] = [];
    const walk = (f: any) => {
      for (let c = f; c; c = c.sibling) {
        if (c.tag === 5 && c.stateNode instanceof Element)
          found.push(c.stateNode);
        else walk(c.child);
      }
    };
    walk(fiber.child);
    return found;
  };
  const visit = (fiber: any) => {
    for (let f = fiber; f; f = f.sibling) {
      const leaf = byName.get(nameOf(f.type) ?? "");
      if (leaf && f.tag !== 5) {
        let el: Element | undefined;
        if (leaf.domRoot) {
          for (const h of hosts(f)) {
            el = h.matches(leaf.domRoot)
              ? h
              : (h.querySelector(leaf.domRoot) ?? undefined);
            if (el) break;
          }
        } else el = hosts(f)[0];
        if (el)
          marks.set(el, {
            component: leaf.match,
            props: serialise(f.memoizedProps),
          });
        continue; // a leaf's insides belong to its instance
      }
      visit(f.child);
    }
  };
  const container = document.getElementById("root") as any;
  const key =
    container &&
    Object.keys(container).find((k) => k.startsWith("__reactContainer$"));
  if (key) visit(container[key]);

  // 2. The DOM.
  const px = (v: string) => parseFloat(v) || 0;
  const toHex = (c: string): string | undefined => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return undefined;
    const [r, g, b, a = "1"] = m[1].split(/[,/\s]+/).filter(Boolean);
    const alpha = parseFloat(a);
    if (alpha === 0) return undefined;
    return (
      "#" +
      [r, g, b]
        .map((x) => Math.round(parseFloat(x)).toString(16).padStart(2, "0"))
        .join("") +
      Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0")
    );
  };
  const boxOf = (r: DOMRect): Box => ({
    x: Math.round(r.left * 10) / 10,
    y: Math.round(r.top * 10) / 10,
    w: Math.round(r.width * 10) / 10,
    h: Math.round(r.height * 10) / 10,
  });
  const visible = (r: DOMRect) =>
    r.width > 0.5 &&
    r.height > 0.5 &&
    r.right > 0 &&
    r.bottom > 0 &&
    r.left < width &&
    r.top < height;
  const nameFor = (el: Element) =>
    el.getAttribute("data-testid") ||
    el.getAttribute("aria-label") ||
    (
      Array.from(el.classList).find((c) => /^Mui[A-Z]\w*-root$/.test(c)) ?? ""
    ).replace(/^Mui|-root$/g, "") ||
    el.getAttribute("role") ||
    el.tagName.toLowerCase();
  const fontOf = (cs: CSSStyleDeclaration): Font => ({
    family: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
    size: px(cs.fontSize),
    weight: parseInt(cs.fontWeight) || 400,
    lineHeight: cs.lineHeight === "normal" ? null : px(cs.lineHeight),
    letterSpacing: cs.letterSpacing === "normal" ? 0 : px(cs.letterSpacing),
    italic: cs.fontStyle === "italic",
  });
  const transform = (text: string, cs: CSSStyleDeclaration) =>
    cs.textTransform === "uppercase"
      ? text.toUpperCase()
      : cs.textTransform === "lowercase"
        ? text.toLowerCase()
        : text;

  // Inset box shadows are how the theme draws some borders (the top bar's bottom line).
  const insetBorders = (shadow: string) => {
    const widths: [number, number, number, number] = [0, 0, 0, 0];
    let color: string | undefined;
    for (const part of shadow.split(/,(?![^(]*\))/)) {
      if (!part.includes("inset")) continue;
      const c = part.match(/rgba?\([^)]+\)/)?.[0];
      const n =
        part
          .replace(/rgba?\([^)]+\)/, "")
          .match(/-?[\d.]+px/g)
          ?.map(px) ?? [];
      const [x = 0, y = 0, blur = 0, spread = 0] = n;
      if (blur || spread) continue;
      if (y < 0) widths[2] = -y;
      if (y > 0) widths[0] = y;
      if (x < 0) widths[1] = -x;
      if (x > 0) widths[3] = x;
      color = c ? toHex(c) : color;
    }
    return color && widths.some(Boolean) ? { color, widths } : undefined;
  };

  const textNode = (
    text: string,
    r: DOMRect,
    cs: CSSStyleDeclaration,
    el: Element,
  ): ScreenNode => {
    const truncate =
      cs.textOverflow === "ellipsis" &&
      (el as HTMLElement).scrollWidth > (el as HTMLElement).clientWidth + 1;
    // A truncated line's range is the full text; the box is what shows, up to the element's edge.
    const box = boxOf(r);
    if (truncate) {
      const e = el.getBoundingClientRect();
      box.w = Math.max(
        1,
        Math.round(
          (Math.min(r.right, e.left + (el as HTMLElement).clientWidth) -
            r.left) *
            10,
        ) / 10,
      );
    }
    return {
      kind: "text",
      name: text.slice(0, 40),
      box,
      text: transform(text, cs),
      font: fontOf(cs),
      color: toHex(cs.color) ?? "#000000ff",
      align: cs.textAlign,
      truncate,
    };
  };

  const walk = (el: Element): ScreenNode | null => {
    if (
      el.matches(skip) ||
      /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|LINK|META)$/.test(el.tagName)
    )
      return null;
    const cs = getComputedStyle(el);
    if (
      cs.display === "none" ||
      cs.visibility === "hidden" ||
      parseFloat(cs.opacity) === 0
    )
      return null;
    const r = el.getBoundingClientRect();
    const abs = cs.position === "absolute" || cs.position === "fixed";

    const mark = marks.get(el);
    if (mark && visible(r)) {
      // Visible text only: MUI puts a zero-width space in a field's outline.
      const texts = ((el as HTMLElement).innerText ?? "")
        .split("\n")
        .map((t) => t.replace(/[\u200b\u00a0]/g, " ").trim())
        .filter(Boolean);
      // Inputs show their value, or their placeholder, which innerText leaves out. MUI's
      // invisible native inputs (a select's value) don't count.
      for (const input of Array.from(
        el.querySelectorAll(
          "input:not([type=checkbox]):not([type=radio]):not([type=hidden]), textarea",
        ),
      ) as HTMLInputElement[]) {
        const style = getComputedStyle(input);
        const hidden =
          style.display === "none" ||
          parseFloat(style.opacity) === 0 ||
          input.getAttribute("aria-hidden") === "true";
        const shown = input.value || input.placeholder;
        if (shown && !hidden) texts.push(shown);
      }
      marks.delete(el); // the fallback below rebuilds it as frames
      const fallback = walk(el);
      marks.set(el, mark);
      return {
        kind: "instance",
        component: mark.component,
        props: mark.props,
        texts,
        box: boxOf(r),
        abs,
        fallback: fallback ?? {
          kind: "frame",
          name: mark.component,
          box: boxOf(r),
          children: [],
        },
      };
    }
    if (el.tagName === "svg" || el instanceof SVGSVGElement) {
      if (!visible(r)) return null;
      const clone = el.cloneNode(true) as SVGSVGElement;
      clone.setAttribute("width", String(r.width));
      clone.setAttribute("height", String(r.height));
      const markup = clone.outerHTML.replace(/currentColor/g, cs.color);
      // CSS rotations (a sort arrow turned 180°) aren't in the markup: keep the angle.
      const m = cs.transform.match(/matrix\(([^)]+)\)/);
      const rotation = m
        ? Math.round(
            (Math.atan2(
              parseFloat(m[1].split(",")[1]),
              parseFloat(m[1].split(",")[0]),
            ) *
              180) /
              Math.PI,
          )
        : 0;
      return {
        kind: "icon",
        name: el.getAttribute("aria-label") || "icon",
        box: boxOf(r),
        svg: markup,
        ...(rotation && { rotation }),
        abs,
      };
    }
    if (el.tagName === "IMG") {
      if (!visible(r)) return null;
      const radius: [number, number, number, number] = [
        px(cs.borderTopLeftRadius),
        px(cs.borderTopRightRadius),
        px(cs.borderBottomRightRadius),
        px(cs.borderBottomLeftRadius),
      ];
      return {
        kind: "image",
        name: el.getAttribute("alt") || "image",
        box: boxOf(r),
        src:
          (el as HTMLImageElement).currentSrc || (el as HTMLImageElement).src,
        radius,
        fit: cs.objectFit,
        abs,
      };
    }

    const children: ScreenNode[] = [];
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = (child.textContent ?? "").replace(/\s+/g, " ").trim();
        if (!text) continue;
        const range = document.createRange();
        range.selectNodeContents(child);
        const tr = range.getBoundingClientRect();
        if (visible(tr)) children.push(textNode(text, tr, cs, el));
      } else if (child instanceof Element) {
        const n = walk(child);
        if (n) children.push(n);
      }
    }
    // Inputs show their value or placeholder as text.
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      const value = el.value || el.placeholder;
      if (
        value &&
        visible(r) &&
        el.type !== "checkbox" &&
        el.type !== "radio" &&
        el.type !== "hidden"
      ) {
        children.push({
          ...(textNode(value, r, cs, el) as Extract<
            ScreenNode,
            { kind: "text" }
          >),
          color: el.value
            ? (toHex(cs.color) ?? "#000000ff")
            : (toHex(getComputedStyle(el, "::placeholder").color) ??
              toHex(cs.color) ??
              "#000000ff"),
        });
      }
    }

    const fill = toHex(cs.backgroundColor);
    const bw: [number, number, number, number] = [
      px(cs.borderTopWidth),
      px(cs.borderRightWidth),
      px(cs.borderBottomWidth),
      px(cs.borderLeftWidth),
    ];
    const borderColour =
      toHex(cs.borderTopColor) ??
      toHex(cs.borderBottomColor) ??
      toHex(cs.borderLeftColor);
    const border =
      bw.some(Boolean) && borderColour
        ? { color: borderColour, widths: bw }
        : insetBorders(cs.boxShadow);
    const outerShadow =
      cs.boxShadow !== "none" &&
      cs.boxShadow.split(/,(?![^(]*\))/).some((p) => !p.includes("inset"))
        ? cs.boxShadow
        : undefined;
    const radius: [number, number, number, number] = [
      px(cs.borderTopLeftRadius),
      px(cs.borderTopRightRadius),
      px(cs.borderBottomRightRadius),
      px(cs.borderBottomLeftRadius),
    ];
    const visual = !!(fill || border || outerShadow);
    if (!children.length && (!visual || !visible(r))) return null;
    if (!visible(r) && !children.length) return null;

    const flex = cs.display === "flex" || cs.display === "inline-flex";
    const column = cs.flexDirection.startsWith("column");
    const layout: Layout | undefined = flex
      ? {
          dir: column ? "column" : "row",
          gap: px(column ? cs.rowGap : cs.columnGap),
          wrap: cs.flexWrap === "wrap",
          pad: [
            px(cs.paddingTop),
            px(cs.paddingRight),
            px(cs.paddingBottom),
            px(cs.paddingLeft),
          ],
          justify: cs.justifyContent,
          align: cs.alignItems,
        }
      : undefined;

    return {
      kind: "frame",
      name: nameFor(el),
      box: boxOf(r),
      ...(layout && { layout }),
      ...(fill && { fill }),
      ...(radius.some(Boolean) && { radius }),
      ...(border && { border }),
      ...(outerShadow && { shadow: outerShadow }),
      ...(cs.overflow === "hidden" ||
      cs.overflowX === "hidden" ||
      cs.overflowY === "auto" ||
      cs.overflowY === "hidden"
        ? { clip: true }
        : {}),
      ...(parseFloat(cs.opacity) < 1 && { opacity: parseFloat(cs.opacity) }),
      ...(abs && { abs }),
      ...(parseFloat(cs.flexGrow) > 0 && { grow: true }),
      children,
    };
  };

  const body = walk(document.body);
  const page = toHex(getComputedStyle(document.body).backgroundColor);
  return {
    kind: "frame",
    name: "Screen",
    box: { x: 0, y: 0, w: width, h: height },
    fill: page,
    clip: true,
    children: body ? [body] : [],
  };
}

/**
 * Tidies a captured tree: drops empty wrappers and merges a plain frame that only wraps one
 * child at the same size, so the Figma layers read like a designer's.
 */
export function simplify(node: ScreenNode): ScreenNode {
  if (node.kind === "instance")
    return { ...node, fallback: simplify(node.fallback) };
  if (node.kind !== "frame") return node;
  const children = node.children.map(simplify);
  const plain =
    !node.fill &&
    !node.border &&
    !node.shadow &&
    !node.radius &&
    !node.opacity &&
    !node.clip;
  const pad = node.layout?.pad ?? [0, 0, 0, 0];
  if (plain && !pad.some(Boolean) && children.length === 1) {
    const only = children[0];
    const same =
      Math.abs(only.box.w - node.box.w) < 1 &&
      Math.abs(only.box.h - node.box.h) < 1 &&
      Math.abs(only.box.x - node.box.x) < 1 &&
      Math.abs(only.box.y - node.box.y) < 1;
    if (same) return { ...only, ...(node.abs && { abs: true }) } as ScreenNode;
  }
  return { ...node, children };
}

/** Counts nodes by kind, and instances by component. */
export function summarise(
  node: ScreenNode,
  acc = {
    frames: 0,
    texts: 0,
    instances: {} as Record<string, number>,
    icons: 0,
    images: 0,
  },
) {
  if (node.kind === "frame") {
    acc.frames++;
    node.children.forEach((c) => summarise(c, acc));
  } else if (node.kind === "text") acc.texts++;
  else if (node.kind === "instance")
    acc.instances[node.component] = (acc.instances[node.component] ?? 0) + 1;
  else if (node.kind === "icon") acc.icons++;
  else acc.images++;
  return acc;
}
