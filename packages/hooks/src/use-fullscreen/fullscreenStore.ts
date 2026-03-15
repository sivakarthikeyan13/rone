/* eslint-disable @typescript-eslint/no-explicit-any */
type Listener = () => void;

const listeners = new Set<Listener>();

function getFullscreenElement(): Element | null {
  const doc = document as any;

  return (
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement ||
    null
  );
}

function getSnapshot() {
  return Boolean(getFullscreenElement());
}

function subscribe(listener: Listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function emit() {
  listeners.forEach((l) => l());
}

let initialized = false;

function init() {
  if (initialized) return;

  const handler = () => emit();

  document.addEventListener("fullscreenchange", handler);
  document.addEventListener("webkitfullscreenchange", handler);
  document.addEventListener("mozfullscreenchange", handler);
  document.addEventListener("MSFullscreenChange", handler);

  initialized = true;
}

init();

export const fullscreenStore = {
  subscribe,
  getSnapshot
};
