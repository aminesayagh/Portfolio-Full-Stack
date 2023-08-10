
import { Head } from '@/components/common';
import { Suspense } from 'react';
import { Noise } from '@/components/ui';
import '@/utils/i18n';

const Video = () => {
  return (
    <>
      <video width='100%' height='auto' autoPlay muted loop controls>
        <source src='/video.mp4' type='video/mp4' />
      </video>
    </>
  )
}

import { Loading } from 'components/ui';
import "@/utils/i18n";


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
