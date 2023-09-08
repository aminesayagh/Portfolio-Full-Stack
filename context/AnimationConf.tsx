import React, { useEffect, useRef, useState, useContext } from 'react';

import { ScrollProvider } from './ScrollContext';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

// @ts-ignore
gsap.core?.globals('ScrollToPlugin', ScrollToPlugin);

ScrollTrigger.defaults({
    markers: false
})


const AnimationConf = ({ children }: { children: React.ReactNode }) => {
    let app = useRef<HTMLDivElement | null>(null);
    const { scrollbar, setScrollbar } = useContext(ScrollProvider)

    useEffect(() => {
        const locomotiveInit = async () => {
            try {
                const LocomotiveScroll = (await import('locomotive-scroll')).default;
                const selector = document.querySelector('#scroller') as HTMLElement;
                const locomotiveScroll = new LocomotiveScroll({
                    el: selector,
                    smooth: true,
                })
                setScrollbar(locomotiveScroll);
                locomotiveScroll.on("scroll", ScrollTrigger.update);
                ScrollTrigger.scrollerProxy('#scroller', {
                    scrollTop(value) {
                        return arguments.length ?
                            // @ts-ignore
                            locomotiveScroll.scrollTo(value, 0, 0) : locomotiveScroll.scroll.instance.scroll.y;
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        };
                    },
                    pinType: selector.style.transform ? 'transform' : 'fixed',
                    // fixedMarkers: false
                });
                // @ts-ignore
                ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update());
                ScrollTrigger.defaults({ scroller: "#scroller" });
                // ScrollTrigger.refresh();
            } catch (error) {
                console.error(error);
                // throw Error(`[SmoothScrollProvider]: ${error}`)
            }
        }
        if (!scrollbar) {
            locomotiveInit();
        }
        return () => {
            scrollbar && scrollbar.destroy();
        }
    }, [scrollbar]);
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.config({
                nullTargetWarn: false
            });
            gsap.to(app, 0, { css: { visibility: 'visible' } });
        });
        return () => {
            ctx.revert();
        }
    }, []);

    return <><div ref={el => {
        // @ts-ignore
        app = el
    }} className="app-container" id='main-container'>
        {children}
    </div>
        <style jsx>{`
            .app-container{
                visibility: hidden;
            }
        `}</style>
    </>

}

export default AnimationConf;