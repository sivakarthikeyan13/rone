/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

export interface UseUncontrolledInput<T> {
  /** Value for controlled state */
  value: T;
  /** Initial value for uncontrolled state */
  initialValue: T;
  /** Controlled state onChange handler */
  onChange?: (value: T, ...payload: any[]) => void;
}

const noop = () => {};

/**
 * Manages a value that can operate as either controlled or uncontrolled, bridging both patterns.
 * @example
 * const [value, handleChange, controlled] = useUncontrolled({ value: propValue, initialValue: '', onChange });
 */
export function useUncontrolled<T>({
  value,
  initialValue,
  onChange
}: UseUncontrolledInput<T>): [T, (value: T, ...payload: any[]) => void, boolean] {
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);

  const handleUncontrolledChange = useCallback(
    (val: T, ...payload: any[]) => {
      setUncontrolledValue(val);
      onChange?.(val, ...payload);
    },
    [onChange]
  );

  if (value !== undefined) {
    return [value, onChange ?? noop, true];
  }

  return [uncontrolledValue, handleUncontrolledChange, false];
}
