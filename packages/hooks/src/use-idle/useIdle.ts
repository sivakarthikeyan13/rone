import { useEffect, useEffectEvent, useRef, useState } from "react";

export interface UseIdleOptions {
  events?: (keyof DocumentEventMap)[];
  initialState?: boolean;
}

const DEFAULT_OPTIONS: Required<UseIdleOptions> = {
  events: ["mousemove", "keydown", "touchmove", "scroll", "click", "wheel"],
  initialState: true
};

export function useIdle(timeout: number, options?: UseIdleOptions) {
  const { events, initialState } = { ...DEFAULT_OPTIONS, ...options };
  const [idle, setIdle] = useState(initialState);
  const timer = useRef(-1);

  const eventListener = useEffectEvent(() => {
    setIdle(false);
    if (timer.current !== -1) {
      window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      setIdle(true);
    }, timeout);
  });

  useEffect(() => {
    events.forEach((event) => {
      document.addEventListener(event, eventListener);
    });

    // Begin idle countdown on mount, not just after the first event
    timer.current = window.setTimeout(() => {
      setIdle(true);
    }, timeout);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, eventListener);
      });
      window.clearTimeout(timer.current);
      timer.current = -1;
    };
  }, [timeout]);

  return idle;
}
