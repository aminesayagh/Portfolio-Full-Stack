import { LocomotiveScrollOptions, Scroll } from 'locomotive-scroll';
import { DependencyList, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hook/useDebounce';
import useResizeObserver from 'use-resize-observer';
import { ScrollTrigger } from '@/utils/gsap';

type ScrollTo = (target: string, options?: { offset?: number, duration?: number, easing?: number[] }) => void;
export interface LocomotiveScrollContextValue {
    scroll: Scroll | null;
    isReady: boolean;
    scrollTo: ScrollTo;
    hasToReload: number;
}

export const LocomotiveScrollContext = createContext<LocomotiveScrollContextValue>({
    scroll: null,
    isReady: false,
    scrollTo: () => { },
    hasToReload: 0,
});

export interface LocomotiveScrollProviderProps {
    options: LocomotiveScrollOptions;
    containerRef?: React.RefObject<HTMLDivElement>;
    watch?: DependencyList | undefined;
    onUpdate?: (scroll: Scroll) => void
    location?: string;
    onLocationChange?: (scroll: Scroll, path?: string) => void;
}

export function LocomotiveScrollProvider({
    children, options, containerRef, watch = [], location, onUpdate, onLocationChange
}: WithChildren<LocomotiveScrollProviderProps>) {
    const LocomotiveScrollRef = useRef<Scroll | null>(null);
    const hasScrollbar = useRef(false);
    const [isReady, setIsReady] = useState(false);

    const { width: widthContainer, height: heightContainer } = useResizeObserver<HTMLDivElement>({ ref: containerRef });

    const width = useDebounce(widthContainer, 50);
    const height = useDebounce(heightContainer, 50);

    const [hasToReload, setHasToReload] = useState(0);

    useEffect(() => {
        ; (async () => {
            try {
                if (!hasScrollbar.current && typeof window !== 'undefined' && !LocomotiveScrollRef.current) {
                    hasScrollbar.current = true;
                    // console.log('LocomotiveScrollProvider: hasScrollbar');
                    const LocomotiveScroll = (await import('locomotive-scroll')).default

                    const dataScrollContainer = document.querySelector('[data-scroll-container]')

                    if (!dataScrollContainer) {
                        console.warn(
                            `react-locomotive-scroll: [data-scroll-container] dataset was not found. You likely forgot to add it which will prevent Locomotive Scroll to work.`
                        )
                    }

                    LocomotiveScrollRef.current = new LocomotiveScroll({
                        el: dataScrollContainer ?? undefined,
                        ...options,
                    });

                    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                        scrollTop(value) {
                            if (arguments.length && typeof value === 'string') {
                                LocomotiveScrollRef.current?.scrollTo(value, { duration: 0.1, disableLerp: false })
                            } else {
                                return LocomotiveScrollRef.current?.scroll.instance.scroll.y
                            }
                        },
                        getBoundingClientRect() {
                            return {
                                top: 0,
                                left: 0,
                                width: window.innerWidth,
                                height: window.innerHeight,
                            }
                        },
                        // @ts-ignore
                        pinType: dataScrollContainer ? dataScrollContainer?.style?.transform ? 'transform' : 'fixed' : 'transform',
                    })

                    ScrollTrigger.defaults({ scroller: dataScrollContainer });

                    LocomotiveScrollRef.current.on('scroll', (instance) => {
                        // @ts-ignore
                        document.documentElement.setAttribute('data-direction', instance?.direction);
                        // @ts-ignore 
                        document.documentElement.setAttribute('data-speed', instance?.speed);
                        ScrollTrigger.update();
                    })

                    setIsReady(true) // Re-render the context
                }
            } catch (error) {
                throw Error(`react-locomotive-scroll: ${error}`)
            }
        })()

        return () => {
            LocomotiveScrollRef.current?.destroy();
            LocomotiveScrollRef.current = null;
            document.documentElement.removeAttribute('data-direction');
            document.documentElement.removeAttribute('data-speed');

            setIsReady(false);
            hasScrollbar.current = false;
            // console.log('LocomotiveScrollProvider: destroy');
        }
    }, []);

    const refreshLocomotiveScroll = () => {
        if (!LocomotiveScrollRef.current) {
            return
        }

        LocomotiveScrollRef.current.update();

        setHasToReload(hasToReload + 1);
        // console.log('refreshLocomotiveScroll');
    }

    const scrollTo: ScrollTo = (target, options) => {
        if (!LocomotiveScrollRef.current) {
            return;
        }
        LocomotiveScrollRef.current.scrollTo(target, {
            duration: 0.8,
            disableLerp: false,
            callback: () => {
                refreshLocomotiveScroll();
            }
        });
    }

    useEffect(
        () => {
            if (!LocomotiveScrollRef.current) {
                return
            }
            
            refreshLocomotiveScroll()

            if (onUpdate) {
                onUpdate(LocomotiveScrollRef.current)
            }
        },
        [...watch, height, width, onUpdate]
    )

    return (
        <LocomotiveScrollContext.Provider
            value={{
                scroll: LocomotiveScrollRef.current,
                isReady, scrollTo, hasToReload
            }}
        >
            {children}
        </LocomotiveScrollContext.Provider>
    )
}

LocomotiveScrollContext.displayName = 'LocomotiveScrollContext'
LocomotiveScrollProvider.displayName = 'LocomotiveScrollProvider'