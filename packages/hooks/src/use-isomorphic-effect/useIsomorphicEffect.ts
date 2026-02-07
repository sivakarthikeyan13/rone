import { useEffect, useLayoutEffect } from "react";

// In SSR environments, useLayoutEffect will throw a warning because it cannot run on the server.
// This hook solves that issue by using useEffect instead useLayoutEffect during SSR.
export const useIsomorphicEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;
