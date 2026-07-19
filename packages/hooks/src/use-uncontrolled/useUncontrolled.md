---
category: State
---

# useUncontrolled

Bridges the controlled / uncontrolled pattern. When `value` is not `undefined`, the component is controlled and changes propagate via `onChange`. When `value` is `undefined`, the hook manages state internally via `initialValue`.

## Usage

```tsx
import { useUncontrolled } from '@ronekit/hooks';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

function Checkbox({ checked, defaultChecked = false, onChange }: CheckboxProps) {
  const [_checked, handleChange, controlled] = useUncontrolled({
    value: checked,
    initialValue: defaultChecked,
    onChange,
  });

  return <input type="checkbox" checked={_checked} onChange={(e) => handleChange(e.target.checked)} />;
}
```

The third return value `controlled` is `true` when the parent supplies a `value`.

<!-- API:START -->
## API

```ts
function useUncontrolled<T>({
  value,
  initialValue,
  onChange
}: UseUncontrolledInput<T>): [T, (value: T, ...payload: any[]) => void, boolean]
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `{
  value,
  initialValue,
  onChange
}` | `UseUncontrolledInput<T>` | Yes |

### Returns

`[T, (value: T, ...payload: any[]) => void, boolean]`

**`UseUncontrolledInput`**

| Property | Type | Description |
|----------|------|-------------|
| `value` | `T` | Value for controlled state |
| `initialValue` | `T` | Initial value for uncontrolled state |
| `onChange`? | `(value: T, ...payload: any[]) => void` | Controlled state onChange handler |
<!-- API:END -->
