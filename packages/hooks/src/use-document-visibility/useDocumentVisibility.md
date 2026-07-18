---
category: Browser API
---

# useDocumentVisibility

Returns the current `document.visibilityState` and re-renders when the user switches tabs or minimizes the window.

## Usage

```tsx
import { useDocumentVisibility } from '@ronekit/hooks';

function VideoPlayer() {
  const visibility = useDocumentVisibility();

  useEffect(() => {
    if (visibility === 'hidden') pauseVideo();
  }, [visibility]);

  return <video />;
}
```

Built on `useSyncExternalStore`, so it is safe with React 18 concurrent rendering. Returns `'visible'` on the server.

<!-- API:START -->
## API

```ts
function useDocumentVisibility(): DocumentVisibilityState
```

### Returns

`DocumentVisibilityState`
<!-- API:END -->
