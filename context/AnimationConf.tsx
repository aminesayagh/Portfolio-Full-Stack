import React, { useEffect, useContext, useState, createContext, useRef } from 'react';
import { ScrollTrigger, gsap } from '@/utils/gsap';
import { LoadingContext } from '@/components/ui';
import { useTranslation } from 'react-i18next';

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
    const { i18n } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isStart.current && !scrollbar) {
            isStart.current = true;
            addLoadingComponent(LOADING_COMPONENT_KEY);
            let scroll: LocomotiveScroll;
            import('locomotive-scroll').then((locomotiveModule) => {
                const el = document.querySelector('[data-scroll-container]') as HTMLElement;
                if (!el) throw new Error('Scroll container not found');
                scroll = new locomotiveModule.default({
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
                        return !!arguments.length
                            // @ts-ignore
                            ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
                            // @ts-ignore
                            : scroll?.scroll.instance.scroll.y;
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
                        };
                    },
                    pinType: el?.style?.transform
                        ? 'transform'
                        : 'fixed'
                });

                ScrollTrigger.addEventListener('refresh', () => {
                    scroll.update();
                });
                // ScrollTrigger.refresh;
                ScrollTrigger.defaults({ scroller: el });

                if (!scrollbar) setScrollbar(scroll);

                // Handle window events
                const updateScroll = () => scroll?.update();
                
            }).catch((err) => {
                console.error('error: ', err);
                throw new Error(err);
            }).finally(() => {
                removeLoadingComponent(LOADING_COMPONENT_KEY);
            });
            
        } else {
            const updateScroll = () => scrollbar?.update();

            window.addEventListener('resize', updateScroll);
            window.addEventListener('orientationchange', updateScroll);
            window.addEventListener('load', updateScroll);

            // Cleanup on unmount
            return () => {
                window.removeEventListener('resize', updateScroll);
                window.removeEventListener('orientationchange', updateScroll);
                window.removeEventListener('load', updateScroll);
            };
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
                gsap.to('.app-container', 0, { css: { visibility: 'visible' } });
            }
        });
        return () => {
            ctx.revert();
        }
    }, [scrollbar]);

    return <React.Fragment>
        <div className="app-container" id='main-container'>
            <ScrollProvider.Provider value={{
                scrollbar
            }} >
                <div data-scroll-container ref={ref}>
                    {children}
                </div>
            </ScrollProvider.Provider>
        </div>
        <style jsx>{`
            .app-container{
                visibility: hidden;
            }
        `}</style>
    </React.Fragment>
}

export default AnimationConf;