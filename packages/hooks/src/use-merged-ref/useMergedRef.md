---
category: UI / DOM
---

# useMergedRef

Merges multiple React refs (both callback refs and ref objects) into a single ref callback. Useful for attaching several refs to the same element — for example when forwarding a ref while also needing a local one.

## Usage

```tsx
import { useMergedRef } from '@ronekit/hooks';

const Input = React.forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  const localRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRef(localRef, forwardedRef);

  useEffect(() => {
    localRef.current?.focus();
  }, []);

  return <input ref={mergedRef} {...props} />;
});
```

<!-- API:START -->
## API

```ts
function useMergedRef<T>(refs?: PossibleRef<T>[]): RefCallback<T>
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `refs` | `PossibleRef<T>[]` | No |

### Returns

`RefCallback<T>`
<!-- API:END -->
