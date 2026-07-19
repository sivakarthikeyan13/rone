---
category: UI / DOM
---

# useResizeObserver

Observes an element's border-box size changes using the `ResizeObserver` API. Returns a `[ref, rect]` tuple where `rect` always reflects the latest dimensions.

## Usage

```tsx
import { useResizeObserver } from '@ronekit/hooks';

function ResponsiveBox() {
  const [ref, rect] = useResizeObserver<HTMLDivElement>();

  return (
    <div ref={ref} style={{ resize: 'both', overflow: 'auto', padding: 8 }}>
      {rect.width.toFixed(0)} × {rect.height.toFixed(0)}
    </div>
  );
}
```

Updates are debounced with `requestAnimationFrame` to avoid layout thrashing.

<!-- API:START -->
## API

```ts
function useResizeObserver<T extends HTMLElement = any>(options?: ResizeObserverOptions): UseResizeObserverReturnValue<T>
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `options` | `ResizeObserverOptions` | No |

### Returns

`UseResizeObserverReturnValue<T>`

**`UseResizeObserverReturnValue`** — `[
  React.RefCallback<T \| null>,
  ObserverRect
]`
<!-- API:END -->
