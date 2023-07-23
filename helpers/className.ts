import { twMerge } from 'tailwind-merge';

export const mergeClassName = (defaultClassName: string, className?: string | ((state: any) => string)) => {
    return typeof className === 'function' ? (state: any) => twMerge(className(state), defaultClassName) : twMerge(className, defaultClassName);
}