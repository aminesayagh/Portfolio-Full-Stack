import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function mergeClassName<T>(
  defaultClassName: string[] | string,
  className?: string | ((state: T) => string)
) {
  return typeof className === "function"
    ? (state: T) => twMerge(className(state), defaultClassName)
    : twMerge(className, defaultClassName);
}

export const ANIMATION_GPU_OPTIMIZATION = "transform-gpu will-change-transform perspective-1000 backface-visibility-hidden";