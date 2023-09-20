
// export { default as Intro } from './1-intro';
// export { default as Manifesto } from './2-manifesto';
// export { default as Video } from './video';
// export { default as Expertise } from './3-expertise';
// export { default as CallToAction } from './3_1-action';
// export { default as Cases } from './4-cases';
// export { default as Action } from './5-action';

import dynamic from 'next/dynamic';

export const DynamicIntro = dynamic(() => import('./1-intro'));
export const DynamicManifesto = dynamic(() => import('./2-manifesto'));
export const DynamicVideo = dynamic(() => import('./video'));
export const DynamicExpertise = dynamic(() => import('./3-expertise'));
export const DynamicCallToAction = dynamic(() => import('./3_1-action'));
export const DynamicCases = dynamic(() => import('./4-cases'));
export const DynamicAction = dynamic(() => import('./5-action'));