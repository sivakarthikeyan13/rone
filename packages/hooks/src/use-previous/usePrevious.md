---
category: State
---

# usePrevious

Stores and returns the value from the previous render. On the very first render, returns `undefined`.

## Usage

```tsx
import { usePrevious } from '@ronekit/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const prev = usePrevious(count);

  return (
    <div>
      <p>Current: {count}, Previous: {prev ?? '—'}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

Implemented with a ref that is updated inside a `useEffect`, so the update is committed after render.

<!-- API:START -->
## API

```ts
function usePrevious<T>(value: T): T | undefined
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `value` | `T` | Yes |

### Returns

`T \| undefined`
<!-- API:END -->
