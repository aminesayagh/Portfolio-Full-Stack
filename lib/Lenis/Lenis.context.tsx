import { ReactElement, createContext, useEffect, useRef, forwardRef, useImperativeHandle, useState, ElementRef, useCallback } from 'react';

import { gsap, ScrollTrigger } from '@/utils/gsap';
import Lenis from '@studio-freight/lenis';
import { create } from 'zustand';

import { useDebounce } from '@/hook/useDebounce';
import { useTranslation } from 'next-i18next';

import { twMerge } from 'tailwind-merge';

import { useFrame } from '@studio-freight/hamo'
import useResizeObserver from 'use-resize-observer';

interface LenisContextValue {
    lenis: LenisInstance | undefined;
    addCallback: (callback: CallbackFunction, priority: number) => void;
    removeCallback: (callback: CallbackFunction) => void;
}

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
// type ScrollTo = (target: string | number | HTMLElement, options: ScrollToParams) => void;
export type LenisInstance = Lenis;

type CallbackFunction = (instance: LenisInstance) => void;

interface LenisProviderProps {
    root?: boolean;
    options?: ReactLenisOptions;
    autoRaf?: boolean;
    rafPriority?: number;
    className?: string;
    children?: ReactElement;
}

export const LenisContext = createContext<LenisContextValue | undefined>(undefined);
export const useRoot = create<LenisContextValue>(() => ({
    lenis: undefined,
    addCallback: () => { },
    removeCallback: () => { },
}));

const LenisProvider = forwardRef<LenisInstance | undefined, LenisProviderProps>(({ children, root = false, options = {}, autoRaf = true, rafPriority = 0, className, ...props }, ref) => {
    const wrapper = useRef<ElementRef<'div'>>(null);
    const content = useRef<ElementRef<'div'>>(null);
    const { i18n } = useTranslation();

    const [lenis, setLenis] = useState<Lenis>();

    const { width: widthContainer, height: heightContainer } = useResizeObserver<HTMLDivElement>({ ref: content });

    
    const width = useDebounce(widthContainer, 30);
    const height = useDebounce(heightContainer, 30);

    const refresh = useCallback(() => {
        lenis?.resize();
        ScrollTrigger.clearScrollMemory();
        window.history.scrollRestoration = 'manual';
        ScrollTrigger.refresh();
    }, [lenis]);

    useEffect(() => {
        if (lenis) {
            refresh();
        }
    }, [lenis, width, height, i18n.language, refresh]);



    const callbacks = useRef<{ callback: CallbackFunction, priority: number }[]>([]);

    const addCallback = useCallback((callback: CallbackFunction, priority: number) => {
        callbacks.current.push({ callback, priority });
        callbacks.current.sort((a, b) => a.priority - b.priority);
    }, []);

    const removeCallback = useCallback((callback: CallbackFunction) => {
        callbacks.current = callbacks.current.filter((cb) => cb.callback !== callback);
    }, []);

    useImperativeHandle(ref, () => lenis, [lenis]);

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
        for (let i = 0; i < callbacks.current.length; i++) {
            callbacks.current[i].callback(e);
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