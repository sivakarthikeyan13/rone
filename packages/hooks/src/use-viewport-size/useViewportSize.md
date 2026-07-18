---
category: Sensors
---

# useViewportSize

Returns the current viewport `width` and `height` in pixels, updating on window `resize` and `orientationchange` events.

## Usage

```tsx
import { useViewportSize } from '@ronekit/hooks';

function ResponsiveLayout() {
  const { width, height } = useViewportSize();

  return (
    <div>
      <p>Viewport: {width} × {height}</p>
      {width < 768 ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
```

Returns `{ width: 0, height: 0 }` before the component mounts (SSR-safe).

<!-- API:START -->
## API

```ts
function useViewportSize(): { height: number; width: number; }
```

### Returns

`{ height: number; width: number; }`
<!-- API:END -->
