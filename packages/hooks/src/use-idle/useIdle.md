---
category: Sensors
---

# useIdle

Detects user inactivity. Returns `true` after the specified `timeout` (ms) with no user interaction, and resets to `false` on the next interaction.

## Usage

```tsx
import { useIdle } from '@ronekit/hooks';

function App() {
  const idle = useIdle(30_000); // 30 seconds

  return (
    <div>
      {idle ? <SessionWarning /> : <MainContent />}
    </div>
  );
}
```

By default, any of `mousemove`, `keydown`, `touchmove`, `scroll`, `click`, or `wheel` resets the idle timer. Pass `events` to customize.

<!-- API:START -->
## API

```ts
function useIdle(timeout: number, options?: UseIdleOptions): boolean
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `timeout` | `number` | Yes |
| `options` | `UseIdleOptions` | No |

### Returns

`boolean`

**`UseIdleOptions`**

| Property | Type | Description |
|----------|------|-------------|
| `events`? | `(keyof DocumentEventMap)[]` | — |
| `initialState`? | `boolean` | — |
<!-- API:END -->
