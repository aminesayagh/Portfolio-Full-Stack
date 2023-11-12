
import { useRef, useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Montserrat } from 'next/font/google';

import type { AppProps } from 'next/app';
import nextI18NextConfig from '../next-i18next.config.js';
import { LocomotiveScrollProvider } from '@/lib/LocomotiveScroll';
import { LenisProvider, useLenis } from '@/lib/Lenis';
import { LoadingProvider } from '@/components/ui/preloader';
import Scripts from '@/components/common/script';
import '../styles/globals.scss';
import '../utils/i18n';
import { useFrame } from '@studio-freight/hamo';
import { LenisInstance } from '@/lib/Lenis/Lenis.context.jsx';


const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function App({ Component, pageProps }: AppProps) {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const { asPath } = useRouter();
  const font = montserrat.variable;
  const className = montserrat.className;
  useEffect(() => {
    document.documentElement.style.setProperty('--font-montserrat', font);
    document.body.classList.add(font);
    document.body.classList.add('font-sans');
  }, [font]);

  const lenisRef = useRef<LenisInstance>();

  useFrame((time: number) => {
    lenisRef.current?.raf(time);
  })

  useLenis((lenis) => {
    ScrollTrigger.refresh();
    console.log('lenis', lenis);
  })

  

  return <>
    <Scripts />
    <main className={`app-container`}>
      <LoadingProvider>
        <LenisProvider autoRaf={true} ref={lenisRef} options={{
          smoothTouch: true,
          isSmooth: true,
          duration: 1.2,
          touchMultiplier: 1.2,
          infinite: false,

        }}  >
            <Component {...pageProps} />
        </LenisProvider>
      </LoadingProvider>
    </main>
  </>
}

export default appWithTranslation(App, nextI18NextConfig);