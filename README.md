# rone

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

## Quick start

```tsx
import { useDisclosure, useClipboard } from '@ronekit/hooks';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  const { copy, copied } = useClipboard({ timeout: 2000 });

  return (
    <>
      <button onClick={open}>Open modal</button>
      <button onClick={() => copy('Hello!')}>
        {copied ? 'Copied!' : 'Copy text'}
      </button>
      {opened && <dialog open onClose={close}>…</dialog>}
    </>
  );
}
```

## Hooks

<!-- HOOKS:START -->
### State

| Hook | Description |
|------|-------------|
| [useBrowserStorage](packages/hooks/src/use-browser-storage/useBrowserStorage.md) | Persists and syncs a value in localStorage or sessionStorage with JSON serialization. |
| [useDisclosure](packages/hooks/src/use-disclosure/useDisclosure.md) | Manages open/closed state with open, close, and toggle handlers. |
| [useMounted](packages/hooks/src/use-mounted/useMounted.md) | Returns true once the component has mounted on the client. |
| [usePrevious](packages/hooks/src/use-previous/usePrevious.md) | Stores and returns the previous render's value of a state or prop. |
| [useToggle](packages/hooks/src/use-toggle/useToggle.md) | Cycles between a set of values on each call; defaults to toggling between true and false. |
| [useUncontrolled](packages/hooks/src/use-uncontrolled/useUncontrolled.md) | Manages a value that can operate as either controlled or uncontrolled, bridging both patterns. |

### UI / DOM

| Hook | Description |
|------|-------------|
| [useClickOutside](packages/hooks/src/use-click-outside/useClickOutside.md) | Triggers a callback when a click or touch event occurs outside the referenced element. |
| [useEventListener](packages/hooks/src/use-event-listener/useEventListener.md) | Attaches a typed event listener to a DOM element via a ref callback. |
| [useFullscreen](packages/hooks/src/use-fullscreen/useFullscreen.md) | Enters and exits fullscreen mode for a target element or the document. |
| [useHover](packages/hooks/src/use-hover/useHover.md) | Tracks whether an element is currently hovered via a ref callback. |
| [useMergedRef](packages/hooks/src/use-merged-ref/useMergedRef.md) | Merges multiple React refs (callback refs or ref objects) into a single ref callback. |
| [useResizeObserver](packages/hooks/src/use-resize-observer/useResizeObserver.md) | Observes an element's border-box size changes via the ResizeObserver API. |
| [useWindowEvent](packages/hooks/src/use-window-event/useWindowEvent.md) | Attaches a typed event listener to the window object. |

### Browser API

| Hook | Description |
|------|-------------|
| [useClipboard](packages/hooks/src/use-clipboard/useClipboard.md) | Copies a value to the clipboard with a timed reset of the copied state. |
| [useDocumentTitle](packages/hooks/src/use-document-title/useDocumentTitle.md) | Synchronizes the browser tab title with the provided string. |
| [useDocumentVisibility](packages/hooks/src/use-document-visibility/useDocumentVisibility.md) | Returns the current document visibility state and updates when it changes. |
| [useFavicon](packages/hooks/src/use-favicon/useFavicon.md) | Dynamically sets the page favicon to the provided URL. |
| [useFileDialog](packages/hooks/src/use-file-dialog/useFileDialog.md) | Opens a native file picker dialog and returns the selected files. |

### Lifecycle

| Hook | Description |
|------|-------------|
| [useDebouncedCallback](packages/hooks/src/use-debounced-callback/useDebouncedCallback.md) | Returns a debounced version of the provided callback that delays invoking it until after the wait. |
| [useIsFirstRender](packages/hooks/src/use-is-first-render/useIsFirstRender.md) | Returns true only during the component's first render. |
| [useIsomorphicEffect](packages/hooks/src/use-isomorphic-effect/useIsomorphicEffect.md) | Runs useLayoutEffect in the browser and useEffect on the server, preventing SSR warnings. |

### Sensors

| Hook | Description |
|------|-------------|
| [useIdle](packages/hooks/src/use-idle/useIdle.md) | Detects user inactivity after the specified timeout in milliseconds. |
| [useMouse](packages/hooks/src/use-mouse/useMouse.md) | Tracks the mouse cursor position relative to a target element or the viewport. |
| [useOrientation](packages/hooks/src/use-orientation/useOrientation.md) | Returns the current screen orientation angle and type, updating on orientation change. |
| [useViewportSize](packages/hooks/src/use-viewport-size/useViewportSize.md) | Returns the current viewport width and height, updating on resize and orientation change. |

<!-- HOOKS:END -->

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, commit conventions, and the guide for adding a new hook.

## License

[MIT](LICENSE) © Sivakarthikeyan
