---
category: UI / DOM
---

# useClickOutside

Calls a callback whenever the user clicks or taps outside of a referenced element. Useful for closing dropdowns, modals, and popovers.

## Usage

```tsx
import { useClickOutside } from '@ronekit/hooks';

function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && <ul>…</ul>}
    </div>
  );
}
```

By default the hook listens for `mousedown` and `touchstart`. Pass `events` to customize, or pass `nodes` to exclude additional elements from triggering the callback.

<!-- API:START -->
## API

```ts
function useClickOutside<T extends HTMLElement>(callback: (event: EventType) => void, events?: string[] | null, nodes?: (HTMLElement | null)[]): React.RefObject<T | null>
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `callback` | `(event: EventType) => void` | Yes |
| `events` | `string[] \| null` | No |
| `nodes` | `(HTMLElement \| null)[]` | No |

### Returns

`React.RefObject<T \| null>`
<!-- API:END -->
