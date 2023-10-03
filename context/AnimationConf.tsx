import React, { useEffect, useRef, useState, createContext, ElementRef } from 'react';
import { gsap } from '@/utils/gsap';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from '@/utils/gsap';

export const ScrollProvider = createContext<{
    scrollbar: null | LocomotiveScroll,
}>({
    scrollbar: null,
});


const AnimationConf = ({ children }: { children: React.ReactNode }) => {
    const [scrollbar, setScrollbar] = useState<LocomotiveScroll | null>(null);

    useEffect(() => {
        let scroll: LocomotiveScroll | null = null;
        import('locomotive-scroll').then((locomotiveModule) => {
            let el = document.querySelector('[data-scroll-container]') as HTMLElement;
            scroll = new locomotiveModule.default({
                el: el,
                smooth: true,
                reloadOnContextChange: true,
                multiplier: 1,
                getSpeed: true,
                getDirection: true,
                smartphone: {
                    smooth: true
                },
                // @ts-ignore
                tablet: {
                    smooth: true
                },

            })
            setScrollbar(scroll);

            scroll.on('scroll', () => {
                ScrollTrigger.update();
            })

            ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                scrollTop(value) {
                    return arguments.length
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
                if (scrollbar) {
                    scroll?.update()
                }
            });
        }).catch((err) => {
            console.error('Error importing locomotive-scroll');
            console.error(err);
            setScrollbar(null);
        })

        window.addEventListener('resize', () => {
            scroll?.update();
        })

        return () => {
            if (scroll && scrollbar) {
                scroll.destroy();
                scrollbar.destroy();
            }
        }
    }, []);

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
            scrollbar?.destroy();
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