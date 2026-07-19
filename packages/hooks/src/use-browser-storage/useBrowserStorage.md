---
category: State
---

# useBrowserStorage

Persists a value in `localStorage` or `sessionStorage` with automatic JSON serialization, and keeps it in sync across browser tabs.

## Usage

```tsx
import { useBrowserStorage } from '@ronekit/hooks';

function App() {
  const [token, setToken, removeToken] = useBrowserStorage({
    key: 'auth-token',
    defaultValue: '',
  });

  return (
    <>
      <p>Token: {token}</p>
      <button onClick={() => setToken('abc123')}>Set token</button>
      <button onClick={removeToken}>Clear token</button>
    </>
  );
}
```

Use `type: 'sessionStorage'` to scope the value to a single tab, or pass an array to read from multiple stores in order.

<!-- API:START -->
## API

```ts
function useBrowserStorage<T>({
  type = "localStorage",
  key,
  defaultValue,
  sync = true,
  deserialize = deserializeJSON,
  serialize = serializeJSON
}: BrowserStorageOptions<T>): [T, (val: T | ((prevState?: T | undefined) => T)) => void, () => void]
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `{
  type = "localStorage",
  key,
  defaultValue,
  sync = true,
  deserialize = deserializeJSON,
  serialize = serializeJSON
}` | `BrowserStorageOptions<T>` | Yes |

### Returns

`[T, (val: T \| ((prevState?: T \| undefined) => T)) => void, () => void]`
<!-- API:END -->
