# Design OS - build plan

Sep 28, 2026 · @Divjot Singh

## What we are building

Design OS is one local web app on Bruno's Mac with six modules. Each module sits on a tool he already uses, so the app is a front door to existing work, not a rebuild.

&#91;embedded content: Design OS architecture · 6 modules, 4 foundations\]

The Components module (highlighted) comes first because it is the one other people will use: devs in Porto, PMs and QA.

Key decisions:

- **Web app, not an Obsidian plugin.** The shell needs a live component library, a prototype playground and a terminal side by side. A web app handles that more easily. Obsidian stays as the vault behind the Brain module and remains usable on its own.
- **No access to production code.** Design OS rebuilds what it needs on the same stack as engineering (taken from their package.json): MUI 5 with a 5Mins theme, and replicas of the admin, web app and native app layouts.
- **Design OS holds the component source of truth.** Reference components are built on MUI 5 and themed with the 5Mins tokens. A component inventory shows what exists in Figma and in code, so engineering can compare with what they use.
- **Prototypes live in a shared playground.** A gallery of demos built on the replicas, each with versions, a handoff document and comments on the live prototype.
- **Two-way with Figma.** Figma frames become code with the figma-to-code skill, and any demo goes back to Figma 1:1 as editable frames with flow descriptions. Code Connect isn't active, so a component map in Design OS links code components to the Figma library.
- **Components and playground are shareable.** Both are deployed as a private site, so engineering and product can open them without Bruno's machine.
- **Everything is files in Git.** Components, demos, skills and vault notes live in repos. Skills stay in design-os and are shared with engineering as a plugin.
- **"Engines" means agents and automations.** Background jobs that run Claude headless, on a schedule or from a button. Correct this if you meant something else.

## How to work with Claude Code

Build one phase per session, start each in plan mode, and commit when the phase works. Most failed "build me an OS" attempts come from asking for everything in one prompt.

The loop for every phase:

1. Open Claude Code in the `design-os` repo and press Shift+Tab until plan mode is on.
2. Paste the phase prompt from this doc. Read the plan it returns, push back, then approve it.
3. Let it build. Run the thing yourself and describe what is wrong in plain words, with a screenshot if it is visual.
4. When the phase works, ask it to update `CLAUDE.md` with what was built and any decisions, then commit.
5. Start a fresh session for the next phase. `CLAUDE.md` carries the context forward.

Habits that save time:

- **Keep `CLAUDE.md` short and true.** It is the map Claude reads first: folder structure, commands, conventions, and "never do" rules.
- **Point at real sources.** Give Figma links, the existing design system skill files and the prototype repo path, not descriptions of them.
- **Ask for the smallest version first.** One component end to end, before all 20.
- **Screenshot loops.** For UI work, ask Claude to open the page with Playwright, screenshot it and compare it to the Figma frame before telling you it is done.

## Phase 0: foundations (half a day)

Goal: an empty monorepo with the right folders, a `CLAUDE.md`, and a config file that points at the prototype repo and the vault.

Before you start:

- Have Bruno's prototype repo ready. It becomes the base of the playground in Phase 4.
- Make sure Figma, Mobbin, Granola, Atlassian and GitHub are connected to Claude Code (`claude mcp list`).

We don't have access to production code. The package.json engineering shared tells us their stack, so Design OS matches it:

| Area | What engineering uses | What it means for Design OS |
| --- | --- | --- |
| Monorepo | Nx 23 with pnpm 10 | design-os stays a plain pnpm workspace; Nx isn't needed for a personal tool |
| Web front end | React 19.2, TypeScript 6, Vite 7, React Router 6 | Shell, admin replica and web app replica use the same versions |
| Components | MUI 5.18 (plus MUI X data grid and date pickers) with Emotion | Reference components are built on MUI 5 and a 5Mins MUI theme |
| Icons | Iconsax (`iconsax-reactjs`, `iconsax-react-native`) | Matches the iconography skill |
| Native app | Expo 55, React Native 0.83 | The native app replica uses the same versions |
| Testing | Vitest 4, Jest, Playwright | Screenshot checks and thumbnails use Playwright |
| Claude skills | `.agents/skills`, linked to `.claude/skills` | Design OS links them the same way; skills for engineering are shared as a plugin |

