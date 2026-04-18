import { useEffect, useState } from "react";
import { useWindowEvent } from "../use-window-event/useWindowEvent";

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
