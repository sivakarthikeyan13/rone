import { useEffect, useRef } from "react";

type EventType = MouseEvent | TouchEvent;

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside<T extends HTMLElement>(
  callback: (event: EventType) => void,
  events?: string[] | null,
  nodes?: (HTMLElement | null)[]
) {
  const ref = useRef<T>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as Node;
      if (!target || !document.contains(target)) {
        return;
      }
      const path = event.composedPath();
      if (ref.current && path.includes(ref.current)) {
        return;
      }
      if (nodes?.some((node) => node && path.includes(node))) {
        return;
      }

      savedCallback.current(event as EventType);
    };
    const eventList = events || DEFAULT_EVENTS;
    eventList.forEach((event) => document.addEventListener(event, listener));

    return () => {
      eventList.forEach((event) => document.removeEventListener(event, listener));
    };
  }, [events, nodes]);

  return ref;
}
