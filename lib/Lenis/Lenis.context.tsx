import { ReactElement, createContext, useEffect, useRef, forwardRef, useImperativeHandle, useState, ElementRef, useCallback } from 'react';

import { gsap, ScrollTrigger } from '@/utils/gsap';
import Lenis from '@studio-freight/lenis';
import { create } from 'zustand';

import { twMerge } from 'tailwind-merge';

import { useFrame } from '@studio-freight/hamo'
import { useLenis } from './Lenis.hook';
import { set } from 'react-hook-form';

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

        setLenis(lenis);

        lenis.on(event, ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        ScrollTrigger.defaults({
            scroller: wrapper.current,
        });

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
        {root ? (children) : (
            <div ref={wrapper} className={twMerge(lenis?.className, className)} {...props}>
                <div ref={content}>
                    {children}
                    <Scrollbar container={content} />
                </div>
            </div>
        )}
    </LenisContext.Provider>)
});

const Scrollbar = ({ container }: { container: any }) => {
    const thumbRef = useRef<ElementRef<'div'>>(null);
    const [thumbTransform, setThumbTransform] = useState(0);

    let scrollTimeoutRef = useRef<NodeJS.Timeout>(); // Timeout ref
    const [close, setClose] = useState(false);

    const tl = useRef(gsap.timeline({ paused: true }).to('.scrollbar', {
        duration: 0.3,
        xPercent: 100,
        ease: 'power3.out'
    }));

    const translateThumbRight = () => {
        tl.current.play();
        setClose(true);
    }
    useLenis((lenis) => {
        if (close) {
            tl.current.reverse();
            setClose(false);
        }
        const heightOfContent = container.current?.offsetHeight;
        const heightOfWindow = window.innerHeight;
        const position = lenis.targetScroll;

        const tt = position * heightOfWindow / heightOfContent;
        gsap.to(thumbRef.current, {
            duration: 0.3,
            y: tt,
            ease: 'power3.out'
        })
        thumbTransform != tt && setThumbTransform(tt);

        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => translateThumbRight, 3000); // 3000ms = 3 seconds
    })

    useEffect(() => {
        translateThumbRight();

        // Clear the timeout when the component unmounts
        return () => clearTimeout(scrollTimeoutRef.current);
    }, []);

    useEffect(() => {
        console.log('thumbTransform', thumbTransform)
    }, [thumbTransform]);
    return <div className='scrollbar'>
        <div className='inner'>
            <div className='thumb' ref={thumbRef} ></div>
        </div>
    </div>
}

LenisProvider.displayName = 'LenisProvider';

export { LenisProvider };