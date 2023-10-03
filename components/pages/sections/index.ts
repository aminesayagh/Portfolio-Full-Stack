
import dynamic from 'next/dynamic';

export const DynamicIntro = dynamic(() => import('./1-intro'));
export const DynamicManifesto = dynamic(() => import('./2-manifesto'));
export const DynamicVideo = dynamic(() => import('./video'));
export const DynamicExpertise = dynamic(() => import('./3-expertise'));
export const DynamicCallToAction = dynamic(() => import('./3_1-action'));
export const DynamicCases = dynamic(() => import('./4-cases'));
export const DynamicAction = dynamic(() => import('./5-action'));