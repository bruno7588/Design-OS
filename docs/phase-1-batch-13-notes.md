# Phase 1, batch 13: Web navigation (Side navigation, Top navigation, Page header)

Checked 2026-09-29.
- **Why this batch:** the shell of the web app and Admin. The mobile learner-app navigation (Tab nav, Top nav/App) comes next.
- **Sources:**
  - The Figma Library: the Navigation and Header pages.
  - `playground/docs/design-system/navigation.md` and `headers.md`.
  - `src/components/{LeftSidebar,TopNav}`.
- **Per-property detail:** each component's Compare tab.

| Component | MUI | Figma |
|---|---|---|
| SideNav | List + ListItemButton (theme) + Collapse + Tooltip | Side navigation `4697:13314` / `12048:2302`; Menu/Itens/WebApp `4674:25675` / `12048:2401`; Menu/Itens/Admin `10372:4045` / `12048:2440` |
| TopNav | Box (header) + Button + IconButton | Top Nav/Admin `5385:20137` / `12328:8954` |
| PageHeader | Box + Typography + Divider | Header `7902:1019` / `11921:13215` |
| Logo | inline SVG | Logo/Logo=Default |

## Built
- **Menu items:** `MuiListItemButton` theme overrides keyed on a class.
  - `ds-nav-web`: padding 16, 24px Bold icon, Regular 16.
  - `ds-nav-admin`: padding 12/16, 20px Linear icon (Bold when selected), Regular 14.
  - `ds-nav-sub`: padding 12/16/12/42, Text-tertiary.
  - Hover is Input-background. Selected is Text-selected and Bold, with no fill.
  - Collapsed tiles: 56 × 56 (web) and 52 × 44 (Admin).
- **SideNav:**
  - 240px wide; collapsed, 88 (web) and 68 (Admin). Admin has a Border on the right.
  - The web app footer is the profile card; Admin has Help and 5Mins Academy. Both end with Powered by.
  - Admin groups open and close (aria-expanded). The current page is aria-current.
  - Collapsed items are named and show their label in a tooltip on the right.
- **TopNav:**
  - 70px (72 small), Page-background, with a Border underneath.
  - Admin: Exit Admin, the theme button (it says which mode it switches to) and Log out.
  - Web app: Get App, Create, Streak, and Events with an unread dot.
  - Small Admin: the menu button replaces the logo.
- **PageHeader:**
  - Page: gap 16, Bold 24 as h1. Section: gap 12, Bold 20 as h2.
  - Optional slots: metadata, supporting text, actions, and navigation under a divider.
- **Logo:** Primary-500 "5", a Secondary-500 play mark, and the rest in Text-primary. It scales with height.

## Follow-up, 2026-09-29 (Bruno)
- **Figma Top Nav/Admin:** Exit Admin is now Outlined-2 Small (33px) in both sets. The theme and log-out icons are 20px (were 21).
  - The light copy was replaced (new set `12328:8954`).
  - The small breakpoint's log-out icon stays 21px: it's locked inside the old 34px icon button component.
- **Code:** Bruno added a sidebar-left button before the logo in Admin large. `TopNav` draws it: named "Collapse the menu" or "Expand the menu", with aria-expanded, and wired through `sideNavExpanded` and `onToggleSideNav`.

- **Sub-items (Bruno):** the assembled Side navigation panels now follow the Menu/Itens/Admin component. I reset the 9 sub-items in each panel from 8/16/8/44 to 12/16/12/42 (45px tall). Code already used the component values.
- **Tabs (Bruno):** every tab row is 16px apart. The Header sets' navigation (24 in Page, 20 in Section) is now 16 in both sets. The Tabs component was already 16, and code (`MuiTabs` flexContainer gap) is 16.

## Mismatches recorded

**Figma**
- **Side navigation:** Search, Feed and Skills use custom glyphs, and Skills is a detached frame.
- **Top nav:**
  - Create is a 37px Outlined-2 button, which isn't a Button size.
  - Get App is an old Text button with the icon after the label, in Text-secondary.
  - The Streak flash is raw #FFA538.
  - Small log out is an old 34px outlined icon button.

**Prototype**
- **LeftSidebar:** Admin only, with no aria-current or aria-expanded.
- **navigation.md:** it says the profile name is Medium 14 (Figma uses SemiBold), and gives an open group a Page-background-hover fill (Figma has none).
- **Page headers:** headers.md lists many page-local headers; `PageHeader` is the shared one.
