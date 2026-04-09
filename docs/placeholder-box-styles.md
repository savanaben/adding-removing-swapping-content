# Placeholder box — design spec for implementation

This document describes the **placeholder** UI (pre-swap) and the **swapped-in content** panel (post-swap) as implemented in this demo. Values are given for handoff so another team can reproduce behavior in their stack (exact colors, spacing, layout rules, and theme branches).

**Source of truth in repo:** `src/components/Placeholder.tsx`, `src/components/SwapInMarkdown.tsx`, and global typography in `src/index.css` (root font for prose inherits from the app).

---

## 1. Terminology

| Term | Meaning |
|------|---------|
| **Variant** | `blank` or `moreComing` (config-driven). |
| **Theme** | App chrome theme: `default`, `beige`, or `dark`. Placeholder and swap-in styles branch on this. |
| **Swapped** | After the demo “swap” sequence, the placeholder is replaced by rich content (markdown). |

---

## 2. Outer container (both variants, pre- and post-swap root)

Applied to the wrapper with id `placeholder-anchor`:

| Property | Value |
|----------|--------|
| `position` | `relative` |
| `display` | `inline-grid` |
| `width` | `100%` |
| `max-width` | `100%` |
| `min-width` | `0` |
| `vertical-align` | `top` |

**Purpose:** Single grid cell so the placeholder and replacement can stack in the same track; replacement always spans full passage width.

---

## 3. Placeholder surface (pre-swap box only)

Shared shell for **both** variants while the user sees the placeholder (not swapped). Inner content differs by variant (blank is empty; more coming shows icon + text).

| Property | Notes |
|----------|--------|
| `box-sizing` | `border-box` |
| `border-radius` | `6px` |
| `border-width` | `2px` |
| `border-style` | `solid` |

### 3.1 By theme

| Theme | Border color | Background |
|-------|--------------|------------|
| **default** | `#696969` | `#EEEEEE` |
| **beige** | `#696969` | `rgb(237, 237, 213)` |
| **dark** | `#AFAFAF` | `#3c3c3c` |

### 3.2 Layout classes (motion wrapper)

| Property | Value |
|----------|--------|
| `position` | `relative` |
| `z-index` | `10` |
| Grid placement | `col-start: 1`, `row-start: 1` |
| `display` | `flex` |
| `max-width` | `100%` |

**Width behavior (blank only, configurable):**

- If width is **100% of column** (full width): add `width: 100%` (CSS).
- If width is **&lt; 100%** (percentage of column): set explicit `width` to that percent, `max-width: 100%`, and `width` in Tailwind terms `w-auto`; align within the grid using `justify-self`: `start` (left), `center` (middle), `end` (right).

**Height behavior:**

| Condition | Height |
|-----------|--------|
| Variant **moreComing** | `auto` (content-sized) |
| **blank** + “match height to content” | No fixed height on box; use `height: 100%` and `min-height: 40px` on the flex container so the grid row follows the invisible measure layer (see §7). |
| **blank** + fixed height mode | `max(40, configuredHeight)px` (minimum **40px**) |

### 3.3 Blank variant — inner layout

No inner children; the box is empty.

| Flex | Value |
|------|--------|
| `align-items` | `center` |
| `justify-content` | `center` |

No extra padding on the blank box (padding comes only from **more coming** below).

### 3.4 More coming variant — inner layout

| Property | Value |
|----------|--------|
| `flex-direction` | `column` |
| `align-items` | `center` |
| `gap` | `16px` |
| `padding` | `16px` (`1rem`, Tailwind `p-4`) |

#### Lock icon (SVG)

- **Rendered size:** `width="60"` `height="90"` (viewport `0 0 40 60`).
- **Fill** (entire icon): theme-dependent — see table below.
- Decorative (`aria-hidden`).

| Theme | Icon fill |
|-------|-----------|
| **default**, **beige** | `#909090` |
| **dark** | `#c7c7c7` |

#### Message text

- **Source:** configurable string (demo default: `Later you will read the rest of the passage.`).
- **Element:** paragraph.

| Property | Value |
|----------|--------|
| `margin` | `0` |
| `user-select` | `none` |
| `text-align` | `center` |
| `font-style` | `italic` |

| Theme | Text color |
|-------|------------|
| **default**, **beige** | `#696969` |
| **dark** | `#c7c7c7` |

---

## 4. Swapped-in content panel (replacement)

When swap completes, the placeholder is unmounted and a **replacement** panel shows rendered markdown. This is **not** the same visuals as the placeholder box; it uses a distinct “research / swap-in” treatment.

Wrapper row:

| Property | Value |
|----------|--------|
| `position` | `relative` |
| `z-index` | `10` |
| Grid | `col-start: 1`, `row-start: 1` |
| `width` | `100%` |
| `min-width` | `0` |

