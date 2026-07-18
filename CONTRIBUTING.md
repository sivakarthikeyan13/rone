# Contributing to rone

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Table of contents

- [Setup](#setup)
- [Development workflow](#development-workflow)
- [Commit conventions](#commit-conventions)
- [Adding a hook](#adding-a-hook)
- [Documentation drift guard](#documentation-drift-guard)
- [Pull request checklist](#pull-request-checklist)

---

## Setup

**Prerequisites:** Node.js ≥ 20.9.0 and npm ≥ 10.

```sh
git clone https://github.com/sivakarthikeyan13/rone.git
cd rone
npm install
```

## Development workflow

| Command | Description |
|---------|-------------|
| `npm run build` | Build all packages |
| `npm run type-check` | TypeScript type check (no emit) |
| `npm run lint` | ESLint across all TypeScript files |
| `npm run docs` | Regenerate hook API blocks and README indexes |
| `npm run docs -- --check` | Verify docs are up-to-date (used in precommit) |

---

## Commit conventions

This repo enforces [Conventional Commits](https://www.conventionalcommits.org/) via **commitlint**. Your commit message must follow the format:

```
<type>(<scope>): <subject>
```

Common types:

| Type | When to use |
|------|-------------|
| `feat` | New hook or new option on an existing hook |
| `fix` | Bug fix |
| `docs` | Documentation-only changes |
| `refactor` | Code change that is neither a bug fix nor a new feature |
| `chore` | Build, tooling, or dependency changes |

Examples:

```
feat(hooks): add useLocalStorage hook
fix(hooks): reset useClipboard error state on copy
docs: update useIdle usage example
```

The precommit hook will reject commits that do not conform.

---

## Adding a hook

Follow these steps exactly. **Step 5 is required** — the precommit will fail if you skip it.

### 1 — Create the source file

Create `packages/hooks/src/use-<name>/<HookName>.ts`. The file must:

- Export a single named function (or constant) that starts with `use`.
- Include a **one-line JSDoc summary** and at least one `@example` on the exported hook.
- Use exported TypeScript types for options and return values — these feed the API docs.

```ts
export interface UseFooOptions {
  /** Description of this option */
  bar?: string;
}

/**
 * One-line summary of what the hook does.
 * @example
 * const result = useFoo({ bar: 'baz' });
 */
export function useFoo(options: UseFooOptions = {}) {
  // implementation
}
```

### 2 — Export from index

Add the export to `packages/hooks/src/index.ts`:

```ts
export { useFoo } from './use-foo/useFoo';
```

### 3 — Write the doc file

Create `packages/hooks/src/use-<name>/<HookName>.md` with this template:

```md
---
category: <State | UI / DOM | Browser API | Lifecycle | Sensors>
---

# useFoo

One-line description (can match or expand the JSDoc summary).

## Usage

\`\`\`tsx
import { useFoo } from '@ronekit/hooks';

function Example() {
  const result = useFoo({ bar: 'baz' });
  return <div>{result}</div>;
}
\`\`\`

Any additional narrative about edge cases, gotchas, or alternatives.

<!-- API:START -->
<!-- API:END -->
```

The `<!-- API:START -->` / `<!-- API:END -->` markers are **required** — the generator fills them in.

### 4 — Choose a category

| Category | Hooks that belong here |
|----------|------------------------|
| `State` | Values persisted or toggled in component state |
| `UI / DOM` | Refs, event listeners, DOM measurements |
| `Browser API` | Clipboard, storage, document, favicons, files |
| `Lifecycle` | Mount/unmount, render-phase detection, effects |
| `Sensors` | Device sensors, viewport, mouse, orientation |

### 5 — Regenerate docs

```sh
npm run docs
```

This injects the API signature block into your `.md` and adds your hook to the README indexes. **Commit the generated changes** — the precommit `--check` will fail if they're missing.

### 6 — Verify

```sh
npm run type-check
npm run lint
npm run docs -- --check   # should exit 0
```

---

## Documentation drift guard

`npm run docs -- --check` regenerates all docs in memory and exits non-zero if the committed files differ from the freshly generated output. It runs automatically in the precommit hook via lint-staged.

If your commit is rejected with a drift message, run `npm run docs`, stage the updated files, and commit again.

---

## Pull request checklist

Before opening a PR, verify:

- [ ] New hook follows the naming convention (`use<PascalCase>`)
- [ ] JSDoc summary and `@example` are present on the exported function/constant
- [ ] Hook is exported from `src/index.ts`
- [ ] Colocated `.md` doc file created with correct frontmatter `category`
- [ ] `npm run docs` has been run and the output is committed
- [ ] `npm run type-check` and `npm run lint` pass
- [ ] Commit message follows Conventional Commits
