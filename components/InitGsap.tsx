import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.defaults({ ease: "none", duration: 1 });