Prompt:

```
I'm Bruno, product designer at 5Mins.ai. I want to build "Design OS", a local web app
that is my home base for design work. It will have six modules: Home, Components,
Prototypes, Skills, Engines (background agents) and Brain (Obsidian vault).
We will build it in phases. This session is phase 0 only: set up the foundations.

We don't have access to production code. Match engineering's stack from the
package.json I'm pasting: React 19.2, TypeScript 6, Vite 7, MUI 5.18 with Emotion,
Vitest 4, Playwright, pnpm 10. Don't use Nx.

Please plan and then create:
1. A pnpm workspace called design-os with:
   - apps/shell: Vite + React + TypeScript front end (empty page for now)
   - apps/server: small Node server (Fastify) for things the browser can't do
     (terminal, file access, running Claude headless)
   - packages/components: 5Mins reference components built on MUI 5 (empty for now)
   - playground/: where replicas and demos will live. Bring in my prototype repo
     at [PATH] here, keeping its Git history.
   - skills/: my Claude skills, one folder per skill
   - engines/: background job definitions
2. A design-os.config.json with the path to my Obsidian vault ([PATH]).
3. Skills in .claude/skills, with .agents/skills linked to the same folder, so every
   agent reads the same skills.
4. A CLAUDE.md describing the structure and commands, with these rules:
   - British English, sentence case in UI copy, no em dashes
   - spacing in multiples of 2px or 4px, 5Mins design tokens only
   - talk to me in Figma terms: auto layout not flexbox, hug and fill not
     fit-content, frames not divs, constraints not positioning
   - keep a calm tone and explain what you're doing as you go; don't over-engineer
5. One command, pnpm dev, that starts shell and server together.

Ask me anything you need before building. Don't build any modules yet.
```

## Phase 1: component library and comparison (2 to 3 weeks)

Goal: a component library inside Design OS that is the design source of truth. Every component is live and interactive, shows its code, and has documentation covering intent, do's and don'ts. Engineering can compare each one with the MUI component they already use.

The reference components are built on MUI 5, themed with the 5Mins tokens from Figma, and live in `packages/components`. Because they use the same library as production, any difference is a real design or code difference, not a tooling one. Each component page has four tabs:

- **Preview:** the live component, with controls for variant, size and state; hover, click and focus work for real.
- **Code:** the reference code, ready to copy, including the theme overrides it relies on.
- **Guidelines:** intent, when to use and not use, anatomy, do's and don'ts with live examples, content rules, accessibility and the Figma link.
- **Compare:** the Figma frame next to the reference, a list of differences, and the component's status in the inventory (in Figma, in code, or both).

**Step 1a: theme and one reference component**

```
Phase 1a. Read CLAUDE.md first.

1. Use the Figma MCP (get_variable_defs on file EC26cSVe9KNTCWXvYovakw) to pull the
   5Mins tokens: colours, typography (Poppins), spacing, radius, shadows. Turn them
   into an MUI 5 theme (palette, typography, spacing, component overrides) in
   packages/components/theme.
2. Build Button in packages/components on top of MUI Button, using the button skill
   file at [PATH] as the spec. Cover every variant, semantic type, size and state
   (enabled, hover, pressed, focus, disabled, loading).
3. Build its page in the Components module with four tabs: Preview (live, with
   controls), Code, Guidelines and Compare (leave Compare empty for now).
4. Guidelines template, reused for every component: Overview and intent / When to use
   / When not to use / Anatomy / Variants / States and interactions / Do's and don'ts
   (paired live examples) / Content guidelines / Accessibility / Figma link.
5. Screenshot the Preview with Playwright, compare it with the Figma frame, and list
   any differences before you tell me it's done.
```

**Step 1b: the Compare view**

There is no production code to read, so comparison has two parts. The component inventory shows which Figma components exist in Design OS code and which don't. The Compare tab puts each component's Figma frame next to the reference, and engineering checks the reference code against the components they already use.

