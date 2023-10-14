import React, { useEffect, useContext, useState, createContext, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger, gsap } from '@/utils/gsap';
import { LoadingContext } from '@/components/ui';

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

    useEffect(() => {
        if (!isStart.current) {
            isStart.current = true;
            addLoadingComponent(LOADING_COMPONENT_KEY);
            ; (async () => {
                try {
                    const LocomotiveScroll = (await import('locomotive-scroll')).default;
                    console.log('load locomotive scroll');
                    const el = document.querySelector('[data-scroll-container]') as HTMLElement;
                    const scroll = new LocomotiveScroll({
                        el,
                        smooth: true,
                        getDirection: true,
                        getSpeed: true,

                        smartphone: {
                            smooth: true,
                        },
                        // @ts-ignore
                        tablet: {
                            smooth: true,
                        },
                    });
                    scroll.on('scroll', () => {
                        ScrollTrigger.update()
                    });
                    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                        scrollTop(value) {
                            return !!value
                                // @ts-ignore
                                ? scroll.scrollTo(value, { duration: 500, disableLerp: true }) : scroll.scroll.instance.scroll.y
                        },
                        getBoundingClientRect() {
                            return {
                                top: 0,
                                left: 0,
                                width: window.innerWidth,
                                height: window.innerHeight
                            }
                        },
                        pinType: el?.style?.transform
                            ? 'transform'
                            : 'fixed'
                    });

                    ScrollTrigger.defaults({ scroller: el });
                    ScrollTrigger.addEventListener('refresh', () => {
                        scroll.update();
                    });
                    
                    if(!scrollbar) setScrollbar(scroll);
                } catch (err) {
                    throw new Error(`[SmoothScrollProvider] : ${err}`);
                } finally {
                    removeLoadingComponent(LOADING_COMPONENT_KEY);
                }
            })()
        }
    }, [isStart, scrollbar, removeLoadingComponent, addLoadingComponent]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.config({
                nullTargetWarn: false
            });
            gsap.to('.app-container', 0, { css: { visibility: 'visible' } });
        });
        return () => {
            ctx.revert();
        }
    }, []);

    useEffect(() => {
        console.log(scrollbar);
    }, [scrollbar])

    return <React.Fragment>
        <div className="app-container" id='main-container'>
            <ScrollProvider.Provider value={{
                scrollbar
            }} >
                {children}
            </ScrollProvider.Provider>
        </div>
        <style jsx>{`
            .app-container{
                visibility: hidden;
            }
        `}</style>
    </React.Fragment>
}

export default React.memo(AnimationConf);