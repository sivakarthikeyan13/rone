import { useCallback, useRef, useSyncExternalStore } from "react";
import { fullscreenStore } from "./fullscreenStore";

export function useFullscreen<T extends HTMLElement = HTMLElement>() {
  const isGlobalFullscreen = useSyncExternalStore(
    fullscreenStore.subscribe,
    fullscreenStore.getSnapshot,
    () => false
  );

  const elementRef = useRef<T | null>(null);

  const isFullscreen = isGlobalFullscreen && document.fullscreenElement === elementRef.current;

  const toggle = useCallback(async () => {
    const el = elementRef.current ?? document.documentElement;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch (e) {
      console.error(`[@rone/hooks] use-fullscreen: Error full-screen: ${e}`);
    }
  }, []);

  const ref = useCallback((node: T | null) => {
    elementRef.current = node;
  }, []);

  return { ref, toggle, fullscreen: isFullscreen } as const;
}
