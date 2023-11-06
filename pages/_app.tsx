
import { useRef, useState, useEffect } from 'react';
import Script from 'next/script';
import { Montserrat } from 'next/font/google';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import type { AppProps } from 'next/app'
import '../styles/globals.scss';

import nextI18NextConfig from '../next-i18next.config.js';
import '../utils/i18n';
import { LocomotiveScrollProvider } from '@/lib/LocomotiveScroll'
import { LoadingProvider } from '@/components/ui/preloader';

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function App({ Component, pageProps }: AppProps) {
  const ref = useRef(null);
  const { asPath } = useRouter();
  const [font,setFont] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    setFont(montserrat.variable)
  }, []);

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

    <main className={`${font || ''} app-container`}>
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