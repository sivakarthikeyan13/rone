import { useEffect, useState } from "react";
import { useWindowEvent } from "../use-window-event/useWindowEvent";

/**
 * Returns the current viewport width and height, updating on resize and orientation change.
 * @example
 * const { width, height } = useViewportSize();
 */
export function useViewportSize() {
  const [size, setSize] = useState({ height: 0, width: 0 });

  const setWindowSize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useWindowEvent("resize", setWindowSize, { passive: true });
  useWindowEvent("orientationchange", setWindowSize, { passive: true });

  useEffect(() => {
    setWindowSize();
  }, []);

  return size;
}
