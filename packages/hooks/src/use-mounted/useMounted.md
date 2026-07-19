---
category: State
---

# useMounted

Returns `false` on the first render and `true` once the component has mounted on the client. Useful for avoiding SSR hydration mismatches when rendering client-only content.

## Usage

```tsx
import { useMounted } from '@ronekit/hooks';

function ClientOnlyWidget() {
  const mounted = useMounted();

  if (!mounted) return null; // avoid SSR mismatch

  return <canvas id="chart" />;
}
```

<!-- API:START -->
## API

```ts
function useMounted(): boolean
```

### Returns

`boolean`
<!-- API:END -->
