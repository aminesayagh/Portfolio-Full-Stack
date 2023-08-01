import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'styles/globals.css';
import 'tailwindcss/tailwind.css';


import { Montserrat } from 'next/font/google';
import { appWithTranslation } from 'next-i18next'

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  weight: ['100', '200' ,'300' ,'400', '500', '600', '700', '800', '900'],
});

import '@/utils/i18n';


 function App({ Component, pageProps }: AppProps) {
  return <main className={`${montserrat.variable} font-sans`}>
    <Component {...pageProps} />
  </main>
}

export default appWithTranslation(App)