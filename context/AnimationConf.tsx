import React, { createContext, useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import { useRouter } from 'next/router';

// @ts-ignore
import easing from 'easing-js';

import { ScrollProvider } from './ScrollContext';



class ModalPlugin extends ScrollbarPlugin {
    static pluginName = 'modal';
    static defaultOptions = {
        open: false,
    }
    transformDelta(delta: any, fromEvent: any) {
        if (this.options.open) {
            return { x: 0, y: 0 };
        }
        return delta;
    }
}
Scrollbar.use(ModalPlugin);
Scrollbar.use(OverscrollPlugin);

// @ts-ignore
gsap.core?.globals('ScrollToPlugin', ScrollToPlugin);

ScrollTrigger.defaults({
    markers: false
})


const AnimationConf = ({ children }: { children: React.ReactNode }) => {
    let app = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const { setScrollbar } = useContext(ScrollProvider)
    const scrollbar = useRef<Scrollbar | null>(null);
    useEffect(() => {
        let ctx = gsap.context((self) => {
            const element = document.querySelector('#scroller') as HTMLElement;
            if (!element) {
                console.error('No element with id scroller');
                return;
            };
    
            const bodyScrollBar = Scrollbar.init(element, {
                damping: 0.2,
                delegateTo: document,
                plugins: {
                    modal: {
                        open: false,
                    }
                }
            });
    
            bodyScrollBar.setPosition(0, 0);
            bodyScrollBar.updatePluginOptions('overscroll', {
                effect: 'glow',
                damping: 0.2,
                maxOverscroll: 150,
                glowColor: '#ffffff',
            });
            gsap.registerPlugin(ScrollToPlugin);
            ScrollTrigger.scrollerProxy(element, {
                scrollTop(value) {
                    if (arguments.length) {
                        if (bodyScrollBar.scrollTop !== value && typeof value === 'number') {
                            bodyScrollBar.scrollTop = value;
                        }
                    }
                    return bodyScrollBar.scrollTop;
                },
                scrollLeft(value) {
                    if (arguments.length) {
                        if (bodyScrollBar.scrollLeft !== value && typeof value === 'number') {
                            bodyScrollBar.scrollLeft = value;
                        }
                    }
                    return bodyScrollBar.scrollLeft;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                },
                pinType: element.style.transform ? 'transform' : 'fixed',
                fixedMarkers: true
            });
            bodyScrollBar.addListener(ScrollTrigger.update);
            ScrollTrigger.defaults({ scroller: element });
    
            ScrollTrigger.create({
                scroller: element,
            });
    
            bodyScrollBar.track.xAxis.element.remove();
            bodyScrollBar.addListener((e) => {
                if (e.offset.y < 0) {
                    gsap.to('#scroller', {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        scrollTrigger: {
                            scroller: '#scroller',
                        }
                    })
                }
            });
            scrollbar.current = bodyScrollBar;
    
            setScrollbar(bodyScrollBar);
            return () => {
                bodyScrollBar.destroy();
                ScrollTrigger.getAll().forEach((trigger) => {
                    trigger.kill();
                });
                ScrollTrigger.defaults({ scroller: window });
            }
        });
        return () => {
            ctx.revert();
        }
    }, []);
    useEffect(() => {
        const scrollToId = (url: string) => {
            if (!scrollbar.current) return;
            const urlSplit = url.split('/');
            const id = urlSplit[urlSplit.length - 1].replace('#', '');
            if (!id) return;
            const element = document.getElementById(id);
            if (!element) return;
            const top = element.getBoundingClientRect().top - scrollbar.current.scrollTop;
            const direction = top > 0 ? 1 : -1;
            scrollbar.current.scrollTo(0, top, 0, {
                easing: easing.easeOutBack,
                callback: () => {
                    gsap.from('#scroller', {
                        y: direction * 240,
                        opacity: 0,
                        duration: 0.6,
                    });
                }
            });
        };
        router.events.on('hashChangeComplete', scrollToId);

        return () => {
            router.events.off('hashChangeComplete', scrollToId);
        }
    }, [router]);
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