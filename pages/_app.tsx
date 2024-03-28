import { useMemo, useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";
import { Montserrat } from "next/font/google";

import type { AppProps } from "next/app";
import nextI18NextConfig from "../next-i18next.config.js";
import { LoadingProvider } from "@/components/ui/preloader";
import Scripts from "@/components/common/script";
import "../styles/globals.scss";
import "../utils/i18n";
// @ts-ignore
import { useFrame } from "@studio-freight/hamo";


const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
function App({ Component, pageProps }: AppProps) {

  // Use useMemo to memorize the font variable
  const font = useMemo(() => montserrat.variable, [montserrat]);
  // const className = montserrat.className;
  const [isReadyFont, setIsReadyFont] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-montserrat", font);
    document.body.classList.add(font);
    const time = setTimeout(() => {
      setIsReadyFont(true);
    }, 1000);
    return () => {
      setIsReadyFont(false);
      clearTimeout(time);
    };
  }, [font]);

  if(!font) return null;

  return (
    <>
      <Scripts />
      <main className='app-container'>
        <LoadingProvider fontReady={isReadyFont}>
          <Component {...pageProps} />
        </LoadingProvider>
      </main>
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
