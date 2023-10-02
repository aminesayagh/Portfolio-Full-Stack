import { Head } from '@/components/common';
import { useState } from 'react';
import { Noise, Preloader } from '@/components/ui';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import '@/utils/gsap';

import AnimationConf from '@/context/AnimationConf';
import { LandingPage } from '@/components/pages';
import { Cursor } from '@/components/ui';
import dynamic from 'next/dynamic';

import nextI18NextConfig from '../next-i18next.config.js'
import { useTranslation } from 'react-i18next';

const DynamicHeader = dynamic(() => import('@/components/common/header'), {});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation('common');

  return (
    <>
      <Head title={t('head.home.title')}
        description={t('head.home.description')}
        keywords={t('head.home.keywords')}
        author={t('head.home.author')}
        logo='/favicon.svg'
      />
      {isLoading && <Preloader />}
      <Cursor>
        <AnimationConf >
          <DynamicHeader />
          <div data-scroll-container>
            <LandingPage />
          </div>
          <Noise />
        </AnimationConf>
      </Cursor>
    </>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}