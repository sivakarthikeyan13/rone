---
category: UI / DOM
---

# useHover

Tracks whether an element is currently hovered and returns a ref callback to attach to the target element. Adds and removes `mouseenter`/`mouseleave` listeners automatically as the element mounts and unmounts.

## Usage

```tsx
import { useHover } from '@ronekit/hooks';

function HoverCard() {
  const { hovered, ref } = useHover<HTMLDivElement>();

  return (
    <div ref={ref} style={{ background: hovered ? 'lightblue' : 'white' }}>
      {hovered ? 'Hovering!' : 'Hover over me'}
    </div>
  );
}
```

<!-- API:START -->
## API

```ts
function useHover<T extends HTMLElement = HTMLElement>(): UseHoverReturnValue<T>
```

### Returns

`UseHoverReturnValue<T>`

**`UseHoverReturnValue`**

| Property | Type | Description |
|----------|------|-------------|
| `hovered` | `boolean` | — |
| `ref` | `React.RefCallback<T \| null>` | — |
<!-- API:END -->
