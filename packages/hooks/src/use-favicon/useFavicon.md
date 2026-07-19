---
category: Browser API
---

# useFavicon

Dynamically updates the page's favicon `<link>` element to the provided URL. Automatically detects the MIME type from the file extension.

## Usage

```tsx
import { useFavicon } from '@ronekit/hooks';

function App() {
  const hasNotifications = useNotificationCount() > 0;
  useFavicon(hasNotifications ? '/icons/badge.png' : '/icons/default.ico');

  return <main>…</main>;
}
```

On first call, all existing `<link rel="icon">` elements are removed and a new one is appended to `<head>`.

<!-- API:START -->
## API

```ts
function useFavicon(url: string): void
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `url` | `string` | Yes |

### Returns

`void`
<!-- API:END -->
