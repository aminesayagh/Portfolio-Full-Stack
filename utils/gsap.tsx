import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
// import timelinemax
export { TimelineMax } from 'gsap';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

gsap.defaults({ 
    ease: "none",
    duration: 1,
});

export * from 'gsap';
export * from 'gsap/dist/ScrollTrigger';