```
Phase 1b.

1. Build the component-inventory skill. It uses the Figma MCP to list every component
   in file EC26cSVe9KNTCWXvYovakw, with variants, and checks packages/components for
   each one. Output: component, in Figma, in code, variants missing on either side.
2. Show the inventory as an overview page in the Components module, with filters for
   "Figma only", "code only" and "both".
3. Fill Button's Compare tab: the Figma frame (get_screenshot) next to the live
   reference, and a table of differences (property, Figma value, reference value)
   with a status for each: matches, design to update, code to update.
4. Add a "Notes for engineering" box showing which MUI component and props the
   reference uses, so devs can check it against their own.
```

Then roll out in batches of three or four, most used first:

```
Phase 1, next batch. Button is the reference for quality and structure. Using the same
theme, page template and Compare process, do: [Chip, Tabs, Dialog]. Stop after this
batch and show me the Preview and Compare tabs for each.
```

**Step 1c: share with engineering**

```
Phase 1c. Engineering needs to open the Components module without my machine. Build
it as a separate static site from the same code and deploy it to [Vercel / Netlify /
GitHub Pages], restricted so only 5Mins can see it. Redeploy on every push to main.
Add the link to the design-os README.
```

Done when: the inventory lists every Figma component with its code status, and a Porto developer can open Button from the shared link, read the reference code and tell us how it differs from theirs.

## Phase 2: Obsidian brain and Granola sync (3 to 4 days)

Goal: a vault with a clear structure, meetings flowing in from Granola automatically, and a decision log per feature. As the video says, the structure is what matters, not Obsidian itself.

Suggested vault structure (adapted from raw, wiki and outputs):

| Folder | What goes in | Who writes it |
| --- | --- | --- |
| `00 inbox` | Links, screenshots, quick thoughts to sort later | Bruno |
| `10 meetings` | One note per Granola meeting: summary, decisions, actions | Granola sync engine |
| `20 features` | One folder per feature (Admin Roles, Assessments...) with a `decisions.md` log | Claude, from meetings and Bruno |
| `30 research` | Mobbin references, competitor patterns, user feedback | Bruno and Claude |
| `40 design system` | Notes on component decisions and gaps, linked to the Components module | Bruno |
| `50 outputs` | Briefs, audits, handoff packs, digests | Skills and engines |

Obsidian plugins worth installing: Dataview (live lists such as "open decisions"), Templater (note templates) and Obsidian Git (sync and history).

Prompt:

```
Phase 2. Read CLAUDE.md first. My Obsidian vault is at [PATH].

1. Create the folder structure from the table I'm pasting below, and a vault CLAUDE.md
   that explains where each kind of note goes, the naming rules, and the frontmatter
   each note type needs (date, feature, attendees, status).
2. Build a skill called granola-sync. It uses the Granola MCP to fetch meetings since
   the last sync and writes one note per meeting to "10 meetings" with: summary,
   decisions (with the reasoning), open questions, and actions. It links each note to
   the right feature folder.
3. Build a skill called decision-log. For a given feature, it reads the linked
   meeting notes and adds new decisions to that feature's decisions.md: what was
   decided, why, options rejected, date, and the source meeting.
4. Run granola-sync on the last 4 weeks of meetings as a test. Show me 3 notes
   and one decisions.md before we go further.
```

**Learnings: the unwritten rules**

Each time Bruno pushes work, a script reads that session's chat and pulls out rules that aren't written down anywhere. For example, which button variant to use in a table row, or that drawers always open from the right. They go into a shared `learnings.md` in the repo, grouped by topic, and every agent reads it. Rules that keep coming up get promoted into a proper skill.

```
Phase 2, learnings. Build a skill called learnings. When I push work, it reads the
chat transcript from that session and finds rules I stated or corrected that aren't
already in CLAUDE.md, the skills or learnings.md. For each one: the rule, a short
example, the date and a topic (components, layout, copy, data, platform). Append them
to learnings.md at the repo root, grouped by topic, and show me what was added.
Update CLAUDE.md so every agent reads learnings.md before building UI.
```

Done when: after a design review, the decision appears in the right `decisions.md` without Bruno writing it.

Built (2026-09-30):
- **Granola account:** the sync reads Bruno's own Granola through a project MCP server (`granola`, https://mcp.granola.ai/mcp, in `.mcp.json`). The claude.ai Granola connector is signed in as Divjot, so the skill refuses any other account.
- **Feature matching:** folders need a paid Granola plan, so features are matched from meeting content against `20 features/_index.md`. New features are proposed to Bruno first.
- **Learnings:** Bruno runs `/learnings` after pushing. A headless run on `git push` belongs to Phase 6.

