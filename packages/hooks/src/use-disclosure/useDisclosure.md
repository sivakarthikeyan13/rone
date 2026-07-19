---
category: State
---

# useDisclosure

Manages a boolean open/closed state with stable `open`, `close`, and `toggle` handlers. Ideal for controlling modals, drawers, and accordions.

## Usage

```tsx
import { useDisclosure } from '@ronekit/hooks';

function Modal() {
  const [opened, { open, close }] = useDisclosure(false, {
    onOpen: () => console.log('opened'),
    onClose: () => console.log('closed'),
  });

  return (
    <>
      <button onClick={open}>Open modal</button>
      {opened && <dialog open onClose={close}>…</dialog>}
    </>
  );
}
```

`open` is a no-op if already open; `close` is a no-op if already closed. Optional `onOpen` / `onClose` callbacks fire only when the state actually changes.

<!-- API:START -->
## API

```ts
function useDisclosure(initialState?: boolean, options?: UseDisclosureOptions): UseDisclosureReturnValue
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `initialState` | `boolean` | No |
| `options` | `UseDisclosureOptions` | No |

### Returns

`UseDisclosureReturnValue`

**`UseDisclosureOptions`**

| Property | Type | Description |
|----------|------|-------------|
| `onOpen`? | `() => void` | — |
| `onClose`? | `() => void` | — |

**`UseDisclosureReturnValue`** — `[boolean, UseDisclosureHandlers]`
<!-- API:END -->
