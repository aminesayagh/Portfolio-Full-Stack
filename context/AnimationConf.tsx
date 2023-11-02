import React, { useEffect, useContext, useState, createContext, useRef, useCallback } from 'react';
import { ScrollTrigger, gsap } from '@/utils/gsap';
import { LoadingContext } from '@/components/ui/preloader';
import { useEventListener } from '@/hook/useEventListener';
import { useEvent } from 'react-use';

export const ScrollProvider = createContext<{
    scrollbar: null | LocomotiveScroll,
}>({
    scrollbar: null,
});

const LOADING_COMPONENT_KEY = 'AnimationScrollbarConf';

const AnimationConf = ({ children }: { children: React.ReactNode }) => {
    const [scrollbar, setScrollbar] = useState<LocomotiveScroll | null>(null);
    const { addLoadingComponent, removeLoadingComponent } = useContext(LoadingContext);
    const isStart = useRef(false);
    const ref = useRef<HTMLDivElement>(null);

    const handlerRefresh = useCallback(() => {
        if (!scrollbar) return;
        ScrollTrigger.refresh();
    }, [scrollbar]);

    useEventListener('resize', handlerRefresh);
    useEventListener('load', handlerRefresh);
    useEventListener('resize', handlerRefresh, ref);


    useEffect(() => {
        if (!isStart.current && !scrollbar) {
            isStart.current = true;
            console.log('start');
            addLoadingComponent(LOADING_COMPONENT_KEY);
            let scroll: LocomotiveScroll;
            ;(async () => {
                try{
                    const { default: LocomotiveScroll } = await import('locomotive-scroll');
                    const el = document.querySelector('[data-scroll-container]') as HTMLElement;
                    if (!el) throw new Error('Scroll container not found');
                    scroll = new LocomotiveScroll({
                        el,
                        smooth: true,
                        lerp: 0.09,
                        multiplier: 0.9,
                        // @ts-ignore
                        tablet: {
                            smooth: true,
                        },
                        smartphone: {
                            smooth: true,
                        },
                        getDirection: true,
                        getSpeed: true,
                    });
                    const scrollUpdate = (instance: any) => {
                        document.documentElement.setAttribute('data-direction', instance?.direction);
                        ScrollTrigger.update();
                    }
                    scroll.on('scroll', (instance) => {
                        scrollUpdate(instance);
                    });
                    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                        scrollTop(value) {
                            return !!scroll && arguments.length ?
                                // @ts-expect-error
                                scroll.scrollTo(value, { duration: 0, disableLerp: true }) :
                                // @ts-expect-error
                                !!scroll && scroll.scroll.instance.scroll.y;
                        },
                        getBoundingClientRect() {
                            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                        },
                        pinType: el?.style?.transform
                            ? 'transform'
                            : 'fixed'
                    });
                    ScrollTrigger.defaults({ scroller: el });
                    if(!scrollbar) setScrollbar(scroll);
                    
                }catch(err) {
                    console.error(err);
                } finally {
                    removeLoadingComponent(LOADING_COMPONENT_KEY);
                }
            })();
        }
    }, [scrollbar, removeLoadingComponent, addLoadingComponent]);

    const delta = useRef(0);
    const lastScrollY = useRef(0);
    useEffect(() => {
        scrollbar && scrollbar.on('scroll', (e) => {
            if(e.delta.y < 140) {
                document?.documentElement.setAttribute('data-scroll-header-inside', 'false');
                return;
            } else {
                document?.documentElement.setAttribute('data-scroll-header-inside', 'true');
            }

            const diff = Math.abs(e.delta.y - lastScrollY.current);
            if(e.delta.y >= lastScrollY.current) {
                delta.current = delta.current >= 10 ? 10 : delta.current + diff;
            } else {
                delta.current = delta.current <= -10 ? -10 : delta.current - diff;
            }
            
            if (delta.current >= 10 && e.delta.y > 200) {
                gsap.to(".header-gsap", { duration: 0.3, y: -100, opacity: 0, ease: "power1.inOut" });
            } else if (delta.current <= -10 || e.delta.y < 200) {
                gsap.to(".header-gsap", { duration: 0.3, y: 0, opacity: 1, ease: "power1.inOut" });
            }
            lastScrollY.current = e.delta.y;
        });
    }, [scrollbar, lastScrollY, delta]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.config({
                nullTargetWarn: false
            });
            if (scrollbar) {
                // gsap.to('.app-container', 0, { css: { visibility: 'visible' } });
            }
        });
        return () => {
            ctx.revert();
        }
    }, [scrollbar]);

    return <React.Fragment>
        <div className="app-container" id='main-container' ref={ref}>
            <ScrollProvider.Provider value={{
                scrollbar
            }} >
                <div data-scroll-container>
                    {children}
                </div>
            </ScrollProvider.Provider>
        </div>
        <style jsx>{`
            .app-container{
                // visibility: hidden;
            }
        `}</style>
    </React.Fragment>
}

export default React.memo(AnimationConf);