import { useCallback, useRef, useEffect, useEffectEvent } from "react";

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement>(
  type: K,
  listener: (this: T, ev: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): React.RefCallback<T | null> {
  const eventListener = useEffectEvent(listener);
  const prevNode = useRef<T | null>(null);

  const callbackRef: React.RefCallback<T | null> = useCallback(
    (node) => {
      if (!node) {
        return;
      }
      if (prevNode.current) {
        prevNode.current.removeEventListener(type, eventListener as EventListener, options);
      }
      node.addEventListener(type, eventListener as EventListener, options);
      prevNode.current = node;
    },
    [type, options]
  );

  useEffect(() => {
    () => {
      if (prevNode.current) {
        prevNode.current.removeEventListener(type, eventListener as EventListener, options);
      }
    };
  }, [type, options]);

  return callbackRef;
}