## Phase 3: the shell and dashboard UI (1 week)

Goal: the app frame with a sidebar for the six modules and a Home dashboard, built with Bruno's own components from Phase 1. That makes the OS a live test of the design system.

A pattern that keeps it simple: **the dashboard only reads files.** Skills and engines write their results (digests, ticket lists, audits) as markdown or JSON into the vault's `50 outputs` folder. Home just displays them. No API integrations are needed in the UI, and every card has a matching file Bruno can open in Obsidian.

Home cards to start with:

- My DES tickets, grouped by status
- Today's meetings and the last 3 synced notes
- Open decisions and questions across features
- Latest weekly digest
- Quick-run buttons for favourite skills (wired up in Phase 6)

Prompt:

```
Phase 3. Read CLAUDE.md first.

1. Build the app shell in apps/shell using MUI 5 and the theme from packages/components, with the
   5Mins tokens. Dark admin theme (#14161E background). Left sidebar with: Home,
   Components, Prototypes, Skills, Engines, Brain. Each non-Home page is a placeholder
   for now, except Components, which shows the component library from Phase 1.
2. Build Home as a grid of cards. Each card reads a file from the vault's
   "50 outputs/dashboard" folder through apps/server. Create sample files so I can see
   it working: des-tickets.json, meetings.json, open-decisions.md, weekly-digest.md.
3. If a component the shell needs doesn't exist in packages/components yet, stop and tell me.
   Don't invent one-off styles.
4. Screenshot Home with Playwright and show me.
```

Done when: `pnpm dev` opens the shell, Components shows the library, and Home shows the sample cards.

## Phase 4: prototype playground (2 to 3 weeks)

Goal: a shared playground where every demo is built on a replica of a 5Mins app, sits in a gallery, has versions and a handoff document, and takes comments directly on the live prototype.

Without production code, the base is a replica: a lightweight rebuild of each surface's layout on the same stack as engineering. Bruno's prototype repo already has the admin chrome, so admin comes first. The Claude Code terminal stays: the Prototypes page shows it on one side and the live demo on the other.

| Platform | What the replica covers | Built with |
| --- | --- | --- |
| Admin | Header, sidebar, page title row, tabs, tables, drawers, modals | MUI 5, React 19 |
| Web app | Learner web layout, course player, library | MUI 5, React 19 |
| Native app | App shell, tab bar, course screens | Expo 55, React Native 0.83 |

Native demos run in the browser through Expo's web support, and on a phone through Expo Go.

**Step 4a: replicas and mock data**

```
Phase 4a. Read CLAUDE.md first. Work in playground/.

1. Turn my prototype repo's admin chrome into a reusable admin replica: header,
   sidebar, page title row, tabs, tables, drawers and modals, all built from
   packages/components and the 5Mins MUI theme.
2. Set up the same structure for a web app replica and a native app replica
   (Expo 55, React Native 0.83), with just the app shell for now.
3. Build a skill called mock-data. It generates realistic data at admin scale:
   500 employees across departments, roles and managers; courses with long names;
   completed, overdue, failed and retaking states; and empty states. It can also
   read an anonymised CSV export and shape it the same way.
4. Show me the admin replica with a table of 500 employees, and an empty state.
```

**Step 4b: the demo gallery and handoff**

```
Phase 4b.

1. Each demo is a folder in playground/demos with a demo.json: name, feature,
   platform (Admin, Web app, Native app), author, versions and a handoff file.
2. Build the gallery page: a grid of demo cards with thumbnails generated
   automatically by Playwright on each save, and filters for feature and platform.
3. Add a version dropdown to each demo. Saving a version snapshots the demo.
4. Add "Duplicate": it copies a demo into a new folder so I can rework it, like
   duplicating a Figma file.
5. Show the handoff document in a side panel next to the running demo.
```

**Step 4c: comments on the live prototype**

Use Agentation, or a similar annotation layer, to click any element in a demo and leave a Figma-style comment. A watch-mode agent running on a fast, cheap model picks up each comment and makes the change while you watch.

