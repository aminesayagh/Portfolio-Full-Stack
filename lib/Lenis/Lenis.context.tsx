import { ReactElement, createContext, useEffect, useRef, forwardRef, useImperativeHandle, useState, ElementRef, useCallback } from 'react';

import { gsap, ScrollTrigger } from '@/utils/gsap';
import Lenis from '@studio-freight/lenis';
import useResizeObserver from 'use-resize-observer';
import { useDebounce } from '@/hook/useDebounce';
import { useLenis } from './Lenis.hook';
import { create } from 'zustand';
import { twMerge } from 'tailwind-merge';

import { useFrame } from '@studio-freight/hamo'

interface LenisContextValue {
    lenis: LenisInstance | undefined;
    addCallback: (callback: CallbackFunction, priority: number) => void;
    removeCallback: (callback: CallbackFunction) => void;
}

type EasingFunction = (rawValue: number) => number;

interface ScrollToParams {
    offset?: number;
    lerp?: number;
    duration?: number;
    easing?: EasingFunction;
    immediate?: boolean;
    lock?: boolean;
    force?: boolean;
    onComplete?: CallbackFunction;
}

interface Emitter { }
interface Dimensions { }
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
    
}
type ScrollTo = (target: string | number | HTMLElement, options: ScrollToParams) => void;
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

    const [lenis, setLenis] = useState<Lenis>();

    const callbacks = useRef<{ callback: CallbackFunction, priority: number }[]>([]);

    const addCallback = useCallback((callback: CallbackFunction, priority: number) => {
        callbacks.current.push({ callback, priority });
        callbacks.current.sort((a, b) => a.priority - b.priority);
    }, []);

    const removeCallback = useCallback((callback: CallbackFunction) => {
        callbacks.current = callbacks.current.filter((cb) => cb.callback !== callback);
    }, []);

    useImperativeHandle(ref, () => lenis, [lenis]);

    useEffect(() => {
        const lenis = new Lenis({
            ...options,
            ...(!root && {
                wrapper: wrapper.current || undefined,
                content: content.current || undefined,
            }),
        });

        console.log('init lenis', wrapper.current, content.current);

        setLenis(lenis);

        lenis.on(event, ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0)

        ScrollTrigger.defaults({
            scroller: wrapper.current,
        })
        return () => {
            lenis.destroy();
            setLenis(undefined);
        }
    }, [root, JSON.stringify(options)]);


    useFrame((time: number) => {
        if (autoRaf) {
            lenis?.raf(time);
        }
    }, rafPriority);

    useEffect(() => {
        if (root && lenis) {
            useRoot.setState({
                lenis, addCallback, removeCallback
            })
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
        {root ? (children) : (
            <div ref={wrapper} className={twMerge(lenis?.className, className)} {...props}>
                <div ref={content}>
                    {children}
                </div>
            </div>
        )}
    </LenisContext.Provider>)
});

LenisProvider.displayName = 'LenisProvider';

export { LenisProvider };

// export function LenisProviderOld({
//     children, containerRef
// }: { children: ReactElement, containerRef: React.RefObject<HTMLDivElement> }) {
//     const LenisRef = useRef<Lenis>();

//     const { width: widthContainer, height: heightContainer } = useResizeObserver<HTMLDivElement>({ ref: containerRef });

//     const width = useDebounce(widthContainer, 30);
//     const height = useDebounce(heightContainer, 30);

//     useEffect(() => {
//         LenisRef.current = new Lenis({
//             duration: 1.2,
//             easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
//         });

//         LenisRef.current.on('scroll', (e: any) => {
//             // console.log('scroll updated', e);
//         })
//         function raf(time: number) {
//             LenisRef.current?.raf(time);
//             ScrollTrigger.update();
//             requestAnimationFrame(raf);
//         }

//         requestAnimationFrame(raf);

//         return () => {
//             LenisRef.current?.destroy();
//         }
//     }, []);

//     useEffect(() => {
//         console.log('LenisProvider: refresh');
//         ScrollTrigger.refresh();
//     }, [width, height]);
//     return children;
// }
