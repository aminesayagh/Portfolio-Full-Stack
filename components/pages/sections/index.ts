import dynamic from 'next/dynamic';
// export { default as Intro } from './1-intro'
export { default as Manifesto } from './2-manifesto';
export { default as Cases } from './4-cases';
export { default as Action } from './5-action';
export { default as Video } from './video';


export const Intro = dynamic(() => import('./1-intro'), { ssr: false });