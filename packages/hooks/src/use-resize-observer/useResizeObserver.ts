/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from "react";

export type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;

const defaultState: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};

export type UseResizeObserverReturnValue<T extends HTMLElement = any> = [
  React.RefCallback<T | null>,
  ObserverRect
];

export function useResizeObserver<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): UseResizeObserverReturnValue<T> {
  const [rect, setRect] = useState<ObserverRect>(defaultState);
  const observerRef = useRef<ResizeObserver | null>(null);
  const frameID = useRef(0);

  const refCallback: React.RefCallback<T | null> = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }

      if (!node) return;

      observerRef.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          cancelAnimationFrame(frameID.current);
          frameID.current = requestAnimationFrame(() => {
            const boxSize = entry.borderBoxSize?.[0] || entry.contentBoxSize?.[0];
            if (boxSize) {
              const height = boxSize.blockSize;
              const width = boxSize.inlineSize;
              setRect({
                height,
                width,
                x: entry.contentRect.x,
                y: entry.contentRect.y,
                top: entry.contentRect.top,
                left: entry.contentRect.left,
                bottom: entry.contentRect.bottom,
                right: entry.contentRect.right
              });
            } else {
              setRect(entry.contentRect);
            }
          });
        }
      });

      observerRef.current.observe(node, options);
    },
    [options]
  );

  return [refCallback, rect] as const;
}
