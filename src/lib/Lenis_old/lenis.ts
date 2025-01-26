import { create } from "zustand";

import type Lenis from "lenis";

export type LenisInstance = Lenis; // This is a placeholder for the actual Lenis instance type.
export type CallbackFunction = (instance: LenisInstance) => void;

interface LenisContextValue {
  lenis: LenisInstance | undefined;
  addCallback: (callback: CallbackFunction, priority: number) => void;
  removeCallback: (callback: CallbackFunction) => void;
}

// Zustand store for managing the Lenis instance and callbacks.
export const useRoot = create<LenisContextValue>(() => ({
  lenis: undefined,
  addCallback: () => {},
  removeCallback: () => {}
}));
