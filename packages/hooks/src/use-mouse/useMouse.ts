import { useCallback, useState, type RefCallback } from "react";

export interface UseMouseOptions {
  resetOnExit?: boolean;
}

export interface UseMouseReturnValue<T extends HTMLElement = HTMLElement> {
  ref: RefCallback<T | null>;
  x: number;
  y: number;
}

/**
 * Tracks the mouse cursor position relative to a target element or the viewport.
 * @example
 * const { ref, x, y } = useMouse<HTMLDivElement>();
 * return <div ref={ref}>Mouse at {x}, {y}</div>;
 */
export function useMouse<T extends HTMLElement = HTMLElement>(
  options: UseMouseOptions = { resetOnExit: false }
): UseMouseReturnValue<T> {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const ref: RefCallback<T | null> = useCallback(
    (node) => {
      const handleMouseMove = (e: MouseEvent) => {
        if (node) {
          const rect = node.getBoundingClientRect();
          setPosition({
            x: Math.max(0, Math.round(e.pageX - rect.left - window.scrollX)),
            y: Math.max(0, Math.round(e.pageY - rect.top - window.scrollY))
          });
        } else {
          setPosition({ x: e.clientX, y: e.clientY });
        }
      };

      const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

      node?.addEventListener("mousemove", handleMouseMove);
      if (options.resetOnExit) {
        node?.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        node?.removeEventListener("mousemove", handleMouseMove);
        if (options.resetOnExit) {
          node?.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    },
    [options.resetOnExit]
  );

  return { ref, ...position };
}
