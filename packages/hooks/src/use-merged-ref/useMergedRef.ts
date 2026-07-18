import { useCallback, type Ref, type RefCallback } from "react";

type PossibleRef<T> = Ref<T> | undefined;
type RefCleanup<T> = ReturnType<RefCallback<T>>;

function assignRef<T>(ref: PossibleRef<T>, value: T): RefCleanup<T> {
  if (typeof ref === "function") {
    return ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}

export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  const cleanupMap = new Map<PossibleRef<T>, Exclude<RefCleanup<T>, void>>();

  return (node: T | null) => {
    refs.forEach((ref) => {
      const cleanup = assignRef(ref, node);
      if (cleanup) {
        cleanupMap.set(ref, cleanup);
      }
    });

    if (cleanupMap.size > 0) {
      return () => {
        refs.forEach((ref) => {
          const cleanup = cleanupMap.get(ref);
          if (cleanup && typeof cleanup === "function") {
            cleanup();
          } else {
            assignRef(ref, null);
          }
        });
        cleanupMap.clear();
      };
    }
  };
}

/**
 * Merges multiple React refs (callback refs or ref objects) into a single ref callback.
 * @example
 * const ref = useMergedRef(localRef, forwardedRef);
 * return <div ref={ref} />;
 */
export function useMergedRef<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return useCallback(mergeRefs(...refs), refs);
}
