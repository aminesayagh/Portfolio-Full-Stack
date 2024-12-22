import { twMerge } from "tailwind-merge";

export const mergeClassName = <T>(
  defaultClassName: string,
  className?: string | ((state: T) => string)
) => {
  return typeof className === "function"
    ? (state: T) => twMerge(className(state), defaultClassName)
    : twMerge(className, defaultClassName);
};
