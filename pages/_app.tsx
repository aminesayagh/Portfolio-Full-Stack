
import type { AppProps } from 'next/app'
import '../styles/globals.scss';

import Script from 'next/script';

import { Montserrat } from 'next/font/google';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js';
import '../utils/i18n';
import { useState, useEffect } from 'react';


import { Analytics } from '@vercel/analytics/react';
import dynamic from 'next/dynamic';
import TagManager from 'react-gtm-module';
import { Suspense } from 'react';

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
import { Cursor, LoadingProvider } from '@/components/ui';

const DynamicAnimationConf = dynamic(() => import('@/context/AnimationConf'), {});
function App({ Component, pageProps }: AppProps) {

  const [val, setVal] = useState<string>();
  useEffect(() => {
    setVal(montserrat.variable)
  }, [])
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-5L7DRGL9' });
  }, [])

  return <>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LBW0TBMSD6"></Script>
    <Script id="google-analytics">{
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LBW0TBMSD6');
      `}
    </Script>
    <main className={`${val} font-sans`}>
      <LoadingProvider>
        <Cursor>
          <DynamicAnimationConf >

            <Component {...pageProps} />
          </DynamicAnimationConf>
        </Cursor>
      </LoadingProvider>
      <Analytics />
    </main>
  </>
}

export default appWithTranslation(App, nextI18NextConfig);