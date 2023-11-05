import { LocomotiveScrollOptions, Scroll } from 'locomotive-scroll';
import { DependencyList, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hook/useDebounce';
import useResizeObserver from 'use-resize-observer';
import { ScrollTrigger } from '@/utils/gsap';

export interface LocomotiveScrollContextValue {
    scroll: Scroll | null;
    isReady: boolean;
}

export const LocomotiveScrollContext = createContext<LocomotiveScrollContextValue>({
    scroll: null,
    isReady: false,
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
    children, options, containerRef, watch, location, onUpdate, onLocationChange
}: WithChildren<LocomotiveScrollProviderProps>) {
    const LocomotiveScrollRef = useRef<Scroll | null>(null);

    const [isReady, setIsReady] = useState(false);
    const [hasScrollbar, setHasScrollbar] = useState(false);

    const { width: widthContainer, height: heightContainer } = useResizeObserver<HTMLDivElement>({ ref: containerRef });

    const width = useDebounce(widthContainer, 50);
    const height = useDebounce(heightContainer, 50);

    useEffect(() => {
        ; (async () => {
            try {
                if (!hasScrollbar) {
                    setHasScrollbar(true);
                    const LocomotiveScroll = (await import('locomotive-scroll')).default

                    const dataScrollContainer = document.querySelector('[data-scroll-container]')

                    if (!dataScrollContainer) {
                        console.warn(
                            `react-locomotive-scroll: [data-scroll-container] dataset was not found. You likely forgot to add it which will prevent Locomotive Scroll to work.`
                        )
                        return;
                    }

                    LocomotiveScrollRef.current = new LocomotiveScroll({
                        el: dataScrollContainer ?? undefined,
                        ...options,
                    });

                    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                        scrollTop(value) {
                            if (arguments.length && typeof value === 'string') {
                                LocomotiveScrollRef.current?.scrollTo(value, { duration: 0.1, disableLerp: true })
                            }
                            return LocomotiveScrollRef.current?.scroll.instance.scroll.y
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

            setIsReady(false);
            setHasScrollbar(false);
        }
    }, [])

    const refreshLocomotiveScroll = () => {
        if (!LocomotiveScrollRef.current) {
            return
        }
        LocomotiveScrollRef.current.update();
        ScrollTrigger.refresh();
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
        watch ? [...watch, height, width, onUpdate] : [height, width, onUpdate]
    )

    useEffect(() => {
        if (!LocomotiveScrollRef.current || !location) {
            return
        }

        refreshLocomotiveScroll()

        if (onLocationChange) {
            onLocationChange(LocomotiveScrollRef.current, location)
        }
    }, [location, onLocationChange]);

    return (
        <LocomotiveScrollContext.Provider
            value={{
                scroll: LocomotiveScrollRef.current,
                isReady,
            }}
        >
            {children}
        </LocomotiveScrollContext.Provider>
    )
}

LocomotiveScrollContext.displayName = 'LocomotiveScrollContext'
LocomotiveScrollProvider.displayName = 'LocomotiveScrollProvider'