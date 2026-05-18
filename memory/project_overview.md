---
name: project-overview
description: Next.js 16 portfolio site architecture — single-page with terminal emulator, light/dark theme, GitHub contrib graph
metadata:
  type: project
---

**Tech stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS 3, react-icons 5. No external UI library. Monospace font (JetBrains Mono) site-wide.

**Architecture:** Single-page app in `src/app/page.tsx` — all sections (About, Experience, Projects, Skills, Activity, Education, Recognition) inline. Sticky header with nav, fixed footer with social links.

**Active components used by page.tsx:**
- `ThemeProvider` / `ThemeToggle` — custom CSS-variable-based dark/light/system theme, stored in localStorage
- `GitHubContributions` — embeds ghchart.rshah.org image; dark mode via CSS filter invert
- `Terminal` — full interactive terminal emulator (see below)

**Unused/legacy components** (exported in index.ts but NOT rendered in page.tsx): `About`, `Hero`, `Header`, `Footer`, `Projects`, `Skills`, `Contact` — these are leftover from an earlier scaffold and can be deleted.

**Terminal emulator (`src/components/terminal.tsx`):**
- Full-screen overlay toggled via header button or `?terminal=true` URL param; Escape closes it
- Virtual filesystem hardcoded as a nested JS object mirroring portfolio content (about/, experience/, projects/, skills/, education/, contact/, awards/)
- Supported commands: ls, cd, cat, nano, vim, vi, less, more, pwd, clear, tree, whoami, echo, mkdir (read-only msg), touch, rm, history, date, uname, hostname, man, sudo, grep, find, exit
- Tab completion for commands and file/directory names
- Multi-line paste queuing with 50ms delay between commands
- Ctrl+C, Ctrl+L keyboard shortcuts
- `FileViewer` sub-component for nano/vim/less modes with realistic headers/footers

**Theme system:** CSS variables (`--background`, `--foreground`, `--muted-foreground`, `--border`, `--accent`) toggled via `dark` class on `<html>`. Tailwind `darkMode: "class"`.

**Why:** This is Rupin's personal developer portfolio, currently being actively built/improved.
