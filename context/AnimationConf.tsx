import React, { useEffect, useContext, useState, createContext, useRef, startTransition } from 'react';
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
            let scroll: LocomotiveScroll;
            import('locomotive-scroll').then((locomotiveModule) => {
                const el = document.querySelector('[data-scroll-container]') as HTMLElement;
                if (!el) throw new Error('Scroll container not found');
                console.log('init locomotive scroll', el);
                scroll = new locomotiveModule.default({
                    el,
                    smooth: true,
                    smartphone: {
                        smooth: true,
                    },
                    // @ts-ignore
                    tablet: {
                        smooth: true,
                    },
                    getDirection: true,
                    getSpeed: true,
                });
                console.log('init locomotive scroll', scroll);
                scroll.on('scroll', () => {
                    ScrollTrigger.update();
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
                ScrollTrigger.defaults({ scroller: el });

                if (!scrollbar) setScrollbar(scroll);
            }).catch((err) => {
                console.error('error: ', err);
                // throw new Error(err);
            }).finally(() => {
                removeLoadingComponent(LOADING_COMPONENT_KEY);
            });
        }
    }, [isStart, scrollbar, removeLoadingComponent, addLoadingComponent]);
    useEffect(() => {
        if (scrollbar) {
            const updateScroll = () => {
                scrollbar.update();
            }

            window.addEventListener('DOMContentLoaded', updateScroll);
            window.addEventListener('resize', updateScroll);
            window.addEventListener('load', updateScroll);

            return () => {
                console.log('destroy locomotive scroll');
                ScrollTrigger.removeEventListener('refresh', updateScroll);
                // scrollbar.destroy();
                window.removeEventListener('DOMContentLoaded', updateScroll);
                window.removeEventListener('resize', updateScroll);
                window.removeEventListener('load', updateScroll);
            }
        }

    }, [scrollbar])
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