---
category: Sensors
---

# useMouse

Tracks the mouse cursor position. When a `ref` is provided, position is calculated relative to that element's top-left corner. Without a ref, it tracks the global viewport cursor position.

## Usage

```tsx
import { useMouse } from '@ronekit/hooks';

function Canvas() {
  const { ref, x, y } = useMouse<HTMLDivElement>({ resetOnExit: true });

  return (
    <div ref={ref} style={{ position: 'relative', width: 300, height: 300 }}>
      <span style={{ position: 'absolute', left: x, top: y }}>•</span>
    </div>
  );
}
```

Set `resetOnExit: true` to reset `x` and `y` to `0` when the cursor leaves the element.

<!-- API:START -->
## API

```ts
function useMouse<T extends HTMLElement = HTMLElement>(options?: UseMouseOptions): UseMouseReturnValue<T>
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `options` | `UseMouseOptions` | No |

### Returns

`UseMouseReturnValue<T>`

**`UseMouseOptions`**

| Property | Type | Description |
|----------|------|-------------|
| `resetOnExit`? | `boolean` | — |

**`UseMouseReturnValue`**

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `RefCallback<T \| null>` | — |
| `x` | `number` | — |
| `y` | `number` | — |
<!-- API:END -->
