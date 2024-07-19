import Lenis from "@studio-freight/lenis";
import { create } from "zustand";

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
