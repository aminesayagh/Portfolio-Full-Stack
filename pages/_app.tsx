
import type { AppProps } from 'next/app'
import '../styles/globals.scss';
import { useRef } from 'react';

import Script from 'next/script';

import { Montserrat } from 'next/font/google';
import { appWithTranslation } from 'next-i18next'

import Cursor from '@/components/ui/cursor';
import Noise from '@/components/ui/noise';

import nextI18NextConfig from '../next-i18next.config.js';
import '../utils/i18n';
import { LocomotiveScrollProvider } from '@/lib/LocomotiveScroll'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { LoadingProvider } from '@/components/ui/preloader';

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});


import { ToastRegion } from '@/components/common/toast';
const HeaderDynamic = dynamic(() => import('@/components/common/header'), {});

function App({ Component, pageProps }: AppProps) {
  const ref = useRef(null);
  const { asPath } = useRouter();
  return <>
    <Script id="google-analytics">{
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LBW0TBMSD6');
      `}
    </Script>
    <style>{`
      html, body, #__next {
        --font-montserrat: var(${montserrat.variable});
        font-family: var(${montserrat.variable});
      }
    `}</style>
    <main className={`${montserrat.variable} app-container`}>
      <LoadingProvider>
        <LocomotiveScrollProvider options={{
          smooth: true,
          // @ts-ignore
          multiplier: 0.9,
          tablet: {
            smooth: true,
          },
          smartphone: {
            smooth: true,
          },
          getDirection: true,
          getSpeed: true,
        }}
          location={asPath}
          containerRef={ref}
          onLocationChange={(scroll) => scroll.scrollTo(0, {
            duration: 0,
            disableLerp: true,
          })}
        >
          <div data-scroll-container ref={ref} >
            <Cursor>
              <HeaderDynamic />
              <Component {...pageProps} />
              <Noise />
              <ToastRegion />
            </Cursor>
          </div>
        </LocomotiveScrollProvider>
      </LoadingProvider>
    </main>
  </>
}

export default appWithTranslation(App, nextI18NextConfig);