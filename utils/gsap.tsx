import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


gsap.defaults({ 
    ease: "none",
    duration: 1,
});

export * from 'gsap';
export * from 'gsap/dist/ScrollTrigger';