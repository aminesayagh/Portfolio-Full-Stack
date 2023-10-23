import React, { useEffect, useContext, useState, createContext, useRef } from 'react';
import { ScrollTrigger, gsap } from '@/utils/gsap';
import { LoadingContext } from '@/components/ui';
import { useTranslation } from 'next-i18next';

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

    useEffect(() => {
        if (!isStart.current && !scrollbar) {
            isStart.current = true;
            addLoadingComponent(LOADING_COMPONENT_KEY);
            let scroll: LocomotiveScroll;
            import('locomotive-scroll').then((locomotiveModule) => {
                gsap.registerPlugin(ScrollTrigger);
                const el = document.querySelector('[data-scroll-container]') as HTMLElement;
                if (!el) throw new Error('Scroll container not found');
                scroll = new locomotiveModule.default({
                    el,
                    smooth: true,
                    lerp: 0.09,
                    getDirection: true,
                });
                const scrollUpdate = (instance: LocomotiveScroll.OnScrollEvent) => {
                    document.documentElement.setAttribute('data-direction', 'horizontal');
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

                if (!scrollbar) {
                    setScrollbar(scroll);
                }

                // Handle window events
                const updateScroll = () => {
                    console.log('update scroll trigger');
                    scroll.update();
                }
                ScrollTrigger.addEventListener('refresh', updateScroll);
                ScrollTrigger.defaults({ scroller: el });
                ScrollTrigger.refresh();
            }).catch((err) => {
                console.error('error: ', err);
                throw new Error(err);
            }).finally(() => {
                removeLoadingComponent(LOADING_COMPONENT_KEY);
            });
        }
    }, [scrollbar, removeLoadingComponent, addLoadingComponent]);
    useEffect(() => {
        ScrollTrigger.refresh();
    }, [i18n.language]);

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

export default AnimationConf;