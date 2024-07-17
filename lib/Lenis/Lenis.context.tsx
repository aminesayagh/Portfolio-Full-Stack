import { useFrame } from '@studio-freight/hamo'

import { useTranslation } from 'next-i18next';

import { ReactElement, createContext, useEffect, useRef, forwardRef, useImperativeHandle, useState, ElementRef, useCallback } from 'react';

import { twMerge } from 'tailwind-merge';


import useResizeObserver from 'use-resize-observer';
import { create } from 'zustand';
import { useDebounce } from '@/hook/useDebounce';

import { gsap, ScrollTrigger } from '@/utils/gsap';
import Lenis from '@studio-freight/lenis';




interface LenisContextValue {
    lenis: LenisInstance | undefined;
    addCallback: (callback: CallbackFunction, priority: number) => void;
    removeCallback: (callback: CallbackFunction) => void;
}

// ReactLenisOptions is a type that represents the options that can be passed to the Lenis instance.
interface ReactLenisOptions {
    wrapper?: Window | HTMLElement;
    content?: HTMLElement;
    wheelEventsTarget?: Window | HTMLElement;
    eventsTarget?: Window | HTMLElement;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    syncTouch?: boolean;
    syncTouchLerp?: number;
    __iosNoInertiaSyncTouchLerp?: number;
    touchInertiaMultiplier?: number;
    duration?: number;
    easing?: (t: number) => number;
    lerp?: number;
    infinite?: boolean;
    orientation?: "vertical" | "horizontal";
    gestureOrientation?: "vertical" | "horizontal" | "both";
    touchMultiplier?: number;
    wheelMultiplier?: number;
    normalizeWheel?: boolean;
    autoResize?: boolean;
    isSmooth?: boolean;
    smoothResize?: boolean;
    direction?: "vertical" | "horizontal";
    gestureDirection?: "vertical" | "horizontal" | "both";
}

export type LenisInstance = Lenis; // This is a placeholder for the actual Lenis instance type.
type CallbackFunction = (instance: LenisInstance) => void;

interface LenisProviderProps {
    root?: boolean;
    options?: ReactLenisOptions;
    autoRaf?: boolean;
    rafPriority?: number;
    className?: string;
    children?: ReactElement;
}

// Create the context for Lenis
export const LenisContext = createContext<LenisContextValue | undefined>(undefined);

// Zustand store for managing the Lenis instance and callbacks.
export const useRoot = create<LenisContextValue>(() => ({
    lenis: undefined,
    addCallback: () => { },
    removeCallback: () => { },
}));

/**
 * Provides the Lenis context for managing Lenis instances and callbacks.
 * 
 * @remarks
 * This component is responsible for creating and managing the Lenis instance, as well as handling callbacks and resizing.
 * 
 * @param children - The child components to be rendered within the Lenis context.
 * @param root - Specifies whether this is the root Lenis provider.
 * @param options - Additional options for configuring the Lenis instance.
 * @param autoRaf - Specifies whether to automatically call the `raf` method on each frame.
 * @param rafPriority - The priority of the RAF callback.
 * @param className - The CSS class name to be applied to the wrapper element.
 * @param props - Additional props to be spread onto the wrapper element.
 * @param ref - A ref to the Lenis instance.
 * @returns The Lenis context provider component.
 */
const LenisProvider = forwardRef<LenisInstance | undefined, LenisProviderProps>(({ children, root = false, options = {}, autoRaf = true, rafPriority = 0, className, ...props }, ref) => {
    // Create refs for the wrapper and content elements.
    const wrapper = useRef<ElementRef<'div'>>(null);
    const content = useRef<ElementRef<'div'>>(null);
    const { i18n } = useTranslation();

    // Create state for the Lenis instance.
    const [lenis, setLenis] = useState<Lenis>();

    // Create a debounced value for the container width and height.
    const { width: widthContainer, height: heightContainer } = useResizeObserver<HTMLDivElement>({ ref: content });

    // Create a debounced value for the container width and height.
    const width = useDebounce(widthContainer, 30);
    const height = useDebounce(heightContainer, 30);

    // Create a function to refresh the Lenis instance.
    const refresh = useCallback(() => {
        lenis?.resize();
        ScrollTrigger.clearScrollMemory();
        window.history.scrollRestoration = 'manual'; // Disable scroll restoration to prevent scroll jumps.
        ScrollTrigger.refresh(); // Refresh the ScrollTrigger plugin.
    }, [lenis]); // Refresh the Lenis instance.

    useEffect(() => {
        if (lenis) {
            refresh();
        }
    }, [lenis, width, height, i18n.language, refresh]); // Refresh the Lenis instance when the width, height, or language changes.

    // Create a ref for the callbacks used for scroll events.
    const callbacks = useRef<{ callback: CallbackFunction, priority: number }[]>([]); // Create a ref for the callbacks.

    const addCallback = useCallback((callback: CallbackFunction, priority: number) => {
        callbacks.current.push({ callback, priority }); // Add the callback to the list of callbacks.
        callbacks.current.sort((a, b) => a.priority - b.priority); // Sort the callbacks by priority.
    }, []);

    const removeCallback = useCallback((callback: CallbackFunction) => {
        callbacks.current = callbacks.current.filter((cb) => cb.callback !== callback); // Remove the callback from the list of callbacks.
    }, []);

    useImperativeHandle(ref, () => lenis, [lenis]); // Expose the Lenis instance via the ref.

    useResizeObserver<HTMLDivElement>({ ref: content });

    useEffect(() => {
        const lenisInstance = new Lenis({
            ...options,
            ...(!root && {
                wrapper: wrapper.current || undefined,
                content: content.current || undefined,
            }),
        });

        setLenis(lenisInstance);

        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        ScrollTrigger.defaults({
            scroller: wrapper.current,
        });
        // refresh();

        return () => {
            lenisInstance.destroy();
            setLenis(undefined);
        }
    }, [root, options]);

    

    useFrame((time: number) => {
        if (autoRaf) {
            lenis?.raf(time);
        }
    }, rafPriority);

    useEffect(() => {
        if (root && lenis) {
            useRoot.setState({
                lenis, addCallback, removeCallback
            });
        }
    }, [root, lenis, addCallback, removeCallback]);

    const onScroll = useCallback((e: LenisInstance) => {
        const current = callbacks.current;
        if (!current.length) return;
        for (let i = 0; i < callbacks.current.length; i++) {
            const c = current[i];
            c && c.callback(e);
        }
    }, []);

    useEffect(() => {
        lenis?.on('scroll', onScroll);

        return () => {
            lenis?.off('scroll', onScroll);
        }
    }, [lenis, onScroll]);

    const onClassNameChange = useCallback(() => {
        if (wrapper.current) {
            wrapper.current.className = twMerge(lenis?.className, className);
        }
    }, [lenis, className]);

    useEffect(() => {
        onClassNameChange();

        lenis?.on('className change', onClassNameChange);

        return () => {
            lenis?.off('className change', onClassNameChange);
        }
    }, [lenis, onClassNameChange])

    return (<LenisContext.Provider value={{ lenis, addCallback, removeCallback }}>
        {root ? (children) : <div ref={wrapper} className={twMerge(lenis?.className, className)} {...props}>
            <div ref={content}>
                {children}
                {/* <Scrollbar container={content} /> */}
            </div>
        </div>}
    </LenisContext.Provider>)
});

LenisProvider.displayName = 'LenisProvider';

export { LenisProvider };