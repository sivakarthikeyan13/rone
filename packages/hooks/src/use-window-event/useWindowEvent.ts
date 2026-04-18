import { useEffect, useEffectEvent } from "react";

export function useWindowEvent<K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions
) {
  const eventListener = useEffectEvent(listener);

  useEffect(() => {
    window.addEventListener(type as keyof WindowEventMap, eventListener as EventListener, options);
    return () => {
      window.removeEventListener(
        type as keyof WindowEventMap,
        eventListener as EventListener,
        options
      );
    };
  }, [type]);
}
