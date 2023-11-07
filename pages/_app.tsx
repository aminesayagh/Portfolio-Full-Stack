
import { useRef, useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Montserrat } from 'next/font/google';

import type { AppProps } from 'next/app';
import nextI18NextConfig from '../next-i18next.config.js';
import { LocomotiveScrollProvider } from '@/lib/LocomotiveScroll';
import { LoadingProvider } from '@/components/ui/preloader';
import Scripts from '@/components/common/script';
import '../styles/globals.scss';
import '../utils/i18n';


const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function App({ Component, pageProps }: AppProps) {
  const ref = useRef(null);
  const { asPath } = useRouter();
  const font = montserrat.variable;
  const className = montserrat.className;
  useEffect(() => {
    document.documentElement.style.setProperty('--font-montserrat', font);
    document.body.classList.add(font);
    document.body.classList.add('font-sans');
  }, [font]);

  return <>
    <Scripts />
    <main className={`app-container`}>
      <LoadingProvider>
        <LocomotiveScrollProvider options={{
          smooth: true,
          smoothMobile: true,
          getDirection: true,
          getSpeed: true,
          // @ts-ignore
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        }}
          watch={[asPath]}
          containerRef={ref}
        >
          <div data-scroll-container ref={ref} >
              <Component {...pageProps} />
          </div>
        </LocomotiveScrollProvider>
      </LoadingProvider>
    </main>
  </>
}

export default appWithTranslation(App, nextI18NextConfig);