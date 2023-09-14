import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'styles/globals.css';
import 'tailwindcss/tailwind.css';




import { Montserrat } from 'next/font/google';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js';
import '../utils/i18n';
import { DefaultSeo } from 'next-seo';


const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});



function App({ Component, pageProps }: AppProps) {
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
    <main className={`${montserrat.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  </>
}

export default appWithTranslation(App, nextI18NextConfig);