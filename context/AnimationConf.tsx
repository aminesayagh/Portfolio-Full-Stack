import React, { useEffect, useRef, useState, useContext } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { ScrollProvider } from './ScrollContext';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// @ts-ignore
gsap.core?.globals('ScrollToPlugin', ScrollToPlugin);



const AnimationConf = ({ children }: { children: React.ReactNode }) => {
    let app = useRef<HTMLDivElement | null>(null);
    const { scrollbar, setScrollbar } = useContext(ScrollProvider)
    useEffect(() => {
        
        let scroll: LocomotiveScroll | null = null;
        import('locomotive-scroll').then((locomotiveModule) => {
            // gsap.registerPlugin(ScrollTrigger);
            let el = document.querySelector('[data-scroll-container]') as HTMLElement;
            scroll = new locomotiveModule.default({
                el: el,
                smooth: true,
                resetNativeScroll: true,
                getDirection: true,
                getSpeed: true,
                reloadOnContextChange: true,

                multiplier: 0.9,
            })
            setScrollbar(scroll);

            scroll.on('scroll', () => {
                ScrollTrigger.update()
            })

            ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                scrollTop(value) {
                    return arguments.length
                        // @ts-ignore
                        ? scroll.scrollTo(value, {duration: 0, disableLerp: true}) : scroll.scroll.instance.scroll.y
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    }
                },

                pinType: el?.style?.transform
                    ? 'transform'
                    : 'fixed',
            })
            ScrollTrigger.defaults({ scroller: el })
            ScrollTrigger.addEventListener('refresh', () => {
                scroll?.update()
            })
        })

        window.addEventListener('DOMContentLoaded', () => {
            scroll?.update()
            ScrollTrigger.refresh()
        })

        window.addEventListener('resize', () => {
            scroll?.update();
            ScrollTrigger.refresh()
        })
        return () => {
            scroll?.destroy();
            scrollbar?.destroy();
            ScrollTrigger.getAll().forEach((trigger) => {
                trigger.kill(true);
            });
        }
    }, [])
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.config({
                nullTargetWarn: false
            });
            if(scrollbar) {
                gsap.to(app, 0, { css: { visibility: 'visible' } });
            }
        });
        return () => {
            ctx.revert();
            scrollbar?.destroy();
        }
    }, [scrollbar]);

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