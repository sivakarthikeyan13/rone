import { useEffect, useRef } from "react";

/**
 * Stores and returns the previous render's value of a state or prop.
 * @example
 * const prev = usePrevious(count); // value from the last render
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
