---
category: Sensors
---

# useOrientation

Returns the current screen orientation `angle` (degrees) and `type` string, updating whenever the device is rotated.

## Usage

```tsx
import { useOrientation } from '@ronekit/hooks';

function Layout() {
  const { type, angle } = useOrientation();
  const isPortrait = type.startsWith('portrait');

  return (
    <div className={isPortrait ? 'portrait' : 'landscape'}>
      <p>Angle: {angle}°</p>
    </div>
  );
}
```

Built on `useSyncExternalStore`. Defaults to `{ angle: 0, type: 'portrait-primary' }` on the server and when the Screen Orientation API is unavailable.

<!-- API:START -->
## API

```ts
function useOrientation(): OrientationState
```

### Returns

`OrientationState`

**`OrientationState`**

| Property | Type | Description |
|----------|------|-------------|
| `angle` | `number` | — |
| `type` | `OrientationType` | — |
<!-- API:END -->
