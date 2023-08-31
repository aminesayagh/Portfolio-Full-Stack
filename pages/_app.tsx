import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'styles/globals.css';
import 'tailwindcss/tailwind.css';




import { Montserrat } from 'next/font/google';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js';
import '../utils/i18n';


const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});



function App({ Component, pageProps }: AppProps) {
  return <main className={`${montserrat.variable} font-sans`}>
    <Component {...pageProps} />
  </main>
}

export default appWithTranslation(App, nextI18NextConfig);