```
Phase 4c.

1. Add an annotation layer to every demo: click an element, leave a comment, see a
   pin. Save each comment with the element's selector and the demo version.
2. Build a watch-mode engine: when it's on, it picks up new comments, makes the
   change in the demo, and marks the comment as done. Use a fast, cheap model (Haiku).
3. Add a toggle on the Prototypes page to turn watch mode on and off, and show which
   comments are pending, in progress or done.
```

**Step 4d: terminal and sharing**

```
Phase 4d.

1. On the Prototypes page, add a split view: a Claude Code terminal (node-pty and
   xterm.js, listening on 127.0.0.1 only) on the left, the selected demo on the right.
2. Deploy the gallery and demos as a private site together with the Components
   library, so only 5Mins can open them. Redeploy on every push.
```

**Step 4e: send demos to Figma 1:1, with flow descriptions**

Any demo can be pushed back into Figma as editable frames, laid out as flows with a description of each flow and screen. Code Connect isn't active, so Design OS keeps its own component map instead: a file that links each code component and its props to the matching Figma library component and variant. The agent reads the map and places real library instances, so the result stays 1:1 without Code Connect.

```
Phase 4e. Code Connect is not available; don't use it.

1. Extend the component-inventory skill to write packages/components/figma-map.json.
   For each component in packages/components: the Figma component key from file
   EC26cSVe9KNTCWXvYovakw, and how each code prop maps to a Figma variant property
   (for example variant="outlined" -> Type=Outlined, size="small" -> Size=S).
   List components with no Figma match. Re-run it whenever the library changes.
2. Build a skill called code-to-figma. For a given demo it:
   - reads demo.json and the handoff file to get the flows and their steps
   - runs each flow with Playwright and captures every screen and state, with the
     component tree and props for each screen
   - rebuilds each screen in Figma as frames with auto layout (use_figma), placing
     library instances from figma-map.json with the matching variant properties;
     where a component has no match, it builds plain frames and flags them
   - uses the 5Mins Figma variables and text styles for colour, spacing and type,
     never raw values
   - lays each flow out left to right in its own section, with arrows between steps
   - adds a description above each flow (goal, user, entry point, success state) and
     a short note under each screen (what happens, what triggers the next step)
3. Put everything on a new page named after the demo and version, in the file I give
   you. Never edit existing pages.
4. Test it on one admin demo, then compare the Figma frames with the running demo
   using get_screenshot and list anything that doesn't match 1:1.
```

Done when: Bruno builds an admin demo with mock data, a PM leaves three comments that watch mode applies, and a developer opens the demo and its handoff document from the shared link.

## Phase 5: skills and plugins manager (3 to 4 days)

Goal: one place to see, edit, test and version every skill, and to package a set as a plugin the team can install.

Skills live in `design-os/skills` and are symlinked into `~/.claude/skills`, so Claude Code keeps finding them and every edit is tracked in Git.

Every agent reads the same skills, because `.agents/skills` is linked to `.claude/skills`. Engineering can't see the design-os repo, so skills that are useful to them are shared as a Claude plugin they install.

**Step 5a: find out which skills to build.** Run this in a normal Claude Code session first. The results fill the manager with skills that matter.

```
Look at how I've used Claude over the last 30 days, and at my Granola meetings from
the last 6 weeks. Group the design tasks I do repeatedly and rank them by how often
they come up. For each, suggest a skill: its name, what I give it, what it gives
back, and which tools it needs (Figma, Jira, Granola, Mobbin). Mark which ones
should also run automatically as an engine.
```

Core skills to build, whatever the discovery prompt finds:

| Skill | What it does |
| --- | --- |
| onboarding | Checks the machine, installs the tools, connects Figma, creates a personal config, and starts a server that restarts itself |
| component-inventory | Lists which Figma components exist in code and which don't; feeds the Compare tab (built in Phase 1b) |
| figma-to-code | Builds from a Figma frame using 5Mins conventions on top of the Figma MCP, then checks its own screenshots against the frame |
| code-to-figma | Sends a demo back to Figma 1:1 as editable frames, laid out as flows with a description of each flow and screen (built in Phase 4e) |
| mobbin-research | Knows 5Mins is B2B compliance learning; looks at HR, LMS and SaaS admin apps first, and at other industries when asked for fresh ideas |
| motion | Timing and easing guidance, with sliders on the demo to tune them |
| handoff-doc | A short page per demo that devs can give to their own coding agents |
| mock-data | Realistic data at admin scale (built in Phase 4a) |
| learnings | Pulls unwritten rules from chats after each push (built in Phase 2) |

