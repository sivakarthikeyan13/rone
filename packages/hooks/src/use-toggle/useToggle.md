---
category: State
---

# useToggle

Cycles between a list of values on each call. Defaults to toggling between `true` and `false`. Pass a custom array to cycle through any set of values.

## Usage

```tsx
import { useToggle } from '@ronekit/hooks';

// Boolean toggle
function Switch() {
  const [on, toggle] = useToggle();
  return <button onClick={() => toggle()}>{on ? 'ON' : 'OFF'}</button>;
}

// Multi-value cycle
function ThemePicker() {
  const [theme, cycleTheme] = useToggle(['light', 'dark', 'system'] as const);
  return <button onClick={() => cycleTheme()}>Theme: {theme}</button>;
}
```

You can also jump to a specific value by passing it directly: `toggle('dark')`.

<!-- API:START -->
## API

```ts
function useToggle<T = boolean>(options?: readonly T[]): UseToggleReturnValue<T>
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `options` | `readonly T[]` | No |

### Returns

`UseToggleReturnValue<T>`

**`UseToggleReturnValue`** — `[T, UseToggleAction<T>]`
<!-- API:END -->
