import { useCallback, useRef, useState } from "react";

export interface UseHoverReturnValue<T extends HTMLElement = HTMLElement> {
  hovered: boolean;
  ref: React.RefCallback<T | null>;
}

export function useHover<T extends HTMLElement = HTMLElement>(): UseHoverReturnValue<T> {
  const [hovered, setHovered] = useState(false);
  const prevNode = useRef<T | null>(null);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const ref: React.RefCallback<T | null> = useCallback((node) => {
    if (prevNode.current) {
      prevNode.current.removeEventListener("mouseenter", handleMouseEnter);
      prevNode.current.removeEventListener("mouseleave", handleMouseLeave);
    }

    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);
    }
    prevNode.current = node;

    return () => {
      prevNode.current = null;
    };
  }, []);

  return { hovered, ref };
}
