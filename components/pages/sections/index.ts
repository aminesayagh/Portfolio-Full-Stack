import dynamic from 'next/dynamic';
export { default as Video } from './video';


// export const Intro = dynamic(() => import('./1-intro'));
// export const Manifesto = dynamic(() => import('./2-manifesto'));
// export const Expertise = dynamic(() => import('./3-expertise'));
// export const CallToAction = dynamic(() => import('./3_1-action'));
// export const Cases = dynamic(() => import('./4-cases'));
// export const Action = dynamic(() => import('./5-action'));

export { default as Intro } from './1-intro';
export { default as Manifesto } from './2-manifesto';
export { default as Expertise } from './3-expertise';
export { default as CallToAction } from './3_1-action';
export { default as Cases } from './4-cases';
export { default as Action } from './5-action';
