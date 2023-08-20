import React, { createContext, useState, useEffect, useLayoutEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useWindowSize } from 'react-use';

export const ScrollProvider = createContext<{
    pauseScroll: null | (() => void),
    restartScroll: null | (() => void)
}>({ pauseScroll: null, restartScroll: null });

gsap.registerPlugin(ScrollToPlugin);


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

// @ts-ignore
gsap.core?.globals('ScrollToPlugin', ScrollToPlugin);

ScrollTrigger.defaults({
    markers: false
})

const ScrollbarComponent = ({ children }: { children: React.ReactNode }) => {
    const [pauseScroll, setPauseScroll] = useState<null | (() => void)>(null);
    const [restartScroll, setRestartScroll] = useState<null | (() => void)>(null);

    useEffect(() => {
        const element = document.querySelector('#scroller') as HTMLElement;
        if (!element) {
            console.error('No element with id scroller');
            return;
        };

        const bodyScrollBar = Scrollbar.init(element, {
            damping: 0.2,
            delegateTo: document,
            // plugins: {
            //     modal: {
            //         open: false,
            //     }
            // },
            alwaysShowTracks: false
        });

        bodyScrollBar.setPosition(0, 0);
        ScrollTrigger.scrollerProxy(element, {
            scrollTop(value) {
                if (typeof value !== 'number') return;
                if (arguments.length) {
                    bodyScrollBar.scrollTop = value;
                }
                return bodyScrollBar.scrollTop;
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
        const pauseScroll = () => bodyScrollBar.updatePluginOptions('modal', {
            open: true
        });
        const restartScroll = () => bodyScrollBar.updatePluginOptions('modal', {
            open: false
        });
        setPauseScroll(pauseScroll);
        setRestartScroll(restartScroll);
    }, []);
    return <ScrollProvider.Provider value={{ pauseScroll, restartScroll }}>{children}</ScrollProvider.Provider>
}

const AnimationConf = ({ children }: { children: React.ReactNode }) => {
    let app = useRef<HTMLDivElement | null>(null);
    const { width, height } = useWindowSize();
    useEffect(() => {
        ScrollTrigger.refresh();
    }, [width, height]);
    useEffect(() => {
        gsap.config({
            nullTargetWarn: false
        });
        gsap.to(app, 0, { css: { visibility: 'visible' } });
        // let ctx = gsap.context(() => {
        // });
        // return () => {
        //     ctx.revert();
        // }
    }, []);

    return <><div ref={el => {
        // @ts-ignore
        app = el
    }} className="app-container" id='main-container'>
        <ScrollbarComponent>
            {children}
        </ScrollbarComponent>
    </div>
        <style jsx>{`
            .app-container{
                visibility: hidden;
            }
        `}</style>
    </>

}

export default AnimationConf;