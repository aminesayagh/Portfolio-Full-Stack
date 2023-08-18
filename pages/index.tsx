
import { Head } from '@/components/common';
import { Suspense } from 'react';
import { Noise } from '@/components/ui';
import '@/utils/i18n';

import { Loading } from 'components/ui';
import "@/utils/i18n";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


import { LandingPage } from '@/components/pages';

export default function Home() {

  return (
    <>

      <Head title={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
        description={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
        keywords="Mohamed Amine SAYAGH - Full Stack Web Developer"
        author="Mohamed Amine SAYAGH"
        logo='/favicon.svg'
      />
      <Suspense fallback={<Loading />}>
        <LandingPage />
        <Noise />
      </Suspense>
    </>
  )
}
