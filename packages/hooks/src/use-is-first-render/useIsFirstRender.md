---
category: Lifecycle
---

# useIsFirstRender

Returns `true` only during the component's very first render and `false` on every subsequent render. Useful for skipping effects on mount.

## Usage

```tsx
import { useIsFirstRender } from '@ronekit/hooks';

function AutoSave({ data }: { data: unknown }) {
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (isFirst) return; // don't save on initial mount
    save(data);
  }, [data]);
}
```

Implemented with a ref so it never causes an extra re-render.

<!-- API:START -->
## API

```ts
function useIsFirstRender(): boolean
```

### Returns

`boolean`
<!-- API:END -->
