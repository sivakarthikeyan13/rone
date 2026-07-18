import { useEffect, useLayoutEffect } from "react";

// In SSR environments, useLayoutEffect will throw a warning because it cannot run on the server.
// This hook solves that issue by using useEffect instead useLayoutEffect during SSR.
/** Runs useLayoutEffect in the browser and useEffect on the server, preventing SSR warnings. */
export const useIsomorphicEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;
