---
category: Lifecycle
---

# useIsomorphicEffect

A drop-in replacement for `useLayoutEffect` that falls back to `useEffect` in SSR environments. Prevents the React SSR warning without changing behavior in the browser.

## Usage

```tsx
import { useIsomorphicEffect } from '@ronekit/hooks';

function Tooltip({ anchor }: { anchor: HTMLElement | null }) {
  useIsomorphicEffect(() => {
    // runs synchronously after DOM paint in the browser
    // runs as a normal effect in Node/SSR
    positionTooltip(anchor);
  }, [anchor]);
}
```

This is a re-exported value, not a function — it equals `useLayoutEffect` in browser environments and `useEffect` on the server.

<!-- API:START -->
## API

```ts
const useIsomorphicEffect: typeof React.useEffect
```

### Returns

`typeof React.useEffect`
<!-- API:END -->
