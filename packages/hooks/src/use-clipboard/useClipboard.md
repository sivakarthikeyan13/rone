---
category: Browser API
---

# useClipboard

Copies a value to the clipboard and tracks the copied state with a configurable auto-reset timeout.

## Usage

```tsx
import { useClipboard } from '@ronekit/hooks';

function CopyButton({ text }: { text: string }) {
  const { copy, copied, error } = useClipboard({ timeout: 2000 });

  return (
    <button onClick={() => copy(text)}>
      {copied ? 'Copied!' : 'Copy'}
      {error && <span>Failed</span>}
    </button>
  );
}
```

The `copied` flag automatically resets to `false` after `timeout` milliseconds. Call `reset()` to clear both `copied` and `error` immediately.

<!-- API:START -->
## API

```ts
function useClipboard(options?: UseClipboardOptions): UseClipboardReturnValue
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `options` | `UseClipboardOptions` | No |

### Returns

`UseClipboardReturnValue`
<!-- API:END -->
