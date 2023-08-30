import dynamic from 'next/dynamic';



export { default as LandingPage } from './LandingPage';

export const ContactPage = dynamic(() => import('./ContactPage'), {
    ssr: false,
});
