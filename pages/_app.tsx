
import type { AppProps } from 'next/app'
import '../styles/globals.scss';

import Script from 'next/script';

import { Montserrat } from 'next/font/google';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js';
import '../utils/i18n';
import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

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

  return <>
    <Script id="google-analytics">{
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LBW0TBMSD6');
      `}
    </Script>
    <main className={`${val} font-sans`}>
      <Component {...pageProps} />
    </main>
  </>
}

export default appWithTranslation(App, nextI18NextConfig);