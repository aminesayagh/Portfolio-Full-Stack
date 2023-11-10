import { ReactElement, createContext, useEffect, useRef } from 'react';

import { ScrollTrigger } from '@/utils/gsap';
import Lenis from '@studio-freight/lenis';
import useResizeObserver from 'use-resize-observer';
import { useDebounce } from '@/hook/useDebounce';

interface LenisContextValue {

}
const LenisContext = createContext<LenisContextValue>({

});

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

interface Emitter {}
interface Dimensions {}
interface ReactLenisOptions {

}
type ScrollTo = (target: string | number | HTMLElement, options: ScrollToParams) => void;
interface LenisInstance {
    animationScroll: number;
    dimensions: Dimensions;
    direction: number;
    emitter: Emitter;
    options: ReactLenisOptions;
    targetScroll: number;
    time: number;
    actualScroll: number;
    velocity: number;
    isHorizontal: boolean;
    isScrolling: boolean;
    isSmooth: boolean;
    isStopped: boolean;
    limit: number;
    progress: number;
    rootElement: HTMLElement;
    stop: () => void;
    start: () => void;
    resize: () => void;
    destroy: () => void;
    on: (event: string, callback: CallbackFunction) => void;
    scrollTo: ScrollTo;
    raf: (time: number) => void;
    // ... additional methods 
}

type CallbackFunction = (instance: LenisInstance) => void;

export function LenisProvider({
    children, containerRef
}: { children: ReactElement, containerRef: React.RefObject<HTMLDivElement> }) {
    const LenisRef = useRef<Lenis>();

    const { width: widthContainer, height: heightContainer } = useResizeObserver<HTMLDivElement>({ ref: containerRef });   
    
    const width = useDebounce(widthContainer, 30);
    const height = useDebounce(heightContainer, 30);

    useEffect(() => {
        LenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
        
        LenisRef.current.on('scroll', (e: any) => {
            // console.log('scroll updated', e);
        })
        function raf(time: number) {
            LenisRef.current?.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            LenisRef.current?.destroy();
        }
    }, []);

    useEffect(() => {
        console.log('LenisProvider: refresh');
        ScrollTrigger.refresh();
    }, [width, height]);
    return children;
}
