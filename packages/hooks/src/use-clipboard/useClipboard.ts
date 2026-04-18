import { useEffect, useState, useCallback } from "react";

export type UseClipboardOptions = {
  /** Time in ms after which the copied state will reset, '2000' by default */
  timeout?: number;
};

export type UseClipboardReturnValue = {
  /** Function to copy value to clipboard */
  copy: (value: unknown) => void;
  /** Function to reset the copied state and error */
  reset: () => void;
  /** Error message if copying fails */
  error: Error | null;
  /** Boolean indicating if the value was copied successfully */
  copied: boolean;
};

export function useClipboard(
  options: UseClipboardOptions = { timeout: 2000 }
): UseClipboardReturnValue {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let timeoutId: number | null = null;
    if (copied) {
      timeoutId = window.setTimeout(() => {
        setCopied(false);
      }, options.timeout);
    }
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [options.timeout, copied]);

  const copy = useCallback((value: unknown) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(String(value))
        .then(() => {
          setCopied(true);
          setError(null);
        })
        .catch((err) => {
          setError(err instanceof Error ? err : new Error(String(err)));
          setCopied(false);
        });
    } else {
      setError(new Error("useClipboard: Clipboard API not supported."));
    }
  }, []);

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
  }, []);

  return { copy, reset, error, copied };
}
