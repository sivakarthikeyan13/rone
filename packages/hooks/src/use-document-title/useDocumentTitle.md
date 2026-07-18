---
category: Browser API
---

# useDocumentTitle

Sets the browser tab's `document.title` and keeps it in sync with the provided string. Updates are skipped when the value is empty or whitespace-only.

## Usage

```tsx
import { useDocumentTitle } from '@ronekit/hooks';

function ProfilePage({ username }: { username: string }) {
  useDocumentTitle(`${username} – Rone`);
  return <main>…</main>;
}
```

Uses `useIsomorphicEffect` internally so it is safe in SSR environments.

<!-- API:START -->
## API

```ts
function useDocumentTitle(title: string): void
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `title` | `string` | Yes |

### Returns

`void`
<!-- API:END -->
