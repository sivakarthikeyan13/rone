import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("visibilitychange", callback);
  return () => window.removeEventListener("visibilitychange", callback);
};

const getSnapshot = () => document.visibilityState;

const getServerSnapshot = () => "visible" as DocumentVisibilityState;

export function useDocumentVisibility(): DocumentVisibilityState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
