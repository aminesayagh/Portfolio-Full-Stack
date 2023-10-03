import React, { useEffect, useRef, useState, createContext, ElementRef } from 'react';
import { gsap } from '@/utils/gsap';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from '@/utils/gsap';

export const ScrollProvider = createContext<{
    scrollbar: null | LocomotiveScroll
}>({
    scrollbar: null,
});


const AnimationConf = ({ children }: { children: React.ReactNode }) => {
    const [scrollbar, setScrollbar] = useState<LocomotiveScroll | null>(null);
    useEffect(() => {
        if (!scrollbar) {
            ; (async () => {
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
                window.removeEventListener('resize', () => {
                    scrollbar.update();
                });
            }
        }
    }, [scrollbar])
    // useEffect(() => {
    //     if (scrollbar) {
    //         let el = document.querySelector('[data-scroll-container]') as HTMLElement;
    //         const scroll = scrollbar;
    //         scroll.on('scroll', () => {
    //             ScrollTrigger.update();
    //         })

    //         ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    //             scrollTop(value) {
    //                 return arguments.length
    //                     // @ts-ignore
    //                     ? scroll.scrollTo(value, { duration: 1 }) : scroll.scroll.instance.scroll.y
    //             },
    //             getBoundingClientRect() {
    //                 return {
    //                     top: 0,
    //                     left: 0,
    //                     width: window.innerWidth,
    //                     height: window.innerHeight
    //                 }
    //             },
    //             pinType: el?.style?.transform
    //                 ? 'transform'
    //                 : 'fixed'
    //         });
    //         setScrollbar(scroll);
    //         ScrollTrigger.defaults({ scroller: el });

    //         ScrollTrigger.addEventListener('refresh', () => scrollbar.update            );

    //         window.addEventListener('resize', () => {
    //             scrollbar.update();
    //         })
    //         console.log('end of is loading');
    //         setIsLoading(false);
    //         scrollbar.update();
    //         return () => {
    //             ScrollTrigger.removeEventListener('refresh', () => {
    //                 scrollbar.update()
    //             });
    //             window.removeEventListener('resize', () => {
    //                 scrollbar.update();
    //             })
    //             scrollbar.destroy();
    //         }
    //     }
    // }, [scrollbar])
    // useEffect(() => {
    //     return () => {
    //         if (scrollbar) {
    //             scrollbar.destroy();
    //         }

    //     }
    // })

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