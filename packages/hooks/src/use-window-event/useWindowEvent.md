---
category: UI / DOM
---

# useWindowEvent

Attaches a strongly-typed event listener to the `window` object. The listener is added once and automatically removed when the component unmounts.

## Usage

```tsx
import { useWindowEvent } from '@ronekit/hooks';

function KeyboardShortcuts() {
  useWindowEvent('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  return null;
}
```

The event type is inferred from the `type` string, so `e` is fully typed from `WindowEventMap`. Pass a third `options` argument (e.g. `{ passive: true }`) to customize `addEventListener`.

<!-- API:START -->
## API

```ts
function useWindowEvent<K extends string>(type: K, listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void, options?: boolean | AddEventListenerOptions): void
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `type` | `K` | Yes |
| `listener` | `K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void` | Yes |
| `options` | `boolean \| AddEventListenerOptions` | No |

### Returns

`void`
<!-- API:END -->
