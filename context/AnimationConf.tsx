import React, { useEffect, useContext, useState, createContext, ElementRef } from 'react';
import { gsap } from '@/utils/gsap';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from '@/utils/gsap';
import { LoadingContext } from '@/components/ui';
export const ScrollProvider = createContext<{
    scrollbar: null | LocomotiveScroll
}>({
    scrollbar: null,
});

const LOADING_COMPONENT_KEY = 'AnimationScrollbarConf';

const AnimationConf = ({ children }: { children: React.ReactNode }) => {
    const [scrollbar, setScrollbar] = useState<LocomotiveScroll | null>(null);
    const { addLoadingComponent, removeLoadingComponent } = useContext(LoadingContext);

    useEffect(() => {
        if (!scrollbar) {
            addLoadingComponent(LOADING_COMPONENT_KEY);
            ;(async () => {
                try {
                    
                    const LocomotiveScroll = (await import('locomotive-scroll')).default;
                    setScrollbar(() => {
                        const scroll = new LocomotiveScroll({
                            el: document.querySelector('[data-scroll-container]') as HTMLElement,
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
                        let el = document.querySelector('[data-scroll-container]') as HTMLElement;
                        scroll.on('scroll', () => {
                            ScrollTrigger.update()
                        });
                        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                            scrollTop(value) {
                                return !!value
                                    // @ts-ignore
                                    ? scroll.scrollTo(value, { duration: 0, disableLerp: true }) : scroll.scroll.instance.scroll.y
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

                        return scroll;
                    })
                } catch (err) {
                    throw new Error(`[SmoothScrollProvider] : ${err}`);
                } finally {
                    removeLoadingComponent(LOADING_COMPONENT_KEY);
                }
            })()
        }
        return () => {
            if(scrollbar) scrollbar.destroy();
        }
    }, [scrollbar]);
    useEffect(() => {
        if (scrollbar) {
            window.addEventListener('resize', () => {
                scrollbar.update();
            });
            scrollbar.update();
            return () => {
                window.removeEventListener('resize', () => {});
            }
        }
    }, [scrollbar]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.config({
                nullTargetWarn: false
            });
            if (scrollbar) {
                gsap.to('.app-container', 0, { css: { visibility: 'visible' } });
            }
        });
        return () => {
            ctx.revert();
        }
    }, [scrollbar]);
    return <>
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
    </>

}

export default AnimationConf;