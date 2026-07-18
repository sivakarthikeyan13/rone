import React, { useReducer } from "react";

type UseToggleAction<T> = (value?: React.SetStateAction<T>) => void;
export type UseToggleReturnValue<T> = [T, UseToggleAction<T>];

/**
 * Cycles between a set of values on each call; defaults to toggling between true and false.
 * @example
 * const [on, toggle] = useToggle();
 * const [theme, cycleTheme] = useToggle(['light', 'dark', 'system'] as const);
 */
export function useToggle<T = boolean>(
  options: readonly T[] = [true, false] as unknown as readonly T[]
): UseToggleReturnValue<T> {
  const [[option], toggle] = useReducer((state: readonly T[], action: React.SetStateAction<T>) => {
    const value = action instanceof Function ? action(state[0]) : action;
    const index = Math.abs(state.indexOf(value));
    return state.slice(index).concat(state.slice(0, index));
  }, options);

  return [option, toggle as UseToggleAction<T>];
}
