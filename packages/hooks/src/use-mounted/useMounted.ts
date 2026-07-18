import { useEffect, useState } from "react";

/**
 * Returns true once the component has mounted on the client.
 * @example
 * const mounted = useMounted();
 * if (!mounted) return null; // avoid SSR mismatch
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
