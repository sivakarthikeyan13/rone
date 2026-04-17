import { useSyncExternalStore } from "react";

export interface OrientationState {
  angle: number;
  type: OrientationType;
}

let cachedSnapshot: OrientationState = {
  angle: 0,
  type: "portrait-primary"
};

const getSnapshot = (): OrientationState => {
  const angle = screen.orientation?.angle ?? 0;
  const type = screen.orientation?.type ?? "portrait-primary";

  if (cachedSnapshot.angle !== angle || cachedSnapshot.type !== type) {
    cachedSnapshot = {
      angle,
      type
    };
  }
  return cachedSnapshot;
};

const getServerSnapshot = (): OrientationState => ({
  angle: 0,
  type: "portrait-primary"
});

const subscribe = (callback: () => void): (() => void) => {
  screen.orientation?.addEventListener("change", callback);
  return () => {
    screen.orientation?.removeEventListener("change", callback);
  };
};

export function useOrientation(): OrientationState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