**Step 5b: build the manager.**

```
Phase 5. Read CLAUDE.md first.

1. Move my existing skills from ~/.claude/skills into design-os/skills and replace
   them with symlinks. List what you moved.
2. Build the Skills page: a list of skills (name, description, last edited, last run)
   with search. Clicking one opens its SKILL.md in a Monaco editor, with its supporting
   files in a side tree.
3. Save writes the file and makes a Git commit with a message I can edit. Add a
   History tab showing past versions with a diff.
4. Add "Test run": I type a sample input, the server runs claude -p with that skill,
   and the output streams into a panel.
5. Add "Package as plugin": select several skills and export them as a Claude plugin
   folder that Divjot or the Porto team can install.
```

Done when: Bruno edits a skill in the OS, test-runs it, and the change is live in Claude Code straight away.

## Phase 6: engines, agents and automations (1 week)

Goal: skills that run by themselves, on a schedule or from a button, and write their results into the vault, where Home picks them up.

An engine is a small file in `engines/`: a name, a trigger (a schedule or manual), the skill it runs, the model, and where the output goes. The server runs it with `claude -p` (headless Claude Code). Schedules use macOS launchd, so they run even when the OS app is closed.

Carried over from Phase 2: a `learnings` engine triggered by `git push` (a pre-push hook that runs the skill headless), and a daily `granola-sync` engine followed by `decision-log all`.

Starter engines:

| Engine | Trigger | What it produces |
| --- | --- | --- |
| Granola sync + decision log | Weekdays, 18:00 | Meeting notes and updated `decisions.md` files |
| Learnings | After each push | New rules added to `learnings.md` |
| Watch mode | While switched on | Comments on live demos applied automatically |
| DES board digest | Monday, 08:30 | `des-tickets.json` for Home: new, blocked, waiting on Bruno |
| Weekly design digest | Friday, 16:00 | Decisions made, open feedback, tickets affected; shareable with Divjot |
| Design system drift check | 1st of the month | Components where Figma and Design OS code differ, plus a refreshed figma-map.json |
| Handoff check | Manual, per ticket | Unresolved questions from meetings before a DES ticket goes to dev |

Model routing, from the video, in a simple form: quick lookups run on a small, cheap model (Haiku), and real work runs on the full model. There is no need for a separate classifier at this scale.

Prompt:

```
Phase 6. Read CLAUDE.md first.

1. Define an engine file format (YAML) in engines/: name, trigger (cron or manual),
   skill, model, output path, and whether a failure should notify me.
2. In apps/server, add an engine runner: it runs claude -p with the skill, saves the
   output to the vault, and logs each run (start, end, status, cost if available).
3. Install scheduled engines as macOS launchd jobs, with commands to install and
   remove them.
4. Build the Engines page: every engine with its next run, last run status and
   log, plus Run now and Pause buttons.
5. Create the five starter engines from the table I'm pasting below. Run each once
   manually and show me the outputs.
6. Wire Home's quick-run buttons to the manual engines.
```

Done when: on Monday morning, Home already shows the DES digest without Bruno doing anything.

## Open questions and first steps

Phases 0 to 2 give the most value for the effort. If time runs short, the component docs and the brain alone are worth having; the shell can come later.

Open questions:

- Who can provide an anonymised CSV export from a real customer account for mock data?
- Which web app and native app screens matter most to replicate first?
- Is Agentation a good fit for our setup, or should we build a simple annotation layer ourselves?
- Where should the shared Components and playground site be hosted, and how should access be restricted?
- Should the vault stay personal, or be shared with Divjot so decisions are visible to product too?

This week:

- [ ] Ask customer success for an anonymised CSV export from a real account
- [ ] Check that Figma, Mobbin, Granola, Atlassian and GitHub are connected in Claude Code
- [ ] Run the skill discovery prompt from Phase 5a and keep the list
- [ ] Run Phase 0
- [ ] Start Phase 1a with Button
