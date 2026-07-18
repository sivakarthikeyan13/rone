---
category: UI / DOM
---

# useFullscreen

Manages fullscreen mode for a target element (or the whole document when no element is referenced). Returns a ref callback, a `toggle` function, and the current fullscreen state.

## Usage

```tsx
import { useFullscreen } from '@ronekit/hooks';

function VideoPlayer() {
  const { ref, toggle, fullscreen } = useFullscreen<HTMLVideoElement>();

  return (
    <>
      <video ref={ref} src="/movie.mp4" />
      <button onClick={toggle}>
        {fullscreen ? 'Exit fullscreen' : 'Go fullscreen'}
      </button>
    </>
  );
}
```

`fullscreen` is `true` only when the specific element referenced by `ref` is the fullscreen element.

<!-- API:START -->
## API

```ts
function useFullscreen<T extends HTMLElement = HTMLElement>(): { readonly ref: (node: T | null) => void; readonly toggle: () => Promise<void>; readonly fullscreen: boolean; }
```

### Returns

`{ readonly ref: (node: T \| null) => void; readonly toggle: () => Promise<void>; readonly fullscreen: boolean; }`
<!-- API:END -->
