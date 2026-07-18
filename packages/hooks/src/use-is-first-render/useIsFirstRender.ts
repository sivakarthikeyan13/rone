import { useRef } from "react";

/**
 * Returns true only during the component's first render.
 * @example
 * const isFirst = useIsFirstRender();
 */
export function useIsFirstRender() {
  const renderRef = useRef(true);

  if (renderRef.current) {
    renderRef.current = false;
    return true;
  }

  return renderRef.current;
}
