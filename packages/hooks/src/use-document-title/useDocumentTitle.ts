import { useIsomorphicEffect } from "../use-isomorphic-effect/useIsomorphicEffect";

/**
 * Synchronizes the browser tab title with the provided string.
 * @example
 * useDocumentTitle('My Page – Rone');
 */
export function useDocumentTitle(title: string) {
  useIsomorphicEffect(() => {
    if (typeof title === "string" && title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
}
