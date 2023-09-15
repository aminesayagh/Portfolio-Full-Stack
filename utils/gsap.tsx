import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// @ts-ignore
gsap.core?.globals('ScrollToPlugin', ScrollToPlugin);

gsap.defaults({ 
    ease: "none",
    duration: 1,
});
gsap.registerEffect({
    name: 'itemMenuHoverPlay',
    effect: (targets: any, config: any) => {
        return gsap.timeline({
            defaults: {
                duration: 0.2
            }
        }).fromTo(targets, {
            yPercent: 0,
            skewY: 0,
            color: '#FEFEFE',
        }, {
            yPercent: -100,
            color: '#FEFEFE',
            skewY: 5,
        }).fromTo(targets, {
            yPercent: 100,
            skewY: 5,
            color: '#6A5EEF',
        }, {
            yPercent: 0,
            skewY: 0,
            color: '#6A5EEF',

        })
    },
    extendTimeline: true,
});
gsap.registerEffect({
    name: 'itemMenuHoverReverse',
    effect: (targets: any, config: any) => {
        return gsap.timeline({
            defaults: {
                duration: 0.2
            }
        }).fromTo(targets, {
            yPercent: 0,
            skewY: 0,
            color: '#6A5EEF',
        }, {
            yPercent: 100,
            color: '#6A5EEF',

            skewY: 5,
        }).fromTo(targets, {
            yPercent: -100,
            color: '#FEFEFE',
            skewY: 5,
        }, {
            color: '#FEFEFE',
            yPercent: 0,
            skewY: 0,
        })
    },
    extendTimeline: true,
});

export * from 'gsap';
export * from 'gsap/dist/ScrollTrigger';
// export * from 'gsap/dist/ScrollToPlugin';