### 4.1 Panel inner box (all themes)

| Property | Value |
|----------|--------|
| `border-radius` | `0.375rem` (Tailwind `rounded-md`) |
| `padding` | `16px` (`p-4`) |
| `max-width` | none (class `max-w-none`) |
| `line-height` | `1.4` |

Prose spacing (Tailwind Typography–style utilities; implement with your typography system or equivalent):

- Paragraphs: vertical margin `0.75rem` top/bottom; line-height `1.4`.
- Headings: vertical margin `1rem` top/bottom; line-height `1.4`.
- Lists: `ul` margin `0.75rem` vertical; `li` vertical margin `0.125rem`; `li` line-height `1.4`.
- First child: top margin forced `0`; last child: bottom margin forced `0`.

### 4.2 By theme (replacement panel)

| Theme | Background | Focus / highlight ring | Body text & prose |
|-------|------------|-------------------------|-------------------|
| **default** | `#E9D5FF`–ish light purple (Tailwind `purple-100`) | `4px` ring, `purple-500` | `prose-slate` (slate palette via typography plugin) |
| **beige** | Same as default for this demo (`purple-100` + `ring-purple-500` + `prose-slate`) | Same as default | Same as default |
| **dark** | `#2a1250` | `4px` ring `#d8b4fe` | `#EBEBEB` for body, headings, paragraphs, strong, list items; **list markers** `#d8b4fe` |

**Note:** In codebase, default and beige use the same replacement colors; only the app shell differs. If product later diverges beige swap-in colors, update this section.

---

## 5. Markdown inside the swapped panel (`SwapInMarkdown`)

Base rendering: GitHub-flavored markdown.

### 5.1 Images

| Property | Value |
|----------|--------|
| `margin` vertical | `0.5rem` (`my-2`) |
| `max-height` | `400px` |
| `max-width` | `100%` |
| `border-radius` | rounded |
| `object-fit` | `contain` |
| `border` | `1px` solid (theme below) |

| Theme | Image border color |
|-------|---------------------|
| **default**, **beige** | `#E9E5FF`-family light purple (Tailwind `purple-200`) |
| **dark** | `#c4b5fd` |

### 5.2 Links (dark theme only in demo)

On **dark** theme, anchors get:

| Property | Value |
|----------|--------|
| `font-weight` | `500` |
| `color` | `#e9d5ff` |
| `text-decoration` | underline |
| `text-underline-offset` | `2px` |
| `:hover` color | `#ffffff` |

**default / beige:** no extra link class in demo (inherits prose).

---

## 6. Motion (optional — behavior parity)

If implementing animation:

| Phase | Placeholder opacity | Replacement opacity | Duration |
|-------|---------------------|--------------------|----------|
| Initial | `1` | — | — |
| Fade out / pause | `0` | — | `0.4s` |
| Replacement enter | — | `0` → `1` | `0.4s` |
| Placeholder exit | → `0` | — | `0.4s` |

Use easing consistent with your design system (demo uses Framer Motion defaults for opacity).

---

## 7. Blank + “match height to content” (implementation detail)

When **blank** + height matches future swap content:

1. An **invisible** duplicate of the replacement markdown (same markup/styles, `visibility: hidden`, `pointer-events: none`) sits in the same grid cell with `width: 100%` to **size the row**.
2. The visible placeholder flex box uses `height: 100%` and `min-height: 40px` so the visible blank box fills that row.

Implementers must preserve row height across the swap to avoid layout jump **or** accept a reflow if they omit this pattern.

---

## 8. Quick reference — colors only

### Placeholder shell

| | default | beige | dark |
|--|---------|-------|------|
| Border | `#696969` | `#696969` | `#AFAFAF` |
| Background | `#EEEEEE` | `rgb(237,237,213)` | `#3c3c3c` |

### More coming

| | default / beige | dark |
|--|-----------------|------|
| Icon | `#909090` | `#c7c7c7` |
| Text | `#696969` | `#c7c7c7` |

### Replacement panel

| | default / beige | dark |
|--|-----------------|------|
| Background | `purple-100` (~`#f3e8ff`) | `#2a1250` |
| Ring | `purple-500` | `#d8b4fe` |
| Text | prose slate | `#EBEBEB` |

---

## 9. Config knobs (for QA / parity with demo)

| Knob | Affects |
|------|---------|
| `widthPercent` (blank) | `100` = full column; lower = partial width + alignment. |
| `height` (blank, fixed mode) | Pixel height, min 40. |
| `matchHeightToContent` (blank) | Row height from content vs fixed height. |
| `alignment` | `left` / `center` / `right` when width &lt; 100%. |
| `moreComingText` | More coming body copy. |

---

*Generated to mirror `Placeholder.tsx` and `SwapInMarkdown.tsx`. If those files change, update this document or regenerate.*
