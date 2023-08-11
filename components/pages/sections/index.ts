import dynamic from 'next/dynamic';
// export { default as Intro } from './1-intro'
// export { default as Manifesto } from './2-manifesto';
// export { default as Cases } from './4-cases';
// export { default as Action } from './5-action';
export { default as Video } from './video';


export const Intro = dynamic(() => import('./1-intro'), { ssr: false });
export const Manifesto = dynamic(() => import('./2-manifesto'), { ssr: false });
export const Expertise = dynamic(() => import('./3-expertise'), { ssr: false });
export const Cases = dynamic(() => import('./4-cases'), { ssr: false });
export const Action = dynamic(() => import('./5-action'), { ssr: false });