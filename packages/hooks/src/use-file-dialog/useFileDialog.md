---
category: Browser API
---

# useFileDialog

Opens a native file picker dialog and exposes the selected `FileList`. Supports multiple files, directory selection, file type filtering, and a reset-on-open option.

## Usage

```tsx
import { useFileDialog } from '@ronekit/hooks';

function ImageUploader() {
  const { open, files, reset } = useFileDialog({
    accept: 'image/*',
    multiple: false,
    onChange: (files) => uploadFile(files?.[0]),
  });

  return (
    <>
      <button onClick={open}>Choose image</button>
      {files?.[0] && <p>{files[0].name}</p>}
      <button onClick={reset}>Clear</button>
    </>
  );
}
```

The hook creates a hidden `<input type="file">` element and programmatically opens it.

<!-- API:START -->
## API

```ts
function useFileDialog(input: UseFileDialogOptions): { files: FileList | null; open: () => void; reset: () => void; }
```

### Parameters

| Name | Type | Required |
|------|------|----------|
| `input` | `UseFileDialogOptions` | Yes |

### Returns

`{ files: FileList \| null; open: () => void; reset: () => void; }`

**`UseFileDialogOptions`**

| Property | Type | Description |
|----------|------|-------------|
| `multiple`? | `boolean` | Determines whether multiple files are allowed, `true` by default |
| `accept`? | `string` | `accept` attribute of the file input, '*' by default |
| `capture`? | `string` | `capture` attribute of the file input |
| `directory`? | `boolean` | Determines whether the user can pick a directory instead of file, `false` by default |
| `resetOnOpen`? | `boolean` | Determines whether the file input state should be reset when the file dialog is opened, `false` by default |
| `initialFiles`? | `FileList \| File[]` | Initial selected files |
| `onChange`? | `(files: FileList \| null) => void` | Called when files are selected |
| `onCancel`? | `() => void` | Called when file dialog is canceled |
<!-- API:END -->
