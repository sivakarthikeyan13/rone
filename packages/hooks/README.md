# @ronekit/hooks

[![npm](https://img.shields.io/npm/v/@ronekit/hooks)](https://www.npmjs.com/package/@ronekit/hooks)
[![license](https://img.shields.io/github/license/sivakarthikeyan13/rone)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A collection of well-typed, tree-shakable React hooks for everyday use — built for React 18 and 19.

## Installation

```sh
npm install @ronekit/hooks
# or
yarn add @ronekit/hooks
# or
pnpm add @ronekit/hooks
```

**Peer dependencies:** `react ^18.0.0 || ^19.0.0` and `react-dom ^18.0.0 || ^19.0.0`

## Available Hooks

- **useClickOutside** — Detect clicks outside an element
- **useClipboard** — Copy text to clipboard with timeout
- **useBrowserStorage** — Sync state with localStorage or sessionStorage
- **useDisclosure** — Manage open/closed state
- **useDocumentTitle** — Update document title
- **useDocumentVisibility** — Track document visibility
- **useEventListener** — Attach/remove event listeners
- **useFavicon** — Change page favicon dynamically
- **useFileDialog** — Open file picker dialog
- **useFullscreen** — Toggle fullscreen mode
- **useHover** — Detect hover state
- **useIdle** — Detect user idle state
- **useIsFirstRender** — Check if component is on first render
- **useMouse** — Track mouse position
- **useOrientation** — Detect device orientation
- **usePrevious** — Get previous value
- **useResizeObserver** — Observe element resize
- **useToggle** — Toggle boolean state
- **useUncontrolled** — Manage uncontrolled component state
- **useViewportSize** — Track viewport dimensions
- **useWindowEvent** — Listen to window events
- **useMergedRef** — Merge multiple refs
- **useMounted** — Check if component is mounted
- **useIsomorphicEffect** — SSR-safe useEffect

## Quick Start

```tsx
import { useDisclosure, useClipboard } from "@ronekit/hooks";

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  const { copy, copied } = useClipboard({ timeout: 2000 });

  return (
    <div>
      <button onClick={opened ? close : open}>{opened ? "Close" : "Open"}</button>
      <button onClick={() => copy("Hello, World!")}>{copied ? "Copied!" : "Copy"}</button>
    </div>
  );
}
```

## Documentation

For detailed documentation and examples, visit the [main repository](https://github.com/sivakarthikeyan13/rone).

## License

MIT © Sivakarthikeyan
