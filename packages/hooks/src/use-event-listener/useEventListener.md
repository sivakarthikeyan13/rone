---
category: UI / DOM
---

# useEventListener

Attaches a strongly-typed event listener to a DOM element via a ref callback. The listener is automatically removed when the component unmounts or the element changes.

## Usage

```tsx
import { useEventListener } from '@ronekit/hooks';

function ClickTracker() {
  const ref = useEventListener('click', (e) => {
    console.log('clicked at', e.clientX, e.clientY);
  });

  return <button ref={ref}>Track clicks</button>;
}
```

The event type is inferred from the `type` argument, so `e` is fully typed. Pass `options` (e.g. `{ once: true }`) to customize `addEventListener`.

<!-- API:START -->
## API

```ts
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement>(type: K, listener: (this: T, ev: HTMLElementEventMap[K]) => void, options?: AddEventListenerOptions): React.RefCallback<T | null>
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `type` | `K` | Yes |
| `listener` | `(this: T, ev: HTMLElementEventMap[K]) => void` | Yes |
| `options` | `AddEventListenerOptions` | No |

### Returns

`React.RefCallback<T \| null>`
<!-- API:END -->
