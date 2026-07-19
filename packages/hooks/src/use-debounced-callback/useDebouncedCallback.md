---
category: Lifecycle
---

# useDebouncedCallback

Returns a debounced wrapper around the provided callback. The wrapped function delays invoking the original until after the specified `delay` in milliseconds has elapsed since the last call.

## Usage

```tsx
import { useDebouncedCallback } from '@ronekit/hooks';

function SearchInput() {
  const [results, setResults] = useState([]);

  const search = useDebouncedCallback((query: string) => {
    fetchResults(query).then(setResults);
  }, 300);

  return <input onChange={(e) => search(e.target.value)} />;
}
```

Internally the callback reference is kept stable via a ref, so you do not need to include it in the deps array.

<!-- API:START -->
## API

```ts
function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number, deps?: React.DependencyList): T
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `callback` | `T` | Yes |
| `delay` | `number` | Yes |
| `deps` | `React.DependencyList` | No |

### Returns

`T`
<!-- API:END -->
