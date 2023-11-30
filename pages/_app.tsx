
import { useRef, useEffect, useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import { Montserrat } from 'next/font/google';

import type { AppProps } from 'next/app';
import nextI18NextConfig from '../next-i18next.config.js';
import { LenisProvider, useLenis } from '@/lib/Lenis';
import { LoadingProvider } from '@/components/ui/preloader';
import Scripts from '@/components/common/script';
import '../styles/globals.scss';
import '../utils/i18n';
import { gsap } from '@/utils/gsap';
// @ts-ignore
import { useFrame } from '@studio-freight/hamo';
import { LenisInstance } from '@/lib/Lenis/Lenis.context.jsx';


const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function App({ Component, pageProps }: AppProps) {
  const font = useRef(montserrat.variable);
  const className = montserrat.className;
  const [isReadyFont, setIsReadyFont] = useState(false);

  useEffect(() => {
    setIsReadyFont(true);
    document.body.classList.add(font.current);
    document.body.classList.add('font-sans');
    document.documentElement.style.setProperty('--font-montserrat', font.current);
    return () => {
      document.body.classList.remove(className);
      document.body.classList.remove('font-sans');
    }
  }, [font]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        paused: true
      }).set('body', {
        delay: 0.04,
        visibility: 'visible'
      }).fromTo('.app-container', {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.5,
        ease: 'Power4.out',
      });
      if(isReadyFont) {
        tl.play();
      }
      return tl;
    });
    return () => {
      ctx.revert();
    }
  }, [isReadyFont])

  const lenisRef = useRef<LenisInstance>();

  useFrame((time: number) => {
    lenisRef.current?.raf(time);
  })

  useLenis(() => {
    ScrollTrigger.refresh();
  });

  return <>
    <Scripts />
    <main className={`app-container opacity-0`}>
      <LoadingProvider>
        <LenisProvider autoRaf={true} ref={lenisRef} options={{
          smoothTouch: true,
          isSmooth: true,
          
          duration: 1.2,
          wheelMultiplier: 1.15,
          touchMultiplier: 1.9,
          infinite: false,
          autoResize: false,
          direction: 'vertical',
          gestureDirection: 'vertical',
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        }}  >
            <Component {...pageProps} />
        </LenisProvider>
      </LoadingProvider>
    </main>
    
  </>
}

export default appWithTranslation(App, nextI18NextConfig);