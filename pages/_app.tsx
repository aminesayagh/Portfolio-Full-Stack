
import type { AppProps } from 'next/app'
import '../styles/globals.css';
// import 'tailwindcss/tailwind.css';


import Script from 'next/script';

import { Montserrat } from 'next/font/google';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js';
import '../utils/i18n';
import { DefaultSeo } from 'next-seo';
import { useState, useEffect } from 'react';



import { Analytics } from '@vercel/analytics/react';
import TagManager from 'react-gtm-module';


const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
function App({ Component, pageProps }: AppProps) {

  const [val, setVal] = useState<string>();
  useEffect(() => {
    setVal(montserrat.variable)
  }, [])
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-5L7DRGL9' });
  }, [])

  return <>
    <DefaultSeo
      title={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
      description={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        url: 'https://ma-sayagh.vercel.app/',
        site_name: 'Mohamed Amine SAYAGH - Full Stack Web Developer',
      }}
    />
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
      <Component {...pageProps} />
      <Analytics />
    </main>
  </>
}

export default appWithTranslation(App, nextI18NextConfig);