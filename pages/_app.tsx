
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
// @ts-ignore
import { useFrame } from '@studio-freight/hamo';
import { LenisInstance } from '@/lib/Lenis/Lenis.context.jsx';


const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function App({ Component, pageProps }: AppProps) {
  const font = montserrat.variable;
  // const className = montserrat.className;
  const [isReadyFont, setIsReadyFont] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-montserrat', font);
    document.body.classList.add(font);
    const time = setTimeout(() => {
      setIsReadyFont(true);
    }, 1000);
    return () => {
      setIsReadyFont(false);
      clearTimeout(time);
    }
  }, [font]);


  const lenisRef = useRef<LenisInstance>();

  useFrame((time: number) => {
    lenisRef.current?.raf(time);
  })

  useLenis(() => {
    ScrollTrigger.refresh();
  });
  if(!font) return null;
  return <>
    <Scripts />
    <main className={`app-container`}>
      <LoadingProvider fontReady={isReadyFont}>
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